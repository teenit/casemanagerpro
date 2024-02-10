import React from "react";

import s from "./Primary.module.css"
const PrimaryBtn = (props)=>{
    return (
        <button className={s.btn} onClick={props.click}>{props.name}</button>
    )
}
export default PrimaryBtn;