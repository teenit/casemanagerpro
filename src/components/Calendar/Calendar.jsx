import React, { useState } from "react";
import moment from "moment/moment";
import { CalMonitor } from "./CalMonitor/CalMonitor";
import { CalGrid } from "./CalGrid/CalGrid";
import s from "./calendar.module.css"
import { useEffect } from "react";
import { apiResponse, get_apiObj } from "../Functions/get_apiObj";
import FilterCalendar from "./FilterCalendar/FilterCalendar";
const Calendar = ()=>{
const [events,setEvents] = useState([]);

const [keys,setKeys] = useState({
    myCalendar:"myCalendar",
    happyCase:"happyCase",
    forAll:'forAll'
})
const momentTime = moment();
momentTime['_locale']['_months'] = [
    "Січень","Лютий","Березень","Квітень","Травень","Червень","Липень","Серпень","Вересень","Жовтень","Листопад","Грудень",
]
const weekArray = ["ПН","ВТ","СР","ЧТ","ПТ","СБ","НД",]
const [today,setToday] = useState(momentTime)
const startDay = today.clone().startOf('month').startOf('week');
const prevHandler = () => setToday(prev => prev.clone().subtract(1,'month'))
const nextHandler = () => setToday(prev => prev.clone().add(1,'month'))
const nowHandler = () => setToday(momentTime)
const getCalendarList = () => {
    apiResponse({ month:today.month(),
        year:today.year()}, "user/get-cal-month.php").then((res)=>{
            setEvents(res)
        })
}
useEffect(()=>{
    getCalendarList();
},[today])


    return(
        <div className={s.calendar}>
            <CalMonitor
             weekArray = {weekArray}
             prevHandler = {prevHandler}
             nextHandler = {nextHandler}
             nowHandler = {nowHandler}
             today = {today}
             />
            <CalGrid getCalendarList = {getCalendarList} keys={keys} events = {events} startDay = {startDay} today={today}/>
            <FilterCalendar  filtered = {(data,arg)=>{
                setKeys({
                    ...keys,
                    [data]:arg
                })
             }}/>
             
        </div>
    )
}
export default Calendar;