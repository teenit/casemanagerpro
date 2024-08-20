import React, { useState } from 'react'
import Modal from '../../Modals/Modal';
import { Button } from '@mui/material';
import { LANG } from '../../../services/config';
import Textarea from '../../elements/Inputs/Textarea';
import Icon from '../../elements/Icons/Icon';
import ModalConfirm from '../../Modals/ModalConfirm';
import { apiResponse } from '../../Functions/get_apiObj';
import SmallNotification from '../../elements/Notifications/SmallNotification';


const Feedback = ({ item, event_id, getEventData }) => {
    const [editingFeedback, setEditingFeedback] = useState('');
    const [alert, setAlert] = useState({
        success: false,
        error: false,
        message: ""
    });
    const alertHandler = (key, message = "") => {
        setAlert({ ...alert, [key]: !alert[key], message: message });
    };
    const [modals, setModals] = useState({
        edit: false,
        delete: false
    });
    const modalHandler = (key) => {
        setModals({ ...modals, [key]: !modals[key] });
    };
    const deleteFeedback = (feedback_id) => {
        apiResponse({ event_id: event_id, meta_id: feedback_id }, "events/delete-meta.php").then((res) => {
            alertHandler("success", "Зворотній зв'язок видалено")
            getEventData()
        })
    };

    const editFeedback = (feedback_id) => {
        apiResponse({ event_id: event_id, meta_id: feedback_id }, "events/update.php").then(() => {
            modalHandler("edit")
            alertHandler("success", "Зворотній зв'язок оновлено")
            getEventData()
        })
    };
    return (
        <div className="EventPlan-feedback">
            <div dangerouslySetInnerHTML={{ __html: item.value }}></div>
            <div className="EventPlan-feedback-panel">
                <Icon icon={"edit"} addClass={"default-icon"} onClick={() => {                    
                    setEditingFeedback(item.value)
                    modalHandler("edit");
                }} />
                <Icon icon={"delete"} addClass={"close-icon"} onClick={() => { modalHandler("delete") }} />
            </div>

            {modals.edit && (
                <Modal
                    header={"Редагувати зворотній зв'язок"}
                    closeHandler={() => { modalHandler("edit") }}
                    footer={
                        <>
                            <Button color="error" variant="contained" onClick={() => modalHandler("edit")}>{LANG.GLOBAL.cancel}</Button>
                            <Button variant="contained" onClick={() => editFeedback(item.feedback_id)}>{LANG.GLOBAL.save}</Button>
                        </>
                    }>
                    <div>
                        <Textarea
                            label="Зворотній зв'язок"
                            value={editingFeedback}
                            onChange={(e) => setEditingFeedback(e.target.value)}
                        />
                    </div>
                </Modal>
            )}

            {modals.delete && (
                <ModalConfirm
                    closeHandler={() => { modalHandler("delete") }}
                    successHandler={() => { deleteFeedback(item.feedback_id) }}
                    text={"Ви впевнені, що хочете видалити цей зворотній зв'язок?"}
                />
            )}
            {alert.success && <SmallNotification isSuccess={true} text={alert.message} close={() => alertHandler("success")} />}
            {alert.error && <SmallNotification isSuccess={false} text={alert.message} close={() => alertHandler("error")} />}

        </div>
    )
}

export default Feedback