import React from "react";
import s from "./bigphoto.module.css"

const BigPhoto = ({link,close})=>{
    return(
        <div className={s.wrap} onClick={()=>{
            close()
        }}>
            <div className={s.inner}>
                <img src={link} alt="" />
            </div>
        </div>
    )
}
export default BigPhoto;