import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { serverAddres } from "../../Functions/serverAddres";
import s from "./event.module.css";
import settingImg from "./../../../img/icons/settings-50-black.png"
import EventModal from "./EventModal";
import GetUsers from "./GetUsers";
import GetPlans from "./GetPlans";
import GetDocs from "./GetDocs";
import BigPhoto from "./BigPhoto";
import Galery from "../../Galery/Galery";
import { apiResponse } from "../../Functions/get_apiObj";
import GalleryBlock from "../../blocks/GalleryBlock";
import AccessCheck from "../../Functions/AccessCheck";
import Icon from "../../elements/Icons/Icon";
import Modal from "../../Modals/Modal";
import { Button, MenuItem, Select } from "@mui/material";
import { LANG } from "../../../services/config";
import SearchUsers from "./SearchUsers";
import AddMembers from "./AddMembers";

const Event = () => {
    const downloadGallery = AccessCheck('yes_no', 'a_page_event_media')
    const [modal, setModal] = useState({
        addMember: false
    })
    const modalHandler = (key) => {
        setModal({ ...modal, [key]: !modal[key] })
    }
    const [addMember, setAddMember] = useState({
        type: "new",
        name: "",
    })
    const addMemberHandler = (key, value) => {
        setAddMember({ ...addMember, [key]: value })
    }
    const [usersMemC, setUsersMemC] = useState([])
    const [plans, setPlans] = useState([])
    const [files, setFiles] = useState([])
    const [lookPhoto, setLookPhoto] = useState({ look: false, link: "" })
    const [id, setId] = useState(0)

    function getFiles(id, key) {
        let obj = {
            key: key,
            eventID: id
        }
        apiResponse({ ...obj }, "event/get-files.php").then((data) => {
            let mas = data.map(item => { return item.fileInfo })
            setFiles([...mas])
        })
            .catch((error) => console.log(error))
    }
    function getUsers(id, key) {
        let obj = {
            id: localStorage.getItem("id"),
            token: localStorage.getItem("token"),
            key: key,
            eventID: id
        }
        axios({
            url: serverAddres("event/get-event-members.php"),
            method: "POST",
            header: { 'Content-Type': 'application/json;charset=utf-8' },
            data: JSON.stringify(obj),
        })
            .then((data) => {
                if (key == "eventMemberUser") {
                    setUsersMem(data.data)
                } else {
                    setUsersMemC(data.data)
                }
            })
            .catch((error) => console.log(error))
    }
    function getPlans(id, key) {
        let obj = {
            id: localStorage.getItem("id"),
            token: localStorage.getItem("token"),
            key: key,
            eventID: id
        }
        axios({
            url: serverAddres("event/get-plans.php"),
            method: "POST",
            header: { 'Content-Type': 'application/json;charset=utf-8' },
            data: JSON.stringify(obj),
        })
            .then((data) => {
                setPlans(data.data)
            })
            .catch((error) => console.log(error))
    }
    const params = useParams();
    function getEvent() {
        let obj = {
            id: localStorage.getItem("id"),
            token: localStorage.getItem("token"),
            event_id: params.id,
        }
        axios({
            url: serverAddres("event/get-event.php"),
            method: "POST",
            header: { 'Content-Type': 'application/json;charset=utf-8' },
            data: JSON.stringify(obj),
        })
            .then((data) => {
                setEvent(data.data)
                if (data.data?.id) {
                    getUsers(data.data.id, "eventMemberUser")
                    getUsers(data.data.id, "eventMemberCase")
                    getPlans(data.data.id, "eventPlan")
                    getFiles(data.data.id, "event_files")
                    setId(data.data.id)
                }

            })
            .catch((error) => console.log(error))
    }
    const [event, setEvent] = useState({})
    const [control, setControl] = useState(false)
    const [usersMem, setUsersMem] = useState([])
    useEffect(() => {
        getEvent();
    }, [])
    return !!event.id ?
        (
            <div className={s.wrap}>
                <div className={s.control}>
                    <div className={s.panel}>
                        <div className={s.panel__item}>
                            <img src={settingImg} className={s.panel__img} alt="" onClick={() => {
                                setControl(!control)
                            }} />
                        </div>
                    </div>
                </div>
                <div className={s.inner}>
                    <div className={s.title__wrap}>
                        <div className={s.title}>
                            <h1>{event.title}</h1>
                        </div>
                        <div className={s.desc}>
                            <p dangerouslySetInnerHTML={{ __html: event.description }}></p>
                        </div>
                    </div>
                    <div className={s.members}>
                        <div className={s.members__title}>
                            <h2>{event.title}</h2>
                            <Icon icon="add" addClass={"fs40"} onClick={() => { modalHandler("addMember") }} />
                        </div>
                        <div className={s.members__inner}>
                            <div>
                                <p>Організатори</p>
                                <GetUsers users={usersMem} id={event.id} />
                            </div>
                            <div>
                                <p>Учасники</p>
                                <GetUsers type="case" users={usersMemC} id={event.id} />
                            </div>
                        </div>
                    </div>
                    {plans.length > 0 && <div className={s.plans}>
                        <GetPlans id={event.id} plans={plans} />
                    </div>}

                    <GalleryBlock data={files} check={downloadGallery} />
                </div>
                {modal.addMember && <AddMembers getUsers={(id, key) => {
                    getUsers(id, key)
                }} modalHandler={()=>{modalHandler("addMember")}} />}
                {lookPhoto.look ? <BigPhoto link={lookPhoto.link} close={() => { setLookPhoto({ ...lookPhoto, look: false }) }} /> : null}
                {control ? <EventModal getPlans={(id, key) => {
                    getPlans(id, key)
                }} getUsers={(id, key) => {
                    getUsers(id, key)
                }} getFiles={() => {
                    getFiles(id, "event_files")
                }} info={event} close={() => { setControl(!control) }} /> : null}
            </div>

        ) : (
            <h1>{event.message}</h1>
        )
}

export default Event;