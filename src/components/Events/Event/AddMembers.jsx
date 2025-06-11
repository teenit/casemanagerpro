import React, { useState } from "react";
import s from "./modal.module.css";
import Input from '../../elements/Inputs/Input';
import { Button, MenuItem, Select } from "@mui/material";
import SmallNotification from "../../elements/Notifications/SmallNotification";
import { LANG } from "../../../services/config";
import { useParams } from "react-router-dom";
import { apiResponse } from "../../Functions/get_apiObj";
import Modal from "../../Modals/Modal";

const AddMembers = ({ modalHandler, getEventData }) => {
    const params = useParams();
    const [role, setRole] = useState("manager");
    const [user, setUser] = useState({ userName: "", phone: "", position: "" });
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
        let fileLink = role === "manager" ? "user/search.php" : "case/search.php";
        apiResponse({ val: val }, fileLink)
            .then((data) => {
                if (role === "manager") {
                    setSearchRes(data);
                } else {
                    setSearchRes(data?.mas);
                }
            })
            .catch((error) => console.log(error));
    }

    function addUser() {
        if (user.userName === "" || (!userInSystem && user.phone === "")) {
            return alertHandler("error", LANG.ADD_MEMBERS.invalid_data);
        }
    
        let usersKey = role === "manager" ? "event_user_manager" : "event_case_member";
        let newUserKey = role === "manager" ? "event_user_manager_new" : "event_case_manager_new"
        let obj = {
            name: user.userName,
            phone: user.phone,
            user_id: user.id,
            event_id: params.id,
            role: user.position
        };
    
        if (userInSystem) {
            apiResponse({
                meta_key: usersKey,
                meta_value: user.id,
                event_id: params.id
            }, "events/add-event-meta.php").then((res) => {
                
                modalHandler();
                getEventData();
            });
        } else {
            apiResponse({
                meta_key: newUserKey,
                meta_value: JSON.stringify({ ...obj }),
                event_id: params.id
            }, "events/add-event-meta.php").then((res) => {
               
                modalHandler();
                getEventData();
            });
        }
    }
    

    return (
        <Modal closeHandler={() => { modalHandler(); }} header={LANG.ADD_MEMBERS.add} footer={
            <>
                <Button variant="contained" color="error" onClick={() => { modalHandler(); }}>{LANG.GLOBAL.cancel}</Button>
                <Button variant="contained" onClick={addUser}>{LANG.GLOBAL.save}</Button>
            </>
        }>
            <div className="Modal--content">
                <div className={s.add__user__wrap}>
                    <Select value={role} onChange={(e) => { setRole(e.target.value); }}>
                        <MenuItem value={"manager"}>{LANG.ADD_MEMBERS.organisator}</MenuItem>
                        <MenuItem value={"member"}>{LANG.ADD_MEMBERS.member}</MenuItem>
                    </Select>
                    <Select value={userInSystem} onChange={(e) => { setUserInSystem(e.target.value); }}>
                        <MenuItem value={true}>{LANG.ADD_MEMBERS.existing}</MenuItem>
                        <MenuItem value={false}>{LANG.ADD_MEMBERS.new}</MenuItem>
                    </Select>

                    {userInSystem ?
                        <div className={s.add__user__form}>
                            <div className={s.add__user__results}>
                                <Input addClass="w100" value={user.userName} label={LANG.GLOBAL.search} type="text" onChange={(e) => {
                                    search(e.target.value);
                                    setUser({ ...user, userName: e.target.value });
                                }} />
                                <div className={s.add__user__result}>
                                    {searchRes.map((item, index) => {
                                        return (
                                            <div key={index} className={`${s.add__user__item}`} onClick={() => {
                                                setUser({ ...user, userName: role === "manager" ? item.userName : item.name, id: item.id, phone: item.phone });
                                                setSearchRes([]);
                                            }}>
                                                <p className={s.add__user__item__p}>{role === "manager" ? item.userName : item.name}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                        </div>
                        :
                        <div className={s.add__user__form}>
                            <Input value={user.userName} label={LANG.GLOBAL.pib} type="text" onChange={(e) => {
                                setUser({ ...user, userName: e.target.value });
                            }} />
                            <Input label={LANG.GLOBAL.phone} value={user.phone} type="number" onChange={(e) => {
                                setUser({ ...user, phone: e.target.value });
                            }} />
                            <Input value={user.position} label={LANG.ADD_MEMBERS.position} type="text" onChange={(e) => {
                                setUser({ ...user, position: e.target.value });
                            }} />
                        </div>
                    }

                    {alert.success && <SmallNotification isSuccess={true} text={alert.message} close={() => { alertHandler("success"); }} />}
                    {alert.error && <SmallNotification isSuccess={false} text={alert.message} close={() => { alertHandler("error"); }} />}
                </div>
            </div>
        </Modal>
    );
};

export default AddMembers;
