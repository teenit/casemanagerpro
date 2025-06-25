import React, { useState } from "react";
import Modal from "../../Modals/Modal";
import { LANG } from "../../../services/config";
import Input from "../../elements/Inputs/Input";
import Textarea from "../../elements/Inputs/Textarea";
import { Button, Switch } from "@mui/material";
import InputColor from "../../elements/Inputs/InputColor";
import { apiResponse } from "../../Functions/get_apiObj";
import TextDescription from "../../elements/TextFormatters/TextDescription";
import Icon from "../../elements/Icons/Icon";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import AccessCheck from "../../Functions/AccessCheck";
import ModalConfirm from "../../Modals/ModalConfirm";
import SmallNotification from "../../elements/Notifications/SmallNotification";

const CalendarInfoBlock = ({ data }) => {
    const [state, setState] = useState({ ...data })
    return (
        <div className="CalendarInfoBlock">
            {state.key == "happyCase" ? <NavLink style={{ color: state.color }} to={"/" + state.link}>{state.title}</NavLink>
                : <div style={{ color: state.color, fontWeight:"700" }}>{state.title}</div>}
            <div>
                {
                    !state.allDay ? <div>{`${state.day < 10 ? "0" + +state.day : state.day}-${+state.month < 10 ? "0" + +state.month : state.month}-${state.year} ${state.start} -> ${state.end}`}</div>
                        : <div>{`${state.day < 10 ? "0" + +state.day : state.day}-${+state.month < 10 ? "0" + +state.month : state.month}-${state.year}`}</div>
                }
            </div>
            <div>
                <TextDescription text={state.text} />
            </div>
        </div>
    )
}

const AddCalendarEvent = ({ data = {}, loadEvents, close, edit = true, setEdit = () => { } }) => {

    const [state, setState] = useState({ ...data })
    const [modalConfirm, setModalConfirm] = useState(false)
    const [alert, setAlert] = useState({
        active: false,
        isSuccess: false,
        message: ""
    })
    const user = useSelector(state => state.user)
    const checkEditEvent = AccessCheck("yes_no", "a_page_calendar_edit");
    const checkRemoveEvent = AccessCheck("yes_no", "a_page_calendar_remove");
    const alertHandler = (isSuccess = false, message = "") => {
        setAlert({ ...alert, active: !alert.active, isSuccess: isSuccess, message: message })
    }
    const handleChange = (key, value) => {
        setState({ ...state, [key]: value })
    }

    const sendForm = () => {
        if (state.key === "happyCase") return alertHandler(false, LANG.calendar.alertMessages.cant_edit)
        apiResponse({ ...state }, "calendar/add.php").then((res) => {
            loadEvents()
            close();
        })
    }

    const deleteEvent = () => {
        if (state.key === "happyCase" || state.userID !== localStorage.getItem('id')) return alertHandler(false, LANG.calendar.alertMessages.cant_delete)
        apiResponse({ calendar_id: state.calendar_id }, "calendar/delete.php").then((res) => {
            loadEvents()
            close();
        })
    }
    return (
        <Modal
            header={<div className="Modal--head-header">
                {edit || state.key == 'happyCase' ? <div className="title">{LANG.calendar.info}</div> :
                    (!checkEditEvent && user.id !== state.userID) ? ""
                        : <Button onClick={setEdit} startIcon={<Icon icon={'edit'} />}>{LANG.calendar.add_event.edit}</Button>}
            </div>}
            closeHandler={close}
            footer={state.key !== "happyCase" ? <div className="Modal--footer" style={{ justifyContent: "space-between", width: "100%" }}>
                <Button onClick={close} color="error" variant="contained">{LANG.cancel}</Button>
                <Button disabled={!edit} onClick={sendForm} variant="contained">{LANG.save}</Button>
            </div> :
                <div className="Modal--footer">
                    <Button variant="contained" onClick={close}>{LANG.GLOBAL.close}</Button>
                </div>}
        >
            {!edit ? <CalendarInfoBlock data={state} />
                : <div className="AddCalendarEvent">
                    <div className="two-element">
                        {!edit ?
                            <>
                                <div><NavLink style={{ color: state.color }} to={"/" + state.link}>{state.title}</NavLink></div>
                            </>
                            :
                            <>
                                <Input
                                    value={state.title}
                                    label={LANG.GLOBAL.title}
                                    disabled={!edit}
                                    type="text"
                                    addClass="w100"
                                    onChange={(e) => handleChange('title', e.target.value)} />
                                <InputColor
                                    value={state.color}
                                    disabled={!edit}
                                    addClass="w100"
                                    onChange={(e) => handleChange('color', e.target.value)}
                                /></>
                        }

                    </div>
                    <div className="two-element">
                        <label>{LANG.GLOBAL.start}
                            <Input
                                value={state.start}
                                addClass="w100"
                                type="time"
                                disabled={!edit}
                                onChange={(e) => handleChange('start', e.target.value)}
                            />
                        </label>
                        <label>{LANG.GLOBAL.end}
                            <Input
                                value={state.end}
                                addClass="w100"
                                type="time"
                                disabled={!edit}
                                onChange={(e) => handleChange('end', e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="one-element">
                        {edit ? <Textarea
                            value={state.text.replace(/<br\s*\/?>/g, '\n')}
                            label={LANG.GLOBAL.description}
                            cols="30"
                            rows="10"
                            disabled={!edit}
                            onChange={(e) => handleChange('text', e.target.value)}
                        /> : <TextDescription text={state.text} />}
                    </div>
                    <div className="one-element">
                        <label>{LANG.calendar.add_event.for_all}
                            <Switch
                                disabled={!edit}
                                checked={state.key === 'forAll'}
                                onChange={(e) => handleChange('key', e.target.checked ? 'forAll' : 'myCalendar')}
                            />
                        </label>
                    </div>
                    <div className="one-element">
                        <label>{LANG.calendar.add_event.repeat}
                            <Switch
                                disabled={!edit}
                                checked={state.every_year == 1}
                                onChange={(e) => handleChange('every_year', e.target.checked ? 1 : 0)}
                            />
                        </label>
                    </div>
                    <div className="two-element">
                        <Input addClass="w100"
                            value={state.link}
                            type="text"
                            disabled={!edit}
                            label={LANG.GLOBAL.link}
                            onChange={(e) => handleChange('link', e.target.value)}
                        />
                        {edit && state.calendar_id && !(!checkRemoveEvent && user.id !== state.userID) &&
                            <Icon icon={'delete'} addClass={'delete-icon'} onClick={() => { setModalConfirm(true) }} />}
                    </div>
                    {alert.active && <SmallNotification isSuccess={alert.isSuccess} text={alert.message} close={() => { alertHandler() }} />}
                </div>}
            {modalConfirm && <ModalConfirm successHandler={deleteEvent} closeHandler={() => { setModalConfirm(false) }}
                text={LANG.calendar.confirm_delete} />}
        </Modal>
    )
}

export default AddCalendarEvent;