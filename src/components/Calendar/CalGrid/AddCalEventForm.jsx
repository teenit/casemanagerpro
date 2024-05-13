import React, { useState } from "react";
import { apiResponse, get_apiObj } from "../../Functions/get_apiObj";
import { changeAps, changeApsBr } from "../../Functions/translateString";
import s from "./cal.module.css"
import Input from '../../elements/Inputs/Input'
import { LANG } from "../../../services/config";
import { Button } from "@mui/material";
import Modal from "../../Modals/Modal"
import Textarea from "../../elements/Inputs/Textarea"
import SmallNotification from "../../elements/Notifications/SmallNotification"
const AddCalEventForm = ({ date, close }) => {
    const [form, setForm] = useState({
        color: {
            requare: true,
            value: "#f5b914",
            error: false
        },
        title: {
            requare: true,
            value: "",
            error: true
        },
        text: {
            requare: true,
            value: "",
            error: true
        },
        link: {
            requare: false,
            value: "",
            error: false
        },
        start: {
            requare: false,
            value: "12:00",
            error: false
        },
        end: {
            requare: false,
            value: "13:00",
            error: false
        },
        day: date.format('D'),
        month: date.month(),
        year: date.year(),
        key: 'myCalendar'
    })
    const [alert,setAlert] = useState({
        success:false,
        error:false
    })
    function sendForm() {
        if (form.title.error || form.color.error || form.link.error || form.text.error) {
            setAlert({...alert,error:true})
        }else{
            apiResponse((data) => {
            }, "user/add-calendar.php", {
                title: form.title.value,
                text: changeApsBr(form.text.value),
                color: form.color.value,
                link: form.link.value,
                start: form.start.value,
                end: form.end.value,
                day: form.day,
                month: form.month,
                year: form.year,
                key: form.key
            })
            close()
            setAlert({...alert,success:true})
        }


    }
    return (
        <Modal header={"Додати подію"} closeHandler={close} footer={<div className="Modal--footer">
            <Button onClick={close} color="error" variant="contained">{LANG.cancel}</Button>
            <Button onClick={sendForm} variant="contained">{LANG.save}</Button>
        </div>}>
            <div className={s.add__form}>
                <div className={s.add__form__line}>
                    <div className={s.add__form__f__line}>
                        <div className={s.add__form__title}>
                            <Input value={form.title.value} label="Назва *" type="text"
                                onChange={(e) => {
                                    let error = true;
                                    if (form.title.requare && changeAps(e.target.value).length > 1) error = false;
                                    setForm({
                                        ...form,
                                        title: {
                                            ...form.title,
                                            value: changeAps(e.target.value),
                                            error: error
                                        }
                                    })
                                }} />
                        </div>
                        <div className={s.add__form__color}>
                            <input value={form.color.value} title="Колір івенту" className={s.add__form__color__inp} type="color"
                                onChange={(e) => {
                                    setForm({
                                        ...form,
                                        color: {
                                            ...form.color,
                                            value: e.target.value
                                        }
                                    })
                                }} />
                        </div>
                    </div>
                </div>
                <div className={s.add__form__line}>
                    <div className={s.add__form__row}>
                        <label htmlFor="">Початок<Input value={form.start.value} type="time" name="" id=""
                            onChange={(e) => {
                                setForm({
                                    ...form,
                                    start: {
                                        ...form.start,
                                        value: e.target.value
                                    }
                                })
                            }} /></label>

                        <label htmlFor="">Кінець<Input value={form.end.value} type="time" name="" id=""
                            onChange={(e) => {
                                setForm({
                                    ...form,
                                    end: {
                                        ...form.end,
                                        value: e.target.value
                                    }
                                })
                            }} /></label>
                    </div>
                </div>
                <div className={s.add__form__line}>
                        <Textarea value={form.text.value} label="Введіть текст події *" cols="30" rows="10"
                            onChange={(e) => {
                                let error = true;
                                if (form.text.requare && e.target.value.length > 5) error = false;
                                setForm({
                                    ...form,
                                    text: {
                                        ...form.text,
                                        value: e.target.value,
                                        error: error
                                    }
                                })
                            }}></Textarea>
                </div>
                <div className={s.add__form__line}>
                    <label htmlFor="forAll">Для всіх<input type="checkbox" name="forAll" id="forAll"
                        onChange={(e) => {
                            setForm({
                                ...form,
                                key: e.target.checked ? 'forAll' : 'myCalendar'
                            })
                        }} /></label>
                </div>
                <div className={s.add__form__line}>
                    <div className={s.add__form__link}>
                        <Input value={form.link.value} type="text" label="Додати посилання"
                            onChange={(e) => {
                                let error = true;
                                if (changeAps(e.target.value).length > 1) error = false;
                                setForm({
                                    ...form,
                                    link: {
                                        ...form.link,
                                        value: changeAps(e.target.value),
                                        error: error
                                    }
                                })
                            }} />
                    </div>
                    {alert.success && <SmallNotification isSuccess={true} text={"Подію додано"} close={()=>{setAlert({...alert,success:false})}}/>}
            {alert.error && <SmallNotification isSuccess={false} text={"Перевірте правильність введених даних"} close={()=>{setAlert({...alert,error:false})}}/>}

                </div>
                
            </div>
        </Modal>
    )
}

export default AddCalEventForm;