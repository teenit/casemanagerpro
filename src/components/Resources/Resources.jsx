import React from "react";
import { useState } from "react";
import AddResources from "./AddResources";
import GetResources from "./GetResources";
import s from './Resources.module.css';
import { apiResponse } from "../Functions/get_apiObj";
import ModalConfirm from "../Modals/ModalConfirm";
import { LANG } from "../../services/config";

const Resources = () => {
    const [form, setForm] = useState(false)
    const [docFiles, setDocFiles] = useState([]);
    const [mediaFiles, setMediaFiles] = useState([]);
    
    const [files, setFiles] = useState([]);
    const [show, setShow] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false)
    const [activeResource, setActiveResource] = useState(null)
    const loadGroups = ()=>{
        apiResponse({}, "resources/get-resource.php").then((res)=>{
            setFiles(sortFiles(res));
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
            setFiles(sortFiles(res))
        });
        
    }

    const confirmDelete = (resource) => {
        setActiveResource({...resource});
        setDeleteModal(true)
    }

    const deleteResource = () => {

        apiResponse({
            resource_id:activeResource.resource_id
        },"resources/delete-resource.php").then((res)=>{
            console.log(res)
            setDeleteModal(false)
            loadGroups()
        })
    }
    const sortFiles = (arg) => {
        const images = [];
        const videos = [];
        const others = [];
        const links = []
        arg.forEach(file => {
            console.log(file)
            if (file.type.startsWith('image/')) {
                images.push(file);
            } else if (file.type.startsWith('video/')) {
                videos.push(file);
            } else if (file.type == 'link'){
                links.push(file)
            }
            else {
                others.push(file);
            }
        });
    
        return { images, videos, others, links };
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
                <GetResources confirmDelete={confirmDelete} files={files} docFiles = {docFiles} mediaFiles={mediaFiles} show={show} loadGroups = {loadGroups} />
            </div>
            {deleteModal && <ModalConfirm 
                closeHandler={()=>{setDeleteModal(false)}} 
                successHandler={deleteResource}
                text={LANG.resources.confirm_delete + activeResource.title}
                />}
        </div>
    )
}

export default Resources;