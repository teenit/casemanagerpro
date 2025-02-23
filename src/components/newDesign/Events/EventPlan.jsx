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

const EventPlan = (props) => {
    const [alert, setAlert] = useState({
        success: false,
        error: false,
        message: ""
    });
    const [modals,setModals] = useState({
        edit:false,
        delete:false
    })
    const modalsHandler = (key)=>{
        setModals({...modals, [key]:!modals[key]})
    }
    const feedbacks = props.feedbacks[props.plan.plan_id]

    const [feedback, setFeedback] = useState('');

    const alertHandler = (key, message = "") => {
        setAlert({ ...alert, [key]: !alert[key], message: message });
    };

    const addFeedback = () => {
        if (feedback.trim().length < 1) return alertHandler("error", "Зворотній зв'язок не може бути порожнім");
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
            alertHandler("success", "Зворотній зв'язок додано");
            props.getEventData();
        });
    };
    const deletePlan = ()=>{
        apiResponse({ meta_id: props.plan.plan_id }, "events/delete-meta.php").then((res) => {
            alertHandler("success", "План видалено")
            props.getEventData()
        })
    }

    const formatTextWithLineBreaks = (text) => {
        // Замінюємо всі нові рядки на <br> для HTML
        return text.replace(/\n/g, '<br />');
      };
      
    return (
        <div className="EventPlan">
            <div className="EventPlan-header">
                <div className="EventPlan-header-title">
                    <div className="EventPlan-header-title-left">
                        <div>{props.plan.title}</div> 
                    </div>
                    <div className="EventPlan-header-details">
                        <div>{`${props.plan.startTime}-${props.plan.endTime}`}</div>
                        <div>
                            <Icon icon={"edit"} onClick={()=>{modalsHandler("edit")}}/>
                            <Icon icon={"delete"} addClass={"close-icon"} onClick={()=>{modalsHandler("delete")}}/>
                        </div>
                    </div>
                   
                </div>
            </div>
            <div className="EventPlan-inner">
                <div className="EventPlan-inner-text">
                    <div className="EventPlan-inner-text-item">
                        <div className="EventPlan-inner-text-item-title">Дата проведення</div>
                        <div>{`${props.plan.startDate} - ${props.plan.endDate}`}</div>
                    </div>
                    <div className="EventPage-inner-text-item">
                        <div className="EventPlan-inner-text-item-title">Опис</div>
                        <TextDescription text={props.plan.description}/>
                        

                    </div>
                    <div className="EventPage-inner-text-item">
                        <div className="EventPlan-inner-text-item-title">Зворотній зв'язок</div>
                        <div className="EventPlan-inner-feedbacks">
                        {feedbacks && feedbacks.length > 0 ? feedbacks.map((item, index) => {
                            return <Feedback key={index} item={item} event_id={props.event_id} getEventData={props.getEventData} />
                        }) : <div>Немає зворотнього зв'язку</div>}
                        </div>
                    </div>
                </div>
                <div className="EventPlan-addFeedback">
                    <Textarea value={feedback} label="Зворотній зв'язок" onChange={(e) => setFeedback(e.target.value)} />
                    <div className="EventPlan-addFeedback-button">
                        <Button variant="contained" onClick={addFeedback}>Додати</Button>
                    </div>
                </div>
            </div>
            {modals.delete && <ModalConfirm closeHandler={()=>{modalsHandler("delete")}} successHandler={deletePlan} text={`Ви впевнені, що хочете видалити план ${props.plan.title}?`}/> }
            {modals.edit && <AddPlan getEventData={props.getEventData} action="edit" event_id={props.event_id} close={()=>{modalsHandler("edit")}} data={props.plan}/>}
            {alert.success && <SmallNotification isSuccess={true} text={alert.message} close={() => alertHandler("success")} />}
            {alert.error && <SmallNotification isSuccess={false} text={alert.message} close={() => alertHandler("error")} />}
        </div>
    );
};

export default EventPlan;
