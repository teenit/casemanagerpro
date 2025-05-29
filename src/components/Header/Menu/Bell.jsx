import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { doneBells } from "../../../services/user-api";
import s from "./bell.module.css";
import bellImg from "./../../../img/icons/bell-50.png";
import axios from "axios";
import { serverAddres } from "../../Functions/serverAddres";
import { NavLink, useLocation } from "react-router-dom";
import Icon from "../../elements/Icons/Icon";

import MenuNotification from "../../elements/Notifications/MenuNotification";
import { apiResponse } from "../../Functions/get_apiObj";
import { Button } from "@mui/material";
const Bell = () => {
    const location = useLocation()
    const [bells, setBells] = useState([])
    const [active, setActive] = useState(false)
    const [read, setRead] = useState([])
    const [notifications, setNotifications] = useState([])
    const [unRead, setUnRead] = useState(0)
    const [state, setState] = useState({
        limit:10,
        page:0,
        more: true
    })
    const getNotifications = ()=>{
        apiResponse({limit: state.limit, page:state.page + 1},"notifications/get.php").then((res)=>{
            setState({...state, page:state.page + 1, more: res.length < state.limit ? false : true})
            setNotifications([...notifications, ...res])
        })
    }

    const deleteNotification = (notification_id) => {
        apiResponse({notification_id:notification_id},"notifications/delete.php").then((res)=>{
            if(res.status) {
                const filteredNotifications = notifications.filter(item => item.notification_id !== notification_id);
                setNotifications([...filteredNotifications]);
            }
            
        })
    }

    const getContUnRead = () => {
        apiResponse({},"notifications/counter.php").then((res)=>{
            setUnRead(res.unread_count);
        })
    }

    useEffect(() => {
        setActive(false)        
        getNotifications()
        getContUnRead()
        const intervalId = setInterval(getContUnRead, 60000);

        return () => clearInterval(intervalId); 
    }, [location.pathname])


    const readNotification = (id) => {
        apiResponse({notification_id:id}, "notifications/mark-read.php").then((res)=>{
            if (res.status) {
                let filtered = [];
                notifications.forEach((elem)=>{ 
                    if(elem.notification_id === id) elem.date_read = true;
                    filtered.push(elem)
                })
                setNotifications(filtered)
                getContUnRead()
            }
        })
    };

    return (
        <div className={"Bell"}>
            <div className={'Bell-click'}>
                <Icon addClass="Bell-click-img" icon={'notification'} onClick={() => {
                    setActive(!active)
                    setState({limit:10, page:0, more: true});
                    getNotifications()
                }}/>
                {unRead !== 0 && <span className={'Bell-click-count'}></span>}
            </div>
            {active && <div className={s.wrap__bells}>
                <div className={`${s.black} ${s.active}`} onClick={() => {
                    setActive(!active)
                }}></div>
                <div className={`${s.items} ${s.active}`}>
                    <div className={s.items__header}>
                        <div className={s.items__header__title}>Сповіщення</div>
                        {notifications.length > 0 && <div className={s.items__header__unread}>{`${unRead} не прочитано`}</div>}
                    </div>
                    {notifications && notifications.map((item, index) => {
                        return (
                            <MenuNotification read={(id) => { readNotification(id) }} data={item} key={index} deleteNotification={deleteNotification}/>
                        )
                    })}
                    { state.more ? <Button variant="contained" onClick={()=>{getNotifications()}}>Показати ще</Button>
                        : <span>Сповіщень більше немає</span> 
                    }
                    
                </div>
            </div>}
        </div>
    )
}

export default Bell;