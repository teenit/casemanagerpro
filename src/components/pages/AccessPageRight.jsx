import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { apiResponse } from '../Functions/get_apiObj'
import AccessBlockCase from '../blocks/access/AccessBlockCase'
const LANG = {
  a_page_case_add:"Створити кейс 0 - заборонено, 1 - тільки свої, 2 - призначеної категорії, 3 - тільки призначені, 8 - повний доступ",
  a_page_case_look:"Переглядати кейс 0 - заборонено, 1 - тільки свої, 2 - призначеної категорії, 3 - тільки призначені, 8 - повний доступ",
  a_page_case_edit_permission:"Доступ до редагуванння кейсів 0 - заборонено, 1 - тільки свої, 2 - призначеної категорії, 3 - тільки призначені, 8 - повний доступ",
  a_page_case_edit_actions:"Редагувати кейс 0 - заборонено, 1 - додавати, 2 - створювати зв'язки між кейсами, 3 - створювати індивідуальний план, 4 - видалити кейс, 5 - додавати файли, 6 - експортувати, 8 - повний доступ",
  a_page_case_transfer: "Передати кейс іншому користувачу 0 - заборонено, 1 - призначеної категорії, 2 - тільки свої 8 - повний доступ",
  a_page_case_add_notes:"Додавати нотатки до кейсу 0 - заборонено, 1 - тільки свої, 2 - призначеної категорії, 3 - тільки призначені, 4 - додавати запис про надану допомогу, 8 - повний доступ",
  a_page_case_hidden:"Приховати інформацію 0 - приховано повністю, 1 - майже все приховано, 2 - середньо, 3 - низько, 8 - повний доступ",
  a_page_statistics_cases:"Категорії кейсів 0 - заборонено, 2 - призначеної категорії,  8 - повний доступ",
  a_page_statistics_cases_hb:"Відображати статистику по днях народження кейсів 0 - заборонено, 1 - тільки свої, 2 - призначеної категорії, 3 - тільки призначені, 8 - повний доступ",
  a_page_statistics_server_data:"Доступне місце на сервері 0 - заборонено, 8 - повний доступ",
  a_page_calendar_see_events:"Бачити події 0 - заборонено 1 - події тільки для користувача, 2 - події для усіх користувачів,",
  a_page_calendar_add:"Створити подію у календарі 0 - заборонено, 1 - тільки свої, 2 - призначеної категорії, 8 - повний доступ",
  a_page_calendar_see_hb:"Бачити дні народження користувачів 0 - заборонено, 1 - тільки кейсів, 2 - тільки користувачів, 3 - із телефонної книги 8 - повний доступ",
  a_page_calendar_notes:"Записи в календар 0 - заборонено, 1 - тільки свої, 8 - повний доступ",
  a_page_calendar_notes_edit:"Редагувати записи 0 - заборонено, 1 - редагувати, 2 - видаляти, 3 - створювати, 8 - повний доступ",
  a_page_cases_list:"Відобразити кейси, як список 0 - заборонено, 8 - повний доступ",
  a_page_cases_export_pdf:"Друк кейсів або збереження як ПДФ 0 - заборонено, 8 - повний доступ",
  a_page_cases_contacts_info:"Приховати контактну інформацію кейсів 0 - заборонено, 1 - тільки свої, 2 - призначеної категорії, 3 - тільки призначені, 8 - повний доступ",
  a_page_event_watch:"Дивитися івент 0 - заборонено, 1 - тільки свої, 2 - призначеної категорії, 3 - тільки призначені, 4 - Є доступ до івенту, якщо додано як організатора 8 - повний доступ",
  a_page_event_edit:"Редагувати івент 0 - заборонено, 1 - редагувати, 2 - видаляти, 3 - переміщати в архів, 8 - повний доступ",
  a_page_event_members:"івент 0 - заборонено, 1 - додавати учасника кейсу, 2 - видаляти учасника кейсу, 3 - додавати організатора, 4 - видаляти організатора,  8 - повний доступ",
  a_page_event_plan:"План івенту 0 - заборонено, 1 - тільки свої, 2 - відгук до плану 3 - редагувати план, 4 - редагувати відгук до плану, 8 - повний доступ",
  a_page_event_documents:"Документи до івенту 0 - заборонено, 1 - завантажувати, 2 - видаляти, 3 - завантажувати медіа-файли, 4 - видаляти медіа-файли, 8 - повний доступ",
  a_page_resources:"Доступ до розділу ресурси 0 - заборонено, 1 - додати, 2 - видаляти, 3 - завантажити, 4 - редагувати, 8 - повний доступ",
  a_page_phonebook:"Доступ до розділу телефонна книга 0 - заборонено, 1 - створення контакту, 2 - редагування контакту, 3 - видалення контакту, 8 - повний доступ",
  a_page_profile:"Доступ до розділу профілю користувачів 0 - заборонено, 1 - контактна інформація, 2 - створені кейси, 3 - доступні кейси, 4 - подані звіти, 5 - подані історії, 8 - повний доступ",
  a_page_manage_cases_category:"Керування категоріями кейсів 0 - заборонено 1 - створити, 2 - редагувати, 3 - видалити, 8 - повний доступ",
  a_page_manage_contacts_category:"Керування категоріями контактів 0 - заборонено 1 - створити, 2 - редагувати, 3 - видалити, 8 - повний доступ",
  a_page_manage_user:"Керування користувачем 0 - заборонено, 1 - активація / деактивація, 2 - налаштування прав для користувача, 3 - видалити користувача, 8 - повний доступ",
  a_page_manage_update:"Оновлення програми Case Manager 0 - заборонено, 8 - повний доступ",
  a_page_access_watch_roles:"Перегляд шаблонів 0 - заборонено, 1 - тільки дозволені, 8 - повний доступ",
  a_page_access_edit_roles:"Редагування шаблонів прав 0 - заборонено, 1 - додавати, 2 - редагувати, 3 - видаляти, 8 - повний доступ",
  a_page_access_watch_permissions:"Перегляд списку прав 0 - заборонено, 1 - тільки дозволені, 8 - повний доступ",
  a_page_access_edit_permissions:"Редагування списку прав 0 - заборонено, 1 - додавати, 2 - редагувати, 3 - видаляти, 8 - повний доступ",

}

