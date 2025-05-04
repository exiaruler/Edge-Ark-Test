import { Box, Grid } from "@mui/material";
import FormControl from "../components/FormControl";
import FileInput from "../components/FileInput";
import { useEffect, useRef, useState } from "react";
import {fetchRequest,HttpResponse} from '../base';
export default function Upload(){
    const [uploadMsg,setUploadMsg]=useState({
        success:'',
        error:'',
    });
    const [enableSavBtn,setSavBtn]=useState(false);
    const fileInputComp=useRef<FileInput>(null);
    const [file, setFile] = useState<File | null>(null);
    const submitHandle=async()=>{
        errorClear();
        const formData:any = new FormData();
        formData.append('file', file);
        const uploadFile:HttpResponse=await fetchRequest('/fixture/upload','POST',formData,true);
        if(uploadFile.success){
            setUploadMsg({...uploadMsg,success:uploadFile.messageResponse});
        }else setUploadMsg({...uploadMsg,error:uploadFile.messageResponse});
        
    }
    const onChange=(file:File)=>{
        debugger;
        setSavBtn(false);
        setFile(null);
        setFile(file);
        console.log(file);
        if(fileInputComp.current?.state.showError)setSavBtn(true);
        //console.log(comp);
        
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
        <FormControl onSubmit={submitHandle} error={uploadMsg.error} success={uploadMsg.success} saveCaption="Upload" disableSave={enableSavBtn}>
        <FileInput ref={fileInputComp} label={"Fixture"} onChange={onChange} accept={".csv"} />
        </FormControl>
        </Grid>
        </Grid>
        </Box>
        </div>
    );
}