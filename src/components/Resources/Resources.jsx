import React from "react";
import { useState } from "react";
import AddResources from "./AddResources";
import GetResources from "./GetResources";
import s from './Resources.module.css';
import { apiResponse } from "../Functions/get_apiObj";
import ModalConfirm from "../Modals/ModalConfirm";
import { LANG } from "../../services/config";
import SmallNotification from "../elements/Notifications/SmallNotification";
import AccessCheck from "../Functions/AccessCheck";
import Icon from "../elements/Icons/Icon";
import AddButton from "../elements/Buttons/AddButton";

const Resources = () => {
    const [form, setForm] = useState({
        open: false,
        type: "files"
    })
    const [docFiles, setDocFiles] = useState([]);
    const [mediaFiles, setMediaFiles] = useState([]);
    const [alert, setAlert] = useState({
        success: false,
        error: false
    })
    const [files, setFiles] = useState([]);
    const [show, setShow] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false)
    const [activeResource, setActiveResource] = useState(null)
    const alertHandler = (key) => {
        setAlert({ ...alert, [key]: !alert[key] })
    }
    const loadResources = () => {
        apiResponse({}, "resources/get-resource.php").then((res) => {
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
        setActiveResource({ ...resource });
        setDeleteModal(true)
    }

    const deleteResource = () => {

        apiResponse({
            resource_id: activeResource.resource_id
        }, "resources/delete-resource.php").then((res) => {

            setDeleteModal(false)
            loadResources()
            alertHandler("success")
        }).catch((error) => {
            alertHandler("error")
        })
    }
    const sortFiles = (arg) => {
        const images = [];
        const videos = [];
        const others = [];
        const links = []
        arg.forEach(file => {
            if (file.type.startsWith('image/')) {
                images.push(file);
            } else if (file.type.startsWith('video/')) {
                videos.push(file);
            } else if (file.type == 'link') {
                links.push(file)
            }
            else {
                others.push(file);
            }
        });

        return { images, videos, others, links };
    }

    const showForm = (type) => {
        setForm({ ...form, open: !form.open, type: type })
    }
    return (
        <div className={s.wrapper}>
            {AccessCheck('yes_no', 'a_page_resources_upload') && <AddButton title={LANG.resources.add} click={()=>{showForm(form.type)}} />}
            <div className={s.control}>
                {form.open && <AddResources close={() => { setForm(false) }} loadResources={loadResources} type={form.type} />}
            </div>
            <div className={s.get__resources}>
                <GetResources confirmDelete={confirmDelete} links={files.links} docFiles={docFiles} mediaFiles={mediaFiles} show={show} loadGroups={loadResources} showForm={showForm} />
            </div>
            {deleteModal && <ModalConfirm
                closeHandler={() => { setDeleteModal(false) }}
                successHandler={deleteResource}
                text={LANG.resources.confirm_delete + activeResource.title + "?"}
            />}
            {alert.success && <SmallNotification isSuccess={true} text={"Ресурс видалено"} close={() => { alertHandler("success") }} />}
            {alert.error && <SmallNotification isSuccess={false} text={"Виникла помилка"} close={() => { alertHandler("error") }} />}
        </div>
    )
}

export default Resources;