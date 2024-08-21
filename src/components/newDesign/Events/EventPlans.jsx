import { Button } from "@mui/material";
import React, { useState } from "react";
import AddPlan from "../../Modals/EventModals/AddPlan";
import Textarea from "../../elements/Inputs/Textarea";
import EventPlan from "./EventPlan";
import Icon from "../../elements/Icons/Icon";

const EventPlans = ({plans = [], feedbacks={}, event_id, getEventData}) => {
    const [modal, setModal] = useState(false)
    return (
        <div className="EventPlans">
            <div className="EventPlans-title">
                <div>Плани</div>
                <Icon icon={"add"} addClass={"fs40"} onClick={() => { setModal(true) }}/>
            </div>
            <div className="EventPlans-inner">

            {
                plans.map((item,index)=>{

                    return <EventPlan key={index} getEventData={getEventData} feedbacks={feedbacks} event_id={event_id} plan={item}/>
                })
            }
            </div>
            {modal && <AddPlan getEventData={getEventData} event_id = {event_id} close={() => { setModal(false) }} />}
        </div>
    )
}

export default EventPlans