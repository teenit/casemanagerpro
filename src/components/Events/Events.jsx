import React, { useEffect, useState } from "react";
import { serverAddres } from "../Functions/serverAddres";
import s from "./events.module.css";
import axios from "axios";
import { NavLink } from "react-router-dom";
import AddEvent from "./AddEvent";
import settingImg from "./../../img/icons/settings-50-black.png"
import { apiResponse } from "../Functions/get_apiObj";
const Events = ()=>{
    const [control, setControl] = useState(false)
    const [events, setEvents] = useState([]);
    function getEvents(){
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
    }
    useEffect(()=>{
        getEvents()
    },[])
    // const removeEvent = (eventID)=>{
    //     console.log(eventID)
    //     apiResponse({eventID:eventID},'event/deactivate-event-by-id.php').then((responce)=>{
    //         alert(responce);
    //         getEvents();
    //     }).catch(err=>console.log(err))
    // }
    return(
    <div className={s.wrap}>
        <div className={s.control}>
                <div className={s.panel}>
                    <div className={s.panel__item}>
                        <img src={settingImg} className={s.panel__img} alt="" onClick={()=>{
                            setControl(!control)
                        }} />
                    </div>
                </div>
            </div>
        <h1>Івенти</h1>
        <div className={s.inner}>
                {events.map((item,index)=>{
                    return(<div key={index} className={s.result} style={{boxShadow:"0 0 5px 0" + item.color}}>
                    <div className={s.res__color} style={{backgroundColor:item.color}}></div>
                    <div className={s.res__title}>
                       <NavLink className={s.link} to={`/events/${item.link}`}> <h3>{item.title}</h3></NavLink>
                    </div>
                    <div className={s.res__desc}>
                        <p>{item.description.replaceAll("<br />"," ")}</p>
                    </div>
                    <div className={s.author}>Створив: {item.meta.userName}</div>
                    <div className={s.res__control}>
                        <div className={s.date}>{item.meta.date}</div>
                    </div>
                </div>)
                })}
        </div>
        {control ? <AddEvent getEvents = {()=>{getEvents()}} close = {()=>{
            setControl(false)
        }}/> : null}
    </div>
    )
}

export default Events;