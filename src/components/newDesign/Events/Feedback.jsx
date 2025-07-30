import React, { useState } from 'react'
import Modal from '../../Modals/Modal';
import { Button } from '@mui/material';
import { LANG } from '../../../services/config';
import Textarea from '../../elements/Inputs/Textarea';
import Icon from '../../elements/Icons/Icon';
import ModalConfirm from '../../Modals/ModalConfirm';
import { apiResponse } from '../../Functions/get_apiObj';
import SmallNotification from '../../elements/Notifications/SmallNotification';
import TextDescription from '../../elements/TextFormatters/TextDescription';
import ActionMenu from '../../Portals/ActionMenu';
import AccessCheck from '../../Functions/AccessCheck';


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
    const access = {
        edit_feedbacks: AccessCheck("view_edit", "a_page_event_feedback", "edit"),

    }
    const modalHandler = (key) => {
        setModals({ ...modals, [key]: !modals[key] });
    };
    const deleteFeedback = (feedback_id) => {

        apiResponse({ meta_id: feedback_id }, "events/delete-meta.php").then((res) => {
            alertHandler("success", LANG.EVENT_PAGE.alertMessages.feedback_deleted)
            getEventData()
        })
    };

    const editFeedback = (feedback_id) => {
        let obj = {
            event_id: event_id,
            value: editingFeedback,
            plan_id: item.plan_id
        }
        apiResponse({ meta_value: JSON.stringify(obj), meta_id: feedback_id }, "events/update-event-meta.php").then((res) => {
            modalHandler("edit")
            alertHandler("success", LANG.EVENT_PAGE.alertMessages.feedback_updated)
            getEventData()
        })
    };
    const menuItems = [
        {
            title: LANG.GLOBAL.edit,
            isHidden: false,
            icon: "edit",
            click: () => {
                setEditingFeedback(item.value)
                modalHandler("edit");
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
                modalHandler("delete")
            }
        },
    ]
    return (
        <div className="EventPlan-feedback">
            <TextDescription text={item.value} />
            {access.edit_feedbacks && <ActionMenu menuItems={menuItems} />}
            {modals.edit && (
                <Modal
                    header={LANG.EVENT_PAGE.edit_feedback}
                    closeHandler={() => { modalHandler("edit") }}
                    footer={
                        <>
                            <Button color="error" variant="contained" onClick={() => modalHandler("edit")}>{LANG.GLOBAL.cancel}</Button>
                            <Button variant="contained" onClick={() => editFeedback(item.feedback_id)}>{LANG.GLOBAL.save}</Button>
                        </>
                    }>
                    <div>
                        <Textarea
                            label={LANG.EVENT_PAGE.feedback}
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
                    text={LANG.EVENT_PAGE.confirm_delete_feedback}
                />
            )}
            {alert.success && <SmallNotification isSuccess={true} text={alert.message} close={() => alertHandler("success")} />}
            {alert.error && <SmallNotification isSuccess={false} text={alert.message} close={() => alertHandler("error")} />}

        </div>
    )
}

export default Feedback