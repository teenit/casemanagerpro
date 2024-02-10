import React from "react";
import { useState } from "react";
import AddResources from "./AddResources";
import GetResources from "./GetResources";

import s from './Resources.module.css';

const Resources = ()=>{
    const [form, setForm] = useState(false)
    return(
        <div className={s.wrapper}>
            <div className={s.title}>
                <h1>Ресурси</h1>
                <span className={s.plus} onClick={
                    ()=>{
                        setForm(!form)
                    }
                }>{form ? "-" :"+"}</span>
            </div>
            <div className={s.control}>
                {form ? <AddResources /> : ""}
            </div>
            <div className={s.get__resources}>
                <GetResources />
            </div>
        </div>
    )
}

export default Resources;