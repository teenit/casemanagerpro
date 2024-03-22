import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { serverAddres } from "../../Functions/serverAddres";
import ModalPlan from "./ModalPlan";
import s from "./plan.module.css";

const GetPlans = ({ id, plans }) => {

    const [modal, setModal] = useState(false);
    const [modalInfo, setModalInfo] = useState({})
    const [feed, setFeed] = useState({ title: "" })
    return (
        <div className={s.users__wrap}>
            <h2>Планування</h2>
            <div className={s.plan}>
                {plans.map((item, index) => {
                    return (
                        <div key={index} className={s.result}>
                            <div className={s.plan__header}>
                                <div className={s.plan__header__inner}>
                                    <p>{item.title}</p>
                                    <p>{item.timeStart} - {item.timeEnd}</p>
                                </div>
                            </div>
                            <div className={s.result__inner}>
                            {/* <div className={s.time__line}><span className={s.plan__time__date}>
                                <span className={s.plan__time}>{item.timeStart}</span>
                                <span className={s.plan__date}>{item.dateStart}</span>
                            </span>
                                <span className={s.plan__time__date}>
                                    <span className={s.plan__time}>{item.timeEnd}</span>
                                    <span className={s.plan__date}>{item.dateEnd}</span>
                                </span>
                            </div> */}
                            <p dangerouslySetInnerHTML={{ __html: item.description }}></p>
                            <div className={s.feed__back__line}>
                                <b>Зворотній зв'язок</b>
                            </div>
                            <div className={s.feed__back__wrap}>
                                {item.feedBack.length == 0 ? <p>Немає зворотнього зв'язку</p> : null}
                                {item.feedBack.map((elem, ind) => {
                                    return (
                                        <div key={ind} className={s.feed__back}>
                                            <p dangerouslySetInnerHTML={{ __html: elem.title }} />
                                            <p className={s.feed__elem__date}>{elem.date}</p>
                                        </div>
                                    )
                                })}
                            </div>
                            <button onClick={() => {
                                setModalInfo({
                                    item: item
                                })
                                setModal(!modal)
                            }

                            } className={s.btn__feed}>Написати</button>
                            </div>
                        </div>
                    )
                })}
            </div>
            {modal ? <ModalPlan close={() => { setModal(!modal) }} modalInfo={modalInfo} /> : null}
        </div>
    )
}

export default GetPlans;