import React, { Component} from "react";
import { createPortal } from "react-dom";

export class RootPortal extends Component{
    el = document.createElement('div')
    
    componentDidMount(){
        document.body.appendChild(this.el)
    }
    componentWillUnmount(){
        document.body.removeChild(this.el)
    }
    
    render(){
           return (
                createPortal(
                        this.props.children, 
                    this.el)  
           )
    }  
}

export default RootPortal;