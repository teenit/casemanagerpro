import axios from "axios";
import { serverAddres } from "./serverAddres";

let obj = {
    id: localStorage.getItem("id"),
    token: localStorage.getItem("token"),
}

export function get_apiObj(setState,url,objData){
    objData = {...objData,...obj};
   // return console.log(objData)
    axios({
        url: serverAddres(url),
        method: "POST",
        header : {'Content-Type': 'application/json;charset=utf-8'},
        data : JSON.stringify(objData),
    })
    .then((data)=>{ 
        // console.log(data)
       setState(data.data) 
    })
    .catch((error)=>console.log(error)) 
}

export async function apiResponse(objTo, url){

    objTo.id = obj.id;
    objTo.token = obj.token;
   return await axios({
         url: serverAddres(url),
         method: "POST",
         header: {'application/x-www-form-urlencoded': 'application/json;charset=utf-8'},
         data: JSON.stringify(objTo),
         onUploadProgress: (event) => {
             console.log(event)
         } 
     })
     .then((data)=>{
         console.log("Received data: ", data.data);
         return (data.data)
     })
     .catch((error)=>{
         throw error;
     })
 }