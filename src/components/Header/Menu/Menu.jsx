import React from "react";
import s from "./menu.module.css"

const Menu = ({close,active})=>{
    return (
        <div className={s.container}>
        <div className={s.btn__wrap} onClick={(e)=>{
           close()
        }}>
            <div id="nav__btn" className={active ? `${s.btn} ${s.active}` : s.btn}>
                <span className={s.f__l}></span>
                <span className={s.s__l}></span>
                <span className={s.t__l}></span>
                <span className={s.fo__l}></span>
            </div>
        </div>
        </div>
    )
}

export default Menu;