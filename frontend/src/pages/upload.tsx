import { Box, Grid } from "@mui/material";
import FormControl from "../components/FormControl";
import FileInput from "../components/FileInput";
import { useState } from "react";

export default function Upload(){
    const [uploadMsg,setUploadMsg]=useState({
        success:'',
        error:'',
    });
    const [form,setForm]=useState({
        file:null
    });
    const submitHandle=()=>{
        errorClear();
        setUploadMsg({...uploadMsg,success:'test'});
        
    }
    const errorClear=()=>{
        setUploadMsg({success:'',error:'',});
    }
    return (
        <div className="Group">
        <Box sx={{flexGrow:2}}>
        <Grid container rowSpacing={1}>
        <Grid size={{xs:2,md:4}}></Grid>
        <Grid size={{xs:1,md:4}}>
        <FormControl onSubmit={submitHandle} error={uploadMsg.error} success={uploadMsg.success} saveCaption="Upload">
        <FileInput label={"Fixture"} onChange={undefined} accept={".csv"} />
        </FormControl>
        </Grid>
        </Grid>
        </Box>
        </div>
    );
}