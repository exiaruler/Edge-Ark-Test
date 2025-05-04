import { useState,Fragment } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
type Props={
    label:string,
    onChange?:any,
    readOnly?:boolean,
    value?:string,
    options?:Array<any>,
    compareKey:string,
    width?:number
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
    const [options,setOptions]=useState([]);
    const [loading, setLoading] =useState(false);
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
    return(
        <div className="Group">
         <Autocomplete
            sx={{ width: width }}
            open={open}
            onOpen={handleOpen}
            onClose={handleClose}
            isOptionEqualToValue={(option, value) => option[props.compareKey] === value[props.compareKey]}
            getOptionLabel={(option) => option[props.compareKey]}
            options={options}
            loading={loading}
            renderInput={(params) => (
            <TextField
            {...params}
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