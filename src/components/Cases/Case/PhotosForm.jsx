import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Loading from "../../Loading/Loading";
import { useState } from "react";
import { serverAddres } from "../../Functions/serverAddres";
import LoadingPage from "../../Loading/LoadingPage";
import { changeAps } from "../../Functions/translateString";
import send from '../../../img/icons/send-media.png'
import add from '../../../img/icons/add-media.png'



const PhotosForm = ({show})=>{
    const [filesData,setFilesData] = useState([])
    const [imgData,setData] = useState([])
    const {register, handleSubmit,formState: { errors }} = useForm();
    const [loading, setLoading] = useState({timer:"",message:"",active:""});
    const [loadImg, setLoadImg] = useState(false)
    const onSubmit = (data) =>{
        const formData = new FormData();
        for(let i=0; i<imgData.length; i++){
            formData.append(`images[${i}]`, imgData[i])
        }
        
        formData.append("id",window.location.search.slice(1))
        formData.append("title","test")
        formData.append("userId",localStorage.getItem("id"))
        formData.append("token",localStorage.getItem("token"))
        axios({
            url: serverAddres("upload-img.php"),
            method: "POST",
            header : {'Content-Type': 'multipart/form-data'},
            data : formData,
            onUploadProgress: event => {
                setLoading({
                    timer: Math.round(event.loaded * 100 / event.total) + "%",
                    message: "LOADING",
                    active: "active"
                })
                console.log(Math.round(event.loaded * 100 / event.total))
            }
        })
        .then((data)=>{
            setLoading({active:""})
           // if(data.data?.message)
          //  window.location.reload()
          console.log(data)
        })
        .catch((error)=>console.log(error))     
    } 
    
    return show ?(
        <>
           
            <form className="form__add__media" onSubmit={handleSubmit(onSubmit)}>
                <h3>Додати медіа файли</h3>
                {loadImg ? <div className="block__loading">
                <LoadingPage effload={false} message = "kdkdd" />
            </div>:""}
                <div className="form__inp__wr">
                    <div className="form__inp__wr__files">
                        {filesData.map((item,index)=>{
                            return(
                                <div key={index}>
                                    <p style={{textDecoration:"underline"}} >{item}</p>
                                    <div className="form__inp__wr__files__delete"></div>
                                </div>
                                
                            )
                        })}
                    </div>
                    <div className="form__inp__wr__grid">
                        {/* <input type="text" {...register('title', { required: true })} placeholder="Назва файлу"/> */}
                        <label htmlFor="fileInput"><img src={add} alt="Завантажити файл" /></label>
                        <input style={{display:"none"}} id="fileInput" multiple type="file" onChange={(e)=>{
                            setData(e.target.files)
                            console.log(imgData);
                            const newMas=[]
                            Object.values(e.target.files).map((item,index)=>{
                                console.log(item);
                                newMas.push(item.name)
                            })
                            setFilesData(newMas)
                            console.log(newMas);
                        }}/>
                        <label htmlFor="submitInput"><img src={send} alt="Відправити файл" /></label>
                        <input style={{display:"none"}} type="submit" id="submitInput" />
                    </div>
                
                <div>
                {errors.pic && <span>Оберіть файл для завантаження</span>}
                {errors.title && <span>Введіть ім'я завантаженого файлу</span>}
                </div>
                </div>
                
            </form>
            <Loading timer={loading.timer} message={loading.message} active={loading.active}/>
            
        </>
    ):(
        <></>
    )
}

export default PhotosForm;