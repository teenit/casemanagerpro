import React from "react";
import { NavLink } from "react-router-dom";
import ShowLogin from "../ShowLogin";
import Search from "./Search";
import defoltProfile from "../../../img/default_profile.png";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
const MenuProfile = () => {
  const [profileMenu, setProfileMenu] = useState(false);



  const togleProfileMeny = () => {
    setProfileMenu(!profileMenu);
  };
  return (
    <div className="menu__profile__wrap">
      <img
        src={
          localStorage.profilePhoto == "null"
            ? defoltProfile
            : localStorage.profilePhoto
        }
        onClick={()=>{
          setProfileMenu(!profileMenu)
        }}
      />

      {profileMenu ? <ShowLogin togleProfileMeny={togleProfileMeny} /> : ""}
    </div>
  );
};
export default MenuProfile;
