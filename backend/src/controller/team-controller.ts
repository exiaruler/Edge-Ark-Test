

const team=require('../model/team');
// delete all teams
async function deleteAll(){
    return await team.deleteMany({});
}
async function addTeam(teamName:string){
    const add=await new team({team:teamName}).save();
    return add;
}
async function updateTeam(teamObj:typeof team){
    return await team(teamObj).save();
}
// find team by team name
async function findTeam(teamName:string){
    var rec=null;
    const findTeam=await team.findOne({team:teamName});
    if(findTeam!=null){
        rec=findTeam;
    }
    return rec;
}
async function findTeamSearch(teamName:string){

}
module.exports={
    findTeam,
    addTeam,
    updateTeam,
    deleteAll
}