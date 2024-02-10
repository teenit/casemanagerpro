import React from "react";
import axios from "axios";
import { serverAddres } from "../../../Functions/serverAddres";
const ModalPlanDone = ({active, plan, close})=>{
    
    function donePlan(){
        let good = document.querySelector("#mod__good").checked
        let notgood = document.querySelector("#mod__not__good").checked
        if(!good && !notgood) return window.alert("Оберіть варіант завершення плану")
        let commentar = document.querySelector("#mod__commentar").value.replaceAll("'", "’").replace(/\n/g, "<br />");
        console.log(good, notgood)
        let obj = {
            caseId:window.location.search.slice(1),
            id: localStorage.getItem("id"),
            token: localStorage.getItem("token"),
            nameOfPlan: plan.nameOfPlan,
            donePlan: {
                done: true,
                good: "",
                date: "",
                commentar:commentar
            },
        }
        if(good){
            obj.donePlan.good = true
        }else{
            obj.donePlan.good = false
        }
        axios({
            url: serverAddres("case/done-plan.php"),
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
    return active ? (
            <div className="mod__plan__wrap">
                <div className="mod__plan__inner">
                    <div className="mod__lines">
                        <div className="mod__line">
                            <label htmlFor="mod__good"><input type="radio" name="mod__good" id="mod__good" />Вдало</label>
                            <label htmlFor="mod__not__good"><input type="radio" name="mod__good" id="mod__not__good" />Не вдало</label>
                        </div>
                        <div className="mod__line">
                            <textarea name="mod__commentar" id="mod__commentar" cols="30" rows="10" placeholder="Коментар по завершенню плану для кейса"></textarea>
                        </div>
                        <div className="mod__line">
                            <button onClick={donePlan}>Завершити план</button>
                            <button onClick={close}>Відмінити</button>
                        </div>
                    </div>
                </div>
            </div>
    ):(
        <></>
    )
}

export default ModalPlanDone;