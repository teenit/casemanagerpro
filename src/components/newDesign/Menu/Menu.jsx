import React, { useEffect, useState } from "react";
import { appConfig } from "../../../services/config";
import { NavLink, useLocation } from "react-router-dom";
import Icon from "../../elements/Icons/Icon";
import logoImg from "../../../img/logo.svg";
import { removeUser } from "../../../store/Slices/userSlice";
import { useDispatch } from "react-redux";

const Menu = () => {
    const menuItems = appConfig.menu;
    const [opened, setOpened] = useState(false);
    const params = useLocation();
    const [submenuOpened, setSubmenuOpened] = useState(null);
    const dispatch = useDispatch();
    useEffect(() => {
        setSubmenuOpened(null);
    }, [params.pathname]);

    const handleMenuToggle = () => {
        setOpened(!opened);
    };

    const handleSubmenuToggle = (type) => {
        setSubmenuOpened(type === submenuOpened ? null : type);
        //setOpened(true);
    };

    return (
        <div className={`Menu ${opened ? "opened" : ""}`}>
            <div className="Menu-container">
                <div className="Menu-header">
                    <NavLink to="/">
                        <div className="Menu-header-logo">
                            <img src={logoImg} alt="Logo" />
                            {opened && <span>Case Manager Pro</span>}
                        </div>
                    </NavLink>
                    <div className={`Menu-header-btn ${opened ? "opened" : ""}`} onClick={handleMenuToggle}>
                        <Icon addClass="Menu-header-btn-icon" icon="arrow_back" />
                    </div>
                </div>
                
                <div className="Menu-items">
                    <div className="Menu-items-primary">
                        {menuItems.map((item) =>
                            !item.subMenu ? (
                                <NavLink key={item.link} className="Menu-items-primary-item" to={item.link}>
                                    <Icon addClass="Menu-items-primary-item-ico" icon={item.icon} />
                                    {opened && <div className="Menu-title">{item.title}</div>}
                                </NavLink>
                            ) : (
                                <div
                                    key={item.type}
                                    className={`Menu-items-submenu ${item.type === submenuOpened ? "opened-sub" : ""}`}
                                >
                                    <div
                                        className="Menu-items-submenu-main"
                                        onClick={() => handleSubmenuToggle(item.type)}
                                    >
                                        <div className="Menu-items-submenu-main-link">
                                            <Icon icon={item.icon} addClass="Menu-items-submenu-main-icon" />
                                            {opened && <div>{item.title}</div>}
                                        </div>
                                        {opened && <Icon icon="arrow_down" />}
                                    </div>
                                    <div className="Menu-items-submenu-links closed">
                                    {item.subMenu.map((sub) => (
                                        <NavLink key={sub.link} className="Menu-items-submenu-link" to={sub.link}>
                                            <div className="Menu-title">{sub.title}</div>
                                        </NavLink>
                                    ))}
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                    <div className="Menu-items-secondary">

                        <NavLink
                            onClick={() => { dispatch(removeUser()) }}
                            to="/login"
                        >
                            <Icon icon={'logout'}/>
                            {/* <img className={s.logout} src={logoutImg} alt="" /> */}
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Menu;
