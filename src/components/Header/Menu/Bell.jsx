import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { doneBells } from "../../../services/user-api";
import s from "./bell.module.css";
import bellImg from "./../../../img/icons/bell-50.png";
import axios from "axios";
import { serverAddres } from "../../Functions/serverAddres";
import { NavLink } from "react-router-dom";
import Icon from "../../elements/Icons/Icon";

import MenuNotification from "../../elements/Notifications/MenuNotification";
const Bell = () => {

    const [bells, setBells] = useState([])
    const [bellsCount, setBellsCount] = useState(bells.length)
    const [active, setActive] = useState(false)
    const [read, setRead] = useState([])
    function getBells() {
        let obj = {
            id: localStorage.getItem("id"),
            token: localStorage.getItem("token"),
        }
        axios({
            url: serverAddres("user/get-notification.php"),
            method: "POST",
            header: { 'Content-Type': 'application/json;charset=utf-8' },
            data: JSON.stringify(obj),
        })
            .then((data) => {
                setBellsCount(data.data.length)
                setBells(data.data)
            })
            .catch((error) => console.log(error))
    }
    function getAllBells() {
        let obj = {
            id: localStorage.getItem("id"),
            token: localStorage.getItem("token"),
        }
        axios({
            url: serverAddres("user/get-all-notification.php"),
            method: "POST",
            header: { 'Content-Type': 'application/json;charset=utf-8' },
            data: JSON.stringify(obj),
        })
            .then((data) => {
                setRead(data.data)
            })
            .catch((error) => console.log(error))
    }
    useEffect(() => {
        getBells()
        getAllBells()
    }, [])
    console.log(bells);

    const readNotification = async (id) => {
        console.log(id);
        await doneBells(id);
        getBells();
        getAllBells();
    };
    
    return (
        <div className={s.bell__wrap}>
            <div className={s.wr__img}><img src={bellImg} className={s.bell__img} alt="" onClick={() => {
                setActive(!active)
            }} />{bellsCount !== 0 && <span className={s.count}> {bellsCount} </span>}</div>
            {active && <div className={s.wrap__bells}>
                <div className={`${s.black} ${s.active}`} onClick={() => {
                    setActive(!active)
                }}></div>
                <div className={`${s.items} ${s.active}`}>
                    <div className={s.items__header}>
                        <div className={s.items__header__title}>Сповіщення</div>
                        <div className={s.items__header__unread}>{`${bells.length} не прочитано`}</div>
                    </div>
                    {bells.map((item, index) => {
                        return (
                           <MenuNotification read={(id)=>{readNotification(id)}} data={item} IsUnread={true} key={index}/>
                        )
                    })}
                    {read.map((item, index) => {
                        return (
                            <MenuNotification read={(id)=>{readNotification(id)}} data={item} IsUnread={false} key={index}/>

                        )
                    })}
                </div>
            </div>}
        </div>
    )
}

export default Bell;