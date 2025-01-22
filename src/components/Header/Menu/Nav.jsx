import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Bell from "./Bell";
import s from "./nav.module.css";
import profileImg from "./../../../img/icons/cat-profile-50.png";
import logoutImg from "./../../../img/icons/logout-50.png";
import { useDispatch } from "react-redux";
import { removeUser } from "../../../store/Slices/userSlice";
import { useAuth } from "../../../hooks/use-auth";
import { LANG, appConfig } from "../../../services/config";
import Icon from "../../elements/Icons/Icon";

const Nav = ({ close }) => {
    const pagesData = [
        {
            title: LANG.pages.cases,
            link: "/cases",

        },
        {
            title: LANG.pages.addCase,
            link: "/add-case",
            icon: "plus"
        },
        // {
        //     title: LANG.pages.contacts,
        //     link: "/contacts"
        // },
        {
            title: LANG.pages.calendar,
            link: "/calendar",
            icon: "calendar"
        },
        {
            title: LANG.pages.events,
            link: "/events"
        },
        {
            title: LANG.pages.transactions,
            link: "/transactions"
        },
        {
            title: LANG.pages.settings,
            link: "/settings",
            icon: "settings"
        },
        {
            title: LANG.pages.resources,
            link: "/resources"
        },
        {
            title: LANG.pages.accesses,
            link: "/access"
        },
        // {
        //     title: LANG.pages.cooperation,
        //     link: "/cooperation"
        // },
        {
            title: LANG.pages.groups,
            link: "/groups"
        },
        {
            title: LANG.pages.administration,
            icon:"",
            subMenu: [
                {
                    title: LANG.pages.fields,
                    link: "/fields"
                }
            ]
        },
    ];

    const dispatch = useDispatch();
    const { isAuth } = useAuth();
const navigate = useNavigate()
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
                                    <div className={s.with_icon}>
                                        <Icon icon={page.icon}/>
                                        {page.title}
                                    </div>
                                    
                                </NavLink>
                                {
                                   page?.subMenu && <ul>
                                    {page.subMenu.map((sub)=>{

                                        return (
                                            <li className={s.li} key={page.link}>
                                                <NavLink className={s.a} onClick={close} to={sub.link}>
                                                    <div className={s.with_icon}><Icon icon={sub.icon}/>{sub.title}</div>
                                                    
                                                </NavLink>
                                            </li>
                                        )
                                    })}
                                   </ul>
                                }
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={s.control__nav}>
                    <div className={s.profile}>
                        <NavLink className={s.a} to={`/user/${localStorage.getItem("id")}`} onClick={close}>
                            {/* <img src={profileImg} alt="" /> */}
                            <Icon icon={'profile'}/>
                        </NavLink>
                    </div>
                    <div className={s.logout}>
                        <NavLink
                            className={s.a}
                            onClick={() => { dispatch(removeUser()) }}
                            to="/login"
                        >
                            <Icon icon={'logout'}/>
                            {/* <img className={s.logout} src={logoutImg} alt="" /> */}
                        </NavLink>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Nav;
