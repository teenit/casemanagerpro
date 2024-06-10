import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { apiResponse } from '../Functions/get_apiObj'
import { useSelector } from 'react-redux'
import AccessDefaultBlock from '../blocks/access/AccessDefaultBlock'
import AccessCasesCategories from '../blocks/access/AccessCasesCategories'
import AccessCasesList from '../blocks/access/AccessCasesList'
import { LANG, appConfig } from '../../services/config'
import SelectAccess from '../elements/Selects/SelectAccess'
import SmallNotification from '../elements/Notifications/SmallNotification'

const PAGES  = appConfig.pages;

const AccessPageRight = () => {

  let params = useParams();
  const access_id = params.id;
  useEffect(()=>{
    apiResponse({access_id:access_id},"access/get-by-id.php").then((data)=>{
      setState({...state, rights:data.access})
    })

  },[])
  const [state,setState] = useState({
    selectedPage:"case",
    selectedRights:[],
    rights:null,
    accesses:[]
  })
  const [notif, setNotif] = useState({
    text:"",
    show:false,
    isSuccess:false
  })
  const getRightsForBack = () => {
    let obj = {
      id_access: state.rights.id,
      access: []
    }
    Object.keys(state.rights).forEach(item => {
      if (item !== 'id' && state.rights[item] !== null) obj.access.push({value: state.rights[item], key: item})
    })
    return obj;
  }

 const updateRights = () => {
  let access = getRightsForBack();
  apiResponse(access, "access/update-access.php").then(res=>{
    if (res.status) {
      setNotif({
        show:true,
        text: "Success",
        isSuccess: true
      })
    } else {
      setNotif({
        show:true,
        text: "Fail",
        isSuccess: false
      })
    }
  });

 }

  const changeRight = (value, key) => {
    setState({...state, rights: {...state.rights, [key]:value}});
  }
  
  const filterSelectedRights = (selectedPage) => {
    setState({ ...state, selectedPage })
  };
  return (
    <div className='AccessPageRight'>
      <div className='AccessPageRight-left'>
        <div>{LANG.access_users_pages}</div>
        <div className='AccessPageRight-left-options'>
          {
            Object.keys(PAGES).map((item)=>{
              return <div className={`AccessPageRight-left-options-option ${item === state.selectedPage && "active"}`} key={item} onClick={()=>{
                filterSelectedRights(item)
              }}>
              <p>{PAGES[item].title}</p>
            </div>
            })
          }
        </div>
      </div>
      <div className='AccessPageRight-right'>
        <div className='AccessPageRight-right-head'>
          <div className='AccessPageRight-right-head-title'>
            <span></span>
            <p>{LANG.settings_to_page} {PAGES[state.selectedPage].title}</p>
          </div>
          <div className='AccessPageRight-right-head-buttons'>
            <button className='AccessPageRight-right-head-buttons-CancelButton'>{LANG.GLOBAL.cancel}</button>
            <button className='AccessPageRight-right-head-buttons-SaveButton' onClick={updateRights}>{LANG.GLOBAL.save}</button>
          </div>
        </div>

        <div className='AccessPageRight-right-block'>
        {
    state.rights && (
    <div>
    {
      state.selectedPage === "case" && 
      <>
      <SelectAccess
        options={appConfig.newAccess.accessCases.get.options} 
        value={state.rights[appConfig.newAccess.accessCases.get.right]} 
        label={LANG.access.a_cases_get}
        onChange={(value)=>{changeRight(value, appConfig.newAccess.accessCases.get.right)}} />
      {state.rights.a_cases_get == 2 && 
      <>
        <AccessCasesCategories 
          changeAccess = {(value, key)=>{
            changeRight(value, key);
          }} 
          accesses={state.rights} 
          list = {'case'}
          type = {'categories'} />

          <AccessCasesList
          changeAccess = {(value, key)=>{
            changeRight(value, key);
          }} 
          accesses={state.rights} 
          type = {'cases'} />
        </>}
        <AccessDefaultBlock 
          changeAccess = {(value, key)=>{
            changeRight(value, key);
          }} 
          accesses={state.rights} 
          type = {'case'} 
          />
    </>
    }
    {
      state.selectedPage !== "case" &&
        <AccessDefaultBlock 
          changeAccess = {(value, key)=>{
            changeRight(value, key);
          }} 
          accesses={state.rights} 
          type = {state.selectedPage} 
        />
    }
      
     
    </div>
  )
}


         
        </div>

        {/* {
          state.selectedRights.map((item)=>{
            let strPage = PAGES[state.selectedPage].access
            return <span key={item}>{LANG[item]}</span>
          })
        } */}
      </div>
      {
        notif.show && <SmallNotification isSuccess={notif.isSuccess} text={notif.text} close={()=>{setNotif({...notif, show: false})}}/>
      }
    </div>
  )
}

export default AccessPageRight