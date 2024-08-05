import React, { useState } from "react";
import { apiResponse, get_apiObj } from "../../Functions/get_apiObj";
import { changeAps, changeApsBr } from "../../Functions/translateString";
import s from "./cal.module.css"
import Input from '../../elements/Inputs/Input'
import { LANG } from "../../../services/config";
import { Button, Checkbox } from "@mui/material";
import Modal from "../../Modals/Modal"
import Textarea from "../../elements/Inputs/Textarea"
import SmallNotification from "../../elements/Notifications/SmallNotification"

const AddCalEventForm = ({ date, close, getCalendarList }) => {
    const [form, setForm] = useState({
        color: "#f5b914",
        title: "",
        text: "",
        link: "",
        start: "12:00",
        end: "13:00",
        day: date.format('D'),
        month: date.month() + 1,
        year: date.year(),
        key: 'myCalendar',
        every_year: 0
    });

    const [alert, setAlert] = useState({
        success: false,
        error: false,
        message: ""
    });

    const handleChange = (field, value) => {
        setForm(prevForm => ({ ...prevForm, [field]: value }));
    };

    const validateForm = () => {
        if (form.title.length === 0 || form.start.length === 0 || form.end.length === 0) {
            setAlert({ success: false, error: true, message: "Введіть назву, дату початку та дату кінця події" });
            return false;
        } else if (form.title.length > 75) {
            setAlert({ success: false, error: true, message: `Назв аповинна бути довжиною до 75 символів. Поточна довжина: ${form.title.length} символів` });
            return false;
        }else{
            return true
        }
    };

    const saveHandler = () => {
        apiResponse({
            title: form.title,
            text: changeApsBr(form.text),
            color: form.color,
            link: form.link,
            start: form.start,
            end: form.end,
            day: form.day,
            month: form.month,
            year: form.year,
            key: form.key,
            every_year: form.every_year
        }, "user/add-calendar.php").then((res) => {
            getCalendarList();
            close();
        });
    };

    const sendForm = () => {
        if (validateForm()) {
            saveHandler();
            setAlert({ success: true, error: false, message: LANG.calendar.add_event.alertMessages.success });
        }
    };

    return (
        <Modal header={LANG.calendar.add_event.title} closeHandler={close} footer={
            <div className="Modal--footer">
                <Button onClick={close} color="error" variant="contained">{LANG.cancel}</Button>
                <Button onClick={sendForm} variant="contained">{LANG.save}</Button>
            </div>
        }>
            <div className={s.add__form}>
                <div className={s.add__form__line}>
                    <div className={s.add__form__f__line}>
                        <div className={s.add__form__title}>
                            <Input 
                                value={form.title} 
                                label={LANG.GLOBAL.title}
                                type="text"
                                onChange={(e) => handleChange('title', changeAps(e.target.value))}
                            />
                        </div>
                        <div className={s.add__form__color}>
                            <input 
                                value={form.color} 
                                title={LANG.GLOBAL.color} 
                                className={s.add__form__color__inp} 
                                type="color"
                                onChange={(e) => handleChange('color', e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className={s.add__form__line}>
                    <div className={s.add__form__row}>
                        <label>{LANG.GLOBAL.start}
                            <Input 
                                value={form.start} 
                                type="time" 
                                onChange={(e) => handleChange('start', e.target.value)}
                            />
                        </label>
                        <label>{LANG.GLOBAL.end}
                            <Input 
                                value={form.end} 
                                type="time" 
                                onChange={(e) => handleChange('end', e.target.value)}
                            />
                        </label>
                    </div>
                </div>
                <div className={s.add__form__line}>
                    <Textarea 
                        value={form.text} 
                        label={LANG.GLOBAL.description} 
                        cols="30" 
                        rows="10"
                        onChange={(e) => handleChange('text', e.target.value)}
                    />
                </div>
                <div className={s.add__form__line}>
                    <label>{LANG.calendar.add_event.for_all}
                        <Checkbox 
                            onChange={(e) => handleChange('key', e.target.checked ? 'forAll' : 'myCalendar')}
                        />
                    </label>
                </div>
                <div className={s.add__form__line}>
                    <label>{LANG.calendar.add_event.repeat}
                        <Checkbox 
                            onChange={(e) => handleChange('every_year', e.target.checked ? 1 : 0)}
                        />
                    </label>
                </div>
                <div className={s.add__form__line}>
                    <div className={s.add__form__link}>
                        <Input 
                            value={form.link} 
                            type="text" 
                            label={LANG.GLOBAL.link}
                            onChange={(e) => handleChange('link', changeAps(e.target.value))}
                        />
                    </div>
                    {alert.success && 
                        <SmallNotification 
                            isSuccess={true} 
                            text={alert.message} 
                            close={() => setAlert({ ...alert, success: false })}
                        />
                    }
                    {alert.error && 
                        <SmallNotification 
                            isSuccess={false} 
                            text={alert.message} 
                            close={() => setAlert({ ...alert, error: false })}
                        />
                    }
                </div>
            </div>
        </Modal>
    );
};

export default AddCalEventForm;
