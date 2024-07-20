import React, { useEffect, useState } from 'react'
import Icon from '../../elements/Icons/Icon'
import { LANG } from '../../../services/config'
import Textarea from "../../elements/Inputs/Textarea"
import SmallNotification from "../../elements/Notifications/SmallNotification"
import Modal from "../../Modals/Modal"
import { Button } from '@mui/material'
import Input from '../../elements/Inputs/Input'
import { apiResponse } from '../../Functions/get_apiObj'
const Fields = ({ fields, getCaseInfo, case_id }) => {
    const [alert, setAlert] = useState({
        success: false,
        error: false,
        message: ""
    })
    const [open, setOpen] = useState(false)
    const openHandler = () => {
        localStorage.setItem("page_case_fields", !open)
        setOpen(!open)
    }
    useEffect(() => {
        let item = localStorage.getItem("page_case_fields")
        if (item) {
            if (item == "true") {
                setOpen(true)
            } else {
                setOpen(false)
            }
        } else {
            setOpen(false)
        }
    }, [])
    const [dataState, setDataState] = useState(fields)
    const [newInfo, setNewInfo] = useState({
        title: "",
        description:"",
    })
    const newInfoHandler = (key, value) => {
        setNewInfo({ ...newInfo, [key]: value })
    }
    const addInfo = () => {
        if (newInfo.title.length < 1 || newInfo.description.length < 1) return handleAlertChange("error", LANG.fields.alertMessages.errorAddEmpty)
        if (newInfo.title.length > 125) return handleAlertChange("error", LANG.fields.alertMessages.errorAddLong)
        apiResponse({...newInfo, type:"field", client_id: case_id }, "manage/files/create.php").then((res) => {
            handleAlertChange("success", LANG.fields.alertMessages.successAdd)
            getCaseInfo()
            setModal(false)
        }).catch((err) => {
            handleAlertChange("error", LANG.fields.alertMessages.errorAdd)
        })
    }
    const [modal, setModal] = useState(false)
    const handleDataChange = (key, value) => {
        setDataState({ ...dataState, [key]: value })
    }
    const handleAlertChange = (key, message) => {
        setAlert({ ...alert, [key]: !alert[key], message: message })
    }
    const handleSave = (key, value) => {
        let previousData = dataState[key]
        if (previousData !== value) {
            handleDataChange(key, value)
            handleAlertChange("success", LANG.detailedInfo.alerts.success)
            setNewInfo({...newInfo, title:"", value:""})
        }
    }

    const InfoBlock = ({ item }) => {
        const [edit, setEdit] = useState(false)
        return item && (
            <div className='Fields-InfoBlock'>
                <div className='Fields-InfoBlock-title'>
                    <div className='Fields-InfoBlock-title-block'>{item.title}</div>
                    {/* <span onClick={() => { setEdit(!edit) }}>
                            <Icon icon={"edit"} addClass={"default-icon"} />
                        </span> */}
                </div>
                 <span>{item.description}</span>

            </div>
        )
    }
    return (
        <div className='Fields'>
            <div className='Fields-title' >
                <div className='Fields-title-panel' onClick={openHandler}>
                    <div>{LANG.fields.title}</div>
                    <Icon icon={"arrow_down"} addClass={"fs35"} />
                </div>
                <Icon icon={"add"} addClass={"fs35"} onClick={() => { setModal(true) }} />
            </div>
            {open && <div className='content'>
                {fields.map((item, index) => {
                    return (
                        <InfoBlock key={index} item={item} />
                    )
                })}
                <InfoBlock />
                {modal && <Modal closeHandler={() => { setModal(false) }} header={LANG.fields.add} footer={
                    <div className="Modal--footer">
                        <Button color="error" variant="contained" onClick={() => { setModal(false) }}>{LANG.cancel}</Button>
                        <Button variant="contained" onClick={addInfo}>{LANG.save}</Button>
                    </div>
                }>
                    <Input value={newInfo.title} onChange={(e) => { newInfoHandler("title", e.target.value) }} label={LANG.GLOBAL.title} />
                    <Textarea value={newInfo.description} onChange={(e) => { newInfoHandler("description", e.target.value) }} label={LANG.GLOBAL.description} />
                </Modal>}
            </div>}

            {alert.success && <SmallNotification isSuccess={true} text={alert.message} close={() => { handleAlertChange("success", "") }} />}
            {alert.error && <SmallNotification isSuccess={false} text={alert.message} close={() => { handleAlertChange("error", "") }} />}
        </div>
    )
}

export default Fields