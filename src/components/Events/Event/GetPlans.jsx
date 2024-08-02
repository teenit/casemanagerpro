import axios from "axios";
import React, { useEffect, useState } from "react";
import { serverAddres } from "../../Functions/serverAddres";
import s from "./plan.module.css";
import AccessCheck from "../../Functions/AccessCheck";
import Modal from "../../Modals/Modal";
import { Button } from "@mui/material";
import Textarea from "../../elements/Inputs/Textarea";
import { LANG } from "../../../services/config";

const GetPlans = ({ id, plans }) => {
    const [feed, setFeed] = useState({ title: "" })
    function addFeed(){
        if(feed.title == "") return window.alert("Заповніть всі поля");
        let obj = {
            id: localStorage.getItem("id"),
            token: localStorage.getItem("token"),
            title:feed.title.replaceAll("'", "’").replaceAll(/\n/g, "<br />"),
            planID:modalInfo.item.id,
            value:{}
        }
        axios({
            url: serverAddres("event/add-plan-feed.php"),
            method: "POST",
            header : {'Content-Type': 'application/json;charset=utf-8'},
            data : JSON.stringify(obj),
        })
        .then((data)=>{ 
            if(data.data == true) window.location.reload()
        })
        .catch((error)=>console.log(error))  
    }
    const [modal, setModal] = useState(false);
    const [modalInfo, setModalInfo] = useState({})
    const canWriteFeedback = AccessCheck('yes_no', 'a_page_event_add_feedback')
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
                                <div className={s.result__inner__90}>
                                    <p dangerouslySetInnerHTML={{ __html: item.description }}></p>

                                </div>
                                <div className={s.feed__back__wrap}>
                                    <div className={s.feed__back__line}>
                                        <b>Зворотній зв'язок</b>
                                    </div>
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

                            </div>
                                {canWriteFeedback && <Button variant="contained" onClick={() => {
                                    setModalInfo({
                                        item: item
                                    })
                                    setModal(!modal)
                                }

                                } className={s.btn__feed}>Написати</Button>}
                        </div>
                    )
                })}
            </div>
            {modal && <Modal closeHandler={() => { setModal(false) }} header={"Додати зворотній зв'язок"} footer={
                <div className="Modal--footer">
                    <Button variant="contained" onClick={addFeed}>{LANG.save}</Button>
                    <Button color="error" variant="contained" onClick={() => { setModal(false) }}>{LANG.cancel}</Button>
                </div>
            }>
                <div className={s.result__modal}>
                    <h3 className={s.title}>{modalInfo.item.title}</h3>
                    <div className={s.time__line}><span className={s.plan__time__date}>
                        <span className={s.plan__time}>{modalInfo.item.timeStart}</span>
                        <span className={s.plan__date}>{modalInfo.item.dateStart}</span>
                    </span>
                        <span className={s.plan__time__date}>
                            <span className={s.plan__time}>{modalInfo.item.timeEnd}</span>
                            <span className={s.plan__date}>{modalInfo.item.dateEnd}</span>
                        </span>
                    </div>
                    <div dangerouslySetInnerHTML={{__html:modalInfo.item.description}}></div>
                    <div className={s.feed__back__line}>
                        <Textarea label="Залишити зворотній зв'язок" value={feed.title} name="feed" id="feed" onChange={(e) => {
                            setFeed({ ...feed, title: e.target.value })
                        }}></Textarea>
                    </div>
                </div>
            </Modal>}
        </div>
    )
}

export default GetPlans;