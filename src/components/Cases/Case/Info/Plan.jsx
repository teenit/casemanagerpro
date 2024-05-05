import React from "react";
import editImg from "../../../../img/icons/edit-50.png";
import deleteImg from "../../../../img/icons/delete-48.png";
import saveImg from "../../../../img/icons/save-50.png";
import axios from "axios";
import { useState } from "react";
import ModalPlanDone from "./ModalPlanDone";
import { serverAddres } from "../../../Functions/serverAddres";
import PlanCard from "./PlanCard";
let ind;
function elemPlanDelete(a){
   // return console.log(a)

    let obj = {
        caseId:window.location.search.slice(1),
        id: localStorage.getItem("id"),
        token: localStorage.getItem("token"),
        index:a.index,
        nameOfPlan: a.nameOfPlan,
    }
    axios({
        url: serverAddres("case/elem-plan-delete.php"),
        method: "POST",
        header : {'Content-Type': 'application/json;charset=utf-8'},
        data : JSON.stringify(obj),
    })
    .then((data)=>{ 
      //  window.location.reload()        
    })
    .catch((error)=>console.log(error))  
}
function elemPlanDone(a){
    let obj = {
        caseId:window.location.search.slice(1),
        id: localStorage.getItem("id"),
        token: localStorage.getItem("token"),
        index:a.index,
        checked: a.checked,
        nameOfPlan: a.nameOfPlan,
        desc: a.desc,
        start: a.start,
        end: a.end
    }
    console.log(obj)
    axios({
        url: serverAddres("case/elem-plan-done.php"),
        method: "POST",
        header : {'Content-Type': 'application/json;charset=utf-8'},
        data : JSON.stringify(obj),
    })
    .then((data)=>{ 
        console.log(data)
      //  window.location.reload()        
    })
    .catch((error)=>console.log(error))  
}

