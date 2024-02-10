import React, { useState } from "react";
import ForgotPass from "./ForgotPass";
import LoginForm from "./LoginForm";
import Registration from "./Registration";

import './Registration.css';


const Login = ()=>{
    const [selected, setSelected] = useState({
        register: false,
        auth: true,
        forgot: false
    });
    
 
    return (
        <div className="reg__container">
            <div className="reg__menu">
                <div className={`reg__menu__item ${selected.auth ? "active" : ""}`} onClick={()=>{setSelected({
                           register: false,
                           auth: true,
                           forgot: false
                })}}>Авторизація</div>
                <div className="reg__menu__item__znak">|</div>
                <div className={`reg__menu__item ${selected.register ? "active" : ""}`} onClick={()=>{setSelected({
                           register: true,
                           auth: false,
                           forgot: false
                })}}>Реєстрація</div>
            </div>
            {selected.auth ? <LoginForm /> : ""}
            {selected.register ? <Registration /> : ""}
            {selected.forgot ? <ForgotPass /> : ""}
            <div className="reg__form__recovery">
                <p>Забули пароль - <b className={`reg__form__recovery__btn ${selected.forgot ? "active" : ""}`} onClick={()=>{setSelected({
                           register: false,
                           auth: false,
                           forgot: true
                })}}>Відновити</b></p>
            </div>
        </div>
    )
}
export default Login;