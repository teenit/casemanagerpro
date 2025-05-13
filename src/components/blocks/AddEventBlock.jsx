import React, { useState } from 'react';
import { changeAps, changeApsBr, translateStringToLink } from '../Functions/translateString';
import axios from 'axios';
import { serverAddres } from '../Functions/serverAddres';
import { Button } from '@mui/material';
import Textarea from '../elements/Inputs/Textarea';
import InputColor from '../elements/Inputs/InputColor';
import Input from '../elements/Inputs/Input';
import SmallNotification from "../elements/Notifications/SmallNotification";
import { LANG } from '../../services/config';
import { apiResponse } from "../Functions/get_apiObj";

const AddEventBlock = ({ successHandler }) => {
    const [event, setEvent] = useState({
        title: "",
        description: "",
        color: "#b399cb"
    });
    const [alert, setAlert] = useState({
        success: false,
        error: false,
        message: ""
    });

    const handleAlertChange = (key, message = "") => {
        setAlert({ ...alert, [key]: !alert[key], message });
    };

    const handleEventChange = (key, value) => {
        setEvent({ ...event, [key]: value });
    };

    const createEvent = () => {
        if (event.title.length<1) return handleAlertChange("error", "Введіть назву події")
        if(event.title.length>75) return handleAlertChange("error", `Назва події поивнна бути довжиною до 75 символів. Поточна довжина: ${event.title.length} символів`)
            let link = translateStringToLink(event.title.replace(/ +/g, ' ').trim());
            let obj = {
                title: changeAps(event.title),
                description: changeApsBr(event.description),
                color: event.color,
                link: link,
                userName: localStorage.getItem("userName")
            };
            apiResponse({ ...obj }, "event/add-event.php")
                .then(() => {
                    handleAlertChange("success", "Подію успішно створено");
                    successHandler();
                })
                .catch((error) => console.log(error));
    };

    return (
        <div className="AddEventBlock">
            <h2>{LANG.addEvent}</h2>
            <div className='AddEventBlock-inner'>
                <div className="AddEventBlock-inner-split">
                    <Input type="text" label="Назва Події" value={event.title} onChange={(e) => { handleEventChange("title", e.target.value) }} />
                    <InputColor value={event.color} onChange={(e) => { handleEventChange("color", e.target.value) }} />
                </div>
                <div className='AddEventBlock-inner-textarea'>
                    <Textarea label="Опис Події" value={event.description} onChange={(e) => { handleEventChange("description", e.target.value) }} />
                </div>
                <div>
                    <Button variant='contained' onClick={createEvent}>Створити подію</Button>
                </div>
            </div>
            {alert.success && <SmallNotification isSuccess={true} text={alert.message} close={() => { handleAlertChange("success") }} />}
            {alert.error && <SmallNotification isSuccess={false} text={alert.message} close={() => { handleAlertChange("error") }} />}
        </div>
    );
};

export default AddEventBlock;
