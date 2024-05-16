import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { serverAddres } from "../Functions/serverAddres";
import s from "./events.module.css"
import {changeAps, changeApsBr} from "../Functions/translateString"
import Input from "../elements/Inputs/Input"
import Textarea from "../elements/Inputs/Textarea"
import { Button } from "@mui/material";
import { MuiColorInput } from "mui-color-input";
import InputColor from "../elements/Inputs/InputColor";
const AddEvent = ({close,getEvents})=>{
    const [event,setEvent] = useState({
        title:"",
        description:"",
        color:"#b399cb"
    })
    const handleEventChange = (key,value)=>{
        setEvent({...event,[key]:value})
    }
    function transliterate(key){
        var a = {"Ё":"YO","Є":"E","є":"e","Й":"I","Ц":"TS","У":"U","К":"K","Е":"E","Н":"N","Г":"G","Ш":"SH","Щ":"SCH","З":"Z","Х":"H","Ъ":"","ё":"yo","й":"i","ц":"ts","у":"u","к":"k","е":"e","н":"n","г":"g","ш":"sh","щ":"sch","з":"z","х":"h","ъ":"","Ф":"F","Ы":"I","В":"V","А":"a","П":"P","Р":"R","О":"O","Л":"L","Д":"D","Ж":"ZH","Э":"E","ф":"f","ы":"i","в":"v","а":"a","п":"p","р":"r","о":"o","л":"l","д":"d","ж":"zh","э":"e","Я":"Ya","Ч":"CH","С":"S","М":"M","И":"I","Т":"T","Ь":"i","Б":"B","Ю":"YU","я":"ya","ч":"ch","с":"s","м":"m","и":"i","т":"t","ь":"i","ъ":"i","Ъ":"i","'":"i","б":"b","ю":"yu"," ":"-","`":"-","~":"-","'":"-","’":"-",")":"-","(":"-"};
        return key.split('').map(function (char) { 
        return a[char] || char; 
    }).join("");
    }
    function createEvent(){
        let link = transliterate(event.title.replace(/ +/g, ' ').trim());
        let obj = {
            id: localStorage.getItem("id"),
            token: localStorage.getItem("token"),
            title:changeAps(event.title),
            description: changeApsBr(event.description),
            color:event.color,
            link:link,
            userName: localStorage.getItem("userName")
        }
    
        axios({
            url: serverAddres("event/add-event.php") ,
            method: "POST",
            header : {'Content-Type': 'application/json;charset=utf-8'},
            data : JSON.stringify(obj),
        })
        .then((data)=>{ 
            alert('Подію успішно створено')
            getEvents();
            close()
        })
        .catch((error)=>console.log(error)) 
    }
    return(
        <div className={s.modal__wrap}>
            <div className={s.inner__modal}>
            <div className={s.black} onClick={close}></div>
            <div className={s.info}>
            <div className={s.info__inner__modal}>
                    <h2>Створення події</h2>
                
                <div className={s.item__two}>
                    <Input className={s.inp__title} type="text" label="Назва Події" onChange={(e)=>{handleEventChange("title",e.target.value)}} />
                    </div>
                    <div>
                    <InputColor value={event.color} onChange={(e)=>{handleEventChange("color",e.target.value)}} />
                </div>
                <div className={s.wr__desc}>
                    <Textarea label="Опис Події" className={s.txt__description} name="" id="" cols="30" rows="10" onChange={(e)=>{handleEventChange("description",e.target.value)}}/>
                </div>
                    <Button disabled={event.title !== "" && event.description !== "" ? false : true} onClick={createEvent}>Створити подію</Button>
            </div>
        </div>
        </div>
        </div>
    )
}

export default AddEvent;


