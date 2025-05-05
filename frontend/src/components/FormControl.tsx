import { Alert, Box, Button } from "@mui/material";
import { Component, ReactNode } from "react";
type Props={
    onSubmit:any;
    error:string;
    success:string;
    disableSave?:boolean;
    saveCaption?:string;
    children?:ReactNode;
}
type State={
    alertVariant:any;
    showAlert:boolean;
    successMsg:string;
    errorMsg:string;
    alertMsg:string;
    disableSave:boolean;
    saveLoad:boolean;
}
export default class FormControl extends Component<Props,State>{
    saveBtn=null;
    constructor(props:Props) {
        super(props);
        this.state = {
            disableSave:false,
            alertVariant:'success',
            showAlert:false,
            successMsg:'',
            errorMsg:'',
            alertMsg:'',
            saveLoad:false
        };
    }
    submitHandle=(e: React.FormEvent)=>{
        e.preventDefault();
        this.setState({...this.state,saveLoad:true});
        if(this.props.onSubmit){
            this.props.onSubmit();
        }
    }
    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
        if(prevProps.success!=this.props.success){
            
            this.setState({...this.state,alertVariant:'success',showAlert:true,alertMsg:this.props.success,saveLoad:false});
        }
        if(prevProps.error!=this.props.error){
            this.setState({...this.state,alertVariant:'error',showAlert:true,alertMsg:this.props.error,saveLoad:false});
        }
        if(prevProps.disableSave!=this.props.disableSave&&typeof this.props.disableSave=='boolean'){
            debugger;
            if(typeof this.props.disableSave=='boolean'){
                this.setState({...this.state,disableSave:this.props.disableSave});
            }
        }
    }
    updateAlert=()=>{
        if(this.props.success){
            this.setState({...this.state,alertVariant:'success',showAlert:true,alertMsg:this.props.success});
        }
        if(this.props.error){
            this.setState({...this.state,alertVariant:'error',showAlert:true,alertMsg:this.props.error});
        }
    }
    
    render(){
        return(
            <div>
            <Box>
            <form onSubmit={this.submitHandle} encType='multipart/form-data'>
            {
                this.props.children
            }
            <div className='Group'>
            <Box sx={{width:'350px'}}>
            {this.state.showAlert?
            <Alert hidden={this.state.showAlert} variant='filled' severity={this.state.alertVariant}>{this.state.alertMsg}</Alert>
            :null}
            </Box>
            </div>
            <Button loading={this.state.saveLoad} type='submit' variant='contained' disabled={this.state.disableSave}>{this.props.saveCaption||'Save'}</Button>
            </form>
            </Box>
            </div>
        )
    }
}