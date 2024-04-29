import React from "react";
import axios from "axios";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import imgSend from "../../../img/icons/send.png";
import edit from '../../../img/icons/edit.svg'
import { serverAddres } from "../../Functions/serverAddres";
import Input from "../../elements/Inputs/Input";
import { changeAps } from "../../Functions/translateString";
import SmallNotification from "../../elements/Notifications/SmallNotification";


const Active = ({elem})=>{
    
    console.log(elem)
    return(
         <div className="GiveHelp-inner-viewer-line">
         <div className="GiveHelp-inner-viewer-data">
            <div>
            <NavLink to={`/user?${elem.userId}`}>{elem.userName}</NavLink>
            <span>{elem.date}</span>  
            </div>
         </div>
         <div className="GiveHelp-inner-viewer-message">
        <span>
        <p><b>Надавав допомогу</b> {elem.whoHelp}.</p>
            <p><b>Дата надання</b> {elem.dateHelp}</p>
             <p><b>Деталі наданої допомоги</b> <span dangerouslySetInnerHTML= {{__html:elem.mess}} /></p>
        </span>
           
             {/* <div className="notes__viewer__mess__panel">
                <div className="notes__viewer__mess__panel__edit">
                    <div className="notes__viewer__mess__panel__edit__ico__wrap">
                        <img src={edit} alt="Редагувати нотатки" />
                    </div>
                </div>
                <div className="notes__viewer__mess__panel__edit">
                    <div className="notes__viewer__mess__panel__edit__option"></div>
                    <div className="notes__viewer__mess__panel__edit__option notes__delete"></div>
                </div>
            </div> */}
         </div>
     </div>
    )
}

const GiveHelp = ({level})=>{
    const [alert,setAlert] = useState({
        success:false,
        error:false,
    })
    const [state,setState] = useState({
        date:"",
        who:"",
        message:"",
    })
    function addHelp(){
        if(state.date.length<=1 || state.who.length<=1){
            setAlert({...alert,error:true})

        }else{
            let obj = {
                caseId:window.location.search.slice(1),
                id: localStorage.getItem("id"),
                token: localStorage.getItem("token"),
                mess: changeAps(state.message),
                date:changeAps(state.date),
                whoHelp:changeAps(state.who),
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
                setState({...state,date:"",who:"",message:""})
                setAlert({...alert,success:true})
            })
            .catch((error)=>console.log(error)) 
        }
 
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

    const handleStateChange = (key,value)=>{
        setState({...state,[key]:value})
    }
    return(
            <div className="GiveHelp">
                <div className="GiveHelp-inner">
                    <h2>Надано допомогу</h2>
                    <div className="GiveHelp-inner-viewer">
                       {active}
                    </div>
                    <div className="GiveHelp-inner-message">
                        <div className="GiveHelp-inner-message-btn">
                                    <Input type="date" name="date__help" id="date__help" value={state.date} onChange={(e)=>{handleStateChange("date",e.target.value)}}/>
                                    <Input type="text" name="who__help" id="who__help" label="Хто надав допомогу" value={state.who} onChange={(e)=>{handleStateChange("who",e.target.value)}}/>
                                </div>
                            <div className="GiveHelp-inner-message-field">
                                <textarea name="" id="mess__help" cols="30" rows="3" placeholder="Деталі наданої допомоги" value={state.message} onChange={(e)=>{handleStateChange("message",e.target.value)}}></textarea>
                                <img onClick={addHelp} src={imgSend} alt="" />
                            </div>
                          
                            
                    </div>
                </div>
                {alert.success&&<SmallNotification isSuccess={true} text="Дані оновлено" close={()=>{setAlert({...alert,success:false})}}/>}
                {alert.error&&<SmallNotification isSuccess={false} text="Введіть дату надання допомоги та користувача, що її надавав" close={()=>{setAlert({...alert,error:false})}}/>}
            </div>
    )
}
export default GiveHelp;