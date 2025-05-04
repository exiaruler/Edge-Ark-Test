import {Box, Grid } from "@mui/material";
import FormControl from "../components/FormControl";
import SearchInput from "../components/SearchInput";
import TextInput from "../components/TextInput";
import { useState } from "react";

export default function Search(){
    const teams:any=[];
    const [fixture,setFixture]=useState(null);
    //const 
    const submitHandle=()=>{

    }
    return(
        <div className="Group">
        <Box sx={{flexGrow:2}}>
        <Grid container rowSpacing={1}>
        <Grid size={{xs:12,md:1}}></Grid>
        <Grid size={{xs:12,md:4}}>
        </Grid>
        <Grid size={{xs:10,md:4}}>
        <div className="Group">
        <SearchInput compareKey="team" label={'Search Team'}/>
        </div>
        <div className="Group">
        <FormControl onSubmit={submitHandle} error={""} success={""} saveCaption="Search">
        <TextInput readOnly={true} label={"Fixture ID"} onChange={undefined} />
        <TextInput readOnly={true} label={"Season"} onChange={undefined} />
        <TextInput readOnly={true} label={"Competition Name"} onChange={undefined} />
        <TextInput readOnly={true} label={"Date and Time"} onChange={undefined} />
        <TextInput readOnly={true} label={"Round"} onChange={undefined} />
        <TextInput readOnly={true} label={"Home Team"} onChange={undefined} />
        <TextInput readOnly={true} label={"Away Team"} onChange={undefined} />
        </FormControl>
        </div>
      
        </Grid>
        </Grid>
        </Box>
        </div>
    )
}