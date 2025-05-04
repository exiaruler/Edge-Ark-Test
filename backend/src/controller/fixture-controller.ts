import { Date as mongoDate } from "mongoose";
import { Response } from "../response/response-interface";
const csv = require('csv-parser')
const fs = require('fs');
const fixture=require('../model/fixture');
const teamControl=require('./team-controller');
const jsonResponse=require('../response/response-output');
type fileKeys={
    fixture_mid:string,
    season:number,
    competition_name:string,
    fixture_datetime:Date,
    fixture_round:number,
    home_team:string,
    away_team:string
}
async function deleteAll(){
    var response:Response=jsonResponse.newResponse();
    const deleteFixs=await fixture.deleteMany({});
    const deleteTeams=await teamControl.deleteAll();
    if(deleteFixs&&deleteTeams){
        response.success=true;
        response.messageResponse='All fixtures and teams are deleted';
    }
    return response;
}
async function getAllFixtures(){
    return await fixture.find().populate('homeTeam').populate('awayTeam').exec();
}
async function upload(file:any){
    var response:Response=jsonResponse.newResponse();
    var results:Array<fileKeys>=[];
    // extract contents of .csv
    const extract=new Promise<void>((resolve,reject)=>{
        fs.createReadStream(file)
        .pipe(csv())
        .on('data', (data:fileKeys) =>{ 
            // validate row has these keys
            if(data.hasOwnProperty('fixture_mid')&&data.hasOwnProperty('season')&&data.hasOwnProperty('competition_name')&&
            data.hasOwnProperty('fixture_datetime')&&data.hasOwnProperty('fixture_round')&&data.hasOwnProperty('home_team')&&data.hasOwnProperty('away_team')){
                results.push(data);
            }else
            {
                reject(data);
            }
        }
        )
        .on('end', async () => {
            resolve();
        });
    });
    await extract.then(
        // save into mongoDB
        async function(){
            for(var i=0; i<results.length; i++){
                var fix=results[i];
                // add team or find existing team
                var exTeamHom=await teamControl.findTeam(fix.home_team);
                var exTeamAwa=await teamControl.findTeam(fix.away_team);
                if(exTeamHom===null){
                    exTeamHom=await teamControl.addTeam(fix.home_team);
                }
                if(exTeamAwa===null){
                    exTeamAwa=await teamControl.addTeam(fix.away_team);
                }
                // add fixture or find existing fixture
                if(fix.fixture_mid!=""){
                    const existFix=await fixture.findOne({fixtureMid:fix.fixture_mid});
                    if(existFix==null){
                        //const formatDt=formatDateTime(fix.fixture_datetime);
                        
                        const newFix=new fixture({fixtureMid:fix.fixture_mid,season:fix.season,competitionName:fix.competition_name,
                                fixtureDateTime:fix.fixture_datetime,fixtureRound:fix.fixture_round,homeTeam:exTeamHom,awayTeam:exTeamAwa});
                        const save=await fixture(newFix).save();
                        // update team fixtures
                        if(save){
                            exTeamHom.fixtures.push(save._id);
                            exTeamAwa.fixtures.push(save._id);
                            await teamControl.updateTeam(exTeamHom);
                            await teamControl.updateTeam(exTeamAwa);
                        }
                    }else
                    {
                        // update existing fixture
                        existFix.season=fix.season;
                        existFix.competitionName=fix.competition_name;
                        existFix.fixtureDateTime=fix.fixture_datetime;
                        existFix.fixtureRound=fix.fixture_round;
    
                        // remove fixture from team
                        var existId= existFix._id;
                        // remove fixture from team fixture
                        var prevHIndex=exTeamHom.fixtures.indexOf(existId);
                        var prevAIndex=exTeamAwa.fixtures.indexOf(existId);
                        if(prevHIndex>-1){
                            exTeamHom.fixtures.splice(prevHIndex,1);
                        }
                        if(prevAIndex>-1){
                            exTeamAwa.fixtures.splice(prevAIndex,1);
                        }
                        // update with new teams
                        existFix.homeTeam=exTeamHom;
                        existFix.awayTeam=exTeamAwa;
                        // update fixture
                        const save=await fixture(existFix).save();
                        // update team fixtures
                        exTeamHom.fixtures.push(save._id);
                        exTeamAwa.fixtures.push(save._id);
                        if(save){
                            await teamControl.updateTeam(exTeamHom);
                            await teamControl.updateTeam(exTeamAwa);
                        }
                        
                    }
                }
            }
            response.messageResponse='Upload of fixtures is successful';
            response.success=true;
        },
        function(data){
          // print error of missing columns
          var keys=['fixture_mid','season','competition_name','fixture_datetime','fixture_round','home_team','away_team'];
          var jsonKeys=Object.keys(data);
          var missingKey=[];
          for(var i=0; i<keys.length; i++){
              if(jsonKeys.indexOf(keys[i])<0){
                  missingKey.push(keys[i]);
              }
          }
          response.messageResponse='File is missing '+missingKey.toString()+' columns';
          response.success=false;
          response.statusCode=422;
        }
      );
    return response;
}
// format date time to mongoDB Date format
function formatDateTime(dateTime:Date){
    var formatDt=new Date();
    var dtSplit=dateTime.toString().split(" ");
    var date=dtSplit[0];
    var time=dtSplit[1];
    var dateArr=date.split("-");
    var timeArr=time.split(":");
    if(timeArr.length==3&&dateArr.length==3){
        /*
        var month=dateArr[1];
        if(month.indexOf('0')>-1){
            month=month.charAt(1);
        }
        formatDt.setDate(parseInt(dateArr[2]));
        formatDt.setMonth(parseInt(dateArr[1])+1);
        formatDt.setFullYear(parseInt(dateArr[0]));
        formatDt.setHours(parseInt(timeArr[0]));
        formatDt.setMinutes(parseInt(timeArr[1]));
        */
       //dateTime.
       
    }
    return formatDt;

}

module.exports={
    upload,
    deleteAll,
    getAllFixtures
}