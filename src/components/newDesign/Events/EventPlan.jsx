import React, { useState } from "react";
import Textarea from "../../elements/Inputs/Textarea";
import { Button } from "@mui/material";
import { apiResponse } from "../../Functions/get_apiObj";
import SmallNotification from "../../elements/Notifications/SmallNotification";
import Feedback from "./Feedback";

const EventPlan = (props) => {
    const [alert, setAlert] = useState({
        success: false,
        error: false,
        message: ""
    });
    const feedbacks = props.feedbacks[props.plan_id]

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
                plan_id: props.plan_id
            })
        }, "events/add-event-meta.php").then((res) => {
            setFeedback('');
            alertHandler("success", "Зворотній зв'язок додано");
            props.getEventData();
        });
    };

    return (
        <div className="EventPlan">
            <div className="EventPlan-header">
                <div className="EventPlan-header-title">
                    <div>{props.title}</div>
                    <div>{`${props.startTime}-${props.endTime}`}</div>
                </div>
            </div>
            <div className="EventPlan-inner">
                <div className="EventPlan-inner-text">
                    <div className="EventPlan-inner-text-item">
                        <div className="EventPlan-inner-text-item-title">Дата проведення</div>
                        <div>{`${props.startDate} - ${props.endDate}`}</div>
                    </div>
                    <div className="EventPage-inner-text-item">
                        <div className="EventPlan-inner-text-item-title">Опис</div>
                        <div dangerouslySetInnerHTML={{ __html: props.description }}></div>
                    </div>
                    <div className="EventPage-inner-text-item">
                        <div className="EventPlan-inner-text-item-title">Зворотній зв'язок</div>
                        {feedbacks.map((item, index) => {
                            return <Feedback key={index} item={item} event_id={props.event_id} getEventData={props.getEventData}/>
                        })}
                    </div>
                </div>
                <div className="EventPlan-addFeedback">
                    <Textarea value={feedback} label="Зворотній зв'язок" onChange={(e) => setFeedback(e.target.value)} />
                    <div className="EventPlan-addFeedback-button">
                        <Button variant="contained" onClick={addFeedback}>Додати</Button>
                    </div>
                </div>
            </div>
            {alert.success && <SmallNotification isSuccess={true} text={alert.message} close={() => alertHandler("success")} />}
            {alert.error && <SmallNotification isSuccess={false} text={alert.message} close={() => alertHandler("error")} />}
        </div>
    );
};

export default EventPlan;
