import React from "react";
import s from './AddCase.module.css'
const ModalError =({errors,func})=>{
    const Error = ({elem})=>{
        return(
            <div className={s.error__div}>
                <p>{elem}</p>
            </div>
        )
    }
    return(
        <div className={s.modal__errors}>
            <div id="modal__errors__black" className={s.modal__errors__black} onClick={(e)=>{
                if(e.target.id == "modal__errors__black") func();    
            }}>
                <div className={s.modal__errors__inner}>
                    {errors.map((elem,ind)=>{
                        return <Error elem={elem} key={ind} />
                    })}
                    <div className={s.btn__errors}>
                        <button
                        className="primary__btn"
                         onClick={()=>{
                            func();
                        }}>OK</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ModalError;