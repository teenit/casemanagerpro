import React, { useEffect, useState } from "react";
import SelectElem from "../../elements/Selects/Select";
import { useLocation } from "react-router-dom";
import { apiResponse } from "../../Functions/get_apiObj";

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

const AccessBlockCase = ({ accesses }) => {

    const [state, setState] = useState({
      a_page_case_add: {
        options: [
          { value: '0', label: LANG.forbidden },
          { value: '1', label: LANG.assigned_categories },
          { value: '8', label: LANG.full_access },
        ],
        defaultValue: accesses.a_page_case_add,
        value: accesses.a_page_case_add,
        title: LANG.a_page_case_add,
        key:"a_page_case_add"
      },
      a_page_case_look: {
        options: [
          { value: '0', label: LANG.forbidden },
          { value: '1', label: LANG.only_own },
          { value: '2', label: LANG.assigned_categories },
          { value: '3', label: LANG.only_assigned },
          { value: '8', label: LANG.full_access },
        ],
        defaultValue: accesses.a_page_case_look,
        value: accesses.a_page_case_look,
        title: LANG.a_page_case_look,
        key:"a_page_case_look"
      },
      a_page_case_edit_permission: {
        options: [
          { value: '0', label: LANG.forbidden },
          { value: '1', label: LANG.only_own },
          { value: '2', label: LANG.assigned_categories },
          { value: '3', label: LANG.only_assigned },
          { value: '8', label: LANG.full_access },
        ],
        defaultValue: accesses.a_page_case_edit_permission,
        value: accesses.a_page_case_edit_permission,
        title: LANG.a_page_case_edit_permission,
        key:"a_page_case_edit_permission"
      },
      a_page_case_edit_actions: {
        options: [
          { value: '0', label: LANG.forbidden },
          { value: '1', label: LANG.add },
          { value: '2', label: LANG.create_links_between_cases },
          { value: '3', label: LANG.create_individual_plan },
          { value: '4', label: LANG.delete_case },
          { value: '5', label: LANG.add_files },
          { value: '6', label: LANG.export },
          { value: '8', label: LANG.full_access },
        ],
        defaultValue: accesses.a_page_case_edit_actions,
        value: accesses.a_page_case_edit_actions,
        title: LANG.a_page_case_edit_actions,
        key:"a_page_case_edit_actions"
      },
      a_page_case_transfer: {
        options: [
          { value: '0', label: LANG.forbidden },
          { value: '1', label: LANG.assigned_categories },
          { value: '2', label: LANG.only_own },
          { value: '8', label: LANG.full_access },
        ],
        defaultValue: accesses.a_page_case_transfer,
        value: accesses.a_page_case_transfer,
        title: LANG.a_page_case_transfer,
        key:"a_page_case_transfer"
      },
      a_page_case_add_notes: {
        options: [
          { value: '0', label: LANG.forbidden },
          { value: '1', label: LANG.only_own },
          { value: '2', label: LANG.assigned_categories },
          { value: '3', label: LANG.only_assigned },
          { value: '4', label: LANG.add_record_about_provided_assistance },
          { value: '8', label: LANG.full_access },
        ],
        defaultValue: accesses.a_page_case_add_notes,
        value: accesses.a_page_case_add_notes,
        title: LANG.a_page_case_add_notes,
        key:"a_page_case_add_notes"
      },
      a_page_case_hidden: {
        options: [
          { value: '0', label: LANG.completely_hidden },
          { value: '1', label: LANG.almost_all_hidden },
          { value: '2', label: LANG.average },
          { value: '3', label: LANG.low },
          { value: '8', label: LANG.full_access },
        ],
        defaultValue: accesses.a_page_case_hidden,
        value: accesses.a_page_case_hidden,
        title: LANG.a_page_case_hidden,
        key:"a_page_case_hidden"
      }
    })
   

    const handleSelectChange = (value, key) => {
      console.log(value, key)
      setState({...state, [key]:{...state[key], value: value}})
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
                console.log(item)
                   return <div className="AccessBlockCase-line flex space">
                        <div className="AccessBlockCase-line-title">{item.title}</div>
                        <div className="AccessBlockCase-line-right"><SelectElem options={item.options} defaultValue={item.value} value={item.value} onChange={(value)=>{handleSelectChange(value, item.key)}} /></div>
                    </div>
              })
            }
          <button onClick={()=>console.log(state)}>polp</button>
        </div>
    )
}

export default AccessBlockCase;