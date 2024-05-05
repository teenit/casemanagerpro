import React from "react";
import axios from "axios";
import { useState } from "react";
import { serverAddres } from "../Functions/serverAddres";
import ModalSimple from "../Modals/ModalSimple";

const ForgotPass = ()=>{
    const [email,setEmail] = useState("")
    const [modal,setModal] = useState(false)
    const [modalInfo, setModalInfo] = useState(false)
    function forgotPass(mail){
        axios({
            url: serverAddres("user/forget-pass.php"),
            method: "POST",
            header : {'Content-Type': 'application/json;charset=utf-8'},
            data : JSON.stringify({email:mail}),
        })
        .then((data)=>{ 
            setModalInfo(data.data)
            setEmail("")
            setModal(true)
          // window.location.reload()        
        })
        .catch((error)=>console.log(error))  
    }

    return(
        <>
        <div className="forget__form"> 
           <h2>Форма відновлення</h2>
            <input type="text"
                placeholder="Ваш Email..."
                value={email}
                onChange={(e)=>{
                setEmail(e.target.value)
            }}/>
            <button className="primary__btn"
                onClick={()=>{
                    forgotPass(email)
            }}>Відновити</button>
        </div>
        {modal ? <ModalSimple>
            <p>{modalInfo.message}</p>
            <button className="primary__btn padding20px" onClick={()=>{setModal(false)}}>Зрозумів</button>
        </ModalSimple> : ""}
        </>
        
    )
}
export default ForgotPass;