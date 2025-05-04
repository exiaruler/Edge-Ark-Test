import { Button } from "@mui/material";
import { Component } from "react";
type Props={
    caption:string,
    disable?:boolean,
}
export default class SaveButton extends Component<Props>{
    constructor(props:Props) {
        super(props);
        this.state = {
            
        };
    }
    render(){
        return(
            <div className="Group">
            <Button type='submit' disabled={this.props.disable} variant='contained' >{this.props.caption}</Button> 
            </div>
        )
    }
}