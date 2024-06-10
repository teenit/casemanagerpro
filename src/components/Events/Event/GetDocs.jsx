import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ImgFormat from "../../Functions/ImgFormat";
import { serverAddres } from "../../Functions/serverAddres";
import downloadImg from "./../../../img/icons/downloading-50.png"
import s from "./get-media.module.css";
const GetDocs = ({id,docs})=>{

    let data = docs.map((item,index)=>item.fileInfo)
    console.log(docs);
    return(
        <div className={s.file__wrap}>
            <h2>Завантажені документи</h2>
            <div className={s.file__inner}>
                {
                    docs.map((item,index)=>{
                     return(
                        <div key={index} className={s.item}>
                            <div className={`${s.list} ${s.list__img}`}>
                                <a target="_blank" href={item.link} className={s.link__img} download={true}><img src={downloadImg} alt="" /></a>
                                <ImgFormat img={item.format}/>
                            </div>
                            <div className={s.list}>
                                <p>{item.title}</p>
                            </div>
                            <div className={s.list}>
                                <p>{item.description}</p>
                            </div>
                            
                        </div>
                     )       
                    })
                }
            </div>
        </div>
    )
}

export default GetDocs;