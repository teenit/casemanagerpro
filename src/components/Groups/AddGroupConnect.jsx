import React, { useEffect, useState } from "react";
import Modal from "../Modals/Modal";
import Icon from "../elements/Icons/Icon";
import { Button } from "@mui/material";
import { LANG, appConfig } from "../../services/config";
import Input from "../elements/Inputs/Input";
import Textarea from "../elements/Inputs/Textarea";
import { apiResponse } from "../Functions/get_apiObj";

const AddGroup = ({client_id, type}) => {
    const [state, setState] = useState({
        name:"",
        description:"",
        color: appConfig.default.color
    })
    const [groups, setGroups] = useState([])
    useEffect(()=>{
        apiResponse({},"groups/get-case-groups.php").then((res)=>{
            setGroups(res);
        })
    },)
    const [form, setForm] = useState(false)
    const successHandler = () => {
        apiResponse({...state},"groups/add-group-connect.php").then((res)=>{
            console.log(res);
        })
    }
    const changeHandler = (key, value) => {
        setState({...state, [key]:value})
    }   
    return (
        <div className="AddGroup">
            <div className="AddGroup-plus" onClick={()=>{setForm(true)}}><Icon icon={"add"}/></div>
            
            {
                form && 
                    <Modal closeHandler={()=>setForm(false)}
                        footer={<Button variant="contained" onClick={successHandler}>{LANG.GLOBAL.save}</Button>}
                    >
                        <Input value={state.name} type="text" label={LANG.GLOBAL.title} onChange={(e)=>{changeHandler("name", e.target.value)}}/>
                        <Input value={state.color} type="color" onChange={(e)=>{changeHandler("color", e.target.value)}}/>
                        <Textarea value={state.description} label={LANG.GLOBAL.description} onChange={(e)=>{changeHandler("description", e.target.value)}}/>
                    </Modal>
            }
            
        </div>
    )
}

export default AddGroup;