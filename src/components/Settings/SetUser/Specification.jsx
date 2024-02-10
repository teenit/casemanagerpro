import React, { useEffect, useState } from "react";
import s from './specification.module.css';
import { get_apiObj } from "../../Functions/get_apiObj";
import ModalPortal from "../../Modals/ModalPortal";
import SpecFormBlock from "./SpecFormBlock";

const Specification = ({ user, categories, categoriesCont, close }) => {
   
    const [spec, setSpec] = useState({
        settings: []
    })
    const [newUserRights, setNewUserRights] = useState(user.level);
    const [sendBtn, setSendBtn] = useState(false);
    const sendRights = ()=>{
        setSendBtn(false)
        get_apiObj((arg) => {
            window.alert(arg.message);
            window.location.reload();
        }, "user/set-user-settings.php", {userId:user.id, settings:{...newUserRights}})
    }
    useEffect(() => {
        get_apiObj((arg) => {
            setSpec(arg);
        }, "user/get-level.php", {})
    }, [])
    return (
        <ModalPortal>
            <div className={s.wrap__form} onClick={(e) => {
                if (e.target.className === s.wrap__form) close()
            }}>
                <div className={s.inner__form}>
                    <h3 className={s.main__title}>Розподіл прав доступу для користувача <i>{user.userName}</i></h3>
                    <div className={s.control__spec}>
                        <button disabled = {sendBtn} className={s.save__btn} onClick={() => sendRights()}>Оновити права доступу</button>
                    </div>
                    {
                        spec.settings.map((item) => <SpecFormBlock key={item.title}
                            setSpec={(argKey, argValue) => {
                                newUserRights[argKey] = argValue
                            }} rights={item.right} userLevel={user.level} pop={{ title: item.title, description: item.description }} />)
                    }
                    <div className={s.form__block}>
                        <h3 className={s.form__block__title}>Створення кейсів</h3>
                        <p>Категорії кейсів, які можна створювати</p>
                        {
                            categories.map((item) => {
                                return (
                                    <div key={item.value} className={s.form__item}>
                                        <label className={`${s.form__label} ${!!newUserRights["create" + item.value] ? s.active : null}`} htmlFor={item.value}>
                                            <input checked={!!newUserRights["create" + item.value]} type="checkbox" id={item.value} name={item.value}
                                                onChange={(e) => {
                                                    setNewUserRights({ ...newUserRights, ["create" + item.value]: e.target.checked })
                                                }} />
                                            {item.text}
                                        </label>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className={s.form__block}>
                        <h3 className={s.form__block__title}>Доступ до кейсів</h3>
                        <p>Категорії кейсів, до котрих є доступ</p>
                        
                        {
                            categories.map((item) => {
                                return (
                                    <div key={item.value} className={s.form__item}>
                                        <label className={`${s.form__label} ${!!newUserRights["get" + item.value] ? s.active : null}`} htmlFor={"get" + item.value}>
                                            <input checked={!!newUserRights["get" + item.value]} type="checkbox" id={"get" + item.value} name={"get" + item.value}
                                                onChange={(e) => {
                                                    setNewUserRights({ ...newUserRights, ["get" + item.value]: e.target.checked })
                                                }} />
                                            {item.text}
                                        </label>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className={s.form__block}>
                        <h3 className={s.form__block__title}>Створення контактів</h3>
                        <p>Категорії контактів телефонної книги, які можна створювати</p>
                        {
                            categoriesCont.map((item) => {
                                return (
                                    <div key={item.value} className={s.form__item}>
                                        <label  className={`${s.form__label} ${!!newUserRights["createCont" + item.value] ? s.active : null}`} htmlFor={"createCont" + item.value}>
                                            <input checked={!!newUserRights["createCont" + item.value]} type="checkbox" id={"createCont" + item.value} name={"createCont" + item.value}
                                                onChange={(e) => {
                                                    setNewUserRights({ ...newUserRights, ["createCont" + item.value]: e.target.checked })
                                                }} />
                                            {item.text}
                                        </label>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className={s.form__block}>
                        <h3 className={s.form__block__title}>Доступ до контактів</h3>
                        <p>Категорії контактів телефонної книги, до котрих є доступ</p>
                        {
                            
                            categoriesCont.map((item) => {
                                return (
                                    <div key={item.value} className={s.form__item}>
                                        <label className={`${s.form__label} ${!!newUserRights["getCont" + item.value] ? s.active : null}`} htmlFor={"getCont" + item.value}>
                                            <input checked={!!newUserRights["getCont" + item.value]} type="checkbox" id={"getCont" + item.value} name={"getCont" + item.value}
                                                onChange={(e) => {
                                                    setNewUserRights({ ...newUserRights, ["getCont" + item.value]: e.target.checked })
                                                }} />
                                            {item.text}
                                        </label>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </ModalPortal>

    )
}

export default Specification;