let pty = -1;
const Plan = ({plan,index,level,testData,onChange})=>{
    const [activeModalPlan, setActiveModalPlan] = useState(false);
    function planIsDone(){
        setActiveModalPlan(true)
    }
    console.log(level)
    let part = ""
    const ElemPlan = ({planis, index})=>{
        return planis.show ? (
            <div className={`part__plan`}>
                <div className="part__line">
                    <div className="part__symbol">
                        <div className="part__line__elem">
                            
                        </div>
                    </div>
                </div>
                <div className="part__line">
                    <div className={`part__plan__date ${planis.done ? "borderGreen" : ""}`}>
                        <input disabled type="date" name={`start__planID${index}`} id={`start__planID${index}`} defaultValue={planis.start} />
                         <input disabled type="date" name={`end__planID${index}`} id={`end__planID${index}`} defaultValue={planis.end} />
                    </div>
                </div>
                <div className="part__line">
                    <div className="part__symbol">
                        <div className="part__line__elem">
                            
                        </div>
                    </div>
                </div>
                <div className="part__line">
                    <div className="part__plan__description">
                        {level ? <div className="part__plan__control">
                            <input disabled defaultChecked={planis.done} type="checkbox" name={`goodPlan${index}`} id={`goodPlan${index}`} />
                           {plan.donePlan.done ? "" : <img src={editImg} className="editPlan active" alt="Редагувати" id={`editPlan${index}`} title="Редагувати" onClick={()=>{
                                console.log("hello")
                                document.querySelector(`#goodPlan${index}`).disabled = false;
                                document.querySelector(`#start__planID${index}`).disabled = false;
                                document.querySelector(`#end__planID${index}`).disabled = false;
                                document.querySelector(`#desc__planID${index}`).disabled = false;
                                document.querySelector(`#savePlan${index}`).classList.toggle("active");
                                document.querySelector(`#editPlan${index}`).classList.toggle("active");
                            }} />}
                            <img src={saveImg} alt="Зберегти" className="savePlan green__back" title="Зберегти" id={`savePlan${index}`} onClick = {()=>{
                                 ind = index;
                                 let a = {
                                    checked: document.querySelector(`#goodPlan${index}`).checked,
                                    index: 0+ind,
                                    nameOfPlan: plan.nameOfPlan,
                                    desc: document.querySelector(`#desc__planID${index}`).value.replaceAll("'", "’").replaceAll(/\n/g, "<br />"),
                                    start: document.querySelector(`#start__planID${index}`).value,
                                    end: document.querySelector(`#end__planID${index}`).value
                                 }
                                 elemPlanDone(a)    
                                 document.querySelector(`#goodPlan${index}`).disabled = true;
                                 document.querySelector(`#start__planID${index}`).disabled = true;
                                 document.querySelector(`#end__planID${index}`).disabled = true;
                                 document.querySelector(`#desc__planID${index}`).disabled = true;
                                 document.querySelector(`#savePlan${index}`).classList.toggle("active");
                                 document.querySelector(`#editPlan${index}`).classList.toggle("active");
                                }} />
                        </div>:""}
                        <textarea disabled name={`desc__planID${index}`} id={`desc__planID${index}`} cols="30" rows="5" defaultValue={planis.desc.replaceAll("<br />", "\n")}></textarea>
                        <div className="deletePlan__wrap">
                        {!plan.donePlan.done && level ? <img src={deleteImg} className="deletePlan red__back" id={`deletePlan${index}`} alt="Видалити" title="Видалити" onClick={()=>{
                            if(!window.confirm("Ви впевнені що хочете видалити пункт плану?")) return;
                            let a = {
                                index: 0+index,
                                nameOfPlan: plan.nameOfPlan
                             }
                            elemPlanDelete(a);
                        }} /> :  ""}
                        </div>
                    </div>  
                </div>    
            </div>
        ):(
            <></>
        )
        
    }
    const ElemsPlan = ()=>{
           part =  plan.plans.map((planis,index)=>{
            pty++;
            return <ElemPlan key={index} planis={planis} index = {pty}/>
    })
    }
    console.log(plan.plans)

    return(
            // <div className={`wrap__plan ${plan.donePlan.good &&  plan.donePlan.done ? "__done__plan__good" : !plan.donePlan.good &&  plan.donePlan.done ? "__done__plan__notgood" : ""}`}>
            //     <div className="plan__created">
            //     <span>{plan.dateCreated}</span>
            // </div>
            // {ElemsPlan()}
            // {part}
            // { plan.donePlan.done ? <div className="plan__comment"><p><b>Коментар до виконаного плану: </b></p><p><span dangerouslySetInnerHTML= {{__html:plan.donePlan.commentar}} /></p></div>:""}
            // {level ? <div className="part__plan__btn">
            //     <button className="primary__btn"
            //     onClick={()=>{setActiveModalPlan(true)}}>Завершити план</button>
            // </div>:""}
            
            // <ModalPlanDone active={activeModalPlan} plan={plan} close = {()=>{
            //     setActiveModalPlan(false)
            // }}/>
            // </div>
                
                <div className={`wrap__plan ${plan.donePlan.good &&  plan.donePlan.done ? "__done__plan__good" : !plan.donePlan.good &&  plan.donePlan.done ? "__done__plan__notgood" : ""}`}>
                    {Object.values(plan.plans).map((item,index)=>{
                        return(
                                 <PlanCard item={testData} onChange={onChange} index={index} plan={plan}/>
                        )
                    })}

                {/* <div className="plan__created">
                <span>{plan.dateCreated}</span>
            </div>
            {ElemsPlan()}
            {part}
            { plan.donePlan.done ? <div className="plan__comment"><p><b>Коментар до виконаного плану: </b></p><p><span dangerouslySetInnerHTML= {{__html:plan.donePlan.commentar}} /></p></div>:""} */}
            {level ? <div className="part__plan__btn">
                <button className="primary__btn"
                onClick={()=>{setActiveModalPlan(true)}}>Завершити план</button>
            </div>:""}
            
            <ModalPlanDone active={activeModalPlan} plan={plan} close = {()=>{
                setActiveModalPlan(false)
            }}/>
            </div>
            
    )
}

export default Plan;