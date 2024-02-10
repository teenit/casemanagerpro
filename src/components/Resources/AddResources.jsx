import axios from "axios";
import React from "react";
import { useState } from "react";
import { serverAddres } from "../Functions/serverAddres";

import s from './Resources.module.css';



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
    const [bload, setBload] = useState(false)
    const [loaderProgress, setLoaderProgress] = useState(0)
    return(
        <div className={s.add__form__wrap}>
            <div className={s.add__form__back}>
                <div className={s.add__form}>
                    <div className={s.add__form__title}>
                        <input type="text" 
                                placeholder="Назва Ресурсу"
                                value={meta.title}
                                onChange={(e)=>{
                                    setMeta({...meta,title:e.target.value})
                                }}/>
                    </div>
                    <div className={s.add__form__desc}>
                        <input type="text" 
                                placeholder="Опис Ресурсу"
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
                                    setMeta({...meta,file:e.target})
                                    setHiddenText(e.target.files[0].name)
                                }}/>
                                
                        </div>
                        <div className={s.hidden__text}>{hiddenText}</div>
                    </div>
                    <div className={s.add__form__btn}>
                        <button
                        className={`primary__btn ${bload ? s.b__load : ''}`}

                        onClick={()=>{
                            if(bload) return;
                            if(meta.file == null) return window.alert("Оберіть файл")
                            if(meta.title == "") return window.alert("Введіть назву файлу")
                            sendResources()
                            setBload(true)
                        }}>{bload ? "Завантажую" : "Додати ресурс" }</button>
                        <div className={s.load__progress} style={{
                            "width": loaderProgress + "%"
                        }}></div>
                    </div>
                </div>
            </div>
        </div>
    )
    
}

export default AddResources;