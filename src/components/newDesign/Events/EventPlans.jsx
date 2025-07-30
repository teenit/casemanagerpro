import React, { useState } from "react";
import AddPlan from "../../Modals/EventModals/AddPlan";
import EventPlan from "./EventPlan";
import Icon from "../../elements/Icons/Icon";
import { LANG } from "../../../services/config";
import AccessCheck from "../../Functions/AccessCheck";

const EventPlans = ({ plans = [], feedbacks = {}, event_id, getEventData }) => {
    const [modal, setModal] = useState(false)
    const access = {
        add_plan: AccessCheck('yes_no', "a_page_event_add_plan"),
        plans_view: AccessCheck("view_edit", "a_page_event_plan", "view")
    }
    return access.plans_view &&(
        <div className="EventPlans">
            <div className="EventPlans-title">
                <div>{LANG.EVENT_PAGE.plans}</div>
                {access.add_plan && <Icon icon={"add"} addClass={"fs40"} onClick={() => { setModal(true) }} />}
                
            </div>
            {
                plans.length === 0 && <span>{LANG.EVENT_PAGE.no_plans}</span>
            }
            {plans.length > 0 && <div className="EventPlans-inner">

                {
                    plans.map((item, index) => {

                        return <EventPlan key={index} getEventData={getEventData} feedbacks={feedbacks} event_id={event_id} plan={item} />
                    })
                }
            </div>}
            {modal && <AddPlan getEventData={getEventData} event_id={event_id} close={() => { setModal(false) }} />}
        </div>
    )
}

export default EventPlans