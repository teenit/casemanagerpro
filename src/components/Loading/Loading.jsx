import React from "react";
import Loadpic from "./Interactive/Loadpic";
import './Loading.css';
const Loading = ({timer, message,active})=>{
    return (
        <div className={"loading__wrap " + active}>
            <div className="loading__inner">
                <Loadpic show={"active"}/>
                <div className="loading__text">
                    <p>{timer}</p>
                    <p>{message}</p>                    
                </div>

            </div>
        </div>
    )
}

export default Loading;