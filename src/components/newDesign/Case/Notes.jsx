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

const Active = ({ elem, handleEdit }) => {
    const [edit, setEdit] = useState(false);
    const [activeMessage, setActiveMessage] = useState(elem.text);
    const [activeColor, setActiveColor] = useState(elem.color);

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
                    <p>{activeMessage}</p>
                )}
                <div className="Notes-viewer-line-mess-edit">
                    {edit ? (
                        <div>
                            <Icon icon="save" addClass="save-icon" onClick={() => {
                                setEdit(false);
                                handleEdit(activeMessage, activeColor, elem);
                            }} />
                            <Icon icon="close" addClass="close-icon" onClick={() => setEdit(false)} />
                        </div>
                    ) : (
                        <span onClick={() => setEdit(true)}>
                            <Icon icon="edit" addClass="default-icon" />
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

const Notes = ({ notes, case_id, getCaseInfo }) => {
    const [open, setOpen] = useState(false);
    const [noteMessage, setNoteMessage] = useState("");
    const [noteColor, setNoteColor] = useState("");
    const [alert, setAlert] = useState({ success: false, error: false, message: "" });
    const [actNote, setActNote] = useState(notes);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        const item = localStorage.getItem("page_case_notes");
        setOpen(item === "true");
    }, []);

    useEffect(() => {
        setActNote([...notes]);
    }, [notes]);

    const openHandler = () => {
        const newState = !open;
        localStorage.setItem("page_case_notes", newState);
        setOpen(newState);
    };

    const handleAlertChange = (key, message) => {
        setAlert({ ...alert, [key]: !alert[key], message });
    };

    const addNote = () => {
        if (noteMessage.length < 1) return handleAlertChange("error", LANG.notes.error_data);
        apiResponse({ text: noteMessage, color: noteColor, case_id }, "case/create-note.php").then((res) => {
            if (res.status) {
                handleAlertChange("success", LANG.notes.success);
                openHandler()
                getCaseInfo();
                setModal(false);
            } else {
                handleAlertChange("error", LANG.notes.error);
            }
        });
    };

    const updateNote = (text, color, elem) => {
        if (text.length < 1) return handleAlertChange("error", LANG.notes.error_data);
        apiResponse({ ...elem, text, color, case_id }, "case/update-note.php").then((res) => {
            if (res.status) {
                handleAlertChange("success", LANG.notes.success);
                getCaseInfo();
            } else {
                handleAlertChange("error", LANG.notes.error);
            }
        });
    };

    const handleEdit = (value, color, elem) => {
        if (value.length < 1) {
            handleAlertChange("error", LANG.notes.error_data);
        } else {
            updateNote(value, color, elem);
        }
    };

    return (
        <div className="Notes">
            <div className="Notes-title">
                <div className="Notes-title-panel" onClick={openHandler}>
                    <div>Нотатки</div>
                    <Icon icon="arrow_down" addClass="fs35" />
                </div>
                <span onClick={() => setModal(true)}>
                    <Icon icon="add" />
                </span>
            </div>
            {open && (
                <div className="Notes-viewer">
                    {actNote.length > 0 ? (
                        actNote.map((elem, index) => (
                            <Active key={index} elem={elem} handleEdit={handleEdit} />
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
                        <Input type="color" value={noteColor} onChange={(e) => setNoteColor(e.target.value)} />
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
