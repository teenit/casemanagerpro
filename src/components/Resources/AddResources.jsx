import axios from "axios";
import React from "react";
import { useState } from "react";
import { serverAddres } from "../Functions/serverAddres";
import FilesUploader from "../elements/Uploaders/FilesUploader"
import s from './Resources.module.css';
import Input from "../elements/Inputs/Input"

const AddResources = ()=>{
function sendResources(){
    const formData = new FormData();
    formData.append("fileResource", meta.file.files[0]);
    formData.append("userId", localStorage.getItem("id"));
    formData.append("token", localStorage.getItem("token"));
    formData.append("title", meta.title.replaceAll("'", "’"));
    formData.append("description", meta.description.replaceAll("'", "’"));
    axios({
      url: serverAddres("resources/upload.php"),
      method: "POST",
      header: { "Content-Type": "multipart/form-data" },
      data: formData,
      onUploadProgress: (event) => {
        setLoaderProgress(Math.round((event.loaded * 100) / event.total))
      },
    })
      .then((data) => {
        setBload(false)
        setLoaderProgress(0)
        if(data.data?.message){
            window.alert(data.data.message)
        }else{
            window.alert("Ресурс успішно завантажено");
            window.location.reload();
        }
        setMeta({
            title:"",
            description:"",
            file:null
        })
        setHiddenText("")
      })
      .catch((error) => console.log(error));
  };
  

    const [hiddenText, setHiddenText] = useState("");
    const [meta, setMeta] = useState({
        title:"",
        description:"",
        file:null
    })
    const handleMetaChange = (key,value)=>{
        setMeta({...meta,[key]:value})
    }
    const [bload, setBload] = useState(false)
    const [loaderProgress, setLoaderProgress] = useState(0)
    return(
                <div className="AddResources">
                    <div className="AddResources-split">
                        <Input type="text" 
                                label="Назва Ресурсу"
                                value={meta.title}
                                onChange={(e)=>{handleMetaChange("title",e.target.value)}}/>
                        <Input type="text" 
                                label="Опис Ресурсу"
                                value={meta.description}
                                onChange={(e)=>{handleMetaChange("description",e.target.value)}}/>
                    </div>
                    <FilesUploader multiple={true} successHandler={sendResources} meta={{
                        key:"resouces_files",
                        type:"event",
                        event_id:11
                        
                    }}/>
                </div>
    )
    
}

export default AddResources;