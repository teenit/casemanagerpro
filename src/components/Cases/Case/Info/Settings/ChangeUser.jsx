import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getUsers} from "../../../../../services/user-api";
import { serverAddres } from "../../../../Functions/serverAddres";
import s from "./set.module.css"
const ChangeUser = ({userId,id})=>{
    const [users,setUsers] = useState([])
    const [currentUser, setCurrentUser] = useState({})
    const [switchId,setSwitchId] = useState(userId);
    function changeUserCase(){
        if(window.confirm("Ви впевнені, що хочете передати кейс?")){}else{return}
        let obj = {
            id:id,
            userId: localStorage.getItem("id"),
            token: localStorage.getItem("token"),
            switchId: switchId
          };
        axios({
            url: serverAddres("case/switch-case.php") ,
            method: "POST",
            header : {'Content-Type': 'application/json;charset=utf-8'},
            data : JSON.stringify(obj),
          })
          .then((data)=>{ 
                if(data.data === true){
                    window.alert("Встановлено нового користувача")
                    window.location.reload()
                }
          })
          .catch((error)=>console.log(error)) 
    }
    useEffect(()=>{
        let obj = {
            id: localStorage.getItem("id"),
            token: localStorage.getItem("token"),
          };
        axios({
            url: serverAddres("user/get-users.php") ,
            method: "POST",
            header : {'Content-Type': 'application/json;charset=utf-8'},
            data : JSON.stringify(obj),
          })
          .then((data)=>{ 
            data.data.forEach(element => {
                    if(userId == element.id){
                        setCurrentUser(element)
                    }
                });
                setUsers(data.data)
          })
          .catch((error)=>console.log(error)) 
    },[])
    return(
        
            <div className={s.user__wrap}>
                <div>
                    <p>Відповідальний за ведення кейсу <b>{currentUser.userName}</b></p>
                </div>
                <div>
                    <label htmlFor="users">Передати кейс користувачу</label>
                <select name="users" id="users" defaultValue={userId} onChange={(e)=>{
                    setSwitchId(e.target.value)
                }}>
                <option value={currentUser.id}>{currentUser.userName}</option>
                {users.map((item,index)=>{
                    return currentUser.id !== item.id ?(
                    <option key={index} value = {item.id} >{item.userName}</option>
                    ):null
                })}
            </select>
                <button onClick={changeUserCase} className={s.btn}>Передати</button>
                </div>
            
            </div>
        
    )
}

export default ChangeUser;