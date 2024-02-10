import React from "react";
import { NavLink } from "react-router-dom";
import Bell from "./Bell";
import s from "./nav.module.css"
import profileImg from "./../../../img/icons/cat-profile-50.png"
import logoutImg from "./../../../img/icons/logout-50.png"
import { useDispatch } from "react-redux";
import { removeUser, setUser } from "../../../store/Slices/userSlice";
import { useAuth } from "../../../hooks/use-auth";

const Nav = ({close}) => {
    const dispatch = useDispatch();
    const { isAuth } = useAuth();
    return (
        <div className={s.wrap__nav} id="wrap__nav" onClick={(e)=>{
            if(e.target.id == "wrap__nav") close();   
            document.getElementById("nav__btn").classList.remove('active') 
        }}>
        <nav className={s.nav}>
            
            <div className={s.nav__inner}>

                <ul className={s.ul}>
                    
                    <li className={s.li}>
                        <NavLink className={s.a} onClick={close} to="/cases">Кейси</NavLink>
                    </li>
                    <li>
                        <NavLink className={s.a} onClick={close} to="/add-case">Додати кейс</NavLink>

                    </li>
                    <li>
                        <NavLink className={s.a} onClick={close} to="/contacts">Телефонна книга</NavLink>

                    </li>
                    <li>
                        <NavLink className={s.a} onClick={close} to="/calendar">Календар</NavLink>
                    </li>
                    <li>
                        <NavLink className={s.a} onClick={close} to="/events">Події</NavLink>
                    </li>
                    <li>
                        <NavLink className={s.a} onClick={close} to="/search">Розширений пошук</NavLink>
                    </li>
                    <li>
                        <NavLink className={s.a} onClick={close} to="/settings">Налаштування</NavLink>

                    </li>
                    <li>
                        <NavLink className={s.a} onClick={close} to="/resources">Ресурси</NavLink>
                    </li>
                </ul>
            </div>
            <div className={s.control__nav}>
               <div className={s.profile}> 
                    <a className={s.a} href={`/user?${localStorage.getItem("id")}`}><img src={profileImg} alt="" /></a>
                </div>
                <div className={s.logout}>
                    <NavLink className={s.a} onClick={()=>{dispatch(removeUser())}} to="/login"><img className={s.logout} src={logoutImg} alt="" /></NavLink>
                </div>
            </div>
        </nav>
        </div>
    )
}


export default Nav;