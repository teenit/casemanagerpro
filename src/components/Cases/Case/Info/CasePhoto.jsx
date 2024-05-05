import React from "react";
import axios from "axios";
import "./Info.css";
import { useState } from "react";
import Loadpic from "../../../Loading/Interactive/Loadpic";
import { serverAddres } from "../../../Functions/serverAddres";
import editImg from "../../../../img/icons/edit-48-black.png";
import okImg from "../../../../img/icons/ok-50-black.png";

const CasePhoto = (props)=>{

    const [loading, setLoading] = useState("");
    const [imgCase, setImgCase] = useState(props.url);
    const [imgSave, setImgSave] = useState(false);
    const changePic = (data) =>{
        const formCaseEdit = document.getElementById(data)
        const formData = new FormData();
        let imagefile = document.getElementById("uploadbtn");
       // return console.log(imagefile.files[0])
        formData.append("image", imagefile.files[0]);
        formData.append("id",window.location.search.slice(1));
        formData.append("key","case");
        axios({
            url: serverAddres("upload-case-img.php"),
            method: "POST",
            header : {'Content-Type': 'multipart/form-data'},
            data : formData,
            onUploadProgress: event => {
                setLoading("active")
                setImgSave(true)
                console.log(Math.round(event.loaded * 100 / event.total))
            }
        })
        .then((data)=>{
            setImgCase(data.data);
            setLoading("")
        })
        .catch((error)=>console.log(error))    
    }   
    function saveImg(){
        let obj = {
            caseId:window.location.search.slice(1),
            id: localStorage.getItem("id"),
            token: localStorage.getItem("token")
        }
        axios({
            url: serverAddres("save-case-img.php"),
            method: "POST",
            header : {'Content-Type': 'application/json;charset=utf-8'},
            data : JSON.stringify(obj),
            onUploadProgress: event => {
                setLoading("active")
            }
        })
        .then((data)=>{
            setImgSave(false)
            setLoading("")
            
        })
        .catch((error)=>console.log(error))  
        
    }
    return(
        <div className="case__contact__info__img__wr">
                <div className="case__contact__info__img__inner">
                    <img src={`${imgCase}`} alt="" />
                    <Loadpic show = {loading}/>
                        {props.level ? <form id="caseImgEdit">
                             {imgSave ? <span className="case__edit__img__ok" onClick={()=>{saveImg()}}><img src={okImg} alt="" /></span> : <label htmlFor="uploadbtn" className="case__edit__img"><img src={editImg} alt="" /></label> }
                            <input onChangeCapture={()=>{changePic("caseImgEdit")}} multiple id="uploadbtn" type="file" name="uploadbtn"/>
                        </form>:""}
                </div>
                
                
                
        </div>
    )
}
export default CasePhoto;