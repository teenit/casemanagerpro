import React from "react";
import s from "./Home.module.css";
import { useDispatch } from "react-redux";
import { useAuth } from "../../hooks/use-auth";
import Statistic from "./Statistic/Statistic";
import { NavLink } from "react-router-dom";
import Cases from "../newDesign/Cases/Cases";
import { LANG } from "../../services/config";
import AccessCheck from "../Functions/AccessCheck";

const Home = ()=>{
    const dispatch = useDispatch();
    const {isAuth, email, data} = useAuth();
    const accessCases = AccessCheck('yes_no', "a_page_cases")
    return isAuth ? (
        <div>
            <div className={s.menu__wrap}>
                <div className={s.menu}>
                <ul className={s.ul}>
                    
                    <li className={s.li}>
                        <NavLink className={s.a} to="/cases">{LANG.pages.cases}</NavLink>
                    </li>
                    <li className={s.li}>
                        <NavLink className={s.a} to="/add-case">{LANG.pages.addCase}</NavLink>

                    </li>
                    {/* <li className={s.li}>
                        <NavLink className={s.a} to="/contacts">Телефонна книга</NavLink>

                    </li> */}
                    <li className={s.li}>
                        <NavLink className={s.a} to="/calendar">{LANG.pages.calendar}</NavLink>
                    </li>
                    <li className={s.li}>
                        <NavLink className={s.a} to="/events">{LANG.pages.events}</NavLink>
                    </li>
                    {/* <li className={s.li}>
                        <NavLink className={s.a} to="/search">Розширений пошук</NavLink>
                    </li> */}
                    {/* <li className={s.li}>
                        <NavLink className={s.a} to="/settings">Налаштування</NavLink>
                    </li> */}
                    <li className={s.li}>
                        <NavLink className={s.a} to="/groups">{LANG.pages.groups}</NavLink>
                    </li>
                    {/* <li className={s.li}>
                        <NavLink className={s.a} to="/cooperation">Коаліція</NavLink>
                    </li> */}
                    {/* <li className={s.li}>
                        <NavLink className={s.a} to="/access">Рівні доступу</NavLink>
                    </li> */}
                    <li className={s.li}>
                        <NavLink className={s.a} to="/tasks">{LANG.pages.tasks}</NavLink>
                    </li>
                </ul>
                </div>
            </div>
            
            {accessCases && <Cases />}
        </div>
    ) : (
        <div className={s.home}>
           
        </div>
    )
}
export default Home;