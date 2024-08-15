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
import docIcon from "../../../img/resources/docx.svg"
import userIcon from "../../../img/icons/notification-user.svg"
import editIcon from "../../../img/icons/notification-edit.svg"
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
    const getIcon = (key) => {
        switch (key) {
            case "createdCase":
                return userIcon;
            case "createdEvent":
                return userIcon;
            default:
                return editIcon;
        }
    }
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
                    {bells.map((item, index) => {
                        return (
                            <div className={s.item} key={item.id * index} >
                                <div className={s.item__icon}>
                                    <img src={getIcon(item.value.type)} />
                                </div>
                                <div className={s.link__item}>{item.value.message}</div>
                                <div className={s.item__panel}>
                                    {/* <div className={s.date__bell}>{item.date}</div> */}
                                    <Icon icon={"save"} addClass={"save-icon"} onClick={() => {
                                        doneBells(item.id);
                                        getBells()
                                        getAllBells()
                                    }} />
                                </div>
                            </div>
                        )
                    })}
                    {read.map((item, index) => {
                        return (
                            <div className={`${s.item__read} ${s.item}`} key={index}>
                                <div className={s.item__icon}>
                                    <img src={getIcon(item.value.type)} />
                                </div>
                                <div className={s.link__item}>{item.value.message}</div>
                                <div className={s.item__panel}>
                                    {/* <div className={s.date__bell}>{item.date}</div> */}
                                  
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>}
        </div>
    )
}

export default Bell;