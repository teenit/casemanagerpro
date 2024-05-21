import React, { useEffect } from "react";
import { useState } from "react";
import { get_apiObj } from "../../Functions/get_apiObj";
import AddCalEventForm from "./AddCalEventForm";
import s from "./cal.module.css"
const AddCalEvent = ({ close, addEvent, events, keys, getCalendarList }) => {
    const [form, setForm] = useState(false)
    const dayEvents = events.filter(item => item.day == addEvent.date.format('D') && item.month == addEvent.date.month());
    const dayEventsWithoutFull = dayEvents.filter(item=> item.value.start!=="0:00"&&item.value.end!=="23:59")
    const endDay = Math.min(...dayEventsWithoutFull.map(item => Number(item.value.start.slice(0, 2))), 8);
    const startDay = Math.max(...dayEventsWithoutFull.map(item => Number(item.value.end.slice(0, 2))), 20);
    const timeMas = Array(startDay - endDay + 1).fill().map((item, index) => index + endDay);
const sortedDayEvents = dayEvents.sort((a, b) => {
    const startTimeA = Number(a.value.start.slice(0, 2));
    const startTimeB = Number(b.value.start.slice(0, 2));
    return startTimeA - startTimeB;
});

    
    return (
        <div className={s.modal} onClick={(e) => {
            if (e.target.className == s.modal) close();
        }}>
            <div className={s.inner}>
                <div className={s.inner__modal}>
                    <div className={s.add__title}>
                        <div className={s.form__title}>
                            <span>{`${addEvent.date.format("DD")} ${addEvent.date.format("MMMM")}, ${addEvent.date.format("dddd")}`}</span>
                        </div>
                        <span className={s.plus__add} onClick={() => { setForm(!form) }}>{form ? "-" : "+"}</span>
                    </div>
                    {form ? <AddCalEventForm getCalendarList = {getCalendarList} close={() => { setForm(false) }} date={addEvent.date} /> : null}
                    <div className={s.inner__content}>
                        <div className={s.timetable}>
                            {timeMas.map((item, index) => {

                                return (
                                    <div key={index} className={s.timetable__row}>
                                        <div className={s.timetable__row__left}>{item + ":00"}</div>
                                        <div className={s.timetable__row__right}>

                                            {dayEvents.map((evItem, evIndex) => {
                                                if (keys.myCalendar == evItem.key || keys.forAll == evItem.key) {
                                                        if(evItem.value.start.slice(0,2)==item)
                                                        return (
                                                            <div className={s.timetable__event} key={evIndex} style={{height: (evItem.value.end.slice(0,2)-evItem.value.start.slice(0,2)-2)*1.5+(39/60)*((evItem.value.end.slice(0,2)-evItem.value.start.slice(0,2))*60+(evItem.value.end.slice(3,5)-evItem.value.start.slice(3,5)))+"px",marginTop:(39/60)*evItem.value.start.slice(3,5)}}>
                                                                <div className={s.event__color__line} style={{ backgroundColor: evItem.value.color, }}></div>
                                                                <p><b>{evItem.value.title}</b></p>
                                                            </div>

                                                        )
                                                }
                                                })}

                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className={s.events}>
                            {sortedDayEvents.map((item, index) => {
                                if (keys.happyCase == item.key || keys.myCalendar == item.key || keys.forAll == item.key) {
                                    if (item.day == addEvent.date.format('D') && item.month == addEvent.date.month()) {
                                        return (
                                            <div key={item.id} className={s.event__line}>
                                                <div className={s.event__color__line} style={{ backgroundColor: item.value.color }}></div>
                                                <div className={s.event__title}>
                                                    <a href={item.value.link} target="_blank" style={{
                                                        color: item.value.color
                                                    }}>{item.value.title}</a>
                                                    {
                                                        item?.value.start ?
                                                            <div className={s.event__time}>
                                                                <p>{`${item.value.start} - ${item.value.end}`}</p>
                                                            </div> : null
                                                    }
                                                </div>


                                                <div className={s.event__text}>
                                                    <p dangerouslySetInnerHTML={{ __html: item.value.text }}></p>
                                                </div>
                                            </div>
                                        )
                                    }
                                }
                            })}
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default AddCalEvent;