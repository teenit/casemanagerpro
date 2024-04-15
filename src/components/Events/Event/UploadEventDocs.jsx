import axios from "axios";
import React from "react";
import { useState } from "react";
import { serverAddres } from "../../Functions/serverAddres";
import { changeAps, translateStringToLink } from "../../Functions/translateString";
import s from "./upload.module.css";
import Input from '../../elements/Inputs/Input'
import FilesUploader from "../../elements/Uploaders/FilesUploader";


const UploadEventDocs = ({eventID})=>{
    function sendResources(){
        const formData = new FormData();
        formData.append("fileResource", meta.file.files[0]);
        formData.append("userId", localStorage.getItem("id"));
        formData.append("token", localStorage.getItem("token"));
        formData.append("userName", localStorage.getItem("userName"));
        formData.append("title", changeAps(meta.title));
        formData.append("link", translateStringToLink(meta.title));
        formData.append("description", changeAps(meta.description));
        formData.append("eventID", eventID);
        formData.append("keyF", "docs");
        axios({
          url: serverAddres("event/upload.php"),
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
                window.alert("Файл успішно завантажено");
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
        const [bload, setBload] = useState(false)
        const [loaderProgress, setLoaderProgress] = useState(0)
        return(
            <div className={s.add__form__wrap}>
                <h2>Завантаження документів</h2>
                    <div className={s.add__form}>
                        <div className={s.add__form__title}>
                            <Input type="text" 
                                    label="Назва документу"
                                    value={meta.title}
                                    onChange={(e)=>{
                                        setMeta({...meta,title:e.target.value})
                                    }}/>
                        </div>
                        <div className={s.add__form__desc}>
                            <Input type="text" 
                                    label="Опис Документу"
                                    value={meta.description}
                                    onChange={(e)=>{
                                        setMeta({...meta,description:e.target.value})
                                    }}/>
                        </div>
                        {/* <div className={s.add__form__file}>
                            <div className={s.res__file__wrap}>
                                <div className={s.hidden__btn}>Обрати файл</div>
                                <input type="file" 
                                    id="resId"
                                    
                                    onChange={(e)=>{
                                        setMeta({...meta,file:e.target})
                                        console.log(e.target.files[0].name)
                                        setHiddenText(e.target.files[0].name)
                                    }}/>
                                    
                            </div>
                            <div className={s.hidden__text}>{hiddenText}</div>
                        </div> */}
                        <FilesUploader multiple={true} meta={{
                            key:"event_files",
                            case_id:11,
                            type:"event"
                        }}/>
                        <div className={s.add__form__btn}>
                            <button
                            className={`primary__btn ${bload ? s.b__load : ''}`}
    
                            onClick={()=>{
                               
                                if(bload) return;
                                if(meta.file == null) return window.alert("Оберіть файл")
                                if(meta.title == "") return window.alert("Введіть назву файлу")
                                setBload(true)
                              
                                sendResources()
                                
                            }}>{bload ? "Завантажую" : "Завантажити документ" }</button>
                            <div className={s.load__progress} style={{
                                "width": loaderProgress + "%"
                            }}></div>
                        </div>
                    </div>
            </div>
        )
}
export default UploadEventDocs;