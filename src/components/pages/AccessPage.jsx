import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { apiResponse } from "../Functions/get_apiObj";
import AccessPageModal from "./AccessPageModal";

const AccessPage = () => {

    const [modal,setModal] = useState(false)
    const [state, setState] = useState([])
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
        <button className="AccessPage-button" onClick={()=>{
            setModal(true)
        }}>Додати права</button>
        {modal && <AccessPageModal close = {()=>{setModal(false)}}/>}
        </div>
       
    )
}

export default AccessPage;