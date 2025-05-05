import { useState,Fragment, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
type Props={
    label:string,
    onChange?:any,
    autoOnChange?:any,
    readOnly?:boolean,
    value?:string,
    options?:Array<any>,
    compareKey:string,
    width?:number,
    optionDisplay:any
}

function sleep(duration: number): Promise<void> {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, duration);
    });
}

export default function SearchInput(props:Props){
    const [open, setOpen] = useState(false);
    const [options,setOptions]:any=useState([]);
    const [loading, setLoading] =useState(false);
    const [optionSel,setOptionSel]=useState(null);
    var width=300;
    if(props.width){
        width=props.width;
    }
    const handleOpen = () => {
        setOpen(true);
        (async () => {
          setLoading(true);
          await sleep(1e3); // For demo purposes.
          setLoading(false);
          setOptions([]);
        })();
      };
    const handleClose = () => {
        setOpen(false);
        setOptions([]);
    };
    const textonChange=(event:any)=>{
      if(props.onChange){
        props.onChange(event);
      }
    }
    const autonChange=(event:any,value:any)=>{
      setOptionSel(value);
      if(props.autoOnChange){
        props.autoOnChange(event,value);
      }
    }
    const renderOptionDisplay=(option:any)=>{
      var print="";
      if(props.optionDisplay){
        print=props.optionDisplay(option);
      }
      return print
    }
    const searchCompare=(option:any,value:any)=>{
      return option[props.compareKey] === value[props.compareKey];
    }
    const loadOptions=()=>{
      setOptions(props.options);
    }
    useEffect(() => {
      loadOptions();
    })
    return(
        <div className="Group">
         <Autocomplete
            sx={{ width: width }}
            open={open}
            onOpen={handleOpen}
            onClose={handleClose}
            isOptionEqualToValue={(option, value) =>searchCompare(option,value)}
            getOptionLabel={(option) => renderOptionDisplay(option)}
            options={options}
            loading={loading}
            onChange={(event:any,newValue:any)=>autonChange(event,newValue)}
            renderInput={(params) => (
            <TextField
            {...params}
            onChange={(event:any)=>textonChange(event)}
            label={props.label}
            slotProps={{
                input: {
                ...params.InputProps,
                endAdornment: (
                    <Fragment>
                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                    </Fragment>
                ),
                },
          }}
        />
      )}
    />
        </div>
    )

}