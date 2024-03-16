import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { serverAddres } from "../../../Functions/serverAddres";

const GetConnections = ({id})=>{
    const [connectionsFor, setConnectionsFor] = useState([])
    const [connectionsFrom, setConnectionsFrom] = useState([])
    function getCon(){
        let obj = {
            id: localStorage.getItem("id"),
            token: localStorage.getItem("token"),
            caseID:id,
        }
     
        axios({
            url: serverAddres("manage/get-connections.php"),
            method: "POST",
            header : {'Content-Type': 'application/json;charset=utf-8'},
            data : JSON.stringify(obj),
        })
        .then((data)=>{ 
            setConnectionsFor(data.data.for)
            setConnectionsFrom(data.data.from)
        })
        .catch((error)=>console.log(error))   
    }
    useEffect(()=>{
        getCon()
    },[])
    return(
        <div className="er__con__wrap">
            <div className="er__con__inner">
                <div className="er__con__from">
                    {connectionsFrom.map((item,index)=>{
                        return(
                            <div key={item.caseID + Math.floor(Math.random() * 500)} className="er__con__from__item__inner">
                                <div className="er__con__from__item">
                                <p>Встановлено зв'язок</p>
                                    <p><a href={`/case?${item.caseID}`}>{item.caseName}</a> - {item.commentar}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="er__con__for">
                    {connectionsFor.map((item,index)=>{
                            return(
                                <div key={item.caseID + Math.random()} className="er__con__from__item__inner">
                                    <div className="er__con__from__item">
                                    <p>Отримано зв'язок</p>
                                        <p><a href={`/case?${item.caseIDWho}`}>{item.caseNameWho}</a> - {item.commentar}</p>
                                    </div>
                                </div>
                            )
                        })}
                </div>
            </div>
        </div>
    )
}
export default GetConnections;