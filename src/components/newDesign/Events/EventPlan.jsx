import React, { useState } from "react";
import Textarea from "../../elements/Inputs/Textarea";
import { Button } from "@mui/material";
import { apiResponse } from "../../Functions/get_apiObj";

const EventPlan = (props) => {

    const [feedback, setFeedback] = useState('')
    return(
        <div>
            {props.title} + {props.description}
            <Textarea value={feedback} label="FEEDBACK" onChange={(e)=>{
                setFeedback(e.target.value)
            }}/>
            <Button onClick={()=>{
                apiResponse({
                    event_id: props.event_id,
                    meta_key: 'event_feedback',
                    meta_value: JSON.stringify({
                        event_id: props.event_id,
                        value: feedback,
                        plan_id: props.plan_id
                    })
                }, "events/add-event-meta.php").then((res)=>{
                    console.log(res)
                })
            }}> FEEDBACK btn</Button>
        </div>
    )
}

export default EventPlan;