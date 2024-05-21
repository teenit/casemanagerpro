import React from "react";
import s from "./events.module.css"
import AddEventBlock from "../blocks/AddEventBlock";
const AddEvent = ({ close, getEvents }) => {
    return (
        <div className={s.modal__wrap}>
            <div className={s.inner__modal}>
                <div className={s.black} onClick={close}></div>
                <div className={s.info}>
                    <AddEventBlock/>
                </div>
            </div>
        </div>
    )
}

export default AddEvent;


