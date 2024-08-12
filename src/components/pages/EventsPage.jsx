import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import Modal from "../Modals/Modal";
import Input from "../elements/Inputs/Input";
import Textarea from "../elements/Inputs/Textarea"
import { apiResponse } from "../Functions/get_apiObj";
import { LANG } from "../../services/config";
import Icon from "../elements/Icons/Icon"
import SmallNotification from "../elements/Notifications/SmallNotification"
import { NavLink } from "react-router-dom"
const DEFAULT_FORM_DATA = {
    title: '',
    description: '',
    type: '',
    category: null,
    color: "#42A5F5"
}

const EventsPage = () => {
    const [addModal, setAddModal] = useState(false);
    const [alert, setAlert] = useState({
        error: false,
        success: false,
        message: ""
    })
    const alertHandler = (key, message = "") => {
        setAlert({ ...alert, [key]: !alert[key], message: message })
    }
    const [addFormData, setAddFormData] = useState({
        ...DEFAULT_FORM_DATA
    });
    const [events, setEvents] = useState([])
const loadEvents = ()=>{
    apiResponse({ ...addFormData }, "events/get-events.php").then((res) => {
        setEvents([...res])
    })
}
    useEffect(() => {
       loadEvents()
    }, [])
    const addEvent = () => {
        if (addFormData.title === DEFAULT_FORM_DATA.title) return alertHandler("error", "Ввеідть назву події");
        if (addFormData.title.length >= 100) return alertHandler("error", `Назва події повинна бути довжиною до 100 символів. Поточна довжина: ${addFormData.title.length} символів`);
        apiResponse({ ...addFormData }, "events/create.php").then((res) => {
            console.log(res)
            loadEvents()
            setAddModal(false)
        })
    }
    const description = (str) => {
        return str.length > 0 ? (str.length > 50 ? str.slice(0, 50) + "..." : str) : "Без опису"
    }
    return (
        <div className="EventsPage">
            <div className="EventsPage-title">
                <div>Події</div>
                <Icon icon={"add"} addClass={"fs40"} onClick={() => setAddModal(true)} />
            </div>
            {
                addModal && (
                    <Modal closeHandler={() => setAddModal(false)} header={"Create Event"} footer={
                        <>
                            <Button variant='contained' color='error' onClick={() => setAddModal(false)}>{LANG.GLOBAL.cancel}</Button>
                            <Button variant='contained' onClick={addEvent}>{LANG.GLOBAL.save}</Button>
                        </>
                    }>
                        <Input label={LANG.GLOBAL.title} value={addFormData.title} onChange={(e) => setAddFormData({ ...addFormData, title: e.target.value })} />
                        <Textarea label={LANG.GLOBAL.description} value={addFormData.description} onChange={(e) => setAddFormData({ ...addFormData, description: e.target.value })} />
                        <Input label={LANG.GLOBAL.type} value={addFormData.type} onChange={(e) => setAddFormData({ ...addFormData, type: e.target.value })} />
                        <Input label={LANG.GLOBAL.category} value={addFormData.category} onChange={(e) => setAddFormData({ ...addFormData, category: e.target.value })} />
                        <Input type="color" value={addFormData.color} onChange={(e) => setAddFormData({ ...addFormData, color: e.target.value })} />
                    </Modal>
                )
            }
            <div className="EventsPage-events">
                {events.map((item, index) => {
                    return (
                        <div key={index} className="EventsPage-event" style={{ boxShadow: `0px 0px 5px 1px ${item.color ? item.color : "000"}` }}>
                            <div style={{ backgroundColor: item.color ? item.color : "000" }} className="EventsPage-event-color"></div>
                            <NavLink to={`/event/${item.event_id}`}><div className="EventsPage-event-title">{item.title}</div></NavLink>
                            <div>{description(item.description)}</div>
                            <div className="EventsPage-event-date">{item.date_created}</div>
                        </div>
                    )
                })}
            </div>
            {alert.error && <SmallNotification isSuccess={false} text={alert.message} close={() => { alertHandler("error") }} />}
            {alert.success && <SmallNotification isSuccess={true} text={alert.message} close={() => { alertHandler("success") }} />}
        </div>
    )
}

export default EventsPage;