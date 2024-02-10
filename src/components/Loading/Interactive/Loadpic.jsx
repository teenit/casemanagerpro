import React from "react";
import img from "../../../img/loading_1.gif";
import "./loadpic.css"


const Loadpic = ({show}) =>{
    
    return(
    <div className={`animation__loading ${show}`}>
        <img src={img} alt="" />
    </div>        
    )

}
export default Loadpic;