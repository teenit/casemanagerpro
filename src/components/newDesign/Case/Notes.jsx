import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import imgSend from "../../../img/icons/send.png";
import editImg from '../../../img/icons/edit.svg'
import { serverAddres } from "../../Functions/serverAddres";
import plusImg from "../../../img/icons/plus.svg"
import Modal from "../../Modals/Modal";
import { Button } from "@mui/material";
import { LANG } from "../../../services/config";
import Textarea from "../../elements/Inputs/Textarea";
import { changeApsBr } from "../../Functions/translateString";
import SmallNotification from "../../elements/Notifications/SmallNotification";
import saveImg from "./../../../img/icons/save-50.png";
import Input from "../../elements/Inputs/Input";
import { apiResponse } from "../../Functions/get_apiObj";
import Icon from "../../elements/Icons/Icon";

const Active = ({ elem, handleEdit }) => {
    const [edit, setEdit] = useState(false)
    const [activeMessage, setActiveMessage] = useState(elem.text)
    const [activeColor, setActiveColor] = useState(elem.color)
    return (
        <div className="Notes-viewer-line">

            <div className="Notes-viewer-line-data">
                <div className="Notes-viewer-line-data-title">
                    <NavLink to={`/user?${elem.user_id}`} >{elem.userName}</NavLink>
                </div>
                <span>{elem.date_created}</span>
                <div className="Notes-viewer-line-data-color" style={{ backgroundColor: `${activeColor}` }}></div>
            </div>
            <div className="Notes-viewer-line-mess">
                {edit ?
                    <div className="Notes-viewer-line-mess-input">
                        <Input type="color" value={activeColor} onChange={(e) => { setActiveColor(e.target.value) }} />
                        <Textarea value={activeMessage} label="Текст запису" onChange={(e) => { setActiveMessage(e.target.value) }} />
                    </div>
                    :
                    <p>{activeMessage}</p>

                }
                <div className="Notes-viewer-line-mess-edit">
                    {edit ? <div>
                        <span onClick={() => {
                        setEdit(false)
                        handleEdit(activeMessage, activeColor, elem)
                    }}>
                        <Icon icon={"save"} addClass={"save-icon"} />
                    </span>
                        <span onClick={() => {
                        setEdit(false)
                    }}>
                        <Icon icon={"close"} addClass={"close-icon"} />
                    </span>
                    </div>
                        :
                        <span onClick={() => { setEdit(true) }}>
                            <Icon icon={"edit"} addClass={"default-icon"} />
                        </span>
                    }
                </div>
            </div>

        </div>
    )
}

const Notes = ({ notes, case_id, getCaseInfo }) => {
    const [open, setOpen] = useState(false)
    const openHandler = () => {
        localStorage.setItem("page_case_notes", !open)
        setOpen(!open)
    }
    useEffect(() => {
        let item = localStorage.getItem("page_case_notes")
        if (item) {
            if (item == "true") {
                setOpen(true)
            } else {
                setOpen(false)
            }
        } else {
            setOpen(false)
        }
    }, [])
    const [noteMessage, setNoteMessage] = useState("")
    const [noteColor, setNoteColor] = useState("")
    const [alert, setAlert] = useState({
        success: false,
        error: false
    })

    function addNote() {
        apiResponse({ text: noteMessage, color: noteColor, case_id: case_id }, "case/create-note.php").then((res) => {
            if (res.status) { handleAlertChange("success"); getCaseInfo(); }
            else { handleAlertChange("error"); }

        })
    }

    function updateNote(text, color, elem) {
        apiResponse({ ...elem, text: text, color: color, case_id: case_id }, "case/update-note.php").then((res) => {
            if (res.status) { handleAlertChange("success"); getCaseInfo(); }
            else { handleAlertChange("error"); }
        })
    }

    const handleAlertChange = (key) => {
        setAlert({ ...alert, [key]: !alert[key] })
    }
    const [actNote, setActNote] = useState(notes);
    const [modal, setModal] = useState(false)

    const handleEdit = (value, color, elem) => {
        if (value.length < 1) {
            setAlert({ ...alert, error: true })
        } else {
            updateNote(value, color, elem)
        }
    }
    useEffect(() => {
        setActNote([...notes])
    }, [notes])

    return (
        <div className="Notes">
            <div className="Notes-title">
                <div className="Notes-title-panel" onClick={openHandler}>
                <div>Нотатки</div>
                <Icon icon={"arrow_down"} addClass={"fs35"}/>
                </div>
                <span  onClick={() => { setModal(true) }}>
                    <Icon icon={"add"}/>
                </span>
            </div>
          { actNote.length > 0 && open && <div className="Notes-viewer">
                {
                    actNote.map((elem, index) => {
                        return <Active key={index} elem={elem} handleEdit={(value, color) => { handleEdit(value, color, elem) }} />
                    })
                }
            </div>}

            {modal && <Modal header="Додати запис" closeHandler={() => { setModal(false) }} footer={
                <div className="Modal--footer">
                    <Button onClick={() => { setModal(false) }} color="error" variant="contained">{LANG.cancel}</Button>
                    <Button onClick={() => {
                        addNote()
                        setModal(false)
                    }} variant="contained">{LANG.save}</Button>
                </div>}>
                <div className="Notes-modal">
                    <Input type="color" value={noteColor} onChange={(e) => { setNoteColor(e.target.value) }} />
                    <Textarea value={noteMessage} label="Текст запису" onChange={(e) => { setNoteMessage(e.target.value) }} />
                </div>
            </Modal>}
            {alert.error && <SmallNotification isSuccess={false} text="Помилка при додаванні запису" close={() => { handleAlertChange("error") }} />}
            {alert.success && <SmallNotification isSuccess={true} text="Запис додано" close={() => { handleAlertChange("success") }} />}
        </div>
    )
}
export default Notes;