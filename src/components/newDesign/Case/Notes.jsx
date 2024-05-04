import React from "react";
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

const Active = ({ elem, handleEdit }) => {
    const [edit,setEdit] = useState(false)
    const [activeMessage,setActiveMessage] = useState(elem.mess)

    return (
        <div className="Notes-viewer-line">
            
            <div className="Notes-viewer-line-data">
                    <div className="Notes-viewer-line-data-title">
                    <NavLink to={`/user?${elem.userId}`} >{elem.userName}</NavLink>
                    </div>
                        <span>{elem.date}</span>
            </div>
            <div className="Notes-viewer-line-mess">
                {edit?
                <Textarea value={activeMessage} label="Текст запису" onChange={(e)=>{setActiveMessage(e.target.value)}}/>
                :
                <p>{activeMessage}</p>

                }
               
                    <div className="Notes-viewer-line-mess-edit">
                            {edit? <img src={saveImg} alt="Зберегти зміни" onClick={()=>{
                                setEdit(false)
                                handleEdit(activeMessage)
                            }}/>
                            :
                            <img src={editImg} alt="Редагувати нотатки" onClick={()=>{setEdit(true)}}/>
                            }
                            
                </div>
            </div>

        </div>
    )
}

const Notes = ({ notes, level }) => {
    const [noteMessage,setNoteMessage] = useState("")
    const [alert,setAlert] = useState({
        success:false,
        error:false
    })
    function addNote() {
        let mess = changeApsBr(noteMessage)
        if (mess == ""){
            handleAlertChange("error")
        }
        let obj = {
            caseId: window.location.search.slice(1),
            id: localStorage.getItem("id"),
            token: localStorage.getItem("token"),
            mess: mess,
            userName: localStorage.getItem("userName")
        }
        console.log(obj)
        axios({
            url: serverAddres("case/add-note.php"),
            method: "POST",
            header: { 'Content-Type': 'application/json;charset=utf-8' },
            data: JSON.stringify(obj),
        })
        .then((response) => {
            setActNote([...actNote, response.data[0]])
            setNoteMessage("");
        })
        
            .catch((error) => console.log(error))
    }
 
    const handleAlertChange = (key)=>{
        setAlert({...alert,[key]:!alert[key]})
    }
    const [actNote, setActNote] = useState(notes);
    const [modal, setModal] = useState(false)

    const handleEdit = (value)=>{
        if(value.length < 1){
            setAlert({...alert, error: true})
        } else {
            const updatedActNote = actNote.map((item, index) => {
                if (value !== item.mess) {
                    return {
                        ...item,
                        mess: value
                    };
                }
                return item;
            });
            setActNote(updatedActNote);
        }
    }
    
    const active = actNote.map((elem, index) => {
        return <Active key={index} elem={elem} handleEdit={(value)=>{handleEdit(value)}}  />
    })
    return (
        <div className="Notes">
            <div className="Notes-title">
                <h2>Нотатки</h2>
                <img src={plusImg} alt="Додати запис" onClick={() => { setModal(true) }} />
            </div>
            <div className="Notes-viewer">
                {active}
            </div>
            {modal && <Modal header="Додати запис" closeHandler={() => { setModal(false) }} footer={
            <div className="Modal--footer">
                <Button onClick={() => { setModal(false) }} color="error" variant="contained">{LANG.cancel}</Button>
                <Button onClick={()=>{
                    addNote()
                    setModal(false)
                }}  variant="contained">{LANG.save}</Button>
            </div>}>
                <div className="Notes-modal">
                    <Textarea value={noteMessage} label="Текст запису" onChange={(e)=>{setNoteMessage(e.target.value)}}/>
                </div>
                </Modal>}
            {alert.success && <SmallNotification isSuccess={false} text="Будь ласка, введіть ваше повідомлення" close={()=>{handleAlertChange("error")}}/>}
            {alert.success && <SmallNotification isSuccess={true} text="Запис додано" close={()=>{handleAlertChange("success")}}/>}
        </div>
    )
}
export default Notes;