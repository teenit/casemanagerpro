import { Button } from "@mui/material";
import React, { useState } from "react";
import AddPlan from "../../Modals/EventModals/AddPlan";
import Textarea from "../../elements/Inputs/Textarea";
import EventPlan from "./EventPlan";

const EventPlans = ({plans = [], event_id}) => {
    const [modal, setModal] = useState(false)
    return (
        <div>
            <Button variant="contained" onClick={() => { setModal(true) }}>Add plan</Button>
            {
                plans.map((item)=>{

                    return <EventPlan event_id={event_id} {...item}/>
                })
            }
            {modal && <AddPlan event_id = {event_id} close={() => { setModal(false) }} />}
        </div>
    )
}

export default EventPlans