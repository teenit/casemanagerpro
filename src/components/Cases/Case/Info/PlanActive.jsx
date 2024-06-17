import React from "react";
import { useState } from "react";
import editImg from "../../../../img/icons/plus-67.png";
import saveImg from "../../../../img/icons/save-50.png";
import delImg from "../../../../img/icons/delete-48.png";
import axios from "axios";
import Plan from "./Plan";
import { serverAddres } from "../../../Functions/serverAddres";
import SelectStatusPlan from '../../../elements/Selects/SelectStatusPlan'
let number = 0;
let objNewPlan = {};
let boolPlan = true;

function removeModalLine(){
    document.querySelectorAll(".modal__plan__line")[number].remove()
    number--;
}
function sendNewPlan(){
    let obj = {
        caseId:window.location.search.slice(1),
        id: localStorage.getItem("id"),
        token: localStorage.getItem("token"),
        plan: objNewPlan
    }
    axios({
        url: serverAddres("case/add-plan.php"),
        method: "POST",
        header : {'Content-Type': 'application/json;charset=utf-8'},
        data : JSON.stringify(obj),
    })
    .then((data)=>{ 
        window.location.reload()        
    })
    .catch((error)=>console.log(error))  
}
function saveNewPlan(){
    let mas = [];
    let nameNewPlan = document.getElementById(`nameNewPlan`);

    for(let i = 0; i < number + 1; i++){
        let obj = {}
        let dateStart = document.getElementById(`planStart${i}`).value;
        let dateEnd = document.getElementById(`planEnd${i}`).value;
        let planDesc = document.getElementById(`planDesc${i}`).value;
        if(nameNewPlan.value.length <= 0) {
            return nameNewPlan.style.border = "solid 2px red";
        }else{
            nameNewPlan.style.border = "solid 2px green";
        }
        if(dateStart.length <= 0 || dateEnd.length <= 0 || planDesc <= 0){
            document.querySelectorAll(".modal__plan__line")[i].classList.add("error");
            if(document.querySelectorAll(".modal__plan__line")[i].classList.contains("good")){
                document.querySelectorAll(".modal__plan__line")[i].classList.remove("good");
            }
            return;
        }else{
            document.querySelectorAll(".modal__plan__line")[i].classList.remove("error");
            document.querySelectorAll(".modal__plan__line")[i].classList.add("good");
            obj.start = dateStart;
            obj.end = dateEnd;
            obj.desc = planDesc.replaceAll("'", "’").replaceAll(/\n/g, "<br />");
            obj.done = false;
            obj.show = true;
        }
        mas.push(obj)
    }
    let date = new Date();
    objNewPlan = {
        nameOfPlan: nameNewPlan.value.replaceAll("'", "’"),
        dateCreated: date.toISOString().split('T')[0],
        plans: mas,
        donePlan:{
            done: false,
            good: "",
            date: "",
            ommentar:""
        },
        donePlanDate: ""
    }
    sendNewPlan(objNewPlan)
}
function addModalLine(){
    number++;
    let div = document.createElement("div")
    div.className = "modal__plan__line";
    div.innerHTML = `
    <div>
    <div class="modal__plan__number">
        <span>${number}.</span>
    </div>
</div>
<div>
    <label htmlFor="planStart${number}">Дата початку</label>
    <input type="date" name="planStart${number}" id="planStart${number}"/>
</div>
<div>
    <label htmlFor="planEnd${number}">Дата кінця</label>
    <input type="date" name="planEnd${number}" id="planEnd${number}"/>
</div>
<div>
    <textarea name="planDesc${number}" id="planDesc${number}" rows="3" placeholder="Елемент плану"></textarea>
</div>
    `;
    document.getElementById("planInner").append(div)
}
const PlanActive = ({info,level})=>{
    const [openWindowCreate, setOpenWindowCreate] = useState(false);
    const [plan, setPlan] = useState(0);
    const [planData, setPlanData] = useState({
        id:1,
        case_id:11,
        startTime:"12-12-2023",
        endTime:"12-13-2023",
        value:"test etstettst",
        status:0
    })

const WindowCreate = ()=>{
    return openWindowCreate ?(
        <div className="plan__modal">
            <div className="modal__plan__inner">
                <div className="modal__control__wrap">
                <div className="modal__plane__close" onClick={()=>{setOpenWindowCreate(false)}}>
                    <span></span>
                    <span></span>
                </div>
                <div className="modal__control">
                    <div className="plan__icon blue__back" onClick={addModalLine} title="Додати рядок">
                        <img src={editImg} alt="" />
                    </div>
                    <div className="plan__icon green__back active" id="modalSaveBtn" onClick={saveNewPlan} title="Зберегти план">
                        <img src={saveImg} alt="" />
                    </div>
                    <div className="plan__icon red__back" onClick={removeModalLine} title="Видалити рядок">
                        <img src={delImg} alt="" />
                    </div>
                </div>
                </div>
               
                <input className="nameNewPlan" type="text" id="nameNewPlan" placeholder="Введіть назву плану"/>
                <div className="modal__plan__inner__lines" id="planInner">
                    <div className="modal__plan__line">
                        <div>
                            <div className="modal__plan__number">
                                <span>0.</span>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="planStart0">Дата початку</label>
                            <input type="date" name="planStart0" id="planStart0" />
                        </div>
                        <div>
                            <label htmlFor="planEnd0">Дата кінця</label>
                            <input type="date" name="planEnd0" id="planEnd0" />
                        </div>
                        <div>
                            <textarea name="planDesc0" id="planDesc0" rows="3" placeholder="Елемент плану"></textarea>
                        </div>
                    </div>
                </div>
                
                   
            </div>
        </div>
    ):(
        <div>
            
        </div>
    )
}
    function addOptions(){
        if(boolPlan){
            let selectPlan = document.querySelector("#selectPlan");
            selectPlan.innerHTML = ""
            for(let i = 0; i < info.length; i++){
              let newOption = new Option(info[i].nameOfPlan, i);
              selectPlan.append(newOption);
            }
            boolPlan = false;
        }else{
            return ;
        }
    }
    function changePlan(){
        let selectPlan = document.querySelector("#selectPlan");
        setPlan(selectPlan.value)
    }
    function handleTestChange(obj){
        // setPlanData({...planData,[key]:value})
        setPlanData(obj)
    }
    return info !== null  ? (
        <div className="plan__active">
            <div className="plan__active__header">
            <h2>Індивідуальний план</h2>
            <div className="select__plan" id="">
                <SelectStatusPlan value={planData.status} onChange={(e)=>setPlanData({...planData,value:e.target.value})}/>
                {/* <select name="selectPlan" id="selectPlan" onClick={addOptions} onChange={changePlan}>
                    <option value={info[plan]}>{info[plan].nameOfPlan}</option>
                </select> */}
                {level ? <button className="primary__btn" onClick={()=>{setOpenWindowCreate(true)}}>Створити план</button> : ""}
            </div>
            </div>

            <div className="plan__active__default__data">
                <div className="plan__active__default__data__name"></div>
                <div className="plan__active__default__data__date"></div>
            </div>
           <Plan plan={info[plan]} testData = {planData} onChange={(obj)=>{handleTestChange(obj)}} ind={plan} level = {level}/>
           <WindowCreate/>
        </div>
    ):(
        <div className="not__active__plan">
            <h2>Індивідуальний план</h2>
            <p>Ще не має індивідуального плану</p>
            {level ? <button className="primary__btn" onClick={()=>{setOpenWindowCreate(true)}}>Створити план</button> : ""}
            <WindowCreate/>
        </div>
    )
}
export default PlanActive;