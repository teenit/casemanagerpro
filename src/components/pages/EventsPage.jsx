import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import Modal from "../Modals/Modal";
import Input from "../elements/Inputs/Input";
import Textarea from "../elements/Inputs/Textarea";
import { apiResponse } from "../Functions/get_apiObj";
import { LANG } from "../../services/config";
import Icon from "../elements/Icons/Icon";
import SmallNotification from "../elements/Notifications/SmallNotification";
import { NavLink } from "react-router-dom";

const DEFAULT_FORM_DATA = {
    title: '',
    description: '',
    type: '',
    category: '',
    color: "#42A5F5"
};

const EventsPage = () => {
    const [modal, setModal] = useState({
        modal: false,
        action: "",
        currentEvent: null
    });
    const modalHandler = (action = "", event = null) => {
        setModal({
            modal: !modal.modal,
            action: action,
            currentEvent: event
        });
        if (action === "edit" && event) {
            setFormData({ ...event })
        } else if (action === "add") {
            setFormData({ ...DEFAULT_FORM_DATA })
        }
    };

    const [alert, setAlert] = useState({
        error: false,
        success: false,
        message: ""
    });
    const alertHandler = (key, message = "") => {
        setAlert({ ...alert, [key]: !alert[key], message: message });
    };

    const [formData, setFormData] = useState({
        ...DEFAULT_FORM_DATA
    });

    const [events, setEvents] = useState([])

    const loadEvents = () => {
        apiResponse({ ...formData }, "events/get-events.php").then((res) => {
            setEvents([...res])
        });
    };

    useEffect(() => {
        loadEvents();
    }, []);

    const updateEvent = () => {
        if (formData.title === DEFAULT_FORM_DATA.title) {
            return alertHandler("error", "Введіть назву події")
        }
        if (formData.title.length >= 100) {
            return alertHandler("error", `Назва події повинна бути довжиною до 100 символів. Поточна довжина: ${formData.title.length} символів`);
        }
        
        const link = modal.action == "add" ? "events/create.php" : "events/update.php"
        
        apiResponse({ ...formData, event_id: modal.currentEvent.event_id }, link).then((res) => {
            loadEvents()
            modalHandler()
        })
    }

    const description = (str) => {
        return str.length > 0 ? (str.length > 50 ? str.slice(0, 50) + "..." : str) : "Без опису"
    }

    return (
        <div className="EventsPage">
            <div className="EventsPage-title">
                <div>Події</div>
                <Icon icon={"add"} addClass={"fs40"} onClick={() => modalHandler("add")} />
            </div>
            {modal.modal && (
                <Modal
                    closeHandler={() => setModal({ modal: false, action: "", currentEvent: null })}
                    header={modal.action === "add" ? "Створити подію" : "Редагувати подію"}
                    footer={
                        <>
                            <Button variant="contained" color="error" onClick={() => setModal({ modal: false, action: "", currentEvent: null })}>
                                {LANG.GLOBAL.cancel}
                            </Button>
                            <Button variant="contained" onClick={updateEvent}>
                                {LANG.GLOBAL.save}
                            </Button>
                        </>
                    }
                >
                    <Input
                        label={LANG.GLOBAL.title}
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}/>
                    <Textarea
                        label={LANG.GLOBAL.description}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                    <Input
                        label={LANG.GLOBAL.type}
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    />
                    <Input
                        label={LANG.GLOBAL.category}
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    />
                    <Input
                        type="color"
                        value={formData.color}
                        onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    />
                </Modal>
            )}
            <div className="EventsPage-events">
                {events.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className="EventsPage-event"
                            style={{ boxShadow: `0px 0px 5px 0px ${item.color ? item.color : "#000"}` }}
                        >
                            <div style={{ backgroundColor: item.color ? item.color : "#000" }} className="EventsPage-event-color"></div>
                            <NavLink to={`/event_new/${item.event_id}`}>
                                <div className="EventsPage-event-title">{item.title}</div>
                            </NavLink>
                            <div>{description(item.description)}</div>
                            <div className="EventsPage-event-split">
                                <div className="EventsPage-event-split-date">{item.date_created}</div>
                                <Icon icon={"edit"} addClass={"default-icon"} onClick={() => modalHandler("edit", item)} />
                            </div>
                        </div>
                    );
                })}
            </div>
            {alert.error && <SmallNotification isSuccess={false} text={alert.message} close={() => { alertHandler("error") }} />}
            {alert.success && <SmallNotification isSuccess={true} text={alert.message} close={() => { alertHandler("success") }} />}
        </div>
    );
};

export default EventsPage;