const PAGES  = [{
  title:"кейс",
  description:"test",
  access:"a_page_case"
},{
  title:"статистика",
  description:"test",
  access:"a_page_statistics"

},{
  title:"календар",
  description:"test",
  access:"a_page_calendar"
},{
  title:"кейси",
  description:"test",
  access:"a_page_cases"
},{
  title:"івенти (події)",
  description:"test",
  access:"a_page_events"
},{
  title:"ресурси",
  description:"test",
  access:"a_page_resources"
},{
  title:"телефонна книга",
  description:"test",
  access:"a_page_phonebook"
},{
  title:"профіль користувача",
  description:"test",
  access:"a_page_profile"
},{
  title:"керування програмою",
  description:"test",
  access:"a_page_manage"
},{
  title:"роширений пошук",
  description:"test",
  access:"a_page_search"
},{
  title:"коаліція",
  description:"test",
  access:"a_page_coalition"
},{
  title:"налаштування",
  description:"test",
  access:"a_page_settings"
},]
const RIGHTS = {
  a_page_case_look: null,
  a_page_case_edit_permission: null,
  a_page_case_edit_actions: null,
  a_page_case_transfer: null,
  a_page_case_add_notes: null,
  a_page_case_hidden: null,
  a_page_statistics_cases: null,
  a_page_statistics_cases_hb: null,
  a_page_statistics_server_data: null,
  a_page_calendar_see_events: null,
  a_page_calendar_add: null,
  a_page_calendar_see_hb: null,
  a_page_calendar_notes: null,
  a_page_calendar_notes_edit: null,
  a_page_cases_list: null,
  a_page_cases_export_pdf: null,
  a_page_cases_contacts_info: null,
  a_page_event_watch: null,
  a_page_event_edit: null,
  a_page_event_members: null,
  a_page_event_plan: null,
  a_page_event_documents: null,
  a_page_resources: null,
  a_page_phonebook: null,
  a_page_profile: null,
  a_page_manage_cases_category: null,
  a_page_manage_contacts_category: null,
  a_page_manage_user: null,
  a_page_manage_update: null,
};


const AccessPageRight = () => {
  const LOCATION = useLocation()
  useEffect(()=>{
    apiResponse({access_id:LOCATION.pathname.slice(LOCATION.pathname.length - 1)},"access/get-by-id.php").then((data)=>{
      setState({...state, rights:data.access})
      console.log(data)

    })

  },[])
  const [state,setState] = useState({
    selectedPage:0,
    selectedRights:[],
    rights:{}
  })
  const changeState = (key,value)=>{
    setState({...state,[key]:value})
  }
  const filterSelectedRights = (selectedPage, index) => {
    let mas = [];
    Object.keys(state.rights).forEach((item) => {
      if (item.includes(PAGES[index].access + "_")) {
        mas.push(item);
      }
    });
    setState({ ...state, selectedRights: [...mas], selectedPage: index })
  };
  console.log(state)
  return (
    <div className='AccessPageRight'>
      <div className='AccessPageRight-left'>
        <div>Права користувачів (Сторінки)</div>
        <div className='AccessPageRight-left-options'>
          {PAGES.map((item,index)=>{
            return <div className='AccessPageRight-left-options-option' key={index} onClick={()=>{
              filterSelectedRights("selectedPage",index)
            }}>
            <span></span>
            <p>{item.title}</p>
          </div>
          })}
        </div>
      </div>
      <div className='AccessPageRight-right'>
        <div className='AccessPageRight-right-head'>
          <div className='AccessPageRight-right-head-title'>
            <span></span>
            <p>Налаштування до сторінки {PAGES[state.selectedPage].title}</p>
          </div>
          <div className='AccessPageRight-right-head-buttons'>
            <button className='AccessPageRight-right-head-buttons-CancelButton'>Скасувати</button>
            <button className='AccessPageRight-right-head-buttons-SaveButton'>Зберегти</button>
          </div>
        </div>

        <div className='AccessPageRight-right-block'>
          <AccessBlockCase accesses={[]}/>

        </div>

        {
          state.selectedRights.map((item)=>{
            let strPage = PAGES[state.selectedPage].access
            return <span key={item}>{LANG[item]}</span>
          })
        }
      </div>
    </div>
  )
}

export default AccessPageRight