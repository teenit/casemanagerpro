import React from "react";
import axios from "axios";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { serverAddres } from "../../../Functions/serverAddres";
import imgSend from "../../../../img/icons/send.png";


const Active = ({elem})=>{
    console.log(elem)
    return(
         <div className="helpes__viewer__line">
         <div className="helpes__viewer__data">
            <NavLink to={`/user?${elem.userId}`}>{elem.userName}</NavLink>
            <span>{elem.date}</span>  
         </div>
         <div className="helpes__viewer__mess">

            <p><b>Надавав допомогу</b> {elem.whoHelp}.</p>
            <p><b>Дата надання</b> {elem.dateHelp}</p>
             <p><b>Деталі наданої допомоги</b> <span dangerouslySetInnerHTML= {{__html:elem.mess}} /></p>
         </div>
     </div>
    )
}

const CaseGiveHelp = ({level})=>{
    function addHelp(){
        let mess = document.querySelector("#mess__help").value.replaceAll("'", "’").replace(/\n/g, "<br />");
        let dateHelp = document.querySelector("#date__help").value;
        let whoHelp = document.querySelector("#who__help").value.replaceAll("'", "’");
        let obj = {
            caseId:window.location.search.slice(1),
            id: localStorage.getItem("id"),
            token: localStorage.getItem("token"),
            mess: mess,
            date:dateHelp,
            whoHelp:whoHelp,
            userName: localStorage.getItem("userName")
        }
        console.log(obj)
        axios({
            url: serverAddres("case/add-help.php"),
            method: "POST",
            header : {'Content-Type': 'application/json;charset=utf-8'},
            data : JSON.stringify(obj),
        })
        .then((data)=>{ 
            console.log(data)
            setActHelp(data.data)  
            document.querySelector("#mess__help").value = ""
            document.querySelector("#date__help").value = ""
            document.querySelector("#who__help").value = ""
        })
        .catch((error)=>console.log(error))  
    }
    const [actHelp, setActHelp] = useState([]);
    useEffect(()=>{
        let obj = {
            caseId:window.location.search.slice(1),
            id: localStorage.getItem("id"),
            token: localStorage.getItem("token")
        }
        axios({
            url: serverAddres("case/get-help.php"),
            method: "POST",
            header : {'Content-Type': 'application/json;charset=utf-8'},
            data : JSON.stringify(obj),
        })
        .then((data)=>{ 
            console.log(data)
            setActHelp(data.data)  
        })
        .catch((error)=>console.log(error))  
    },[])
    const active = actHelp.map((elem,index)=>{
        return <Active key={index} elem={elem}/>
    }) 
    return(
            <div className="helpes__wrap">
                <div className="helpes__inner">
                    <h2>Надано допомогу</h2>
                    <div className="helpes__viewer">
                       {active}
                    </div>
                    {level ? <div className="helpes__mes__wrap">
                        <div className="helpes__mes__inner">
                        <div className="helpes__btn">
                                    <input type="date" name="date__help" id="date__help" />
                                    <input type="text" name="who__help" id="who__help" placeholder="Хто надав допомогу"/>
                                </div>
                            <div className="helpes__field">
                                <textarea name="" id="mess__help" cols="30" rows="5" placeholder="Деталі наданої допомоги"></textarea>
                                <img onClick={addHelp} src={imgSend} alt="" />
                            </div>
                          
                            
                        </div>
                    </div>:""}
                </div>
            </div>
    )
}
export default CaseGiveHelp;