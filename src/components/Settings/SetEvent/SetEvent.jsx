import React, { useEffect } from "react";
import { useState } from "react";
import s from "./SetEvent.module.css";
import axios from "axios";
import { serverAddres } from "../../Functions/serverAddres";
import { NavLink } from "react-router-dom";
import Icon from "../../elements/Icons/Icon";
import AddEventBlock from "../../blocks/AddEventBlock";
const SetEvent = ()=>{
    const [events,setEvents] = useState([])
    useEffect(()=>{
        let obj = {
            id: localStorage.getItem("id"),
            token: localStorage.getItem("token"),
            userName: localStorage.getItem("userName"),
        }
        axios({
            url: serverAddres("event/get-events.php") ,
            method: "POST",
            header : {'Content-Type': 'application/json;charset=utf-8'},
            data : JSON.stringify(obj),
        })
        .then((data)=>{ 
            setEvents(data.data)   
        })
        .catch((error)=>console.log(error)) 
    },[])
    return(
        <div className={s.wrap}>
                <AddEventBlock/>
            <div className={s.results}>
                {events.map((item,index)=>{
                    return(<div key={index} className={s.result}>
                    <div className={s.res__color} style={{backgroundColor:item.color}}></div>
                    <div className={s.res__title}>
                    <NavLink to={`/events/${item.link}`}> <h3>{item.title}</h3></NavLink>
                    </div>
                    <div className={s.res__desc}>
                        <p>{item.description.replaceAll("<br />"," ")}</p>
                    </div>
                    <div className={s.author}>Створив: {item.meta.userName}</div>
                    <div className={s.res__control}>
                        <div className={s.delete}>
                            <Icon icon={"delete"} addClass={"default-icon"}/>
                        </div>
                        <div className={s.date}>{item.meta.date}</div>
                    </div>
                </div>)
                })}
                
            </div>
        </div>
    )
}

export default SetEvent;