import React from "react";
import s from "./cal.module.css"
import moment from "moment";
import AddCalEvent from "./AddCalEvent";
import { useState } from "react";
const CalGrid =({keys,startDay,today,events})=>{
    const day = startDay.clone()
    const [addEvent, setAddEvent] = useState({
        open:false,
        date:''
    })
    const arrayDays = [...Array(42)].map(()=> day.add(1,'day').clone());
    const currentDay = (day)=> moment().isSame(day,'day')
    const currentMonth = (day)=> today.isSame(day,'month')
   
    return(
        <div className={s.wrap}>
         {addEvent.open ? <AddCalEvent keys = {keys} events = {events} addEvent = {addEvent} close = {()=>{setAddEvent({...addEvent,open:false})}}/> : null}    
            <div className={s.cal}>
                {
                arrayDays.map((item,i)=>{
                    return(
                        <div key={item.unix()} className={`${s.cell} ${currentDay(item) ? s.current__day : null} ${item.day() == 6 || item.day() == 0 ? s.weekend:null}`} 
                        onClick={()=>{setAddEvent({...addEvent,open:true,date:item})}}>
                            <div className={`${s.date} ${currentMonth(item) ? s.current__month:null}`}>
                                <div className={`${s.day} ${currentDay(item) ? s.currentDay : null}`}>{item.format('D')}</div>
                            </div>
                            <div className={s.events__wrap}>
                            {events.map((eve,ind)=>{    
                                if(keys.happyCase == eve.key || keys.myCalendar == eve.key || keys.forAll == eve.key){
                                    if(eve.day == item.format('D') && eve.month == item.month()){
                                        return(
                                            <div onClick={()=>{setAddEvent({...addEvent,open:true,date:item})}}
                                            key={item.unix() + ind} className={s.event__day} style={{
                                                background:eve.value.color
                                            }} title={eve.value.title}></div>
                                        )
                                    }
                                }
                                    
                                })}
                                </div>
                        </div>
                    )
                })
            }</div>
        </div>
        
    )
}
export {CalGrid};