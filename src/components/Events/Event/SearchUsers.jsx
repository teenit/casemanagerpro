import axios from "axios";
import React, { useState } from "react";
import { serverAddres } from "../../Functions/serverAddres";
import s from "./modal.module.css";
import Input from '../../elements/Inputs/Input'
import { Button } from "@mui/material";
const SearchUsers = ({ eventID, getUsers }) => {
    const [user, setUser] = useState({ userName: "", position: "" })
    const [userInSystem, setUserInSystem] = useState(true);
    const [searchRes, setSearchRes] = useState([])
    function search(val) {
        let obj = {
            id: localStorage.getItem("id"),
            token: localStorage.getItem("token"),
            val: val
        };
        axios({
            url: serverAddres("user/search.php"),
            method: "POST",
            header: { 'Content-Type': 'application/json;charset=utf-8' },
            data: JSON.stringify(obj),
        })
            .then((data) => {
                setSearchRes(data.data)
            })
            .catch((error) => console.log(error))
    }
    function addUser() {
        if (user.userName == "" || user.phone == "") return window.alert("Заповніть всі поля");
        let obj = {
            id: localStorage.getItem("id"),
            token: localStorage.getItem("token"),
            userName: user.userName,
            phone: user.phone,
            userID: user.id,
            eventID: eventID,
            position: user.position
        }
        axios({
            url: serverAddres("event/add-member-user.php"),
            method: "POST",
            header: { 'Content-Type': 'application/json;charset=utf-8' },
            data: JSON.stringify(obj),
        })
            .then((data) => {
                getUsers(eventID, "eventMemberUser");
            })
            .catch((error) => console.log(error))
    }
    return (
        <div className={s.add__user__wrap}>
            <h2>Учасники</h2>
            <p className={s.add__user__title}>Додати учасника (організатора) івента</p>
            <p className={s.add__user__choice}><span className={userInSystem ? s.active__choice : null} onClick={() => {
                setUserInSystem(true)
                setUser({ userName: "", position: "" })
            }}>Існуючий</span> |
                <span className={!userInSystem ? s.active__choice : null} onClick={() => {
                    setUserInSystem(false)
                    setUser({ userName: "", position: "", id: 0 })
                }}>Новий</span> </p>
            {userInSystem ?
                <div className={s.add__user__search}>
                    <Input value={user.userName} label="Пошук користувача..." type="text" onChange={(e) => {
                        search(e.target.value)
                        setUser({ ...user, userName: e.target.value })
                    }} />
                    <div className={s.add__user__results}>
                        <div className={s.add__user__result}>
                            {searchRes.map((item, index) => {
                                return (
                                    <div key={index} className={`${s.add__user__item}`} onClick={() => {
                                        setUser({ ...user, userName: item.userName, id: item.id, phone: item.phone })
                                        setSearchRes([])
                                    }}>
                                        <p className={s.add__user__item__p}>{item.userName}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                :
                <div className={s.add__user__form}>
                    <Input value={user.userName} label="Введіть ПІБ" type="text" onChange={(e) => {
                        setUser({ ...user, userName: e.target.value })
                    }} />
                    <Input label="Введіть номер телефону" type="text" onChange={(e) => {
                        setUser({ ...user, phone: e.target.value })
                    }} />
                </div>
            }
            <div className={s.add__user__form} >
                <Input value={user.position} className={s.margin__top__20px} label="Введіть позицію на івенті" type="text" onChange={(e) => {
                    setUser({ ...user, position: e.target.value })
                }} />
            </div>
            <div className={s.button__wrap}>
                <Button variant="contained" onClick={addUser}>Додати користувача</Button>
            </div>
        </div>
    )
}

export default SearchUsers;