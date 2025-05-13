import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import defaultUserImg from './../../../img/default_profile.png';
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import Bell from "../../Header/Menu/Bell";
import { appConfig } from "../../../services/config";

const HorisontalMenu = ({ isMobile }) => {

    const user = useSelector(state => state.auth);
    const pages = appConfig.pages
    const navigate = useNavigate();
    function findByPath(targetPath) {
        for (let [key, value] of Object.entries(pages)) {
            if (value.path === targetPath) {
                return value; // Повертаємо об'єкт з знайденим ключем та його значенням
            }
        }
        return null; // Повертаємо null, якщо співпадіння не знайдено
    }
    const titlePage = findByPath(useLocation().pathname)
    return (
        <div className="HorisontalMenu">
            <div className="HorisontalMenu-left">
                <div className="HorisontalMenu-left-title">
                    {titlePage?.title}
                </div>

            </div>
            <div className="HorisontalMenu-right">
                <div className="HorisontalMenu-notifications">
                    <Bell />
                </div>
                <div className="HorisontalMenu-profile" onClick={() => {
                    navigate(`user/${user.user_id}`);
                }}>
                    <div className="HorisontalMenu-profile-image">
                        <img
                            src={user.profile_img ? user.profile_img : defaultUserImg}
                            alt="Profile"
                            onError={(e) => { e.target.src = defaultUserImg; }}
                        />
                    </div>
                    {!isMobile && (
                        <div className="HorisontalMenu-profile-name">
                            <NavLink to={`user/${user.user_id}`}>{user.userName}</NavLink>
                        </div>
                    )}
                </div>

            </div>


        </div>
    )
}

export default HorisontalMenu