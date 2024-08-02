import axios from "axios";
import React from "react";
import { useState } from "react";
import { serverAddres } from "../../Functions/serverAddres";
import s from "./modal.module.css"
import Input from '../../elements/Inputs/Input'
import Textarea from "../../elements/Inputs/Textarea"
import { Button } from "@mui/material";
import SmallNotification from "../../elements/Notifications/SmallNotification";
import { apiResponse } from "../../Functions/get_apiObj";
import { changeApsBr } from "../../Functions/translateString";
const EventAddPlan = ({eventID,getPlans})=>{
    const [alert, setAlert] = useState({
        success:false,
        error:false,
        message:""
    })
    const alertHandler = (key, message="")=>{
        setAlert({...alert, [key]:!alert[key], message:message})
    }
    const [plan,setPlan]  = useState({
        title:"",
        dateStart:"",
        dateEnd:"",
        timeStart:"",
        timeEnd:"",
        description:""
    })
    function addPlan(){       
       if(plan.title == "" || plan.dateStart == ""|| plan.dateEnd == ""|| plan.timeStart == ""|| plan.timeEnd == "" || plan.description == ""){
        return alertHandler("error", "Заповніть усі поля")
       }
       let obj = {
           title:plan.title,
           dateStart:plan.dateStart,
           dateEnd:plan.dateEnd,
           timeStart:plan.timeStart,
           timeEnd:plan.timeEnd,
           description:changeApsBr(plan.description),
           eventID:eventID,
           feedBack:[]
       }
       apiResponse({...obj}, "event/add-plan.php").then((data)=>{ 
           if(data == true){
            alertHandler("success", "План додано")
            getPlans(eventID,"eventPlan")
           }
       })
       .catch((error)=>console.log(error))  
    }
    return(
        <div className={s.add__plan}>
            <p>Додати план</p>
            <div className={s.add__plan__form}>
                <div>
                    <Input onChange={(e)=>{
                            setPlan({...plan,title:e.target.value})
                        }} value={plan.title} type="text" label="Назва плану" />
                </div>
                <div className={s.add__plan__item}>
                    <label htmlFor="">
                        Дата початку
                        <Input onChange={(e)=>{
                            setPlan({...plan,dateStart:e.target.value})
                        }} value={plan.dateStart} type="date" />
                    </label>
                    <label htmlFor="">
                        Час початку
                        <Input onChange={(e)=>{
                            setPlan({...plan,timeStart:e.target.value})
                        }} value={plan.timeStart}  type="time" />
                    </label>
                </div>
                <div className={s.add__plan__item}>
                    <label htmlFor="">
                        Дата кінця
                        <Input onChange={(e)=>{
                            setPlan({...plan,dateEnd:e.target.value})
                        }} value={plan.dateEnd}  type="date" />
                    </label>
                    <label htmlFor="">
                        Час кінця
                        <Input onChange={(e)=>{
                            setPlan({...plan,timeEnd:e.target.value})
                        }} value={plan.timeEnd}  type="time" />
                    </label>
                </div>
                    <Textarea label="Що буде відбуватися?" onChange={(e)=>{
                        setPlan({...plan,description:e.target.value})
                    }} value={plan.description}></Textarea>
                <div className={s.add__plan__item__single}>
                    <Button variant="contained" onClick={addPlan}>Створити план</Button>
                </div>
            </div>
            {alert.success && <SmallNotification isSuccess={true} text={alert.message} close={()=>{alertHandler("success")}}/>}
            {alert.error && <SmallNotification isSuccess={false} text={alert.message} close={()=>{alertHandler("error")}}/>}
        </div>
    )
}

export default EventAddPlan;