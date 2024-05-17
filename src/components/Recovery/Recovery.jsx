import React from "react";
import axios from "axios";
import { serverAddres } from "../Functions/serverAddres";
import { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./recovery.css";
import ModalMessage from "../Modals/ModalMessage";


const Recovery = ()=>{
   const [recoveryEmail, setRecoveryEmail] = useState("")
   const [recoveryPass, setRecoveryPass] = useState("")
   const [recoveryPassto, setRecoveryPassto] = useState("")
   const [recoveryError, setRecoveryError] = useState("")
   const [modal, setModal] = useState(false)
   const [modalInfo, setModalInfo] = useState(false);
    const [showForm, setShowForm] = useState(false);
    useEffect(()=>{
        axios({
            url: serverAddres("user/check-recovery-pass.php"),
            method: "POST",
            header : {'Content-Type': 'application/json;charset=utf-8'},
            data : JSON.stringify({hash:window.location.search.slice(1)}),
        })
        .then((data)=>{ 
            setShowForm(data.data.active)       
        })
        .catch((error)=>console.log(error))  
    },[])
    
    return !showForm ? (
        <div className="recovery__wrap">
            Відновлення...
        </div>
    ):(
        <div className="wrap__rec__form">
            <label htmlFor="rec__email">Введіть Email</label>
            <input type="text" name="rec__email" id="rec__email"
            value={recoveryEmail} onChange={(e)=>{
                setRecoveryEmail(e.target.value)
            }}/>
            <label htmlFor="rec__pass">Введіть пароль</label>
            <input type="password" name="rec__pass" id="rec__pass"
            value={recoveryPass} onChange={(e)=>{
                setRecoveryPass(e.target.value)
            }}/>
            <label htmlFor="rec__passto">Повторіть пароль</label>
            <input type="password" name="rec__passto" id="rec__passto"
            value={recoveryPassto} onChange={(e)=>{
                setRecoveryPassto(e.target.value)
            }}/>
            <div className="error__recovery">
                <p>{recoveryError}</p>
            </div>
            <div>
                 <button className="primary__btn"
                 onClick={()=>{
                    if(recoveryPass !== recoveryPassto){
                        setRecoveryError("Паролі не збігаються");
                        return
                    }else if(recoveryPass.length < 6){
                        setRecoveryError("Довжина паролю повинна бути більше 6 символів");
                        return;
                    }
                    axios({
                        url: serverAddres("user/recovery-pass.php"),
                        method: "POST",
                        header : {'Content-Type': 'application/json;charset=utf-8'},
                        data : JSON.stringify({
                            hash:window.location.search.slice(1),
                            pass:recoveryPass
                        }),
                    })
                    .then((data)=>{ 
                        if(data.data.good){
                            setModalInfo({
                                showModal:true,
                                message:data.data.message,
                                marker:"green"
                            })
                        }else{
                            setModalInfo({
                                showModal:true,
                                message:data.data.message,
                                marker:"red"
                            })
                        } 
                        setModal(true)     
                    })
                    .catch((error)=>console.log(error))  
            }}>Надіслати запит</button>
            </div>
            {modal ? <ModalMessage>
                <p>{modalInfo.message}</p>
                <NavLink to = "/login">Перейти до авторизації</NavLink>
                <button className="primary__btn padding20px" onClick={()=>{setModal(false)}}>ОК</button>
            </ModalMessage> : ""}
        </div>
    )
}
export default Recovery;