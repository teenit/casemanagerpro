import React from "react";
import axios from "axios";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import imgSend from "../../../img/icons/send.png";
import editImg from '../../../img/icons/edit.svg'
import { serverAddres } from "../../Functions/serverAddres";
import Input from "../../elements/Inputs/Input";
import { changeAps } from "../../Functions/translateString";
import SmallNotification from "../../elements/Notifications/SmallNotification";


const Active = ({ elem, handleEdit }) => {
    const [edit, setEdit] = useState(false)
    const [editMessage, setEditMessage] = useState(elem.mess)
    console.log(elem);
    return (
        <div className="GiveHelp-inner-viewer-line">
            <div className="GiveHelp-inner-viewer-line-data">
                <div>
                    <span>test</span>
                    <NavLink to={`/user?${elem.userId}`}>{elem.userName}</NavLink>
                </div>
                <span>{elem.date}</span>
            </div>
            <div className="GiveHelp-inner-viewer-line-message">
                {edit ? <Input value={editMessage} onChange={(e) => { setEditMessage(e.target.value) }} /> : <p>{elem.mess}</p>}



                <div className="GiveHelp-inner-viewer-line-message-panel">
                    <div className="GiveHelp-inner-viewer-line-message-panel-edit">
                        <div className="GiveHelp-inner-viewer-line-message-panel-edit-ico-wrap" onClick={() => { setEdit(true) }}>
                            <img src={editImg} alt="Редагувати нотатки" />
                        </div>
                    </div>
                    {edit && <div className="GiveHelp-inner-viewer-message-panel-edit">
                        <div className="GiveHelp-inner-viewer-line-message-panel-edit-option" onClick={() => {
                            setEdit(false)
                            handleEdit(editMessage)
                        }}></div>
                        <div className="GiveHelp-inner-viewer-line-message-panel-edit-option GiveHelp-notes-delete" onClick={() => { setEdit(false) }}></div>
                    </div>}

                </div>
            </div>
        </div>
    )
}

const GiveHelp = ({ level }) => {
    const [alert, setAlert] = useState(false)
    const [message, setMessage] = useState("")
    function addHelp() {

        let obj = {
            caseId: window.location.search.slice(1),
            id: localStorage.getItem("id"),
            token: localStorage.getItem("token"),
            mess: changeAps(message),
            userName: localStorage.getItem("userName")
        }
        console.log(obj)
        axios({
            url: serverAddres("case/add-help.php"),
            method: "POST",
            header: { 'Content-Type': 'application/json;charset=utf-8' },
            data: JSON.stringify(obj),
        })
            .then((data) => {
                console.log(data)
                setActHelp(data.data)
                handleMessageChange("")
                setAlert(true)
            })
            .catch((error) => console.log(error))

    }
    const [actHelp, setActHelp] = useState([]);
    useEffect(() => {
        let obj = {
            caseId: window.location.search.slice(1),
            id: localStorage.getItem("id"),
            token: localStorage.getItem("token")
        }
        axios({
            url: serverAddres("case/get-help.php"),
            method: "POST",
            header: { 'Content-Type': 'application/json;charset=utf-8' },
            data: JSON.stringify(obj),
        })
            .then((data) => {
                console.log(data)
                setActHelp(data.data)
            })
            .catch((error) => console.log(error))
    }, [])


    const handleEdit = (newValue) => {
        const updatedActHelp = actHelp.map((item, index) => {
            if (newValue !== item.mess) {
                return {
                    ...item,
                    mess: newValue
                };
            }
            return item;
        });
        setActHelp(updatedActHelp);
    };


    const active = actHelp.map((elem, index) => {
        return <Active key={index} elem={elem} handleEdit={(newValue) => { handleEdit(newValue) }} />
    })

    const handleMessageChange = (value) => {
        setMessage(value)
    }
    return (
        <div className="GiveHelp">
            <div className="GiveHelp-inner">
                <h2>Надано допомогу</h2>
                <div className="GiveHelp-inner-viewer">
                    {active}
                </div>
                {/* {level &&} */}
                    <div className="GiveHelp-inner-message">
                        <div className="GiveHelp-inner-message-field">
                            <textarea name="" id="mess__help" cols="30" rows="3" placeholder="Деталі наданої допомоги" value={message} onChange={(e) => { handleMessageChange(e.target.value) }}></textarea>
                            <img onClick={addHelp} src={imgSend} alt="" />
                        </div>
                    </div>

            </div>
            {alert && <SmallNotification isSuccess={true} text="Дані оновлено" close={() => { setAlert(false) }} />}
        </div>
    )
}
export default GiveHelp;