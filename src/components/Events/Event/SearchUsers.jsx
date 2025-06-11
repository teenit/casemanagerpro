import axios from "axios";
import React, { useState } from "react";
import { serverAddres } from "../../Functions/serverAddres";
import s from "./modal.module.css";
import Input from '../../elements/Inputs/Input'
import { Button } from "@mui/material";
import SmallNotification from "../../elements/Notifications/SmallNotification";
import { apiResponse } from "../../Functions/get_apiObj";
import { LANG } from "../../../services/config";
const SearchUsers = ({ eventID, getUsers }) => {
    const [user, setUser] = useState({ userName: "", position: "" })
    const [userInSystem, setUserInSystem] = useState(true);
    const [searchRes, setSearchRes] = useState([])
    const [alert, setAlert] = useState({
        error:false,
        success:false,
    })
    const alertHandler = (key)=>{
        setAlert({...alert, [key]:!alert[key]})
    }
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
        if (user.userName == "" || user.phone == "" || ( user.phone && user.phone.length !== 10 && user.phone.length !== 13)) {
            return alertHandler("error")
        }
        let obj = {
            userName: user.userName,
            phone: user.phone,
            userID: user.id,
            eventID: eventID,
            position: user.position
        }
      apiResponse({...obj}, "event/add-member-user.php").then((data) => {
        
                alertHandler("success")
                getUsers(eventID, "eventMemberUser");
            })
            .catch((error) => console.log(error))
    }
    return (
        <div className={s.add__user__wrap}>
            <h2>{LANG.ADD_MEMBERS.members}</h2>
            <p className={s.add__user__title}>{LANG.ADD_MEMBERS.add_organisator}</p>
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
                    <Input value={user.userName} label={LANG.GLOBAL.search} type="text" onChange={(e) => {
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
                    <Input value={user.userName} label={LANG.GLOBAL.pib} type="text" onChange={(e) => {
                        setUser({ ...user, userName: e.target.value })
                    }} />
                    <Input label={LANG.GLOBAL.phone} value={user.phone} type="number" onChange={(e) => {
                        setUser({ ...user, phone: e.target.value })
                    }} />
                </div>
            }
            <div className={s.add__user__form} >
                <Input value={user.position} className={s.margin__top__20px} label={LANG.ADD_MEMBERS.position} type="text" onChange={(e) => {
                    setUser({ ...user, position: e.target.value })
                }} />
            </div>
            <div className={s.button__wrap}>
                <Button variant="contained" onClick={addUser}>{LANG.ADD_MEMBERS.add}</Button>
            </div>
            {alert.success && <SmallNotification isSuccess={true} text={LANG.ADD_MEMBERS.success} close={()=>{alertHandler("success")}}/>}
            {alert.error && <SmallNotification isSuccess={false} text={LANG.ADD_MEMBERS.error_data} close={()=>{alertHandler("error")}}/>}
        </div>
    )
}

export default SearchUsers;