import React from "react";
import axios from "axios";
import { useState } from "react";
import { serverAddres } from "../../../Functions/serverAddres";
const ShowPdf = ({link,pass}) =>{
    return(
        <div className="show__pdf__link">
            <p><a href={link} target="_blank">Переглянути ПДФ</a></p>
            <div className="tooltip" 
            onClick={()=>{
                navigator.clipboard.writeText(pass)
                var tooltip = document.getElementById("myTooltip");
                tooltip.innerHTML = "Скопійовано";
            }}>
                <p>Пароль до файлу: <b id="myPass" onMouseOut={()=>{
                      var tooltip = document.getElementById("myTooltip");
                      tooltip.innerHTML = "Копіювати";
                }}>{pass}
                </b>
                </p>
                <span className="tooltiptext" id="myTooltip">Копіювати</span>
                </div>
        </div>
    )
}
let objData = {
    plan:false,
    notes:false,
    media:false,
    help:false
}
const ExportPDF = ()=>{

    const [havePdf, setHavePdf] = useState({active:false,link:"",pass:""});
    const [disabled, setDisabled] = useState(false)
    function getPdf(){
        let obj = {
            id: localStorage.getItem("id"),
            token: localStorage.getItem("token"),
            caseID: window.location.search.slice(1),
            plan:objData.plan,
            notes:objData.notes,
            media:objData.media,
            help:objData.help
        }
        //return console.log(obj)
        axios({
            url: serverAddres("mpdf/print.php"),
            method: "POST",
            header : {'Content-Type': 'application/json;charset=utf-8'},
            data : JSON.stringify(obj),
        })
        .then((data)=>{ 
           console.log(data.data)
           setHavePdf(data.data);   
        })
        .catch((error)=>console.log(error)) 
    }


    return havePdf.active ?(
        <div className="export__pdf__wrap">
        <div className="export__pdf__inner">
            <ShowPdf link={havePdf.link} pass={havePdf.pass} />
        </div>
    </div>
    ):(
     
    <div className="export__pdf__wrap">
    <div className="export__pdf__inner">
        <p>Включити у ПДФ</p>
        <div className="item__pdf__wrap">
        <div className="item__pdf">
            <input type="checkbox" id="pdf__plan"
                onChange={()=>{
                    objData.plan = !objData.plan
                }} /><label htmlFor="pdf__plan">Індивідуальний план</label>
        </div>
        <div className="item__pdf">
       <input type="checkbox" id="pdf__notes"
        onChange={()=>{
            objData.notes = !objData.notes
        }}/> <label htmlFor="pdf__notes">Нотатки</label></div>
        <div className="item__pdf">
        <input type="checkbox" id="pdf__help"
        onChange={()=>{
            objData.help = !objData.help
        }}/><label htmlFor="pdf__help">Надано допомогу</label></div>
       <div className="item__pdf">
        <input type="checkbox" id="pdf__media"
        onChange={()=>{
            objData.media = !objData.media
        }}/><label htmlFor="pdf__media">Фотографії</label></div>
        </div>
        <div className="pdf__btn">
            <button className="primary__btn" disabled = {disabled}
        onClick={()=>{
            setDisabled("disabled")
            getPdf()
        }}>Експорт у ПДФ</button>
        </div>
        
    </div>
</div>
    )
}

export default ExportPDF;