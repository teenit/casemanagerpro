import React, { useState } from 'react'
const LANG = {
  a_page_case_add:"Створити кейс",
  a_page_case_edit:"Редагувати кейс",
  a_page_statistics_cases:"Відображати статистику кейсів",
  a_page_statistics_cases_hb:"Відображати статистику по днях народження кейсів",
  a_page_calendar_add:"Створити подію у календарі",
  a_page_cases_contacts_info:"Приховати контактну інформацію кейсів",
  a_page_cases_export:"Експорт кейсів",
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
  a_page_case_add:null,
  a_page_case_edit:null,
  a_page_statistics_cases:null,
  a_page_statistics_cases_hb:null,
  a_page_calendar_add:null,
  a_page_cases_contacts_info:null,
  a_page_cases_export:null,

}

const AccessPageRight = () => {
  const [state,setState] = useState({
    selectedPage:0,
    selectedRights:[]
  })
  const changeState = (key,value)=>{
    setState({...state,[key]:value})
  }
  const filterSelectedRights = (selectedPage, index) => {
    let mas = [];
    Object.keys(RIGHTS).forEach((item) => {
      if (item.includes(PAGES[index].access + "_")) {
        mas.push(item);
      }
    });
    setState({ ...state, selectedRights: [...mas], selectedPage: index })
  };
  
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