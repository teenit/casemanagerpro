
import React, { useState } from "react";
import CoopForm from "./CoopForm/CoopForm";
import s from './style.module.css';
import RootPortal from "../Portals/RootPortal";
import Icon from "../elements/Icons/Icon";
import LoadingPage from "../Loading/LoadingPage";
const Cooperation = () => {
    const [addBtn,setAddBtn] = useState(false) 
    return(
        <div>
                    <LoadingPage effload={false} message={"Даний розділ у розробці"} />
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