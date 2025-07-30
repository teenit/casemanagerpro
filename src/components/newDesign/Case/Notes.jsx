import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import Icon from "../../elements/Icons/Icon";
import Input from "../../elements/Inputs/Input";
import Textarea from "../../elements/Inputs/Textarea";
import SmallNotification from "../../elements/Notifications/SmallNotification";
import Modal from "../../Modals/Modal";
import { LANG } from "../../../services/config";
import { apiResponse } from "../../Functions/get_apiObj";
import TextDescription from "../../elements/TextFormatters/TextDescription";
import AccessCheck from "../../Functions/AccessCheck";
import NoteElem from "./NoteElem";



const Notes = ({ notes, case_id, getCaseInfo, cg }) => {
    const [open, setOpen] = useState(false);
    const [noteMessage, setNoteMessage] = useState("");
    const [noteColor, setNoteColor] = useState("");
    const [alert, setAlert] = useState({ success: false, error: false, message: "" });
    const [actNote, setActNote] = useState(notes);
    const [modal, setModal] = useState(false);
    const access = {
        case_notes_edit: AccessCheck("view_edit", "a_page_case_notes", "edit") && cg,
        super: AccessCheck('super')
    }
    useEffect(() => {
        const item = localStorage.getItem("page_case_notes");
        setOpen(item === "true");
    }, []);

    useEffect(() => {
        setActNote([...notes]);
    }, [notes]);

    const openHandler = (active) => {
        const newState = !open;
        localStorage.setItem("page_case_notes", newState);
        setOpen(newState);
    };

    const handleAlertChange = (key, message) => {
        setAlert({ ...alert, [key]: !alert[key], message });
    };

    const addNote = () => {
        if(noteMessage.trim().length<1){
            return handleAlertChange("error", LANG.notes.error_data)
        }
        apiResponse({ text: noteMessage, color: noteColor||"#000", case_id }, "case/create-note.php").then((res) => {
            if (res.status) {
                handleAlertChange("success", LANG.notes.success);
                getCaseInfo();
                setModal(false);
            if(!open) openHandler()
            } else {
                handleAlertChange("error", LANG.notes.error);
            }
        });
    };



    return (
        <div className="Notes">
            <div className="Notes-title">
                <div className="Notes-title-panel" onClick={openHandler}>
                    <div>Нотатки</div>
                    <Icon icon="arrow_down" addClass="fs35 arrow" />
                </div>
                {(access.case_notes_edit || access.super) && <span onClick={() => setModal(true)}>
                    <Icon icon="add" />
                </span>}
            </div>
            {open && (
                <div className="Notes-viewer">
                    {actNote.length > 0 ? (
                        actNote.map((elem, index) => (
                            <NoteElem case_id={case_id} getCaseInfo={getCaseInfo} editor={access.case_notes_edit} key={index} elem={elem}  />
                        ))
                    ) : (
                        <p>{LANG.no_records}</p>
                    )}
                </div>
            )}

            {modal && (
                <Modal
                    header={LANG.notes.add}
                    closeHandler={() => setModal(false)}
                    footer={
                        <div className="Modal--footer">
                            <Button onClick={() => setModal(false)} color="error" variant="contained">{LANG.cancel}</Button>
                            <Button onClick={addNote}
                                variant="contained">{LANG.save}</Button>
                        </div>}>
                    <div className="Notes-modal">
                        <Input addClass="w100" type="color" value={noteColor} onChange={(e) => setNoteColor(e.target.value)} />
                        <Textarea value={noteMessage} label={LANG.notes.text} onChange={(e) => setNoteMessage(e.target.value)} />
                    </div>
                </Modal>
            )}
            {alert.error && (
                <SmallNotification isSuccess={false} text={alert.message} close={() => handleAlertChange("error")} />
            )}
            {alert.success && (
                <SmallNotification isSuccess={true} text={alert.message} close={() => handleAlertChange("success")} />
            )}
        </div>
    );
};

export default Notes;
