import React, { useEffect } from "react";
import { useState } from "react";
import s from "./SetEvent.module.css";
import axios from "axios";
import { serverAddres } from "../../Functions/serverAddres";
import { NavLink } from "react-router-dom";
import Icon from "../../elements/Icons/Icon";
import AddEventBlock from "../../blocks/AddEventBlock";
import { LANG } from "../../../services/config";
import Modal from "../../Modals/Modal"
import { Button } from "@mui/material";
import { apiResponse } from "../../Functions/get_apiObj";
const SetEvent = ()=>{
    const [events,setEvents] = useState([])
    const [modal, setModal] = useState(false)
    const load = ()=>{
        apiResponse({userName: localStorage.getItem("userName")}, "event/get-events.php").then((data)=>{
            setEvents(data)   
        })
        // let obj = {
        //     id: localStorage.getItem("id"),
        //     token: localStorage.getItem("token"),
        //     userName: localStorage.getItem("userName"),
        // }
        // axios({
        //     url: serverAddres("event/get-events.php") ,
        //     method: "POST",
        //     header : {'Content-Type': 'application/json;charset=utf-8'},
        //     data : JSON.stringify(obj),
        // })
        // .then((data)=>{ 
        //     setEvents(data.data)   
        // })
        // .catch((error)=>console.log(error)) 
    }
    useEffect(()=>{
       load()
    },[])
    return(
        <div className={s.wrap}>
            <div className={s.title}>
                <h2>{LANG.addEvent}</h2>
                <span onClick={()=>{setModal(true)}}>
                    <Icon icon={"add"}/>
                </span>
            </div>
            {modal&&<Modal closeHandler = {()=>{setModal(false)}}>
                <AddEventBlock successHandler={load}/>
                </Modal>}
            <div className={s.results}>
                {events.map((item,index)=>{
                    return(<div key={index} className={s.result}>
                    <div className={s.res__color} style={{backgroundColor:item.color}}></div>
                    <div className={s.res__title}>
                    <NavLink to={`/event/${item.id}`}> <h3>{item.title}</h3></NavLink>
                    </div>
                    <div className={s.res__desc}>
                        <p>{item.description.replaceAll("<br />"," ")}</p>
                    </div>
                    <div className={s.author}>Створив: {item.meta.userName}</div>
                    <div className={s.date}>{item.meta.date}</div>
                </div>)
                })}
                
            </div>
        </div>
    )
}

export default SetEvent;