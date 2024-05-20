import React from "react";
import { NavLink } from "react-router-dom";
import Bell from "./Bell";
import s from "./nav.module.css";
import profileImg from "./../../../img/icons/cat-profile-50.png";
import logoutImg from "./../../../img/icons/logout-50.png";
import { useDispatch } from "react-redux";
import { removeUser } from "../../../store/Slices/userSlice";
import { useAuth } from "../../../hooks/use-auth";
import { LANG, appConfig } from "../../../services/config";

const Nav = ({ close }) => {
    const pagesData = [
        {
            title: LANG.pages.cases,
            link: "/cases"
        },
        {
            title: LANG.pages.addCase,
            link: "/add-case"
        },
        {
            title: LANG.pages.contacts,
            link: "/contacts"
        },
        {
            title: LANG.pages.calendar,
            link: "/calendar"
        },
        {
            title: LANG.pages.events,
            link: "/events"
        },
        {
            title: LANG.pages.search,
            link: "/search"
        },
        {
            title: LANG.pages.settings,
            link: "/settings"
        },
        {
            title: LANG.pages.resources,
            link: "/resources"
        },
        {
            title: LANG.pages.accesses,
            link: "/access"
        },
        {
            title: LANG.pages.cooperation,
            link: "/cooperation"
        }
    ];

    const dispatch = useDispatch();
    const { isAuth } = useAuth();

    return (
        <div
            className={s.wrap__nav}
            id="wrap__nav"
            onClick={(e) => {
                if (e.target.id === "wrap__nav") close();
                document.getElementById("nav__btn").classList.remove('active');
            }}
        >
            <nav className={s.nav}>
                <div className={s.nav__inner}>
                    <ul className={s.ul}>
                        {pagesData.map((page, index) => (
                            <li className={s.li} key={index}>
                                <NavLink className={s.a} onClick={close} to={page.link}>
                                    {page.title}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={s.control__nav}>
                    <div className={s.profile}>
                        <a className={s.a} href={`/user?${localStorage.getItem("id")}`}>
                            <img src={profileImg} alt="" />
                        </a>
                    </div>
                    <div className={s.logout}>
                        <NavLink
                            className={s.a}
                            onClick={() => { dispatch(removeUser()) }}
                            to="/login"
                        >
                            <img className={s.logout} src={logoutImg} alt="" />
                        </NavLink>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Nav;
