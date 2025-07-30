import React, { useState } from "react";
import Textarea from "../../elements/Inputs/Textarea";
import { Box, Button, Typography } from "@mui/material";
import { apiResponse } from "../../Functions/get_apiObj";
import SmallNotification from "../../elements/Notifications/SmallNotification";
import Feedback from "./Feedback";
import Icon from "../../elements/Icons/Icon";
import AddPlan from "../../Modals/EventModals/AddPlan";
import ModalConfirm from "../../Modals/ModalConfirm";
import TextDescription from "../../elements/TextFormatters/TextDescription";
import { LANG } from "../../../services/config";
import ActionMenu from "../../Portals/ActionMenu";
import AccessCheck from "../../Functions/AccessCheck";

const EventPlan = (props) => {
    const [alert, setAlert] = useState({
        success: false,
        error: false,
        message: ""
    });
    const [modals, setModals] = useState({
        edit: false,
        delete: false
    })
    const modalsHandler = (key) => {
        setModals({ ...modals, [key]: !modals[key] })
    }
    const feedbacks = props.feedbacks[props.plan.plan_id]
    const access = {
        add_feedback: AccessCheck('yes_no', "a_page_event_add_feedback"),
        edit_plan: AccessCheck("view_edit", "a_page_event_plan", "edit"),
        view_feedbacks: AccessCheck("view_edit", "a_page_event_feedback", "view"),
    }
    const [feedback, setFeedback] = useState('');

    const alertHandler = (key, message = "") => {
        setAlert({ ...alert, [key]: !alert[key], message: message });
    };

    const addFeedback = () => {
        if (feedback.trim().length < 1) return alertHandler("error", LANG.EVENT_PAGE.alertMessages.feedback_empty);
        apiResponse({
            event_id: props.event_id,
            meta_key: 'event_feedback',
            meta_value: JSON.stringify({
                event_id: props.event_id,
                value: feedback,
                plan_id: props.plan.plan_id
            })
        }, "events/add-event-meta.php").then((res) => {
            setFeedback('');
            alertHandler("success", LANG.EVENT_PAGE.alertMessages.feedback_success);
            props.getEventData();
        });
    };
    const deletePlan = () => {
        apiResponse({ meta_id: props.plan.plan_id }, "events/delete-meta.php").then((res) => {
            alertHandler("success", LANG.EVENT_PAGE.alertMessages.plan_deleted)
            props.getEventData()
        })
    }

    const formatTextWithLineBreaks = (text) => {
        // Замінюємо всі нові рядки на <br> для HTML
        return text.replace(/\n/g, '<br />');
    };
    const menuItems = [
        {
            title: LANG.GLOBAL.edit,
            isHidden: false,
            icon: "edit",
            click: () => {
                modalsHandler("edit")
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
                modalsHandler("delete")
            }
        },
    ]
    return (
        <div className="EventPlan">
            <div className="EventPlan-header">
                <div className="EventPlan-header-left">
                    <div>{props.plan.title}</div>
                    <div>{`${props.plan.startTime}-${props.plan.endTime}`}</div>
                </div>
                {access.edit_plan && <ActionMenu menuItems={menuItems} />}
            </div>
            <div className="EventPlan-inner">
                <div className="EventPlan-inner-text">
                    <div className="EventPlan-inner-text-item">
                        <div className="EventPlan-inner-text-item-title">{LANG.EVENT_PAGE.date}</div>
                        <div>{`${props.plan.startDate} - ${props.plan.endDate}`}</div>
                    </div>
                    <div className="EventPage-inner-text-item">
                        <div className="EventPlan-inner-text-item-title">{LANG.GLOBAL.description}</div>
                        <TextDescription text={props.plan.description} />


                    </div>
                    {access.view_feedbacks && <div className="EventPage-inner-text-item">
                        <div className="EventPlan-inner-text-item-title">{LANG.EVENT_PAGE.feedback}</div>
                        <div className="EventPlan-inner-feedbacks">
                            {feedbacks && feedbacks.length > 0 ? feedbacks.map((item, index) => {
                                return <Feedback key={index} item={item} event_id={props.event_id} getEventData={props.getEventData} />
                            }) : <div>{LANG.EVENT_PAGE.no_feedback}</div>}
                        </div>
                    </div>}

                </div>
                {access.add_feedback && access.view_feedbacks && <div className="EventPlan-addFeedback">
                    <Textarea value={feedback} label={LANG.EVENT_PAGE.feedback} onChange={(e) => setFeedback(e.target.value)} />
                    <div className="EventPlan-addFeedback-button">
                        <Button variant="contained" onClick={addFeedback}>{LANG.GLOBAL.add}</Button>
                    </div>
                </div>}

            </div>
            {modals.delete && <ModalConfirm closeHandler={() => { modalsHandler("delete") }} successHandler={deletePlan} text={`${LANG.EVENT_PAGE.confirm_delete_plan} ${props.plan.title}?`} />}
            {modals.edit && <AddPlan getEventData={props.getEventData} action="edit" event_id={props.event_id} close={() => { modalsHandler("edit") }} data={props.plan} />}
            {alert.success && <SmallNotification isSuccess={true} text={alert.message} close={() => alertHandler("success")} />}
            {alert.error && <SmallNotification isSuccess={false} text={alert.message} close={() => alertHandler("error")} />}
        </div>
    );
};

export default EventPlan;
