import axios from "axios";
import React from "react";
import { useState } from "react";
import { serverAddres } from "../../Functions/serverAddres";
import s from "./modal.module.css"
import Input from '../../elements/Inputs/Input'

const EventAddPlan = ({eventID,getPlans})=>{
    const [plan,setPlan]  = useState({
        title:"",
        dateStart:"",
        dateEnd:"",
        timeStart:"",
        timeEnd:"",
        description:""
    })
    function addPlan(){
       let a = `".replaceAll("'", "’").replaceAll(/\n/g, "<br />")"`
       
       if(plan.title == "" || plan.dateStart == ""|| plan.dateEnd == ""|| plan.timeStart == ""|| plan.timeEnd == "" || plan.description == "") return window.alert("Заповніть всі поля");
       let obj = {
           id: localStorage.getItem("id"),
           token: localStorage.getItem("token"),
           title:plan.title,
           dateStart:plan.dateStart,
           dateEnd:plan.dateEnd,
           timeStart:plan.timeStart,
           timeEnd:plan.timeEnd,
           description:plan.description.replaceAll("'", "’").replaceAll(/\n/g, "<br />"),
           eventID:eventID,
           feedBack:[]
       }
       axios({
           url: serverAddres("event/add-plan.php"),
           method: "POST",
           header : {'Content-Type': 'application/json;charset=utf-8'},
           data : JSON.stringify(obj),
       })
       .then((data)=>{ 
           if(data.data == true){
            getPlans(eventID,"eventPlan")
           }
       })
       .catch((error)=>console.log(error))  
    }
    return(
        <div className={s.add__plan}>
            <p>Додати план</p>
            <div className={s.add__plan__form}>
                <div className={s.add__plan__item}>
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
                <div className={s.item__textarea} >
                    <label htmlFor="">
                        План
                    </label>
                    <textarea placeholder="Що буде?" onChange={(e)=>{
                        setPlan({...plan,description:e.target.value})
                    }} value={plan.description} name="" id="" cols="30" rows="10" label="Саме план... Що буде?"></textarea>
                </div>
                <div className={s.add__plan__item}>
                    <button onClick={addPlan} className="primary__btn">Створити план</button>
                </div>
            </div>
        </div>
    )
}

export default EventAddPlan;