import { FormControl, Input, InputLabel } from "@mui/material";
import { Component } from "react";
type Props={
    label:string;
    onChange:any;
}
export default class TextInput extends Component<Props>{
    constructor(props:Props) {
        super(props);
        this.state = {
            
        };
    }
    render(){
        return(
            <div className="Group">
            <FormControl variant="standard">
            <InputLabel className="InputLabel" shrink htmlFor="bootstrap-input">{this.props.label}</InputLabel>
            <Input type='text'/>
            </FormControl>
            </div>
        );
    }
}