import React, { useEffect, useState } from "react";
import SelectElem from "../../elements/Selects/Select";
import { useLocation } from "react-router-dom";
import { apiResponse } from "../../Functions/get_apiObj";
import { appConfig } from "../../../services/config";

const LANG = {
  forbidden: "Заборонено",
  assigned_categories: "Призначені категорії",
  full_access: "Повний доступ",
  only_own: "Тільки свої",
  only_assigned: "Тільки призначені",
  add: "Додати",
  create_links_between_cases: "Створювати зв'язки між кейсами",
  create_individual_plan: "Створити індивідуальний план",
  delete_case: "Видалити кейс",
  add_files: "Додати файли",
  export: "Експортувати",
  completely_hidden: "Приховано повністю",
  almost_all_hidden: "Майже все приховано",
  average: "Середньо",
  low: "Низько",
  add_record_about_provided_assistance: "Додати запис про надану допомогу",
  a_page_case_add:"Створити кейс",
  a_page_case_look:"Переглядати кейс",
  a_page_case_edit_permission:"Доступ до редагуванння кейсів",
  a_page_case_edit_actions:"Редагувати кейс",
  a_page_case_transfer:"Передати кейс іншому користувачу",
  a_page_case_add_notes:"Додавати нотатки до кейсу",
  a_page_case_hidden:"Приховати інформацію",         
}

const AccessBlockCase = ({ accesses, defaultAccess, changeAccess }) => {

    const [state, setState] = useState({...appConfig.access[defaultAccess]})
    const handleSelectChange = (value, key) => {
      console.log(value, key)
      setState({...state, [key]:{...state[key], value: value}})
      changeAccess(value, key)
    };
    const LOCATION = useLocation()
    useEffect(()=>{
      apiResponse({meta_key:"case_categories"},"case/get-cases-categories.php").then((data)=>{
        console.log(data)
      })
    },[])

    return (
      
        <div className="AccessBlockCase">
            {
              Object.values(state).map((item)=>{
                 console.log(accesses[item.key])
                   return <div className="AccessBlockCase-line flex space">
                        <div className="AccessBlockCase-line-title">{item.title}</div>
                        <div className="AccessBlockCase-line-right"><SelectElem options={item.options} value={accesses[item.key]} onChange={(value)=>{handleSelectChange(value, item.key)}} /></div>
                      {
                         item.options.map((elem)=>{
                          if((elem.value == accesses[item.key]) && elem.ids) return <p>ooooooooooooooo</p>
                        })
                      }
                    </div>
              })
            }
          <button onClick={()=>console.log(state,accesses)}>polp</button>
        </div>
    )
}

export default AccessBlockCase;