import React from "react";
import axios from "axios";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { serverAddres } from "../../../Functions/serverAddres";
import imgSend from "../../../../img/icons/send.png";
import edit from '../../../../img/icons/edit.svg'


const Active = ({elem})=>{
    return(
         <div className="notes__viewer__line">
         <div className="notes__viewer__data">
             <div>
             <NavLink to={`/user?${elem.userId}`} >{elem.userName}</NavLink>
             <div>
                <span>{elem.date}</span>  
                <span>{elem.time}</span>  
             </div>

             </div>
             
         </div>
         <div className="notes__viewer__mess">
            <span dangerouslySetInnerHTML= {{__html:elem.mess}} />
            <div className="notes__viewer__mess__panel">
                <div className="notes__viewer__mess__panel__edit">
                    <div className="notes__viewer__mess__panel__edit__ico__wrap">
                        <img src={edit} alt="Редагувати нотатки" />
                    </div>
                </div>
                <div className="notes__viewer__mess__panel__edit">
                    <div className="notes__viewer__mess__panel__edit__option"></div>
                    <div className="notes__viewer__mess__panel__edit__option notes__delete"></div>
                </div>
            </div>
         </div>
         
     </div>
    )
}

const Notes = ({notes,level})=>{
    function addNote(){
        let mess = document.querySelector("#mess__note").value.replaceAll("'", "’").replaceAll(/\n/g, "<br />");
        if(mess == "") return alert("Ви не ввели повідомлення")
        let obj = {
            caseId:window.location.search.slice(1),
            id: localStorage.getItem("id"),
            token: localStorage.getItem("token"),
            mess: mess,
            userName: localStorage.getItem("userName")
        }
        axios({
            url: serverAddres("case/add-note.php"),
            method: "POST",
            header : {'Content-Type': 'application/json;charset=utf-8'},
            data : JSON.stringify(obj),
        })
        .then((data)=>{ 
            console.log(data)
            setActNote(data.data)  
            document.querySelector("#mess__note").value = "";
        })
        .catch((error)=>console.log(error))  
    }
    const [actNote, setActNote] = useState(notes);

    const active = actNote.map((elem,index)=>{
        return <Active key={index} elem={elem}/>
    }) 
    
    return(
        <>
            <div className="notes__wrap">
                <div className="notes__inner">
                    <h2>Нотатки</h2>
                    <div className="notes__viewer">
                       {active}
                    </div>
                    {level ?<div className="notes__mes__wrap">
                        <div className="notes__mes__inner">
                             <div className="notes__field">
                                <textarea name="" id="mess__note" cols="30" rows="3"></textarea>
                                <img src={imgSend} onClick={addNote} alt="" />
                            </div>
                        </div>
                    </div>:""}
                </div>
            </div>
        </>
    )
}
export default Notes;