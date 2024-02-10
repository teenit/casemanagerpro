import React, {useState} from "react";
import { useForm } from "react-hook-form";
import './Registration.css';
import { serverAddres } from "../Functions/serverAddres";
import ModalSimple from "../Modals/ModalSimple";


const Registration = ()=>{
    const [modal, setModal] = useState(false)
    const [modalInfo, setModalInfo] = useState(false);

    async function saveUser(data){
        let levelObj = {
            activeNewUser: false,
            addCase: false,
            addEditCategoriesCase: false,
            addEditCategoriesUser: false,
            case: false,
            cases: false,
            changeResponsibleCase: false,
            contacts: false,
            createIndividualPlan: false,
            deactivateUsers: false,
            editOwnCase: false,
            editSomeonesCase: false,
            history: false,
            loadDocument: false,
            loadPhotoVideo: false,
            ownCab: false,
            reports: false,
            searchCasesUsers: false,
            settings: false,
            specificationUsers: false,
            statistics: false
        }
        data.level = levelObj;

        await fetch(serverAddres("user-register.php"),{
            method:"POST",
            header : {'Content-Type': 'application/json;charset=utf-8'},
            body:  JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if(Object.keys(data).includes("message")){
                    setModal(true)
                    setModalInfo(data)
                }
            })
            .catch(rejected => {
                console.log(rejected);
            });
            reset()
            console.log(data)
    }
    const {register,formState:{errors,isValid},handleSubmit,reset} = useForm({mode:'onChange'});
 
    return(
            <form action="" className="reg__form" onSubmit={handleSubmit(saveUser)}>
                
                <div className="reg__block">
                    <label>ПІБ {errors?.userName && <span className="error__mes">{errors?.userName?.message || "Обов'язково до заповнення"}</span>}</label>
                    <input type="text" {...register("userName" ,{required:true,minLength:{value:3,message:"Мінімум 3 символа"}})}/>
                    
                </div>
                <div className="reg__block">
                    <label>Номер телефону {errors?.userPhone && <span className="error__mes">{errors?.userPhone?.message || "Обов'язково до заповнення"}</span>}</label>
                    <input type="text" {...register("userPhone", {value:"+380"} ,{required:"",minLength:{value:10,message:"Мінімум 10 символа"}})} />
        
                </div>
                <div className="reg__block">
                    <label>E-mail {errors?.userEmail && <span className="error__mes">{errors?.userEmail?.message || "Обов'язково до заповнення"}</span>}</label>
                    <input type="email" {...register("userEmail",{required:true,minLength:{value:5,message:"Мінімум 5 символа"}})} />
                    
                </div>
                <div className="reg__block">
                    <label>Адреса {errors?.userAddress && <span className="error__mes">{errors?.userAddress?.message || "Обов'язково до заповнення"}</span>}</label>
                    <input type="text" {...register("userAddress",{required:false,minLength:{value:5,message:"Мінімум 5 символа"}})} />
                    
                </div>
                <div className="reg__block">
                    <label>Тип користувача</label>
                    <select {...register("userType")}>
                        <option key={"volunteer"} value={"volunteer"}>Волонтер</option>
                        <option key={"manager"} value={"manager"}>Менеджер</option>
                        <option key={"expert"} value={"expert"}>Залучений спеціаліст</option>
                        <option key={"worker"} value={"worker"}>Працівник</option>
                        <option key={"fsr"} value={"fsr"}>ФСР</option>
                        <option key={"administrator"} value={"administrator"}>Адміністратор</option>
                    </select>
                </div>
                <div className="reg__block">
                    <label>Спеціалізація / Робота {errors?.userWork && <span className="error__mes">{errors?.userWork?.message || "Обов'язково до заповнення"}</span>}</label>
                    <input type="text" {...register("userWork",{required:true,minLength:{value:3,message:"Мінімум 3 символа"}})} />
                </div>
                <div className="reg__block">
                    <label>Розкажіть про себе (хобі, сім'я, цікаві факти) {errors?.userAnotherData && <span className="error__mes">{errors?.userAnotherData?.message || "Обов'язково до заповнення"}</span>}</label>
                    <textarea cols="30" rows="10" {...register("userAnotherData",{required:false,minLength:{value:3,message:"Мінімум 3 символа"}})}></textarea>
                    </div>
                    <div className="reg__block">
                    <label>Пароль {errors?.pass && <span className="error__mes">{errors?.pass?.message || "Обов'язково до заповнення"}</span>}</label>
                    <input type="password" {...register("pass",{required:true,minLength:{value:6,message:"Мінімум 6 символа"}})} />
                </div>
                <div className="reg__block">
                    <label></label>
                    <button className={`primary__btn ${!isValid ? 'active' : ""}`} disabled={!isValid}>Реєстрація</button>
                </div>
                {modal ? <ModalSimple>
                    <p>{modalInfo.message}</p>
                    <button className="primary__btn padding20px" onClick={()=>{setModal(false)}}>ОК</button>
                </ModalSimple> : ""}
            </form>
         
    )
}
export default Registration;