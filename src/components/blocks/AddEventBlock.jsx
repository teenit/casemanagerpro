import React, { useState } from 'react'
import { changeAps, changeApsBr, translateStringToLink } from '../Functions/translateString';
import axios from 'axios';
import { serverAddres } from '../Functions/serverAddres';
import { Button } from '@mui/material';
import Textarea from '../elements/Inputs/Textarea';
import InputColor from '../elements/Inputs/InputColor';
import Input from '../elements/Inputs/Input';
import SmallNotification from "../elements/Notifications/SmallNotification"
import { LANG } from '../../services/config';
const AddEventBlock = () => {
    const [event, setEvent] = useState({
        title: "",
        description: "",
        color: "#b399cb"
    })
    const [alert, setAlert] = useState({
        success: false,
        error: false
    })
    const handleAlertChange = (key) => {
        setAlert({ ...alert, [key]: !alert[key] })
    }
    const handleEventChange = (key, value) => {
        if(key!=="color"){
            setEvent({ ...event, [key]: value })
        }else{
            setEvent({...event, color:rgbToHex(value)})
        }
    }
    function rgbToHex(rgb) {
        const rgbArray = rgb.match(/\d+/g);
        const r = parseInt(rgbArray[0]);
        const g = parseInt(rgbArray[1]);
        const b = parseInt(rgbArray[2]);
        const rHex = r.toString(16).padStart(2, '0');
        const gHex = g.toString(16).padStart(2, '0');
        const bHex = b.toString(16).padStart(2, '0');
        return `#${rHex}${gHex}${bHex}`;
    }
    
    
    function createEvent() {
        if (event.title !== "") {
            let link = translateStringToLink(event.title.replace(/ +/g, ' ').trim());
            let obj = {
                id: localStorage.getItem("id"),
                token: localStorage.getItem("token"),
                title: changeAps(event.title),
                description: changeApsBr(event.description),
                color: event.color,
                link: link,
                userName: localStorage.getItem("userName")
            }
            axios({
                url: serverAddres("event/add-event.php"),
                method: "POST",
                header: { 'Content-Type': 'application/json;charset=utf-8' },
                data: JSON.stringify(obj),
            })
                .then(() => {
                    handleAlertChange("success")
                })
                .catch((error) => console.log(error))
        } else {
            handleAlertChange("error")
        }

    }
    return (
        <div className="AddEventBlock">
            <h2>{LANG.addEvent}</h2>
            <div className='AddEventBlock-inner'>
                <div className="AddEventBlock-inner-split">
                    <Input type="text" label="Назва Події" value={event.title} onChange={(e) => { handleEventChange("title", e.target.value) }} />

                    <InputColor value={event.color} onChange={(e) => { handleEventChange("color", e) }} />
                </div>
                <div className='AddEventBlock-inner-textarea'>
                    <Textarea label="Опис Події" value={event.description} onChange={(e) => { handleEventChange("description", e.target.value) }} />
                </div>
                <div>
                    <Button variant='contained' onClick={createEvent}>Створити подію</Button>
                </div>
            </div>
            {alert.success && <SmallNotification isSuccess={true} text={"Подію успішно створено"} close={() => { handleAlertChange("success") }} />}
            {alert.error && <SmallNotification isSuccess={false} text={"Введіть назву події"} close={() => { handleAlertChange("error") }} />}
        </div>
    )
}

export default AddEventBlock