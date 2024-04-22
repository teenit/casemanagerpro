import React, { useEffect, useState } from "react";
import phoneImg from "../../../../../img/icons/iphone-90.png"
import socialImg from "../../../../../img/icons/social-100.png"
import givingImg from "../../../../../img/icons/giving-100.png"
import emailImg from "../../../../../img/icons/email-100.png"
import addressImg from "../../../../../img/icons/address-100.png"
import dateImg from "../../../../../img/icons/date-100.png"
import dateCreatedImg from '../../../../../img/icons/caseShortInfo/date-created.svg'
import channelImg from '../../../../../img/icons/caseShortInfo/channel.svg'
import categoriesImg from '../../../../../img/icons/caseShortInfo/categories.svg'
import contractImg from '../../../../../img/icons/caseShortInfo/contract.svg'
import edit from '../../../../../img/icons/edit.svg'
import { apiResponse } from "../../../../Functions/get_apiObj"
const CaseShortInfo = ({ info }) => {
    const [categories, setCategories] = useState(null)
    const [state, setState] = useState({
        phone1: {
            edit: false,
            value: info.general.phone1
        },
        phone2: {
            edit: false,
            value: info.general.phone2
        },
        email: {
            edit: false,
            value: info.general.email
        },
        address_live: {
            edit: false,
            value: info.data.address_live
        },
        date_created: {
            edit: false,
            value: info.data.date_created
        },
        contract: {
            edit: false,
            date: info.data.contract_date,
            number: info.data.contract_number
        },

        channel: {
            edit: false,
            value: info.data.channel
        },
    })
    const handleDataChange = (key, val) => {
        setState({ ...state, [key]: { ...state[key], value: val } })
    }
    const handleEditChange = (key) => {
        setState({ ...state, [key]: { ...state[key], edit: !state[key].edit } })
    }
    const handleContractChange = (key,val)=>{
        setState({...state,contract:{...state.contract,[key]:val}})
    }
    useEffect(() => {
        apiResponse({}, "manage/get-categories-case.php").then((res) => {
            console.log(res);
            setCategories(res.mas)
        })
    }, [])
    return (
        <div className="case__info">
            <div className="case__info__inner">
                <h1>{info.general.name} <span style={{ color: "var(--main-color)" }}>№{info.general.id}</span></h1>
                <div className="case__info__inner__left__cards">
                    <div className="case__info__card">
                        <span>
                            <div className="case__info__card__img">
                                <img src={phoneImg} alt="" />
                            </div>
                            <div className="case__info__card__text">
                                {state.phone1.edit ?
                                    <input type="number" value={state.phone1.value} onChange={(e) => { handleDataChange("phone1", e.target.value) }} />
                                    :
                                    <span><p title="Номер телефону 1"><a href={`tel:${state.phone1.value}`}>{state.phone1.value}</a></p></span>
                                }
                            </div>
                        </span>
                        <div className="case__info__card__img" onClick={(() => { handleEditChange("phone1") })}>
                            <img src={edit} alt="Редагувати" />
                        </div>
                    </div>
                    <div className="case__info__card">
                        <span>
                            <div className="case__info__card__img">
                                <img src={phoneImg} alt="" />
                            </div>
                            <div className="case__info__card__text">
                                {state.phone2.edit ?
                                    <input type="number" value={state.phone2.value} onChange={(e) => { handleDataChange("phone2", e.target.value) }} />
                                    :
                                    <span><p title="Номер телефону 2"><a href={`tel:${state.phone2.value}`}>{state.phone2.value}</a></p></span>
                                }
                            </div>
                        </span>
                        <div className="case__info__card__img" onClick={(() => { handleEditChange("phone2") })}>
                            <img src={edit} alt="Редагувати" />
                        </div>
                    </div>
                    <div className="case__info__card">
                        <span>
                            <div className="case__info__card__img">
                                <img src={emailImg} alt="" />
                            </div>
                            <div className="case__info__card__text">
                                {state.email.edit ?
                                    <input type="text" value={state.email.value} onChange={(e) => { handleDataChange("email", e.target.value) }} />
                                    :
                                    <span><p title="Пошта"><a href={`tel:${state.email.value}`}>{state.email.value}</a></p></span>
                                }
                            </div>
                        </span>
                        <div className="case__info__card__img" onClick={(() => { handleEditChange("email") })}>
                            <img src={edit} alt="Редагувати" />
                        </div>
                    </div>
                    <div className="case__info__card">
                        <span>
                            <div className="case__info__card__img">
                                <img src={addressImg} alt="" />
                            </div>
                            <div className="case__info__card__text">
                                {state.address_live.edit ?
                                    <input type="text" value={state.address_live.value} onChange={(e) => { handleDataChange("address_live", e.target.value) }} />
                                    :
                                    <span><p title="Адреса"><a href={`tel:${state.address_live.value}`}>{state.address_live.value}</a></p></span>
                                }
                            </div>
                        </span>
                        <div className="case__info__card__img" onClick={(() => { handleEditChange("address_live") })}>
                            <img src={edit} alt="Редагувати" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="case__info__inner__right">
                <div className="case__info__right__card">
                    <span>
                        <div className="case__info__card__img">
                            <img src={dateCreatedImg} alt="" />
                        </div>
                        <div className="case__info__card__text">
                            <span>Дата створення</span>
                            <p>{info.general.date_created}</p>
                        </div>
                    </span>
                </div>

                <div className="case__info__right__card">
                    <span>
                        <div className="case__info__card__img">
                            <img src={contractImg} alt="" />
                        </div>
                        <div className="case__info__card__text">
                            <span>Договір</span>
                            {state.contract.edit ?
                                <div className="case__info__card__contract">
                                    <input type="date" value={state.contract.date} onChange={(e) => { handleContractChange("contract_date", e.target.value) }} />
                                    <p>№</p>
                                    <input type="number" value={state.contract.number} onChange={(e) => { handleContractChange("contract_number", e.target.value) }} />
                                </div>
                                :
                                <div>
                                    <span>{state.contract.date} № {state.contract.number}</span>
                                </div>
                            }
                        </div>
                    </span>
                    <div className="case__info__card__img" onClick={() => {
                        handleEditChange("contract")
                    }}>
                        <img src={edit} alt="Редагувати" />
                    </div>
                </div>


                <div className="case__info__right__card">
                    <span>
                        <div className="case__info__card__img">
                            <img src={channelImg} alt="" />
                        </div>
                        <div className="case__info__card__text">
                            <span>Канал комунікації</span>
                            {state.channel.edit ?
                                <input type="text" value={state.channel.value} onChange={(e) => { handleDataChange("channel", e.target.value) }} />
                                :
                                <p title="Адреса">{info.data.channel}</p>
                            }
                        </div>
                    </span>
                    <div className="case__info__card__img" onClick={() => { handleEditChange("channel") }}>
                        <img src={edit} alt="Редагувати" />
                    </div>
                </div>


                <div className="case__info__right__card">
                    <span>
                        <div className="case__info__card__img">
                            <img src={categoriesImg} alt="" />
                        </div>
                        <div className="case__info__card__text">
                            <span>Категорії</span>
                            {categories && info.data.categories && info.data.categories.map((item, index) => {
                                let option = categories[item]
                                return (
                                    <p key={index}>{option.text}</p>
                                )
                            })}
                        </div>
                    </span>
                    <div className="case__info__card__img">
                        <img src={edit} alt="Редагувати" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CaseShortInfo;