import React, { useEffect, useState } from 'react'
import Icon from '../../elements/Icons/Icon'
import { LANG } from '../../../services/config'
import Textarea from "../../elements/Inputs/Textarea"
import SmallNotification from "../../elements/Notifications/SmallNotification"
const DetailedInfo = ({ info, changeData }) => {
    const [alert, setAlert] = useState({
        success: false,
        error: false
    })
    const [open, setOpen] = useState(false)
    const openHandler = ()=>{
        localStorage.setItem("page_case_detailed", !open)
        setOpen(!open)
    }
    useEffect(()=>{
        let item = localStorage.getItem("page_case_detailed")
        if(item){
            if(item=="true"){
                setOpen(true)
            }else{
                setOpen(false)
            }
        }else{
            setOpen(false)
        }
    },[])
    const [dataState, setDataState] = useState({
        family_info: info.family_info,
        history: info.history,
        potreba: info.potreba,
        comment: info.comment
    })
    const [editState, setEditState] = useState({
        family_info: false,
        history: false,
        potreba: false,
        comment: false
    })
    const handleEditChange = (key) => {
        setEditState({ ...editState, [key]: !editState[key] })
    }
    const handleDataChange = (key, value) => {
        setDataState({ ...dataState, [key]: value })
    }
    const handleAlertChange = (key) => {
        setAlert({ ...alert, [key]: !alert[key] })
    }
    const handleSave = (key, value) => {
        let previousData = dataState[key]
        if (previousData !== value) {
            handleDataChange(key, value)
            changeData(key,value)
            handleAlertChange("success")
        }
        handleEditChange(key)
    }

    const InfoBlock = ({ itemKey }) => {
        const [value, setValue] = useState(dataState[itemKey])
        return itemKey && (
            <div className='DetailedInfo-InfoBlock'>
                <div className='DetailedInfo-InfoBlock-title'>
                    <div className='DetailedInfo-InfoBlock-title-block'>{LANG.detailedInfo[itemKey]}</div>
                    {editState[itemKey] ?
                        <div className='DetailedInfo-InfoBlock-panel'>
                            <span onClick={() => { handleSave(itemKey, value) }}>
                                <Icon icon={"save"} addClass={"save-icon"} />
                            </span>
                            <span onClick={() => { handleEditChange(itemKey) }}>
                                <Icon icon={"close"} addClass={"close-icon"} />
                            </span>
                        </div>
                        : <span onClick={() => { handleEditChange(itemKey) }}>
                            <Icon icon={"edit"} addClass={"default-icon"} />
                        </span>}

                </div>
                {editState[itemKey] ?
                    <Textarea value={value} onChange={(e) => { setValue(e.target.value) }} />
                    : <span>{value}</span>}

            </div>
        )
    }
    return (
        <div className='DetailedInfo'>
            <div className='DetailedInfo-title' onClick={openHandler}>
                <div>{LANG.detailedInfo.title}</div>
                    <Icon icon={"arrow_down"} addClass={"fs35"}/>
            </div>
            {open && <div className='content'>
                {Object.keys(dataState).map((item, index) => {
                    return (
                        <InfoBlock key={index} itemKey={item} />
                    )
                })}
                <InfoBlock />
            </div>}
           
            {alert.success && <SmallNotification isSuccess={true} text={"Дані успішно оновлено"} close={() => { handleAlertChange("success") }} />}
            {alert.error && <SmallNotification isSuccess={false} text={""} close={() => { handleAlertChange("error") }} />}
        </div>
    )
}

export default DetailedInfo