import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { serverAddres } from "../Functions/serverAddres";
import s from "./events.module.css"

const AddEvent = ({close,getEvents})=>{
    const [event,setEvent] = useState({
        title:"",
        description:"",
        color:"#b399cb"
    })
    
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
            title:event.title,
            description:event.description,
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
                    <input className={s.inp__title} type="text" placeholder="Введіть назву Події" onChange={(e)=>{
                        setEvent({...event,title:e.target.value.replaceAll("'", "’").replaceAll(/\n/g, "<br />")})
                    }} />
                    </div>
                    <div>
                    <input defaultValue={event.color} type="color" className={s.inp__color} onChange={(e)=>{
                        setEvent({...event,color:e.target.value})
                    }} />
                </div>
                <div className={s.wr__desc}>
                    <textarea placeholder="Введіть опис Події" className={s.txt__description} name="" id="" cols="30" rows="10" onChange={(e)=>{
                        setEvent({...event,description:e.target.value.replaceAll("'", "’").replaceAll(/\n/g, "<br />")})
                    }}></textarea>
                </div>
                <div className={s.wr__btn}>
                    <button disabled={event.title !== "" && event.description !== "" ? false : true} onClick={createEvent} className="primary__btn padding20px">Створити подію</button>
                </div>
            </div>
        </div>
        </div>
        </div>
    )
}

export default AddEvent;


