import React, { useState } from "react";
import s from "./modal.module.css";
import Input from '../../elements/Inputs/Input'
import { Button, MenuItem, Select } from "@mui/material";
import SmallNotification from "../../elements/Notifications/SmallNotification";
import { LANG } from "../../../services/config";
import { useParams } from "react-router-dom";
import { apiResponse } from "../../Functions/get_apiObj";
import Modal from "../../Modals/Modal";

const AddMembers = ({ addUser, getUsers, modalHandler }) => {
    const params = useParams()
    const [role, setRole] = useState("manager")
    const [user, setUser] = useState({ userName: "", position: "" })
    const [userInSystem, setUserInSystem] = useState(true);
    const [searchRes, setSearchRes] = useState([]);
    const [alert, setAlert] = useState({
        error: false,
        success: false,
        message: ""
    });

    const alertHandler = (key, message = "") => {
        setAlert({ ...alert, [key]: !alert[key], message: message });
    };

    function search(val) {
        let fileLink = role == "manager" ? "user/search.php" : "case/search.php"
        apiResponse({ val: val }, fileLink)
            .then((data) => {
                console.log(data);

                if (role == "manager") {
                    setSearchRes(data)
                } else {
                    setSearchRes(data?.mas)
                }

            })
            .catch((error) => console.log(error))
    }
    function addUser() {
        if (user.userName == "" || user.phone == "") {
            return alertHandler("error", "Введіть користувача та його номер телефону (якщо користувач новий)")
        }
        let fileLink = role == "manager" ? "event/add-member-user.php" : "event/add-member-case.php"
        let getUsersKey = role == "manager" ? "eventMemberUser" : "eventMemberCase"
        let obj = {
            userName: user.userName,
            phone: user.phone,
            userID: user.id,
            eventID: params.id,
            position: user.position
        }
        apiResponse({ ...obj }, fileLink).then((data) => {
            console.log(data);
            modalHandler()
            getUsers(params.id, getUsersKey);
        })
            .catch((error) => console.log(error))
    }
    return (
        <Modal closeHandler={() => { modalHandler() }} header={"Додати учасника"} footer={
            <>
                <Button variant="contained" color="error" onClick={() => { modalHandler() }}>{LANG.GLOBAL.cancel}</Button>
                <Button variant="contained" onClick={addUser}>{LANG.GLOBAL.save}</Button>
            </>
        }>
            <div className="Modal--content">
                <div className={s.add__user__wrap}>
                    <Select value={role} onChange={(e) => { setRole(e.target.value) }}>
                        <MenuItem value={"manager"}>Організатор</MenuItem>
                        <MenuItem value={"member"}>Учасник</MenuItem>
                    </Select>
                    <Select value={userInSystem} onChange={(e) => { setUserInSystem(e.target.value) }}>
                        <MenuItem value={true}>Існуючий</MenuItem>
                        <MenuItem value={false}>Новий</MenuItem>
                    </Select>

                    {userInSystem ?
                        <div className={s.add__user__form}>

                            <div className={s.add__user__results}>
                            <Input value={user.userName} label="Пошук користувача..." type="text" onChange={(e) => {
                                search(e.target.value)
                                setUser({ ...user, userName: e.target.value })
                            }} />
                                <div className={s.add__user__result}>
                                    {searchRes.map((item, index) => {
                                        return (
                                            <div key={index} className={`${s.add__user__item}`} onClick={() => {
                                                setUser({ ...user, userName: role == "manager" ? item.userName : item.name, id: item.id, phone: item.phone })
                                                setSearchRes([])
                                            }}>
                                                <p className={s.add__user__item__p}>{role == "manager" ? item.userName : item.name}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <Input value={user.position} label="Позиція на івенті" type="text" onChange={(e) => {
                                setUser({ ...user, position: e.target.value })
                            }} />
                        </div>
                        :
                        <div className={s.add__user__form}>
                            <Input value={user.userName} label="ПІБ" type="text" onChange={(e) => {
                                setUser({ ...user, userName: e.target.value })
                            }} />
                            <Input label="Номер телефону" value={user.phone} type="number" onChange={(e) => {
                                setUser({ ...user, phone: e.target.value })
                            }} />
                            <Input value={user.position} label="Позиція на івенті" type="text" onChange={(e) => {
                                setUser({ ...user, position: e.target.value })
                            }} />
                        </div>
                    }

                    {alert.success && <SmallNotification isSuccess={true} text={alert.message} close={() => { alertHandler("success") }} />}
                    {alert.error && <SmallNotification isSuccess={false} text={alert.message} close={() => { alertHandler("error") }} />}
                </div>
            </div>
        </Modal>
    );
};

export default AddMembers;
