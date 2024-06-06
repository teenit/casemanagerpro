import React from "react";
import { useState } from "react";
import AddResources from "./AddResources";
import GetResources from "./GetResources";
import s from './Resources.module.css';
import { apiResponse } from "../Functions/get_apiObj";

const Resources = () => {
    const [form, setForm] = useState(false)
    const [docFiles, setDocFiles] = useState([]);
    const [mediaFiles, setMediaFiles] = useState([]);
    const [files, setFiles] = useState([]);
    const [show, setShow] = useState(false);

    const loadGroups = ()=>{
        apiResponse({}, "resources/get-resource.php").then((res)=>{
            setFiles(res);
            setShow(true);
            const docTypes = [
                "application/msword",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                "application/vnd.ms-excel",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "application/vnd.ms-powerpoint",
                "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                "application/pdf"
            ];
            const mediaTypes = [
                "image/png",
                "image/jpeg",
                "image/jpg",
                "video/mp4",
                "video/quicktime"
            ];
            setDocFiles(res.filter(file => docTypes.includes(file.type)));
            setMediaFiles(res.filter(file => mediaTypes.includes(file.type)));
        });
        
    }
    return (
        <div className={s.wrapper}>
            <div className={s.title}>
                <h1>Ресурси</h1>
                <span className={s.plus} onClick={
                    () => {
                        setForm(!form)
                    }
                }>{form ? "-" : "+"}</span>
            </div>
            <div className={s.control}>
                {form && <AddResources close={()=>{setForm(false)}} loadGroups={loadGroups}/>}
            </div>
            <div className={s.get__resources}>
                <GetResources docFiles = {docFiles} mediaFiles={mediaFiles} show={show} loadGroups = {loadGroups} />
            </div>
        </div>
    )
}

export default Resources;