import React from "react";
import s from "./style.module.css"
import { LANG } from "../../../services/config";
const CalMonitor = ({today,prevHandler,nextHandler,nowHandler,weekArray})=>{
    return (
        <div className={s.inner}>
            <div className={s.wrap}>
            <div className={s.date}>
                <div className={s.month}>{today.format("MMMM")}</div>
                <div>{today.format("YYYY")}</div>
            </div>
            <div className={s.control}>
                <button className={s.control__btn} onClick={prevHandler}>{'<'}</button>
                <button className={s.control__btn} onClick={nowHandler}>{LANG.calendar.today}</button>
                <button className={s.control__btn} onClick={nextHandler}>{'>'}</button>
            </div>
        </div>
       
        <div className={s.week}>
            {weekArray.map((item)=> <div className={s.days__week} key={item}>{item}</div>)}
        </div>
        </div>
        
        
    )
}
export {CalMonitor}