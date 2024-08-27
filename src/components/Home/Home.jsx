import React from "react";
import s from "./Home.module.css";
import { useDispatch } from "react-redux";
import { useAuth } from "../../hooks/use-auth";
import Cases from "../Cases/Cases";
import Statistic from "./Statistic/Statistic";
import { NavLink } from "react-router-dom";

const Home = ()=>{
    const dispatch = useDispatch();
    const {isAuth, email, data} = useAuth();
    return isAuth ? (
        <div>
            <div className={s.menu__wrap}>
                <div className={s.menu}>
                <ul className={s.ul}>
                    
                    <li className={s.li}>
                        <NavLink className={s.a} to="/cases">Кейси</NavLink>
                    </li>
                    <li className={s.li}>
                        <NavLink className={s.a} to="/add-case">Додати кейс</NavLink>

                    </li>
                    {/* <li className={s.li}>
                        <NavLink className={s.a} to="/contacts">Телефонна книга</NavLink>

                    </li> */}
                    <li className={s.li}>
                        <NavLink className={s.a} to="/calendar">Календар</NavLink>
                    </li>
                    <li className={s.li}>
                        <NavLink className={s.a} to="/events">Події</NavLink>
                    </li>
                    {/* <li className={s.li}>
                        <NavLink className={s.a} to="/search">Розширений пошук</NavLink>
                    </li> */}
                    {/* <li className={s.li}>
                        <NavLink className={s.a} to="/settings">Налаштування</NavLink>
                    </li> */}
                    <li className={s.li}>
                        <NavLink className={s.a} to="/resources">Ресурси</NavLink>
                    </li>
                    {/* <li className={s.li}>
                        <NavLink className={s.a} to="/cooperation">Коаліція</NavLink>
                    </li> */}
                    {/* <li className={s.li}>
                        <NavLink className={s.a} to="/access">Рівні доступу</NavLink>
                    </li> */}
                    <li className={s.li}>
                        <NavLink className={s.a} to="/groups">Групи</NavLink>
                    </li>
                </ul>
                </div>
            </div>
            <h1 className={s.text__center}>СТАТИСТИКА</h1>
            <Statistic />
        </div>
    ) : (
        <div className={s.home}>
           
        </div>
    )
}
export default Home;