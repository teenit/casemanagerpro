import React, { useState } from "react";
import s from './specification.module.css';
const SpecFormBlock = ({rights,userLevel, newUserRights,setSpec,pop})=>{
    const [state,setState] = useState(userLevel);
    return(
        <div className={s.form__block}>
            <h3 className={s.form__block__title}>{pop.title}</h3>
            <p>{pop.description}</p>
            {
                rights.map((item,index)=>{
                    
                   return(
                        <div key={item.key} className={s.form__item}>
                            <label className={`${s.form__label} ${!!state[item.key] ? s.active : null}`} htmlFor={item.key}>
                                <input checked = {!!state[item.key]   } type="checkbox" id={item.key} name={item.key}
                                onChange={(e)=>{
                                    setState({...state,[item.key]:e.target.checked})
                                    setSpec(item.key,e.target.checked)
                                }}/>
                                {item.title}
                            </label>
                        </div>
                    )
                })
            }

        </div>
    )
}
export default SpecFormBlock;