import React from "react";
import s from "./style.module.css"

const FilterCalendar = ({filtered})=>{

    return(
    <div className={s.show__cal}>
        <h3>Відобразити у календарі</h3>
       <label htmlFor="myCalendar"><input id="myCalendar" defaultChecked={true} type="checkbox" onChange={(e)=>{
            if(e.target.checked){
                filtered("myCalendar","myCalendar")
            }else{
                filtered("myCalendar","myCalendar0")
            }
        }}/> Мій календар
        </label> 
        <label htmlFor="forAll"><input id="forAll" defaultChecked={true} type="checkbox" onChange={(e)=>{
            if(e.target.checked){
                filtered("forAll","forAll")
            }else{
                filtered("forAll","forAll0")
            }
        }}/> Записи для всіх
        </label> 
        <label htmlFor="happyCase"><input id="happyCase" defaultChecked={true} type="checkbox" onChange={(e)=>{
            if(e.target.checked){
                filtered("happyCase","happyCase")
            }else{
                filtered("happyCase","happyCase0")
            }
        }}/> Дні народження кейсів
        </label> </div>
    )
}
export default FilterCalendar;