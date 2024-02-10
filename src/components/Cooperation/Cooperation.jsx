
import { Input } from "@mui/material";
import React, { useState } from "react";
import CoopForm from "./CoopForm/CoopForm";
import s from './style.module.css';
import plusImg from './../../img/icons/plus-67.png';
import RootPortal from "../Portals/RootPortal";
const Cooperation = () => {
    const [addBtn,setAddBtn] = useState(true) 
    return(
        <div>
            <img className={s.btn__plus} src={plusImg} alt="" onClick={()=>setAddBtn(true)} />
            {
              addBtn ? 
              <RootPortal>
                <div className={s.wrap__portal}>
                    <div className={s.inner__portal}>
                        <CoopForm close = {()=>setAddBtn(false)} />
                    </div>
                </div>
              </RootPortal>
              :null
            }
        </div>
    )
}

export default Cooperation