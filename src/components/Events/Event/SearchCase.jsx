import axios from "axios";
import React, { useState } from "react";
import { serverAddres } from "../../Functions/serverAddres";
import s from "./modal.module.css";
const SearchCase = ({eventID,getUsers})=>{
    const [sCase, setSCase] = useState({userName:""})
    const [searchVal, setSearchVal] = useState("");
    const [userInSystem, setSCaseInSystem] = useState(true);
    const [searchRes, setSearchRes] = useState([])
    function search(){
        let obj = {
            id: localStorage.getItem("id"),
            token: localStorage.getItem("token"),
            val:searchVal
        }
        axios({
            url: serverAddres("case/search.php"),
            method: "POST",
            header : {'Content-Type': 'application/json;charset=utf-8'},
            data : JSON.stringify(obj),
        })
        .then((data)=>{ 
            setSearchRes(data.data)
            
        })
        .catch((error)=>console.log(error))  
    }
    function addUser(){
        if(sCase.userName == "" || sCase.phone == "") return window.alert("Заповніть всі поля");
        let obj = {
            id: localStorage.getItem("id"),
            token: localStorage.getItem("token"),
            userName: sCase.userName,
            phone:sCase.phone,
            userID: sCase.id,
            eventID:eventID
        }
        axios({
            url: serverAddres("event/add-member-case.php"),
            method: "POST",
            header : {'Content-Type': 'application/json;charset=utf-8'},
            data : JSON.stringify(obj),
        })
        .then((data)=>{ 
            if(data.data == true){
                 getUsers(eventID,"eventMemberCase");
            }
           
        })
        .catch((error)=>console.log(error))  
    }
    return (
        <div className={s.add__user__wrap}>
            <p className={s.add__user__title}>Додати учасника івента (для кого івент)</p>
            <p className={s.add__user__choice}><span className={userInSystem ? s.active__choice : null} onClick={()=>{
                    setSCaseInSystem(true)
                    setSCase({userName:""})
                }}>Існуючий</span> | 
                <span className={!userInSystem ? s.active__choice : null} onClick={()=>{
                    setSCaseInSystem(false)
                    setSCase({userName:"",phone:"",id:0})
                }}>Новий</span> </p>
            {userInSystem ?
                <div className={s.add__user__search}>
                    <input value={sCase.userName} className={s.search__inp} type="text" 
                         onChange={(val)=>{
                            setSearchVal(val.target.value)
                            setSCase({...sCase,userName:val.target.value})
                            search()
                    }}/>
                    <div className={s.add__case__results}>
                        <div className={s.add__user__result}>
                            {searchRes.map((item, index)=>{
                                return(
                                    <div key={index} className={`${s.add__user__item}`} onClick={()=>{
                                        let pib = `${item.surname} ${item.firstName} ${item.secondName}`
                                        pib = pib.trim();
                                        console.log(pib)
                                        setSCase({...sCase,userName:pib,id:item.id,phone:item.phone1})
                                        setSearchRes([])
                                    }}>
                                        <p className={s.add__user__item__p}>{`${item.surname} ${item.firstName} ${item.secondName}`}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
               :
                <div className={s.add__user__form}>
                    <input value={sCase.userName} placeholder="Введіть ПІБ" type="text" onChange={(e)=>{
                        setSCase({...sCase,userName:e.target.value})
                    }}/>
                    <input value={sCase.phone} placeholder="Введіть номер телефону" type="text"  onChange={(e)=>{
                        setSCase({...sCase,phone:e.target.value.trim()})
                    }}/>
                </div>
            }
            <div className={s.margin__top__20px}>
                <button onClick={addUser} className="primary__btn">Додати користувача</button>
            </div>
        </div>
    )
}

export default SearchCase;