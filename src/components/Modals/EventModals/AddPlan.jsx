import React, { useState } from 'react'
import Modal from '../Modal'
import { LANG } from '../../../services/config'
import { Button } from '@mui/material'
import Input from '../../elements/Inputs/Input'
import Textarea from '../../elements/Inputs/Textarea'


const AddPlan = ({ close }) => {
    const [plan, setPlan] = useState({
        title: "",
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
        description: ""
    })
    const planHandler = (key, value) => {
        setPlan({ ...plan, [key]: value })
    }
    return (
        <Modal closeHandler={close} header={"Додати план"} footer={
            <>
                <Button variant="contained" color="error" onClick={close}>{LANG.GLOBAL.cancel}</Button>
                <Button variant="contained" onClick={() => {
                    close()
                }}>{LANG.GLOBAL.save}</Button>
            </>
        }>
            <Input value={plan.title} label='Назва плану' onChange={(e) => { planHandler("title", e.target.value) }} />
            <div><b>Початок плану</b></div>
            <div className='Modal--split'>
                <Input type='date' value={plan.startDate} onChange={(e) => { planHandler("startDate", e.target.value) }} />
                <Input type='time' value={plan.startTime}  onChange={(e) => { planHandler("startTime", e.target.value) }} />
            </div>
            <div><b>Кінець плану</b></div>
            <div className='Modal--split'>
                <Input type='date' value={plan.endDate} onChange={(e) => { planHandler("endDate", e.target.value) }} />
                <Input type='time' value={plan.endTime} onChange={(e) => { planHandler("endTime", e.target.value) }} />
            </div>
            <Textarea value={plan.description} label='Опис плану' onChange={(e) => { planHandler("description", e.target.value) }} />
        </Modal>
    )
}

export default AddPlan