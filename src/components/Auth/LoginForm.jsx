import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/Slices/userSlice";
import './Registration.css';
import { serverAddres } from "../Functions/serverAddres";
import ModalMessage from "../Modals/ModalMessage";
const LoginForm = ({show})=>{
    const [modal, setModal] = useState(false);
    const [modalInfo, setModalInfo] = useState(false);
    const dispatch = useDispatch();
    async function getUser(data){
        await fetch(serverAddres("login.php"),{
            method:"POST",
            header : {'Content-Type': 'application/json;charset=utf-8'},
            body:  JSON.stringify(data)
        })
            .then(res => res.json())
            .then((data) => {
               
                if("message" in data){
                    setModal(true)
                   return setModalInfo(data)
                }
                localStorage.setItem("token", data.token)
                localStorage.setItem("email", data.email)
                localStorage.setItem("id", data.user_id)
                localStorage.setItem("userName", data.userName)
                localStorage.setItem("profilePhoto", data.profilePhoto)
               dispatch(setUser({
                    email:data.email,
                    id: data.user_id,
                    token: data.token,
                    data:data,
                    userName:data.userName,
                    profilePhoto:data.profilePhoto,
                    access: data.access
                }))

                window.location.href ="/"
            })
            .catch(rejected => {
                console.log(rejected);
            });
            reset()
           
    }
    const {register,formState:{errors,isValid},handleSubmit,reset} = useForm({mode:'onChange'});
    return (
        <>
            <form action="" className="reg__form" onSubmit={handleSubmit(getUser)}>
                <div className="reg__block">
                    <label>E-mail {errors?.login && <span className="error__mes">{errors?.login?.message || "Обов'язково до заповнення"}</span>}</label>
                    <input type="email" {...register("login",{required:true,minLength:{value:5,message:"Мінімум 5 символа"}})} />
                </div>
                <div className="reg__block">
                    <label>Пароль {errors?.password && <span className="error__mes">{errors?.password?.message || "Обов'язково до заповнення"}</span>}</label>
                    <input type="password" {...register("password",{required:true,minLength:{value:5,message:"Мінімум 5 символа"}})} />
                </div>
                
                <div className="reg__block">
                    <label></label>
                    <button className={`primary__btn ${!isValid ? 'active' : ""}`} disabled={!isValid}>Авторизація</button>
                </div>
            </form>
            {modal ? <ModalMessage>
                <p>{modalInfo.message}</p>
                <button className="primary__btn padding20px" onClick={()=>{setModal(false)}}>ОК</button>
            </ModalMessage> : ""}
        </>
       
    )
}
export default LoginForm;