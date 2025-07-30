import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Input from '../../elements/Inputs/Input';
import Textarea from '../../elements/Inputs/Textarea';
import Icon from '../../elements/Icons/Icon';
import TextDescription from '../../elements/TextFormatters/TextDescription';
import { LANG } from '../../../services/config';
import { apiResponse } from '../../Functions/get_apiObj';
import SmallNotification from '../../elements/Notifications/SmallNotification';
import ModalConfirm from '../../Modals/ModalConfirm';
import Modal from '../../Modals/Modal';
import { Button } from '@mui/material';
import ActionMenu from '../../Portals/ActionMenu';
import AccessCheck from '../../Functions/AccessCheck';

const NoteElem = ({ elem, editor, getCaseInfo, case_id }) => {
    const [editModal, setEditModal] = useState(false);
    const [noteMessage, setNoteMessage] = useState(elem.text);
    const [noteColor, setNoteColor] = useState(elem.color);
    const [confirmModal, setConfirmModal] = useState(false);
    const [alert, setAlert] = useState({ active: false, isSuccess: false, message: "" });
    const menuItems = [
        {
            title: LANG.GLOBAL.edit,
            isHidden: false,
            icon: "edit",
            click: () => {
                setEditModal(!editModal)
            }
        },
        {
            itemType: 'divider'
        },
        {
            title: LANG.GLOBAL.delete,
            isHidden: false,
            icon: "delete",
            color: 'error',
            click: () => {
                setConfirmModal(!confirmModal)
            }
        },
    ]
    const alertHandler = (isSuccess = false, message = "") => {
        setAlert({ active: true, isSuccess, message });

        setTimeout(() => {
            setAlert({ active: false, isSuccess: false, message: "" });
        }, 3000);
    };

    const updateNote = () => {
        if (noteMessage.trim().length < 1) {
            alertHandler(false, LANG.notes.error_data);
            return;
        }

        apiResponse({ ...elem, text: noteMessage, color: noteColor, case_id }, "case/update-note.php").then((res) => {
            if (res.status) {
                getCaseInfo();
                setEditModal(false);
            } else {
                alertHandler(false, LANG.notes.error);
            }
        });
    };

    const deleteNote = () => {
        apiResponse({ note_id: elem.note_id }, "case/delete-note.php").then(() => {
            getCaseInfo();
        }).catch(() => {
            alertHandler(false, LANG.GLOBAL.alertMessages.delete_error);
        });
    };

    return (
        <div className="Notes-viewer-line">
            <div className="Notes-viewer-line-data">
                <div className="Notes-viewer-line-data-title">
                    <NavLink to={`/user?${elem.user_id}`}>{elem.userName}</NavLink>
                </div>
                <span>{elem.date_created}</span>
                <div
                    className="Notes-viewer-line-data-color"
                    style={{ backgroundColor: elem.color }}
                />
            </div>
            <div className="Notes-viewer-line-mess">
                <TextDescription text={elem.text} />
                {editor && <ActionMenu menuItems={menuItems} />}
            </div>

            {editModal && (
                <Modal
                    header={LANG.notes.edit}
                    closeHandler={() => setEditModal(false)}
                    footer={
                        <div className="Modal--footer">
                            <Button onClick={() => setEditModal(false)} color="error" variant="contained">
                                {LANG.cancel}
                            </Button>
                            <Button onClick={updateNote} variant="contained">
                                {LANG.save}
                            </Button>
                        </div>
                    }
                >
                    <div className="Notes-modal">
                        <Input
                            addClass="w100"
                            type="color"
                            value={noteColor}
                            onChange={(e) => setNoteColor(e.target.value)}
                        />
                        <Textarea
                            value={noteMessage}
                            label={LANG.notes.text}
                            onChange={(e) => setNoteMessage(e.target.value)}
                        />
                    </div>
                </Modal>
            )}

            {confirmModal && (
                <ModalConfirm
                    closeHandler={() => setConfirmModal(false)}
                    text={LANG.GLOBAL.delete_confirm}
                    successHandler={deleteNote}
                />
            )}

            {alert.active && (
                <SmallNotification
                    isSuccess={alert.isSuccess}
                    text={alert.message}
                    close={() => setAlert({ active: false, isSuccess: false, message: "" })}
                />
            )}
        </div>
    );
};

export default NoteElem;
