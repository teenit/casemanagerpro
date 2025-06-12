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

const CalendarInfoBlock = ({data}) => {
    const [state, setState] = useState({...data})
    return(
        <div className="CalendarInfoBlock">
            <div>
                <NavLink style={{color: state.color}} to={"/"+state.link}>{state.title}</NavLink>
            </div>
            <div>
                {
                    !state.allDay ? <div>{`${state.day < 10 ? "0"+ +state.day: state.day}-${+state.month < 10 ? "0"+ +state.month: state.month}-${state.year} ${state.start} -> ${state.end}`}</div>
                    : <div>{`${state.day < 10 ? "0"+ +state.day: state.day}-${+state.month < 10 ? "0"+ +state.month: state.month}-${state.year}`}</div>
                } 
            </div>
            <div>
                <TextDescription text={state.text}/>
            </div>
        </div>
    )
}

const AddCalendarEvent = ({data={}, loadEvents, close, edit = true, setEdit=()=>{}}) => {

    const [state, setState] = useState({...data})
    const user = useSelector(state => state.user)
    const checkEditEvent = AccessCheck("yes_no", "a_page_calendar_edit");
    const checkRemoveEvent = AccessCheck("yes_no", "a_page_calendar_remove");
    const handleChange = (key, value) => {
        setState({...state, [key]: value})
    }

    const sendForm = () => {
        if (state.key === "happyCase") return alert(LANG.calendar.alertMessages.cant_edit)
        apiResponse({...state}, "calendar/add.php").then((res)=>{
            loadEvents()
            close();
        })   
    }

    const deleteEvent = () => {
        let check = window.confirm(`${LANG.calendar.delete} ${state.title}?`);
        if (!check) return;
        if (state.key === "happyCase" || state.userID !== localStorage.getItem('id')) return alert(LANG.calendar.alertMessages.cant_delete)
        apiResponse({calendar_id: state.calendar_id}, "calendar/delete.php").then((res)=>{
            loadEvents()
            close();
        })   
    }
    return(
        <Modal
            header={<div className="Modal--head-header">
                {edit || state.key == 'happyCase' ? <div className="title">{LANG.calendar.add_event.title}</div> :
                 (!checkEditEvent && user.id !== state.userID) ? "" 
                 :<Button onClick={setEdit} startIcon={<Icon icon={'edit'}/>}>{LANG.calendar.add_event.edit}</Button>}
            </div>}
            closeHandler={close}
            footer={ <div className="Modal--footer" style={{justifyContent:"space-between",width:"100%"}}>
                {edit && state.calendar_id &&  !(!checkRemoveEvent && user.id !== state.userID) && <Icon icon={'delete'} addClass={'AddCalendarEvent-delete'} onClick={deleteEvent}/>}
               
                <Button onClick={close}  variant="outlined">{LANG.cancel}</Button>
                <Button disabled={!edit} onClick={sendForm} variant="contained">{LANG.save}</Button>
            </div>}
        >
            {!edit ? <CalendarInfoBlock data={state} />
            :<div className="AddCalendarEvent">
                <div className="two-element">
                    { !edit ? 
                        <>
                        <div ><NavLink style={{color: state.color}} to={"/"+state.link}>{state.title}</NavLink></div>
                        </>
                     :
                     <>
                       <Input  
                        value={state.title} 
                        label={LANG.GLOBAL.title}
                        disabled={!edit}
                        type="text"
                        addClass="w100"
                        onChange={(e) => handleChange('title', e.target.value)}/>
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
                    />: <TextDescription text={state.text}/> }
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
                <div className="one-element">
                    <Input addClass="w100"
                        value={state.link} 
                        type="text" 
                        disabled={!edit}
                        label={LANG.GLOBAL.link}
                        onChange={(e) => handleChange('link', e.target.value)}
                    />
                </div>
            </div>}
        </Modal>
    )
}

export default AddCalendarEvent;