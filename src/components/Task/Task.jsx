import React from "react";
import s from './style.module.css'
const Task = ()=>{

    return(
        <div className={s.wrap}>
            <div className={s.Input}>
                <div className={s['Input-inner']}>
                    <div className={s.icon}></div>
                    <div className={s.wr_input}>
                        <input type="text" className={s.elem}/>  
                        <label htmlFor="">Texy label</label>
                    </div>
                    
                </div>
            </div>

                <div className={s["arrow-4"]}>
                    <span className={s["arrow-4-left"]}></span>
                    <span className={s["arrow-4-right"]}></span>
                </div>


                <div className={s["field-number"]}>
                     <input type="number" />
                </div>
                <input type="number" id={s['my-number-input']} />
        </div>
    )
}

export default Task;