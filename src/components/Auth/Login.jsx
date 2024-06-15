import React, { useState } from "react";
import ForgotPass from "./ForgotPass";
import LoginForm from "./LoginForm";
import Registration from "./Registration";

import './Registration.css';
import { LANG } from "../../services/config";


const Login = ()=>{
    const [selected, setSelected] = useState({
        register: false,
        auth: true,
        forgot: false
    });
    
 const switchForms = ()=>{
    setSelected({...selected,register:false,auth:true, forgot:false})
 }
    return (
        <div className="reg__container">
            <div className="reg__menu">
                <div className={`reg__menu__item ${selected.auth ? "active" : ""}`} switchForms={switchForms} onClick={()=>{setSelected({
                           register: false,
                           auth: true,
                           forgot: false
                })}}>{LANG.login.auth}</div>
                <div className="reg__menu__item__znak">|</div>
                <div className={`reg__menu__item ${selected.register ? "active" : ""}`} onClick={()=>{setSelected({
                           register: true,
                           auth: false,
                           forgot: false
                })}}>{LANG.login.signup}</div>
            </div>
            {selected.auth ? <LoginForm /> : ""}
            {selected.register ? <Registration /> : ""}
            {selected.forgot ? <ForgotPass /> : ""}
            <div className="reg__form__recovery">
                <p>{LANG.login.forgetPass} <b className={`reg__form__recovery__btn ${selected.forgot ? "active" : ""}`} onClick={()=>{setSelected({
                           register: false,
                           auth: false,
                           forgot: true
                })}}>{LANG.buttonTexts.recover}</b></p>
            </div>
        </div>
    )
}
export default Login;