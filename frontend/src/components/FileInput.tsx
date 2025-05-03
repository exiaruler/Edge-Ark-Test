import { Alert, Button, FormControl, Input, InputLabel } from "@mui/material";
import { Component } from "react";
type Props={
    label:string;
    onChange:any;
    tabIndex?:number;
    accept:string;
}
type State={
    showError:boolean;
}
// file input component
export default class FileInput extends Component<Props,State>{
    constructor(props:Props) {
        super(props);
        this.state = {
            showError:false
        };
    }
    // validate file acceptance
    handleUpload(event:any){
        this.setState({showError:false});
        var acceptance=this.props.accept;
        var file=event.files[0];
        var fileType='.'+file.type.split('/')[1];
        if(acceptance==fileType){
            if(this.props.onChange){
                this.props.onChange(file);
            }
        }else this.setState({showError:true});
    }
    render(){
        return(
            <div className="Group">
            <FormControl variant="standard">
            <InputLabel className="InputLabel" shrink htmlFor="bootstrap-input">{this.props.label}</InputLabel>
            <Input type='file' inputProps={{accept:this.props.accept}} tabIndex={this.props.tabIndex} onChange={(event)=>this.handleUpload(event.target)} />
            <div className="Group">
            {
            this.state.showError?
            <Alert variant='filled' severity={'warning'}>File type is not { this.props.accept}</Alert>
            :null
            }
            </div>
            </FormControl>
            </div>
        );
    }
}