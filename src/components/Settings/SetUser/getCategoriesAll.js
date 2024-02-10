import React from "react";
import { serverAddres } from "../../Functions/serverAddres";
import axios from "axios";
export function getCategoriesAll(ax){
    let obj = {
        id: localStorage.getItem("id"),
        token: localStorage.getItem("token")
    }
    axios({
        url: serverAddres(ax),
        method: "POST",
        header : {'Content-Type': 'application/json;charset=utf-8'},
        data : JSON.stringify(obj),
    })
    .then((data)=>{ 
        return data.data;   
    })
    .catch((error)=>console.log(error)) 
}