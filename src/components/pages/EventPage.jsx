import React, { useEffect, useState } from "react";
import { Button } from "@mui/material"
import GalleryBlock from "../blocks/GalleryBlock"
import AccessCheck from "../Functions/AccessCheck";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";
import { serverAddres } from "../Functions/serverAddres";
import { apiResponse } from "../Functions/get_apiObj";
import Modal from "../Modals/Modal";
import { LANG } from "../../services/config";
import Textarea from "../elements/Inputs/Textarea";
import Icon from "../elements/Icons/Icon";
import AddMembers from "../Events/Event/AddMembers";
import AddPlan from "../Modals/EventModals/AddPlan";
import FilesUploader from "../elements/Uploaders/FilesUploader";
import EventPlans from "../newDesign/Events/EventPlans";
import EventMembers from "../newDesign/Events/EventMembers";
const EventPage = () => {
    const params = useParams()
    const downloadGallery = AccessCheck('yes_no', 'a_page_event_media')
    const [event, setEvent] = useState(null)
    const [state, setState] = useState(null)
    const [modal, setModal] = useState({
        addMember: false,
        addPlan: false
    })
    const getEventData = ()=>{
            apiResponse({event_id:params.id}, "events/get-event-by-id.php").then((res)=>{
                setState(res)
                console.log(res);
                
            })
    }
useEffect(()=>{
    getEventData()
},[])
    const modalHandler = (key) => {
        setModal({ ...modal, [key]: !modal[key] })
    }

    function getEvent() {
        apiResponse({ event_id: params.id }, "event/get-event.php")
            .then((data) => {
                setEvent(data)
            })
            .catch((error) => console.log(error))
    }
  
    const uploadFiles = ()=>{
        getEventData()
    }
    useEffect(() => {
        getEvent()
    }, [])

    return (
        <div className="EventPage">
            <div className="EventPage-header">
                <div className="EventPage-header-title" style={{ borderBottom: `solid 3px ${event?.color}` }}>{event?.title}</div>
                <div className="EventPage-header-subtitle">{event?.description}</div>
            </div>
            <div className="EventPage-members">
                <div className="EventPage-members-title">
                    <div>{event?.title}</div>
                    <Icon icon="add" addClass={"fs40"} onClick={() => { modalHandler("addMember") }} />
                </div>
                {state && <EventMembers event_id={params.id} getEventData={getEventData} managers={state.event_user_manager} members={state.event_case_member}/>}
            </div>
            {
                state && <EventPlans getEventData={getEventData} feedbacks={state.event_feedbacks} plans={state.event_plans} event_id={params.id}/>
            }
            {state?.event_files && state.event_files.length>0 && <GalleryBlock data={state.event_files} check={downloadGallery}/>}
            {AccessCheck('yes_no', 'a_page_event_add_media') && <div className="EventPage-addFiles">
                <div>Завантаження файлів</div>
                <FilesUploader
                    successHandler={uploadFiles}
                    multiple={true}
                    meta={{
                        key: "event_files",
                        type: "event",
                        title: "",
                        description: "",
                        eventID: params.id
                    }}
                    type="event"
                />
            </div>}
            
            {modal.addPlan && <AddPlan close={() => { modalHandler("addPlan") }} />}
            {modal.addMember && <AddMembers getEventData={getEventData} modalHandler={() => { modalHandler("addMember") }} />}
        </div>
    ) 
}

export default EventPage;