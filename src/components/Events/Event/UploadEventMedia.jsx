import axios from "axios";
import React from "react";
import { useState } from "react";
import { serverAddres } from "../../Functions/serverAddres";
import { changeAps, translateStringToLink } from "../../Functions/translateString";
import s from "./upload.module.css";

const UploadEventMedia = ({eventID})=>{
    function sendResources(index){
        const formData = new FormData();
        formData.append("fileResource", meta.file.files[index]);
        formData.append("userId", localStorage.getItem("id"));
        formData.append("token", localStorage.getItem("token"));
        formData.append("userName", localStorage.getItem("userName"));
        formData.append("title", changeAps(meta.title) + index);    
        formData.append("link", translateStringToLink(meta.title) + index);
        formData.append("description", changeAps(meta.description));
        formData.append("eventID", eventID);
        formData.append("keyF", "media");
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
            let a = index + 1;
            if(a < meta.lengthFiles){
                sendResources(a);
            }else{
                setBload(false)
                if(data.data?.message){
                    window.alert(data.data.message)
                }else{
                    window.alert("Файли успішно завантажено");
                    setMeta({
                        title:"",
                        description:"",
                        file:null
                    })
                    setHiddenText("")
                }
            }
                setLoaderProgress(0);
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
                <h2>Завантаження MEDIA</h2>
                    <div className={s.add__form}>
                        <div className={s.add__form__title}>
                            <input type="text" 
                                    placeholder="Назва документу"
                                    value={meta.title}
                                    onChange={(e)=>{
                                        setMeta({...meta,title:e.target.value})
                                    }}/>
                        </div>
                        <div className={s.add__form__desc}>
                            <input type="text" 
                                    placeholder="Опис Документу"
                                    value={meta.description}
                                    onChange={(e)=>{
                                        setMeta({...meta,description:e.target.value})
                                    }}/>
                        </div>
                        <div className={s.add__form__file}>
                            <div className={s.res__file__wrap}>
                                <div className={s.hidden__btn}>Обрати файл</div>
                                <input type="file" 
                                    id="resId"
                                    multiple
                                    onChange={(e)=>{
                                        setMeta({...meta,file:e.target,lengthFiles:e.target.files.length})
                                        let a = "Обрано " + e.target.files.length + " файлів";
                                        setHiddenText(a)
                                    }}/>
                                    
                            </div>
                            <div className={s.hidden__text}><p>{hiddenText}</p></div>
                        </div>
                        <div className={s.add__form__btn}>
                            <button
                            className={`primary__btn ${bload ? s.b__load : ''}`}
    
                            onClick={()=>{
                               
                                if(bload) return;
                                if(meta.file == null) return window.alert("Оберіть файл")
                                if(meta.title == "") return window.alert("Введіть назву файлу")
                                    setBload(true)
                                    sendResources(0)
                                
                               
                                
                            }}>{bload ? "Завантажую" : "Завантажити документ" }</button>
                            <div className={s.load__progress} style={{
                                "width": loaderProgress + "%"
                            }}></div>
                        </div>
                    </div>
            </div>
        )
}
export default UploadEventMedia;