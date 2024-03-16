import axios from "axios";
import React from "react";
import { useState } from "react";
import { serverAddres } from "../../../Functions/serverAddres";
import s from "./Settings/set.module.css";
import Input from '../../../elements/Inputs/Input'
const Connections = ({id,caseInfo})=>{
    console.log(caseInfo)
    const [connect, setConnect] = useState({
        caseID:"",
        caseName:"",
        commentar:"",
        search:"",
        caseNameWho: caseInfo.surname + " " + caseInfo.firstName + " " + caseInfo.secondName,
        caseIDWho:id,
    });
    const [search,setSearch] = useState([])
    const [openSearch, setOpenSearch] = useState(true)
    function getSearch(){
            let obj = {
                id: localStorage.getItem("id"),
                token: localStorage.getItem("token"),
                val:connect.search
            }
            
            axios({
                url: serverAddres("case/search.php"),
                method: "POST",
                header : {'Content-Type': 'application/json;charset=utf-8'},
                data : JSON.stringify(obj),
            })
            .then((data)=>{ 
                setSearch(data.data)
            })
            .catch((error)=>console.log(error))   
    }
    function addConnect(){
        if(connect.caseID == "" || connect.caseName == "") return window.alert("Помилка, перевірте правильність введених даних")
        if(!window.confirm("Ви впевнені, що хочете зробити зв'язок з кейсом № " + connect.caseID + ", " + connect.caseName)) return;
        let caseNameWho = caseInfo.surname + " " + caseInfo.firstName + " " + caseInfo.secondName;
        let obj = {
            id: localStorage.getItem("id"),
            token: localStorage.getItem("token"),
            userName: localStorage.getItem("userName"),
            caseID:connect.caseID,
            caseName:connect.caseName.trim(),
            commentar:connect.commentar,
            caseNameWho: caseNameWho.trim(),
            caseIDWho:id,
        }
     
        axios({
            url: serverAddres("manage/add-connections.php"),
            method: "POST",
            header : {'Content-Type': 'application/json;charset=utf-8'},
            data : JSON.stringify(obj),
        })
        .then((data)=>{ 
           console.log(data.data)
        })
        .catch((error)=>console.log(error))   
}
    return(
        <div className={s.con__form}>
            <div className={s.search__inp}>
                <Input type="text" value={connect.search} label="Пошук кейсу для зв'язку" onChange={(e)=>{
                    setConnect({...connect,search:e.target.value})
                    getSearch()
                    setOpenSearch(true)
                }}/>
                {openSearch && connect.search !== "" ?<div className={s.search__result}>
                    {search.map((item, index)=>{
                       console.log(item)
                       if(item.id == id) return null;
                        return(
                            <div key={index} className={s.search__item} onClick={()=>{
                                if(item.id !== id){
                                    setConnect({...connect,
                                        caseName:item.surname  + " "+ item.firstName + " " + item.secondName,
                                        caseID:item.id,
                                        search:item.surname  + " "+ item.firstName + " " + item.secondName
                                    })
                                    setOpenSearch(false);
                                }
                               
                            }}>
                                <div className={s.item__result}>
                                    <div className={s.item__search__title}><p>{item.surname} {item.firstName} {item.secondName}</p></div>
                                    <div className={s.item__search__id}><p>{item.id}</p></div>
                                </div>
                            </div>
                        )
                    })}
                </div>:null}
                    <div className={s.commentar}>
                        <Input type="text" label ="Причина зв'язку" onChange={(e)=>setConnect({...connect,commentar:e.target.value.trim().replaceAll("'","’")})}/>
                    </div>
                <div className={s.add__connect}>
                    <button onClick={addConnect} className={s.btn}>Створити зв'язок</button>
                </div>
            </div>
        </div>
    )
}

export default Connections;