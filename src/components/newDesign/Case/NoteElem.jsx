import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import Input from '../../elements/Inputs/Input';
import Textarea from '../../elements/Inputs/Textarea';
import Icon from '../../elements/Icons/Icon';
import TextDescription from '../../elements/TextFormatters/TextDescription';
import { LANG } from '../../../services/config';
import { apiResponse } from '../../Functions/get_apiObj';
import SmallNotification from '../../elements/Notifications/SmallNotification';
import ModalConfirm from "../../Modals/ModalConfirm"

const NoteElem = ({ elem, editor, getCaseInfo, case_id }) => {
    const [edit, setEdit] = useState(false);
    const [activeMessage, setActiveMessage] = useState(elem.text);
    const [activeColor, setActiveColor] = useState(elem.color);
    const [confirmModal, setConfirmModal] = useState(false)
    const [alert, setAlert] = useState({ active: false, isSuccess: false, message: "" });
    console.log(activeMessage)
    const alertHandler = (isSuccess=false, message="") => {
        setAlert({ active: !alert.active, isSuccess: isSuccess, message: message })
    }
    
        const updateNote = (text, color, elem) => {
        apiResponse({ ...elem, text, color, case_id }, "case/update-note.php").then((res) => {
            if (res.status) {
                alertHandler(true, LANG.notes.success);
                getCaseInfo();
            } else {
                alertHandler(false, LANG.notes.error);
            }
        });
    };

    const handleEdit = (value, color, elem) => {
        if (value.length < 1) {
            alertHandler(false, LANG.notes.error_data);
        } else {
            updateNote(value, color, elem);
        }
    };
    console.log(elem)
    const deleteNote = ()=>{
        apiResponse({note_id:elem.note_id}, "case/delete-note.php").then((res)=>{
            getCaseInfo()
        }).catch((err)=>{
            alertHandler(false, LANG.GLOBAL.alertMessages.delete_error)
        })
    }
    return (
        <div className="Notes-viewer-line">
            <div className="Notes-viewer-line-data">
                <div className="Notes-viewer-line-data-title">
                    <NavLink to={`/user?${elem.user_id}`}>{elem.userName}</NavLink>
                </div>
                <span>{elem.date_created}</span>
                <div
                    className="Notes-viewer-line-data-color"
                    style={{ backgroundColor: activeColor }}
                />
            </div>
            <div className="Notes-viewer-line-mess">
                {edit ? (
                    <div className="Notes-viewer-line-mess-input">
                        <Input
                        addClass='w100'
                            type="color"
                            value={activeColor}
                            onChange={(e) => setActiveColor(e.target.value)}
                        />
                        <Textarea
                            value={activeMessage}
                            label={LANG.notes.text}
                            onChange={(e) => setActiveMessage(e.target.value)}
                        />
                    </div>
                ) : (
                    <TextDescription text={activeMessage} />
                )}
                <div className="controls" style={{display: "flex"}}>
                {editor && <div className="Notes-viewer-line-mess-edit">
                    {edit ? (
                        <div>
                            <Icon icon="save" addClass="save-icon" onClick={() => {
                                if (activeMessage.length >= 1) {
                                    setEdit(false);
                                }
                                handleEdit(activeMessage, activeColor, elem);
                            }} />
                            <Icon icon="close" addClass="close-icon" onClick={() => setEdit(false)} />
                        </div>
                    ) : (
                        <span onClick={() => setEdit(true)}>
                            <Icon icon="edit" addClass="default-icon" />
                        </span>
                    )}
                </div>}
                <Icon icon={"delete"} addClass='delete-icon' onClick={()=>{setConfirmModal(!confirmModal)}}/>
                </div>
            </div>
            {confirmModal && <ModalConfirm closeHandler={()=>{setConfirmModal(!confirmModal)}}
                text={LANG.GLOBAL.delete_confirm} successHandler={deleteNote}/>}
            {alert.active && <SmallNotification isSuccess={alert.isSuccess} text={alert.message} close={alertHandler}/>}
        </div>
    );
};

export default NoteElem