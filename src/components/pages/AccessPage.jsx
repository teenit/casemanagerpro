import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { apiResponse } from "../Functions/get_apiObj";
import AccessPageModal from "./AccessPageModal";
import Modal from "../Modals/Modal";
import Input from "../elements/Inputs/Input";
import Textarea from "../elements/Inputs/Textarea";
import { Button } from "@mui/material";
import { LANG } from "../../services/config";

const AccessPage = () => {

    const [modal,setModal] = useState(false)
    const [state, setState] = useState([])
    const [addAccess, setAccess]  = useState({
        description:"",
        name:""
    })
    useEffect(()=>{
        apiResponse({},'access/get-list.php').then((res)=>setState(res))
        console.log("test")
    },[
    ])
    return (
        <div className="AccessPage">
         {state.map((item)=>{
            return <NavLink key={item.id} state={item} to={item.id} className="AccessPage-title">{item.name}</NavLink>
        })}
        {
            modal && <Modal closeHandler = {()=>{setModal(false)}}
                header={
                    <div className="">Додати новий шаблон прав</div>
                }
            >
            <Input value={addAccess.name} onChange = {e=>setAccess({...addAccess,name:e.target.value})} label={LANG.access.add_name} type="text"/>
            <Textarea value={addAccess.description} onChange = {e=>setAccess({...addAccess,description:e.target.value})} label={LANG.access.add_description}/>
            <Button>Saved</Button>
        </Modal>
        }
        
        <button className="AccessPage-button" onClick={()=>{
            setModal(true)
        }}>Додати права</button>
        
        </div>
       
    )
}

export default AccessPage;