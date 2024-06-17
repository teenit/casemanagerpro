import axios from "axios";
import React from "react"
import { useState } from "react";
import { serverAddres } from "../../Functions/serverAddres";
import s from "./plan.module.css";
import Textarea from "../../elements/Inputs/Textarea"
import { Button } from "@mui/material";
const ModalPlan = ({modalInfo,close})=>{
    const [feed,setFeed] = useState({title:""})
    function addFeed(){
        if(feed.title == "") return window.alert("Заповніть всі поля");
        let obj = {
            id: localStorage.getItem("id"),
            token: localStorage.getItem("token"),
            title:feed.title.replaceAll("'", "’").replaceAll(/\n/g, "<br />"),
            planID:modalInfo.item.id,
            value:{}
        }
        axios({
            url: serverAddres("event/add-plan-feed.php"),
            method: "POST",
            header : {'Content-Type': 'application/json;charset=utf-8'},
            data : JSON.stringify(obj),
        })
        .then((data)=>{ 
            if(data.data == true) window.location.reload()
        })
        .catch((error)=>console.log(error))  
    }
    return(
        <div className={s.modal__wrap}>
            <div className={s.modal}>
                <div className={s.close} onClick={close}>
                    <span className={s.f}></span>
                    <span className={s.s}></span>
                </div>
                <div className={s.form}>
                <div className={s.result__modal}>
                            <h3 className={s.title}>{modalInfo.item.title}</h3>
                            <div className={s.time__line}><span className={s.plan__time__date}>
                                    <span className={s.plan__time}>{modalInfo.item.timeStart}</span>
                                    <span className={s.plan__date}>{modalInfo.item.dateStart}</span>
                                </span> 
                                <span className={s.plan__time__date}>
                                    <span className={s.plan__time}>{modalInfo.item.timeEnd}</span>
                                    <span className={s.plan__date}>{modalInfo.item.dateEnd}</span>
                                </span>
                            </div>
                            <p dangerouslySetInnerHTML={{__html:modalInfo.item.description}}></p>
                            <div className={s.feed__back__line}>
                                <b>Залишити зворотній зв'язок</b>
                            </div>
                            <div className={s.feed__back__line}>
                                <Textarea value={feed.title} name="feed" id="feed" cols="30" rows="10" onChange={(e)=>{
                                    setFeed({...feed,title:e.target.value})
                                }}></Textarea>
                            </div>
                                <Button variant="contained" onClick={"addFeed"}>Додати зв'язок</Button>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default ModalPlan;