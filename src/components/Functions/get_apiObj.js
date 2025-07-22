import axios from "axios";
import { serverAddres } from "./serverAddres";

let obj = {
    id: localStorage.getItem("id"),
    token: localStorage.getItem("token"),
    codeOrganisation: localStorage.getItem("codeOrganisation"),
}

export function get_apiObj(setState,url,objData){
    objData = {...objData,...obj};
    axios({
        url: serverAddres(url),
        method: "POST",
        header : {'Content-Type': 'application/json;charset=utf-8'},
        data : JSON.stringify(objData),
    })
    .then((data)=>{ 
       setState(data.data) 
    })
    .catch((error)=>console.log(error)) 
}

export async function apiResponse(objTo, url){

    objTo.id = obj.id;
    objTo.token = obj.token;
    if (!objTo.codeOrganisation) 
        objTo.codeOrganisation = obj.codeOrganisation;
   return await axios({
         url: serverAddres(url),
         method: "POST",
         credentials: 'include',
         header: {'application/x-www-form-urlencoded': 'application/json;charset=utf-8'},
         data: JSON.stringify(objTo),
         onUploadProgress: (event) => {
         } 
     })
     .then((data)=>{
         return (data.data)

     })
     .catch((error)=>{
         throw error;
     })
 }