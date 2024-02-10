import React from "react";
import { useState } from "react";

import { useEffect } from "react";
import { getResourcesBD } from "../../services/resources-api";
import s from "./Resources.module.css"
import pngImg from "./../../img/resources/png.png"
import docImg from "./../../img/resources/doc.png"
import docxImg from "./../../img/resources/docx.png"
import jpegImg from "./../../img/resources/jpeg.png"
import jpgImg from "./../../img/resources/jpg.png"
import movImg from "./../../img/resources/mov.png"
import mp3Img from "./../../img/resources/mp3.png"
import mp4Img from "./../../img/resources/mp4.png"
import pdfImg from "./../../img/resources/pdf.png"
import pptImg from "./../../img/resources/ppt.png" 
import pptxImg from "./../../img/resources/pptx.png" 
import xlsImg from "./../../img/resources/xls.png"
import xlsxImg from "./../../img/resources/xlsx.png"


const GetResources = ()=>{

    const InfoModal = ()=>{
        document.addEventListener("keydown",(e)=>{
            if(e.key == "Escape"){
                setInfo({...info,open:false})
            }
        })

        return(
            <div className={s.modal__file}>
            <div className={s.modal__file__black} id="modal__file__black" onClick={(e)=>{
                if(e.target.id == "modal__file__black") setInfo({...info,open:false});    
            }}>
                <div className={s.modal__file__inner}>
                    <div className={s.modal__file__img}>
                        <img src={info.img} alt="" />
                    </div>
                    <div className={s.modal__file__info}>
                        <h3>Назва:</h3>
                        <p>{info.title}</p>
                        <h3>Дата:</h3>
                        <p>{info.date}</p>
                        <h3>Розмір:</h3>
                        <p>{info.size}</p>
                        <h3>Опис файлу:</h3>
                        <p>{info.description}</p>
                        <a target="_blank" href={info.link} className="primary__btn padding20px" download={true}>Завантажити</a>
                    </div>
                </div>
            </div>
        </div>
        )
    }
    function File(elems){             
        return elems.map((elem,ind)=> {
            let imgUrl = "";   
            switch (elem.format){
                case "png":{
                    imgUrl = elem.link;
                    break;
                }
                case "doc":{
                    imgUrl = docImg;
                    break;
                }
                case "docx":{
                    imgUrl = docxImg;
                    break;
                }
                case "jpeg":{
                    imgUrl = elem.link;
                    break;
                }
                case "jpg":{
                    imgUrl = elem.link;
                    break;
                }
                case "mov":{
                    imgUrl = movImg;
                    break;
                }
                case "mp3":{
                    imgUrl = mp3Img;
                    break;
                }
                case "mp4":{
                    imgUrl = mp4Img;
                    break;
                }
                case "pdf":{
                    imgUrl = pdfImg;
                    break;
                }
                case "ppt":{
                    imgUrl = pptImg;
                    break;
                }
                case "pptx":{
                    imgUrl = pptxImg;
                    break;
                }
                case "xls":{
                    imgUrl = xlsImg;
                    break;
                }
                case "xlsx":{
                    imgUrl = xlsxImg;
                    break;
                }
            }
            return(
                <div className={s.file__card} key={ind} onClick={()=>{
                    setInfo({
                        open:true,
                        title:elem.title,
                        description:elem.description,
                        size:elem.size,
                        link:elem.link,
                        date:elem.date,
                        img:imgUrl
                    })
                }}>
                    <img src={imgUrl} alt="" />
                    <h2 className={s.titleH2}>{elem.title}</h2>
                </div>
            )
        })
}
    const [files, setFiles] = useState([])
    const [show, setShow] = useState(false)
    const [info, setInfo] = useState(false)
    useEffect(()=>{
        getResourcesBD().then((res) => {
            setFiles(res)
            setShow(true)
            });
    },[])

    return show ?(
        <div>
            {info.open ? <InfoModal />:""}
            
            <div className={s.wrap__cards}>
                {File(files)}
            </div>
            
        </div>
    ):(
        <>555</>
    )
}

export default GetResources;