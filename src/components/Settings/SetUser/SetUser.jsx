import React, {useEffect, useState} from "react";
import axios from "axios";
import Loadpic from "../../Loading/Interactive/Loadpic";
import deleteImg from "./../../../img/icons/delete-48.png";
import bookImg from "./../../../img/icons/book-50.png";
import showImg from "./../../../img/icons/show-50.png";
import hideImg from "./../../../img/icons/hide-50.png";
import {serverAddres} from "./../../Functions/serverAddres";
import ModalSimple from "../../Modals/ModalSimple";
import Specification from "./Specification";
let usersStr = "";


const SetUser = ({categories,categoriesCont})=>{
    const [users, setUsers] = useState(null);
    const [specificate, setSpecificate] = useState(null);
    const [activeSpecificate, setActiveSpecificate] = useState(false);
    const [level, setLevel]  = useState({"foo":"bar"})
    const [modal,setModal] = useState(false)
    const [modalInfo, setModalInfo] = useState(false)
    function activateUser(arg,userID, text,keyt){
        let obj = {
            id: localStorage.getItem("id"),
            token: localStorage.getItem("token"),
            activate: arg,
            userId:userID,
            text:text,
            keyt:keyt
        }
        axios({
            url: serverAddres("user/activate.php"),
            method: "POST",
            header : {'Content-Type': 'application/json;charset=utf-8'},
            data : JSON.stringify(obj),
        })
        .then((data)=>{ 
            if(data.data?.message){
                setModal(true);
                return setModalInfo({message:data.data.message});
            }
           window.location.reload()        
        })
        .catch((error)=>console.log(error)) 
    }
    useEffect(()=>{
        let obj = {
            id: localStorage.getItem("id"),
            token: localStorage.getItem("token")
        }
        axios({
            url: serverAddres("user/get-users.php") ,
            method: "POST",
            header : {'Content-Type': 'application/json;charset=utf-8'},
            data : JSON.stringify(obj),
        })
        .then((data)=>{ 
            setUsers(data.data);      
        })
        .catch((error)=>console.log(error)) 
    },[])

    const UsersData = ({user, index})=>{
        return (
                <div className={`set__users__data__line ${index%2 == 0 ? "arc" : ""}`}>
                    <div className={`set__user__wr ${user.active == "true" ? "arc":""}`}>
                        <div className="set__user__name"><a href={`/user?${user.id}`}>{user.userName}</a></div>
                        <div className="set__user__type"><span>{user.phone}</span></div>
                    </div>
                    
                    <div className="set__user__control__panel">
                        <div className={`set__user__control__panel__icons ${user.active == "true" ? "arc":""}`}>
                            <img id="deleteImg" src={deleteImg} alt="" />
                            {<img id="bookImg" src={bookImg} alt="" onClick={()=>{
                               if(user.id == localStorage.getItem("id") || user?.type == "root"){
                                setModal(true); 
                                setModalInfo({message: "Ви не можете змінювати права доступу для цього користувача"})
                               }else{
                                changeSpecification(user)
                               }
                               
                            }} />}
                            {user.active == "true" ? <img id="showImg" src={showImg} alt="" onClick={()=>{
                                if(user.id == localStorage.getItem("id") || user?.type == "root"){
                                    setModal(true); 
                                    setModalInfo({message: "Ви не можете деактивувати даний обліковий запис"})
                                   }else{
                                    activateUser("false",user.id,"Деактивовано","deactivateUsers")
                                   }
                                }
                                } /> : <img id="hideImg" src={hideImg} alt="" onClick={()=>{
                                    
                                    if(user.id == localStorage.getItem("id") || user?.type == "root"){
                                        setModal(true); 
                                        setModalInfo({message: "Ви не можете активувати даний обліковий запис"})
                                       }else{
                                        activateUser("true",user.id, "Активовано","activeNewUser")
                                       }

                                    
                                    }} />}
                            
                        </div>
    
                    </div>
                </div>
        )
    }
    const UserMas = (pos)=>{
        if(pos.length < 1) return;
                usersStr =  pos.map((post,index)=>{
                return <UsersData key={index} user={post} index={index}/>
        })  
    }    
    function changeSpecification(arg){
      
        setSpecificate(arg)
        setLevel(arg.level)
        setActiveSpecificate(true);
    }
    return !users ?(
        
        <><Loadpic show="active"/></>
    ):(
        <>
         <div className="set__users__wrap">
                <div className="set__users__inner">
                    <h2>Користувачі</h2>
                    <div className="set__users__data">
                        <div className="set__users__data__title">
                            <div className="set__users__data__title__text">
                                <div><span>ПІБ</span></div>
                                <div><span>Телефон</span></div>              
                            </div>

                            <div className="set__users__data__title__panel">
                               <div><span>Панель керування</span></div> 
                            </div>
                        </div>
                        <div className="set__users__data__lines">
                            {UserMas(users)}
                            {usersStr}
                        </div>
                    </div>
                </div>
            
            {activeSpecificate ? <Specification categoriesCont = {categoriesCont} 
                                                categories = {categories} 
                                                close = {()=>{setActiveSpecificate(false)}} 
                                                level = {level} 
                                                user = {specificate}/> : null}
        </div>
        
        {modal ? <ModalSimple>
            <p>{modalInfo.message}</p>
            <button className="primary__btn padding20px" onClick={()=>{setModal(false)}}>Зрозумів</button>
        </ModalSimple> : ""}
        </>
    )
}
export default SetUser;