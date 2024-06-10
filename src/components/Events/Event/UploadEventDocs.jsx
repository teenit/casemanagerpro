import axios from "axios";
import React from "react";
import { useState } from "react";
import { serverAddres } from "../../Functions/serverAddres";
import { changeAps, translateStringToLink } from "../../Functions/translateString";
import s from "./upload.module.css";
import Input from '../../elements/Inputs/Input'
import FilesUploader from "../../elements/Uploaders/FilesUploader";
import SmallNotification from "../../elements/Notifications/SmallNotification";


const UploadEventDocs = ({ eventID }) => {
    const [alert, setAlert] = useState({
        success: false,
    })
    const alertHandler = (key) => {
        setAlert({ ...alert, [key]: !alert[key] })
    }

    function sendResources() {
        alertHandler("success")
    };


    const [hiddenText, setHiddenText] = useState("");
    const [meta, setMeta] = useState({
        title: "",
        description: "",
        file: null
    })
    const [bload, setBload] = useState(false)
    const [loaderProgress, setLoaderProgress] = useState(0)
    return (
        <div className={s.add__form__wrap}>
            <h2>Завантаження документів</h2>
            <div className={s.add__form}>
                <div className={s.add__form__title}>
                    <Input type="text"
                        label="Назва документу"
                        value={meta.title}
                        onChange={(e) => {
                            setMeta({ ...meta, title: e.target.value })
                        }} />
                </div>
                <div className={s.add__form__desc}>
                    <Input type="text"
                        label="Опис Документу"
                        value={meta.description}
                        onChange={(e) => {
                            setMeta({ ...meta, description: e.target.value })
                        }} />
                </div>
                <FilesUploader 
                            multiple={true} 
                            meta={{
                                key:"event_files",
                                type:"event",
                                title:meta.title,
                                description:meta.description,
                                eventID:eventID
                            }}
                            type="event"
                        />
            </div>
            {alert.success && <SmallNotification isSuccess={true} text={"Файл успішно завантажено"} close={() => { alertHandler("success") }} />}
        </div>
    )
}
export default UploadEventDocs;