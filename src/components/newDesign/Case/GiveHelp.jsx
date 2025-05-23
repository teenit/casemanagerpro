import React from "react";
import axios from "axios";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import sendImg from "../../../img/icons/send.png";
import editImg from '../../../img/icons/edit.svg'
import { serverAddres } from "../../Functions/serverAddres";
import Input from "../../elements/Inputs/Input";
import { changeAps } from "../../Functions/translateString";
import SmallNotification from "../../elements/Notifications/SmallNotification";
import Textarea from "../../elements/Inputs/Textarea"
import plus from "../../../img/icons/plus.svg"
import Modal from "../../Modals/Modal";
import { Button } from "@mui/material";
import { LANG } from "../../../services/config";
import saveImg from "./../../../img/icons/save-50.png";


const Active = ({ elem, handleEdit }) => {
    const [edit, setEdit] = useState(false)
    const [activeData, setActiveData] = useState({
        dateHelp: elem.dateHelp,
        whoHelp: elem.whoHelp,
        message: elem.mess
    })
    const handleActiveDataChange = (key, value) => {
        setActiveData({ ...activeData, [key]: value })
    }
    return (
        <div className="GiveHelp-inner-viewer-line">
            {!edit && <div className="GiveHelp-inner-viewer-line-data">
                <div>
                    <NavLink to={`/user?${elem.userId}`}>{elem.userName}</NavLink>
                </div>
                <span>{elem.date}</span>
            </div>}

            <div className="GiveHelp-inner-viewer-line-message">
                {edit ?
                    <div className="GiveHelp-inner-viewer-line-message-text">
                        <div className="GiveHelp-inner-viewer-line-message-text-split">
                            <Input type="date" value={activeData.dateHelp} onChange={(e) => { handleActiveDataChange("dateHelp", e.target.value) }} />
                            <Input label="Надав допомогу" value={activeData.whoHelp} onChange={(e) => { handleActiveDataChange("whoHelp", e.target.value) }} />
                        </div>
                        <Textarea label="Опис" value={activeData.message} onChange={(e) => { handleActiveDataChange("message", e.target.value) }} />
                    </div> : <div className="GiveHelp-inner-viewer-line-message-text">
                        <p><b>Дата надання допомоги:</b> {elem.dateHelp}</p>
                        <p><b>Надав допомогу:</b> {elem.whoHelp}</p>
                        <p><b>Опис:</b> {elem.mess}</p>
                    </div>
                }




                <div className="GiveHelp-inner-viewer-line-message-panel">
                    {edit ? <div className="GiveHelp-inner-viewer-line-message-panel-ico-wrap" onClick={() => {
                        setEdit(false)
                        handleEdit(activeData)
                    }}>
                        <img src={saveImg} alt="Зберегти зміни" />
                    </div> :
                        <div className="GiveHelp-inner-viewer-line-message-panel-ico-wrap" onClick={() => { setEdit(true) }}>
                            <img src={editImg} alt="Редагувати нотатки" />
                        </div>}

                    {/* {edit && <div className="GiveHelp-inner-viewer-message-panel-edit">
                        <div className="GiveHelp-inner-viewer-line-message-panel-edit-option" onClick={() => {
                            setEdit(false)
                            handleEdit(activeData)
                        }}></div>
                        <div className="GiveHelp-inner-viewer-line-message-panel-edit-option GiveHelp-notes-delete" onClick={() => { setEdit(false) }}></div>
                    </div>} */}

                </div>
            </div>
        </div>
    )
}

const GiveHelp = ({ level }) => {
    const [alert, setAlert] = useState({
        success: false,
        error: false
    })
    const [modal, setModal] = useState(false)
    const [helpData, setHelpData] = useState({
        dateHelp: "",
        whoHelp: "",
        message: ""
    })
    const handleEdit = (obj) => {
        if(obj.whoHelp.length<1){
            setAlert({...alert, error: true})
        }
        const updatedActHelp = actHelp.map((item, index) => {
            if (obj.dateHelp !== item.dateHelp) {
                return {
                    ...item,
                    dateHelp: obj.dateHelp
                };
            }
            if (obj.whoHelp !== item.whoHelp) {

                return {
                    ...item,
                    whoHelp: obj.whoHelp
                };

            }
            if (obj.message !== item.mess) {
                return {
                    ...item,
                    mess: obj.message
                };
            }
            return item;
        });
        setActHelp(updatedActHelp);
    };
    function addHelp() {
        if ((helpData.dateHelp.length && helpData.whoHelp.length) >= 1) {
            setModal(false)
            let obj = {
                caseId: window.location.search.slice(1),
                id: localStorage.getItem("id"),
                token: localStorage.getItem("token"),
                dateHelp: helpData.dateHelp,
                whoHelp: changeAps(helpData.whoHelp),
                mess: changeAps(helpData.message),
                userName: localStorage.getItem("userName")
            }
            axios({
                url: serverAddres("case/add-help.php"),
                method: "POST",
                header: { 'Content-Type': 'application/json;charset=utf-8' },
                data: JSON.stringify(obj),
            })
                .then((data) => {
                    setActHelp(data.data)
                    setHelpData({ ...helpData, dateHelp: "", whoHelp: "", message: "" })
                    setAlert({ ...alert, success: true })
                })
                .catch((error) => console.log(error))

        } else {
            setAlert({ ...alert, error: true })
        }

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
                setActHelp(data.data)
            })
            .catch((error) => console.log(error))
    }, [])





    const active = actHelp.map((elem, index) => {
        return <Active key={index} elem={elem} handleEdit={(newValue) => { handleEdit(newValue) }} />
    })

    const handleDataChange = (key, value) => {
        setHelpData({ ...helpData, [key]: value })
    }

    return (
        <div className="GiveHelp">
            <div className="GiveHelp-inner">
                <div className="GiveHelp-inner-title">
                    <h2>{LANG.giveHelp.title}</h2>
                    <img onClick={() => setModal(true)} src={plus} alt="Додати план" />
                </div>

                <div className="GiveHelp-inner-viewer">
                    {active}
                </div>
                {/* {level &&} */}

            </div>
            {modal && <Modal header={LANG.giveHelp.addHelp} closeHandler={() => { setModal(false) }} footer={
                <div className="Modal--footer">
                    <Button onClick={() => { setModal(false) }} color="error" variant="contained">{LANG.cancel}</Button>
                    <Button onClick={addHelp} variant="contained">{LANG.save}</Button>
                </div>
            }>
                <div className="GiveHelp-modal">
                    <div className="GiveHelp-modal-inputs">
                        <Input type="date" value={helpData.dateHelp} onChange={(e) => { handleDataChange("dateHelp", e.target.value) }} />
                        <Input label="Хто надав допомогу" value={helpData.whoHelp} onChange={(e) => { handleDataChange("whoHelp", e.target.value) }} />
                    </div>
                        <Textarea name="" id="mess__help" cols="30" rows="3" label="Деталі наданої допомоги" value={helpData.message} onChange={(e) => { handleDataChange("message", e.target.value) }} />
                </div>
            </Modal>}
            {alert.success && <SmallNotification isSuccess={true} text="Дані оновлено" close={() => { setAlert(false) }} />}
            {alert.error && <SmallNotification isSuccess={false} text="Помилка: введіть дату надання та особу, що надала допомогу" close={() => { setAlert(false) }} />}
        </div>
    )
}
export default GiveHelp;