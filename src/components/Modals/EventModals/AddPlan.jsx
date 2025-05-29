import React, { useState, useEffect } from 'react';
import Modal from '../Modal';
import { LANG } from '../../../services/config';
import { Button } from '@mui/material';
import Input from '../../elements/Inputs/Input';
import Textarea from '../../elements/Inputs/Textarea';
import { apiResponse } from '../../Functions/get_apiObj';
import SmallNotification from '../../elements/Notifications/SmallNotification';

const AddPlan = ({ close, event_id, action = "add", data, getEventData }) => {
    const [alert, setAlert] = useState({
        success: false,
        error: false,
        message: ''
    });

    const alertHandler = (key, message = '') => {
        setAlert({ ...alert, [key]: !alert[key], message: message });
    };

    const moment = require('moment');

    const [plan, setPlan] = useState({
        title: "",
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
        description: "",
        event_id: event_id
    });

    useEffect(() => {
        if (action === "edit" && data) {
            setPlan({
                title: data.title || "",
                startDate: data.startDate || "",
                startTime: data.startTime || "",
                endDate: data.endDate || "",
                endTime: data.endTime || "",
                description: data.description || "",
                plan_id: data.plan_id
            });
        }
    }, [action, data, event_id]);

    const planHandler = (key, value) => {
        setPlan({ ...plan, [key]: value });
    };
    const validate = () => {
        if(action=="edit" && JSON.stringify(plan)==JSON.stringify(data)){
            return close()
        }
        const startDateTime = moment(`${plan.startDate} ${plan.startTime}`, "YYYY-MM-DD HH:mm");
        const endDateTime = moment(`${plan.endDate} ${plan.endTime}`, "YYYY-MM-DD HH:mm");

        if (startDateTime.isAfter(endDateTime)) {
            return alertHandler("error", "Дата початку повинна бути раніше дати кінця");
        }

        if (plan.title.length < 1 || plan.startDate.length < 1 || plan.endDate.length < 1 || plan.startTime.length < 1 || plan.endTime.length < 1) {
            return alertHandler("error", "Введіть назву, дату початку і дату кінця плану");
        }
        createPlan()
    }
    const createPlan = () => {
        if (action == "add") {
            apiResponse({
                event_id: event_id,
                meta_key: 'event_plan',
                meta_value: JSON.stringify({ ...plan })
            }, "events/add-event-meta.php").then((res) => {
                alertHandler("success", "План додано")
                close();
                getEventData()
            });
        } else {
            apiResponse({
                meta_id: plan.plan_id,
                meta_value: JSON.stringify({ ...plan })
            }, "events/update-event-meta.php").then((res) => {
                alertHandler("success", "План оновлено")
                close();
                getEventData()
            });
        }
    };

    return (
        <>
            <Modal closeHandler={close} header={action === "edit" ? "Редагувати план" : "Додати план"} footer={
                <>
                    <Button variant="contained" color="error" onClick={close}>{LANG.GLOBAL.cancel}</Button>
                    <Button variant="contained" onClick={validate}>{LANG.GLOBAL.save}</Button>
                </>
            }>
                <Input value={plan.title} label='Назва плану' onChange={(e) => { planHandler("title", e.target.value) }} />
                <div className='Modal--label'>
                    <div><b>Початок плану</b></div>
                    <div className='Modal--split'>
                        <Input type='date' value={plan.startDate} onChange={(e) => { planHandler("startDate", e.target.value) }} />
                        <Input type='time' value={plan.startTime} onChange={(e) => { planHandler("startTime", e.target.value) }} />
                    </div>
                </div>
                <div className='Modal--label'>
                    <div><b>Кінець плану</b></div>
                    <div className='Modal--split'>
                        <Input type='date' value={plan.endDate} onChange={(e) => { planHandler("endDate", e.target.value) }} />
                        <Input type='time' value={plan.endTime} onChange={(e) => { planHandler("endTime", e.target.value) }} />
                    </div>
                </div>
                <Textarea value={plan.description} label='Опис плану' onChange={(e) => { planHandler("description", e.target.value) }} />
            </Modal>
            {alert.success && <SmallNotification isSuccess={true} text={alert.message} close={() => { alertHandler("success") }} />}
            {alert.error && <SmallNotification isSuccess={false} text={alert.message} close={() => { alertHandler("error") }} />}
        </>
    );
};

export default AddPlan;
