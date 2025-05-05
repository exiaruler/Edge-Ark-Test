import {Box, Grid } from "@mui/material";
import SearchInput from "../components/SearchInput";
import TextInput from "../components/TextInput";
import { useEffect, useRef, useState } from "react";
import {WSMessage} from '../base';
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
export default function Search(){
    const [resultHis,setResultHis]:Array<any>=useState([]);
    const resultsHisRef=useRef<any[]>([]);
    const [fixture,setFixture]=useState({
        _id:'',
        fixtureMid:"",
        season:"",
        competitionName:"",
        fixtureDateTime:"",
        fixtureRound:"",
        homeTeam:"",
        awayTeam:""
    });
    const [fixDisplay,setFixDisplay]=useState(false);
    const ws = useRef<WebSocket | null>(null);

    const onChange=(event:any)=>{
        var value=event.target.value;
        if(sessionStorage.getItem('teamshis')==null){
            setResultHis([]);
            resultsHisRef.current=[];
        }
        // search for team if it does not exist
        var msg:WSMessage={
            route: "/team/search",
                value: value
        }
        ws.current?.send(JSON.stringify(msg));
        
    }
    const selectFixture=(event:any,value:any)=>{
        if(value!=null){
            var dateTime=new Date(value.fixtureDateTime).toString();
            setFixDisplay(true);
            setFixture({...fixture,_id:value._id,fixtureMid:value.fixtureMid,season:value.season,competitionName:value.competitionName,fixtureDateTime:dateTime,fixtureRound:value.fixtureRound,homeTeam:value.homeTeam.team,awayTeam:value.awayTeam.team});
        }else {
            setFixture({...fixture,_id:'',fixtureMid:"",season:"",competitionName:"",fixtureDateTime:"",fixtureRound:"",homeTeam:"",awayTeam:""});
            setFixDisplay(false);
        }
    }
    const resultsIncome=(results:string)=>{
        var resultArr=JSON.parse(results);
        resultArr=resultArr.filter((res:JSON,index:number)=>resultArr.indexOf(res)===index);
        if(resultsHisRef.current.length===0){
            resultsHisRef.current=resultArr;
        }else
        {
            // filter and update search history
            var teamIdArr=resultsHisRef.current.map((rec:any)=>rec._id);
            for(var i=0; i<resultArr.length; i++){
                var team=resultArr[i];
                var exTeamIndex=teamIdArr.indexOf(team._id);
                if(exTeamIndex<0){
                    resultsHisRef.current.push(team);
                }
            }
        }
        // save search ref to session storage
        sessionStorage.setItem("teamshis",JSON.stringify(resultsHisRef.current));
        setResultHis(resultsHisRef.current);
    }
    // pass team fixtures into search input
    const passOptions=()=>{
        var output:any=[];
        var fixOptions=resultHis.map((rec:any)=>rec.fixtures);
        for(var i=0; i<fixOptions.length; i++){
            var arr=fixOptions[i]
              output=output.concat(arr);
        }
        return output;
    }
    // render display of teams fixtures
    const optionDisplayRender=(obj:any)=>{
        var homeTeam="";
        var awayTeam="";
        var date=new Date();
        if(obj){
            homeTeam=obj.homeTeam.team;
            awayTeam=obj.awayTeam.team;
            date=new Date(obj.fixtureDateTime);
        }
        return homeTeam+" VS "+awayTeam+" "+date+" ";
    }

    const retrieve=()=>{
        var store=sessionStorage.getItem('teamshis');
        if(store!==null){
            resultsIncome(store);
        }
    }
    useEffect(() => {
        //retrieve();
        // websocket connection
        ws.current = new WebSocket('ws://localhost:8000');
        ws.current.onopen = () => {
        };
        ws.current.onmessage = (event) => {
            resultsIncome(event.data);
        };
        ws.current.onclose = () => {
        };
    
        return () => {
          ws.current?.close();
        };
    }, []);
    return(
        <div className="Group">
        <Box sx={{flexGrow:1}}>
        <Grid container rowSpacing={2}>
        <Grid size={'grow'}></Grid>
        <Grid size={{xs:9,md:3}}>
        <div className="Group">
        <SearchInput compareKey={'_id'} label={'Search Team'} onChange={onChange} autoOnChange={selectFixture} options={passOptions()} optionDisplay={optionDisplayRender}/>
        </div>
        {fixDisplay?
        <div className="Group">
        <TextInput readOnly={true} label={"Fixture ID"}  value={fixture.fixtureMid} />
        <TextInput readOnly={true} label={"Season"} value={fixture.season}/>
        <TextInput readOnly={true} label={"Competition Name"}  value={fixture.competitionName}/>
        <div className="Group">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
        label="Date and Time"
        value={dayjs(new Date(fixture.fixtureDateTime))}
        />
        </LocalizationProvider>
        </div>
        <TextInput readOnly={true} label={"Round"} onChange={undefined} value={fixture.fixtureRound}/>
        <TextInput readOnly={true} label={"Home Team"} onChange={undefined} value={fixture.homeTeam}/>
        <TextInput readOnly={true} label={"Away Team"} onChange={undefined} value={fixture.awayTeam}/>
        </div>
        :null}
        </Grid>
        <Grid size={'grow'}>
        </Grid>
        </Grid>
        </Box>
        </div>
    )
}