import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { apiResponse } from "../Functions/get_apiObj";

const AccessPage = () => {
    const [state, setState] = useState([])
    useEffect(()=>{
        apiResponse({},'access/get-list.php').then((res)=>setState(res))
        console.log("test")
    },[
    ])
    return (
        state.map((item)=>{
            return <NavLink key={item.id} state={item} to={item.id} className="AccessPage">{item.name}</NavLink>
        })
    )
}

export default AccessPage;