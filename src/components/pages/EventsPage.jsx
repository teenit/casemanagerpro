import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import Modal from "../Modals/Modal";
import Input from "../elements/Inputs/Input";
import { apiResponse } from "../Functions/get_apiObj";
import { LANG } from "../../services/config";

const DEFAULT_FORM_DATA = {
    title: '',
    description: '',
    type: '',
    category: null,
    color:""
}

const EventsPage = () => {
    const [addModal, setAddModal] = useState(false);
    const [addFormData, setAddFormData] = useState({
        ...DEFAULT_FORM_DATA
    });
    const [events, setEvents] = useState([])

    useEffect(()=>{
        apiResponse({...addFormData},"events/get-events.php").then((res)=>{
            setEvents([...res])
        })
    }, [])

    const addEvent = () => {
        if (addFormData.title === DEFAULT_FORM_DATA.title) return;
        apiResponse({...addFormData},"events/create.php").then((res)=>{
            console.log(res)
        })
    }

    return(
        <div>
            <Button variant="contained" onClick={()=>setAddModal(true)}>plus</Button>
            {
                addModal && (
                    <Modal closeHandler={()=>setAddModal(false)} header={"Create Event"} footer={
                        <>
                          <Button variant='contained' color='error' onClick={()=>setAddModal(false)}>{LANG.GLOBAL.cancel}</Button>
                          <Button variant='contained' onClick={addEvent}>{LANG.GLOBAL.save}</Button>
                        </>
                      }>
                        <Input label="Title" value={addFormData.title} onChange={(e)=>setAddFormData({...addFormData, title: e.target.value})}/>
                        <Input label="description" value={addFormData.description} onChange={(e)=>setAddFormData({...addFormData, description: e.target.value})}/>
                        <Input label="type" value={addFormData.type} onChange={(e)=>setAddFormData({...addFormData, type: e.target.value})}/>
                        <Input label="category" value={addFormData.category} onChange={(e)=>setAddFormData({...addFormData, category: e.target.value})}/>
                        <Input label="color" type="color" value={addFormData.color} onChange={(e)=>setAddFormData({...addFormData, color: e.target.value})}/>
                    </Modal>
                )
            }
        </div>
    )
}

export default EventsPage;