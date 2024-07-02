import React, { useState } from "react";
import moment from "moment/moment";
import { CalMonitor } from "./CalMonitor/CalMonitor";
import { CalGrid } from "./CalGrid/CalGrid";
import s from "./calendar.module.css"
import { useEffect } from "react";
import { apiResponse, get_apiObj } from "../Functions/get_apiObj";
import FilterCalendar from "./FilterCalendar/FilterCalendar";
import { LANG } from "../../services/config";
const Calendar = () => {
    const [events, setEvents] = useState([]);

    const [keys, setKeys] = useState({
        myCalendar: "myCalendar",
        happyCase: "happyCase",
        forAll: 'forAll'
    })
    const momentTime = moment();
    momentTime['_locale']['_months'] = [
        LANG.calendar.month.January,
        LANG.calendar.month.February,
        LANG.calendar.month.March,
        LANG.calendar.month.April,
        LANG.calendar.month.May,
        LANG.calendar.month.June,
        LANG.calendar.month.July,
        LANG.calendar.month.August,
        LANG.calendar.month.September,
        LANG.calendar.month.October,
        LANG.calendar.month.November,
        LANG.calendar.month.December
    ]
    const weekArray = [
        LANG.calendar.weekDays.Monday,
        LANG.calendar.weekDays.Tuesday,
        LANG.calendar.weekDays.Wednesday,
        LANG.calendar.weekDays.Thursday,
        LANG.calendar.weekDays.Friday,
        LANG.calendar.weekDays.Saturday,
        LANG.calendar.weekDays.Sunday
    ]
    const [today, setToday] = useState(momentTime)
    const startDay = today.clone().startOf('month').startOf('week');
    const prevHandler = () => setToday(prev => prev.clone().subtract(1, 'month'))
    const nextHandler = () => setToday(prev => prev.clone().add(1, 'month'))
    const nowHandler = () => setToday(momentTime)
    const getCalendarList = () => {
        apiResponse({
            month: today.month(),
            year: today.year()
        }, "user/get-cal-month.php").then((res) => {
            setEvents(res)
        })
    }
    useEffect(() => {
        getCalendarList();
    }, [today])


    return (
        <div className={s.calendar}>
            <CalMonitor
                weekArray={weekArray}
                prevHandler={prevHandler}
                nextHandler={nextHandler}
                nowHandler={nowHandler}
                today={today}
            />
            <CalGrid getCalendarList={getCalendarList} keys={keys} events={events} startDay={startDay} today={today} />
            <FilterCalendar filtered={(data, arg) => {
                setKeys({
                    ...keys,
                    [data]: arg
                })
            }} />

        </div>
    )
}
export default Calendar;