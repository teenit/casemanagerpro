import React, { useEffect, useState } from "react";

import logo from "../../img/logo.svg";
import addCaseImg from "./../../img/icons/add-user-64.png";
import calendarImg from "./../../img/icons/calendar-day-white-64.png";
import eventImg from "./../../img/icons/calendar-64-white.png"
import "./Header.css";
import Nav from "./Menu/Nav";
import { NavLink } from "react-router-dom";
import s from "./header.module.css";
import Menu from "./Menu/Menu";
import SearchMenu from "./Menu/SearchMenu";

import ModalErrorConnection from "../Modals/ModalErrorConnection";
import Bell from "./Menu/Bell";
import moment from "moment";
const Header = (props) => {
  const [errorNet, setErrorNet] = useState(null);
  const [active, setActive] = useState(false);
  const today = moment().format('D');

  
  return props.show ? (
    <div className={s.wrap__header}>
      {errorNet ? <ModalErrorConnection error={errorNet} func={()=>{
        setErrorNet(null)
      }}/>:null}
    <header className={s.header}>
      <div className={s.container}>
        <div className={s.logo}>
          <NavLink to={'/'}><img className={s.logo__img} src={logo} alt="" /></NavLink>
        </div>
        <SearchMenu />
        <div className={s.control} >
                <div>
                    <NavLink className={s.a} to="/add-case"><img className={s.logout} src={addCaseImg} alt="" /></NavLink>
                </div>
                <div className={s.event}> 
                  <NavLink className={s.a} to="/events"><img className={s.logout} src={eventImg} alt="" /></NavLink>
                </div>
                <div className={s.calendar}> 
                  <NavLink className={s.calendar__link} to="/calendar"><img className={`${s.calendar__img} ${s.logout}`} src={calendarImg} alt="" /><span className={s.day__number}>{today}</span></NavLink>
                </div>
                
        </div>
        
        <div className={s.control}>
        <Menu active={active} close={()=>{setActive(!active) 
          return !active}} />
          <Bell />
          </div>
      </div>
    </header>
    {active ? <Nav  close={()=>{setActive(!active)}}/> : null}
    </div>
  ) : (
    <div className={s.wrap__header}>
  <header className={s.header}>
    <div className={s.container}>
      {/* <div className={s.control}>
        <NavLink className={s.a} to="/login"> Увійти до програми</NavLink>
      </div> */}
    </div>
  </header>
  </div>
  )
};

export default Header;
