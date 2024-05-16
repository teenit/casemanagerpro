import React, { useEffect } from "react";
import { useState } from "react";
import s from "./SetEvent.module.css";
import delImg from "./../../../img/icons/delete-48.png";
import axios from "axios";
import { serverAddres } from "../../Functions/serverAddres";
import { NavLink } from "react-router-dom";
import Input from "../../elements/Inputs/Input";
import Textarea from "../../elements/Inputs/Textarea"
import { Button } from "@mui/material";
import { changeAps, changeApsBr } from "../../Functions/translateString"
import { MuiColorInput } from "mui-color-input";
import Icon from "../../elements/Icons/Icon";
const SetEvent = ()=>{
    function transliterate(key){
        var a = {"Ё":"YO","Є":"E","є":"e","Й":"I","Ц":"TS","У":"U","К":"K","Е":"E","Н":"N","Г":"G","Ш":"SH","Щ":"SCH","З":"Z","Х":"H","Ъ":"","ё":"yo","й":"i","ц":"ts","у":"u","к":"k","е":"e","н":"n","г":"g","ш":"sh","щ":"sch","з":"z","х":"h","ъ":"","Ф":"F","Ы":"I","В":"V","А":"a","П":"P","Р":"R","О":"O","Л":"L","Д":"D","Ж":"ZH","Э":"E","ф":"f","ы":"i","в":"v","а":"a","п":"p","р":"r","о":"o","л":"l","д":"d","ж":"zh","э":"e","Я":"Ya","Ч":"CH","С":"S","М":"M","И":"I","Т":"T","Ь":"i","Б":"B","Ю":"YU","я":"ya","ч":"ch","с":"s","м":"m","и":"i","т":"t","ь":"i","ъ":"i","Ъ":"i","'":"i","б":"b","ю":"yu"," ":"-","`":"-","~":"-","'":"-","’":"-",")":"-","(":"-"};
    
        return key.split('').map(function (char) { 
        return a[char] || char; 
    }).join("");
    }
    const [event,setEvent] = useState({
        title:"",
        description:"",
        color:"#b399cb"
    })
    const handleEventChange = (key,value)=>{
        setEvent({...event,[key]:value})
    }
    const [events,setEvents] = useState([])

    useEffect(()=>{
        let obj = {
            id: localStorage.getItem("id"),
            token: localStorage.getItem("token"),
            userName: localStorage.getItem("userName"),
        }
        axios({
            url: serverAddres("event/get-events.php") ,
            method: "POST",
            header : {'Content-Type': 'application/json;charset=utf-8'},
            data : JSON.stringify(obj),
        })
        .then((data)=>{ 
            setEvents(data.data)   
        })
        .catch((error)=>console.log(error)) 
    },[])

    function createEvent(){
        let link = transliterate(event.title.replace(/ +/g, ' ').trim());

        let obj = {
            id: localStorage.getItem("id"),
            token: localStorage.getItem("token"),
            title:changeApsBr(event.title),
            description:changeApsBr(event.description),
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
            console.log(data)   
        })
        .catch((error)=>console.log(error)) 
    }
    return(
        <div className={s.wrap}>
            <div className={s.inner}>
                <div>
                    <h2>Створення події</h2>
                </div>
                <div className={s.item__two}>
                    <Input className={s.inp__title} type="text" label="Введіть назву Події" onChange={(e)=>{handleEventChange("title",e.target.value)}}/>
                    <MuiColorInput className='w50' format="hex" value={event.color} onChange={(e)=>{handleEventChange("color",e)}} />
                </div>
                <div className={s.wr__desc}>
                    <Textarea label="Введіть опис Події" className={s.txt__description} name="" id="" cols="30" rows="10" onChange={(e)=>{handleEventChange("description",e.target.value)}}></Textarea>
                </div>

                <div className={s.wr__btn}>
                    <Button variant="contained" disabled={event.title !== "" && event.description !== "" ? false : true} onClick={createEvent} >Створити подію</Button>
                </div>
            </div>
            <div className={s.results}>
                {events.map((item,index)=>{
                    return(<div key={index} className={s.result}>
                    <div className={s.res__color} style={{backgroundColor:item.color}}></div>
                    <div className={s.res__title}>
                    <NavLink to={`/events/${item.link}`}> <h3>{item.title}</h3></NavLink>
                    </div>
                    <div className={s.res__desc}>
                        <p>{item.description.replaceAll("<br />"," ")}</p>
                    </div>
                    <div className={s.author}>Створив: {item.meta.userName}</div>
                    <div className={s.res__control}>
                        <div className={s.delete}>
                            <Icon icon={"delete"} addClass={"default-icon"}/>
                        </div>
                        <div className={s.date}>{item.meta.date}</div>
                    </div>
                </div>)
                })}
                
            </div>
        </div>
    )
}

export default SetEvent;