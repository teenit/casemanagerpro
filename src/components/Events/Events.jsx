import React, { useEffect, useState } from "react";
import { serverAddres } from "../Functions/serverAddres";
import s from "./events.module.css";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Icon from "../elements/Icons/Icon"
import Modal from "../Modals/Modal"
import AddEventBlock from "../blocks/AddEventBlock";
import AccessCheck from "../Functions/AccessCheck";
const Events = () => {
    const [control, setControl] = useState(false)
    const [events, setEvents] = useState([]);
    function getEvents() {
        let obj = {
            id: localStorage.getItem("id"),
            token: localStorage.getItem("token"),
            userName: localStorage.getItem("userName"),
        }
        axios({
            url: serverAddres("event/get-events.php"),
            method: "POST",
            header: { 'Content-Type': 'application/json;charset=utf-8' },
            data: JSON.stringify(obj),
        })
            .then((data) => {
                setEvents(data.data)
            })
            .catch((error) => console.log(error))
    }
    useEffect(() => {
        getEvents()
    }, [])
    // const removeEvent = (eventID)=>{
    //     apiResponse({eventID:eventID},'event/deactivate-event-by-id.php').then((responce)=>{
    //         alert(responce);
    //         getEvents();
    //     }).catch(err=>console.log(err))
    // }
    
    return (
        <div className={s.wrap}>
            <div className={s.title}>
                <h1>Івенти</h1>
                {AccessCheck('yes_no', 'a_page_event_create') && <Icon icon={"add"} addClass={"fs40"} onClick={() => {setControl(!control)}}/>}
                
            </div>
            <div className={s.inner}>
                {events.map((item, index) => {
                    return (<div key={index} className={s.result} style={{ boxShadow: `0px 0px 5px 0px ${item.color ? item.color : "#000"}` }}>
                        <div className={s.res__color} style={{ backgroundColor: item.color }}></div>
                        <div className={s.res__title}>
                            <NavLink className={s.link} to={`/event/${item.id}`}> <h3>{item.title}</h3></NavLink>
                        </div>
                        <div className={s.res__desc}>
                            <p>{item.description.replaceAll("<br />", " ")}</p>
                        </div>
                        <div className={s.author}>Створив: {item.meta.userName}</div>
                        <div className={s.res__control}>
                            <div className={s.date}>{item.meta.date}</div>
                        </div>
                    </div>)
                })}
            </div>
            {control && <Modal closeHandler={() => { setControl(false) }}>
                <AddEventBlock successHandler={()=>{
                    getEvents()
                    setControl(false)
                }}/>
            </Modal>
            }
        </div>
    )
}

export default Events;