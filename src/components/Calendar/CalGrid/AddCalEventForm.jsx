import React, { useState } from "react";
import { get_apiObj } from "../../Functions/get_apiObj";
import { changeAps, changeApsBr } from "../../Functions/translateString";
import s from "./cal.module.css"
const AddCalEventForm = ({date,close})=>{
    const [form,setForm] = useState({
        color:{
            requare:true,
            value:"#f5b914",
            error:false
        },
        title:{
            requare:true,
            value:"",
            error:true
        },
        text:{
            requare:true,
            value:"",
            error:true
        },
        link:{
            requare:false,
            value:"",
            error:false
        },
        start:{
            requare:false,
            value:"12:00",
            error:false
        },
        end:{
            requare:false,
            value:"13:00",
            error:false
        },
        day:date.format('D'),
        month:date.month(),
        year:date.year(),
        key:'myCalendar'
    })
    function sendForm(){
        if(form.title.error || form.color.error || form.link.error || form.text.error){
            return window.alert("Перевірте правильність введених даних")
        }

        get_apiObj((data)=>{
            close()
           },"user/add-calendar.php",{
            title:form.title.value,
            text:changeApsBr(form.text.value),
            color:form.color.value,
            link:form.link.value,
            start:form.start.value,
            end:form.end.value,
            day:form.day,
            month:form.month,
            year:form.year,
            key:form.key
           })
    }
    return(
        <div className={s.add__form}>
            <div className={s.add__form__line}>
                <div className={s.add__form__f__line}>
                    <div className={s.add__form__title}>
                        <input value={form.title.value} placeholder="Назва *" type="text" 
                        onChange={(e)=>{
                            let error = true;
                            if(form.title.requare && changeAps(e.target.value).length > 1) error = false;
                            setForm({
                                ...form,
                                title:{
                                    ...form.title,
                                    value: changeAps(e.target.value),
                                    error:error
                                }
                            })
                        }}/>
                    </div>
                    <div className={s.add__form__color}>
                        <input value={form.color.value} title="Колір івенту" className={s.add__form__color__inp} type="color" 
                        onChange={(e)=>{
                            setForm({
                                ...form,
                                color:{
                                    ...form.color,
                                    value: e.target.value
                                }
                            })
                        }}/>
                    </div>
                </div>
            </div>
            <div className={s.add__form__line}>
                <div className={s.add__form__time}>
                    <label htmlFor="">Початок<input value={form.start.value} type="time" name="" id="" 
                     onChange={(e)=>{
                        setForm({
                            ...form,
                            start:{
                                ...form.start,
                                value: e.target.value
                            }
                        })
                    }}/></label>
                    
                    <label htmlFor="">Кінець<input value={form.end.value} type="time" name="" id="" 
                     onChange={(e)=>{
                        setForm({
                            ...form,
                            end:{
                                ...form.end,
                                value: e.target.value
                            }
                        })
                    }}/></label>
                </div>
            </div>
            <div className={s.add__form__line}>
                <div className={s.add__form__text}>
                    <textarea value={form.text.value} placeholder="Введіть текст події *" cols="30" rows="10"
                   onChange={(e)=>{
                    let error = true;
                    if(form.text.requare && e.target.value.length > 5) error = false;
                    setForm({
                        ...form,
                        text:{
                            ...form.text,
                            value: e.target.value,
                            error:error
                        }
                    })
                }}></textarea>
                </div>
            </div>
            <div className={s.add__form__line}>
            <label htmlFor="forAll">Для всіх<input type="checkbox" name="forAll" id="forAll" 
                     onChange={(e)=>{
                        setForm({
                            ...form,
                            key: e.target.checked ? 'forAll' : 'myCalendar'
                        })
                    }}/></label>
            </div>
            <div className={s.add__form__line}>
                <div className={s.add__form__link}>
                    <input value={form.link.value} type="text" placeholder="Додати посилання" 
                    onChange={(e)=>{
                        let error = true;
                        if(changeAps(e.target.value).length > 1) error = false;
                        setForm({
                            ...form,
                            link:{
                                ...form.link,
                                value: changeAps(e.target.value),
                                error:error
                            }
                        })
                    }}/>
                </div>
            </div>
            <div className={s.add__form__line}>
                <div className={s.add__form__button}>
                    <button className="primary__btn" onClick={sendForm}>Зберегти</button>
                </div>
            </div>
        </div>
    )
}

export default AddCalEventForm;