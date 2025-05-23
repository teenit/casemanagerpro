import React from "react";
import EventAddPlan from "./EventAddPlan";
import s from "./modal.module.css"
import SearchCase from "./SearchCase";
import SearchUsers from "./SearchUsers";
import UploadEventDocs from "./UploadEventDocs";
import UploadEventMedia from "./UploadEventMedia";
import AccessCheck from "../../Functions/AccessCheck";
const EventModal = ({close,info,getUsers,getPlans, getFiles})=>{
    return(
        <div className={s.modal}>
            <div className={s.inner}>
                <div className={s.close} onClick={close}></div>
                <div className={s.info}>
                    <div className={s.info__inner}>
                    <div className={s.short__info}>
                        <p>Назва: <b>{info.title}</b></p>
                        <p>Створив: <b>{info.value.userName}</b></p>
                        <p>Дата створення: <b>{info.value.date}</b></p>
                    </div>
                    </div>

                    <SearchUsers getUsers = {(id,key)=>{
                        getUsers(id,key)
                    }} eventID = {info.id} />
                    <SearchCase getUsers = {(id,key)=>{
                        getUsers(id,key)
                    }} eventID = {info.id}/>
                    {AccessCheck('yes_no', 'a_page_event_add_plan') && <EventAddPlan getPlans = {(id,key)=>{
                        getPlans(id,key)
                    }} eventID = {info.id} />}
                    
                    {AccessCheck('yes_no', 'a_page_event_add_media') && <UploadEventDocs getFiles={getFiles} eventID={info.id}/>}
                    
                    {/* <UploadEventMedia eventID={info.id}/> */}
                </div>
                
            </div>
        </div>
    )
}

export default EventModal;