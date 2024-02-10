import React from "react";
import { NavLink } from "react-router-dom";
import s from "./route-navlink.module.css";
const RouteNavLink = ({link,text,func,message})=>{
    
    return(
        <div className={s.container}>
            <div className={s.inner}>
                <div className={s.close} onClick={()=>{
                    func()
                }}>
                    <span></span>
                    <span></span>
                </div>
                <div className={s.message}>
                    <p>{message}</p>
                </div>
                <NavLink to={link}>{text}</NavLink>
            </div> 
        </div>
       
    )
}

export default RouteNavLink;