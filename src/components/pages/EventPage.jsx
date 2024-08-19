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
const EventPage = () => {
    const params = useParams()
    const downloadGallery = AccessCheck('yes_no', 'a_page_event_media')
    const [users, setUsers] = useState({
        managers: [],
        members: []
    })
    const [plans, setPlans] = useState(null)
    const [files, setFiles] = useState(null)
    const [event, setEvent] = useState(null)
    const [state, setState] = useState(null)
    // const [width, setWidth] = useState(window.innerWidth)
    // const [planRows, setPlanRows] = useState(1)
    // window.addEventListener('resize', () => {
    //     setWidth(window.innerWidth)
    // })
    const [modal, setModal] = useState({
        addMember: false,
        addPlan: false
    })
    
    useEffect(()=>{
        apiResponse({event_id:params.id}, "events/get-event-by-id.php").then((res)=>{
            setState(res)
        })
    },[])

    const modalHandler = (key) => {
        setModal({ ...modal, [key]: !modal[key] })
    }

    // const saveFeedback = () => {
    //     apiResponse({
    //         plan_id: 
    //     }, )
    // }

    function getEvent() {
        apiResponse({ event_id: params.id }, "event/get-event.php")
            .then((data) => {
                setEvent(data)
                if (data?.id) {
                    getUsers(data.id, "eventMemberUser")
                    getUsers(data.id, "eventMemberCase")
                    getPlans(data.id, "eventPlan")
                    getFiles(data.id, "event_files")
                }
            })
            .catch((error) => console.log(error))
    }
    function getFiles(id, key) {
        let obj = {
            key: key,
            eventID: id
        }
        apiResponse({ ...obj }, "event/get-files.php").then((data) => {
            let mas = data.map(item => { return item.fileInfo })
            setFiles([...mas])            
        })
            .catch((error) => console.log(error))
    }
    function getPlans(id, key) {
        let obj = {
            key: key,
            eventID: id
        }
        apiResponse({ ...obj }, "event/get-plans.php").then((data) => {
            console.log(data);
            setPlans(data)
        })
            .catch((error) => console.log(error))
    }
    function getUsers(id, key) {
        let obj = {
            key: key,
            eventID: id
        }
        apiResponse({ ...obj }, "event/get-event-members.php")
            .then((data) => {
                
                if (key == "eventMemberUser") {
                    setUsers({ ...users, managers: data })
                } else {
                    setUsers({ ...users, members: data })
                }
            })
            .catch((error) => console.log(error))
    }
    const uploadFiles = ()=>{
        getFiles(event.id)
    }
    useEffect(() => {
        // window.dispatchEvent(new Event('resize'))
        getEvent()
    }, [])
    const MemberItem = () => {
        return (
            <div className="EventPage-MemberItem">
                <NavLink to={`dhdh`}>Name</NavLink>
                <div className="EventPage-MemberItem-right">
                    <div className="EventPage-MemberItem-right-role">role</div>
                    <div><a href="tel:0987654321">0987654321</a></div>
                </div>
            </div>
        )
    }

    const PlanItem = () => {
        const [modal, setModal] = useState(false)
        const [feedbackValue, setFeedbackValue] = useState("")
        return <div className="EventPage-PlanItem">
            <div className="EventPage-PlanItem-header">
                <div className="EventPage-PlanItem-header-title">
                    <div>duu</div>
                    <div>12:00-13:00</div>
                </div>
            </div>
            <div className="EventPage-PlanItem-inner">
                <div>fifufufuffu</div>
                <div>fifufufuffu</div>
                <div>fifufufuffu</div>
                <div>fifufufuffu</div>
                <div>fifufufuffu</div>
                <div>fifufufuffu</div>
                <div className="EventPage-PlanItem-inner-feedback">
                    <div className="EventPage-PlanItem-inner-feedback-title">Зворотній зв'язок</div>
                    <div>Немає зворотнього зв'язку</div>
                </div>
            </div>
            <Button variant="contained" className="EventPage-PlanItem-button" onClick={() => { setModal(true) }}>Написати</Button>
            {modal && <Modal header="Додати зворотній зв'язок" closeHandler={() => { setModal(false) }} footer={
                <>
                    <Button variant="contained" color="error" onClick={() => { setModal(false) }}>{LANG.GLOBAL.cancel}</Button>
                    <Button variant="contained" onClick={() => {
                       // setModal(false)
                    }}>{LANG.GLOBAL.save}</Button>
                </>
            }>
                <Textarea value={feedbackValue} onChange={(e) => { setFeedbackValue(e.target.value) }} label="Зворотній зв'язок" />
            </Modal>}
        </div>
    }
    return (
        <div className="EventPage">
            <div className="EventPage-header">
                <div className="EventPage-header-title" style={{ borderBottom: `solid 3px ${event?.color}` }}>{event?.title}</div>
                <div className="EventPage-header-subtitle">{event?.description}</div>
            </div>
            <Button onClick={()=>{
                    apiResponse({event_id:params.id}, "events/get-event-by-id.php").then((res)=>{
                        console.log(res)
                    })
                }}>CLICK</Button>
            <div className="EventPage-members">
                <div className="EventPage-members-title">
                    <div>{event?.title}</div>
                    <Icon icon="add" addClass={"fs40"} onClick={() => { modalHandler("addMember") }} />
                </div>
                <div className="EventPage-members-inner">
                    <div className="EventPage-members-inner-block">
                        <div className="EventPage-members-inner-block-title">Організатори</div>
                        <div className="EventPage-members-inner-block-members">
                            <MemberItem />
                            <MemberItem />
                            <MemberItem />
                        </div>
                    </div>

                    <div className="EventPage-members-inner-block">
                        <div className="EventPage-members-inner-block-title">Учасники</div>
                        <div className="EventPage-members-inner-block-members">
                            <MemberItem />
                            <MemberItem />
                            <MemberItem />
                            <MemberItem />
                            <MemberItem />
                            <MemberItem />
                        </div>
                    </div>
                </div>
            </div>
            {
                state && <EventPlans plans={state.event_plans} event_id={params.id}/>
            }
            

            <div className="EventPage-plans">
                <div className="EventPage-plans-title">
                    <div>Плани</div>
                    {AccessCheck('yes_no', 'a_page_event_add_plan') && <Icon icon="add" addClass={"fs40"} onClick={() => { modalHandler("addPlan") }} />}
                    
                </div>
                <div className="EventPage-plans-inner">
                    <PlanItem />
                    <PlanItem />
                    <PlanItem />
                    <PlanItem />
                    <PlanItem />
                    <PlanItem />
                </div>
            </div>
            {files && <GalleryBlock data={files} check={downloadGallery}/>}
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
            {modal.addMember && <AddMembers getUsers={(id, key) => {
                getUsers(id, key)
            }} modalHandler={() => { modalHandler("addMember") }} />}
        </div>
    ) 
}

export default EventPage;