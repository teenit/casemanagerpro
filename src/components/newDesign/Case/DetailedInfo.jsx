import React, { useEffect, useState } from 'react'
import Icon from '../../elements/Icons/Icon'
import { LANG } from '../../../services/config'
import Textarea from "../../elements/Inputs/Textarea"
import SmallNotification from "../../elements/Notifications/SmallNotification"
import Modal from "../../Modals/Modal"
import { Button } from '@mui/material'
import Input from '../../elements/Inputs/Input'
import { apiResponse } from '../../Functions/get_apiObj'
import TextDescription from '../../elements/TextFormatters/TextDescription'
const DetailedInfo = ({ info, changeData }) => {
    const [alert, setAlert] = useState({
        success: false,
        error: false,
        message: ""
    })
    const [open, setOpen] = useState(false)
    const openHandler = () => {
        localStorage.setItem("page_case_detailed", !open)
        setOpen(!open)
    }
    useEffect(() => {
        let item = localStorage.getItem("page_case_detailed")
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
    const [dataState, setDataState] = useState({
        family_info: info.family_info,
        history: info.history,
        potreba: info.potreba,
        comment: info.comment
    })
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
            changeData(key, value)
            handleAlertChange("success", LANG.detailedInfo.alerts.success)
        }
    }

    const InfoBlock = ({ itemKey }) => {
        const [value, setValue] = useState(dataState[itemKey])
        const [edit, setEdit] = useState(false)
        return itemKey && (
            <div className='DetailedInfo-InfoBlock'>
                <div className='DetailedInfo-InfoBlock-title'>
                    <div className='DetailedInfo-InfoBlock-title-block'>{LANG.detailedInfo[itemKey]}</div>
                    {edit ?
                        <div className='DetailedInfo-InfoBlock-panel'>
                            <span onClick={() => {
                                handleSave(itemKey, value)
                                setEdit(!edit)
                            }}>
                                <Icon icon={"save"} addClass={"save-icon"} />
                            </span>
                            <span onClick={() => { setEdit(!edit) }}>
                                <Icon icon={"close"} addClass={"close-icon"} />
                            </span>
                        </div>
                        : <span onClick={() => { setEdit(!edit) }}>
                            <Icon icon={"edit"} addClass={"default-icon"} />
                        </span>}

                </div>
                {edit ?
                    <Textarea value={value} onChange={(e) => { setValue(e.target.value) }} />
                    : <span><TextDescription text={value}/></span>}

            </div>
        )
    }
    return (
        <div className='DetailedInfo'>
            <div className='DetailedInfo-title' >
                <div className='DetailedInfo-title-panel' onClick={openHandler}>
                    <div>{LANG.detailedInfo.title}</div>
                    <Icon icon={"arrow_down"} addClass={"fs35 arrow"} />
                </div>
            </div>
            {open && <div className='content'>
                {Object.keys(dataState).map((item, index) => {
                    return (
                        <InfoBlock key={index} itemKey={item} />
                    )
                })}
                <InfoBlock />
            </div>}

            {alert.success && <SmallNotification isSuccess={true} text={alert.message} close={() => { handleAlertChange("success", "") }} />}
            {alert.error && <SmallNotification isSuccess={false} text={alert.message} close={() => { handleAlertChange("error", "") }} />}
        </div>
    )
}

export default DetailedInfo