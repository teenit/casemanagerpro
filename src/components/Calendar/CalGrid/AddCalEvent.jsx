import React from "react";
import { useState } from "react";
import { get_apiObj } from "../../Functions/get_apiObj";
import AddCalEventForm from "./AddCalEventForm";
import s from "./cal.module.css"
const AddCalEvent = ({close,addEvent,events,keys})=>{
    const [form,setForm] = useState(false)
   
    return(
        <div className={s.modal} onClick={(e)=>{
            if(e.target.className == s.modal) close();
        }}>
                <div className={s.inner}>
        <div className={s.inner__modal}>
            <div className={s.add__title}>
                <div className={s.form__title}>
                    <span>{`${addEvent.date.format("MMMM")} ${addEvent.date.format("YYYY")}`}</span>
                    <span className={s.form__day}>{addEvent.date.format("D")}</span>
                </div>
                <span className={s.plus__add} onClick={()=>{setForm(!form)}}>{form ? "-":"+"}</span>
            </div>
            {form ? <AddCalEventForm close= {()=>{setForm(false)}} date = {addEvent.date}/>:null}
        </div>
        <div className={s.events}>
            <h3>Записи в календарі на сьогодні</h3>
            {events.map((item,index)=>{
                if(keys.happyCase == item.key || keys.myCalendar == item.key || keys.forAll == item.key){
                    if(item.day == addEvent.date.format('D') && item.month == addEvent.date.month()){
                        return(
                            <div key={item.id} className={s.event__line}>
                                <div className={s.event__title}>
                                    <a href={item.value.link} target="_blank" style={{
                                        color:item.value.color
                                    }}>{item.value.title}</a>
                                </div>
                                {
                                    item?.value.start ? 
                                    <div className={s.event__time}>
                                        <div className={s.event__times}>
                                            <input disabled className={s.inp__time} type="time" defaultValue={item.value.start} />
                                            <input disabled className={s.inp__time} type="time" defaultValue={item.value.end} />
                                        </div>
                                    </div>:null
                                }
                                
                                <div className={s.event__text}>
                                    <p dangerouslySetInnerHTML={{__html:item.value.text}}></p>
                                </div>
                            </div>
                        )
                    }}
            })}
        </div>
            
        </div>
        </div>
    )
}

export default AddCalEvent;