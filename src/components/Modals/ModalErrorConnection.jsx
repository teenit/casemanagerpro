import React from "react";
import s from "./error-connection.module.css"
const ModalErrorConnection = ({error,func})=>{
    let message = ""
    switch (error.code){
        case "ERR_NETWORK" :{
            message = "Помилка з'єднання з сервером. Перевірте з'єднання з інтернетом";
        }
        case "ERR_BAD_REQUEST" :{
            message = "Помилка з'єднання з сервером. Код помилки ERR_BAD_REQUEST 404";
        }
    }
    return(
        <div className={s.modal__wrap}>
            <div className={s.modal__inner}>
                <p>{message}</p>
            </div>
            <div className={s.close}
            onClick={()=>{
                func()
            }}
            >
                <span></span>
                <span></span>
            </div>
        </div>
    )
}
export default ModalErrorConnection;