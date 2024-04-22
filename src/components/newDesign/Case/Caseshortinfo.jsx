import React, { useEffect, useState } from "react";
import phoneImg from "../../../img/icons/iphone.svg"
import socialImg from "../../../img/icons/social-100.png"
import givingImg from "../../../img/icons/giving-100.png"
import emailImg from "../../../img/icons/email-100.png"
import addressImg from "../../../img/icons/address-100.png"
import dateImg from "../../../img/icons/date-100.png"
import dateCreatedImg from '../../../img/icons/caseShortInfo/date-created.svg'
import channelImg from '../../../img/icons/caseShortInfo/channel.svg'
import categoriesImg from '../../../img/icons/caseShortInfo/categories.svg'
import contractImg from '../../../img/icons/caseShortInfo/contract.svg'
import edit from '../../../img/icons/edit.svg'
import save from '../../../img/icons/save-50.png'
import { apiResponse } from "../../Functions/get_apiObj"
import SmallNotification from "../../elements/Notifications/SmallNotification";
import Input from "../../elements/Inputs/Input";

const CaseShortInfo = ({ info, changeGeneral, changeData }) => {
    const [categories, setCategories] = useState(null)
    const [alert, setAlert] = useState(false)
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
        categories:{
            edit:false,
            value:info.data.categories
        }
    })
    const handleDataChange = (key, val) => {
        setState(prevState => ({ ...prevState, [key]: { ...prevState[key], value: val } }))
    };


    const handleEditChange = (key) => {
        setState({ ...state, [key]: { ...state[key], edit: !state[key].edit } })
    }
    const handleContractChange = (key, val) => {
        setState(prevState => ({ ...prevState, contract: { ...prevState.contract, [key]: val } }))
    };
    const saveHandler = (key, value, type) => {
        if (type === "general") {
            changeGeneral(key, value)
        } else if (type === "data") {
            if (key !== "contract") {
                changeData(key, value)
            } else {
                changeData(key, { date: value.date, number: value.number })
            }
        }
        handleEditChange(key)
        setAlert(true)
    };
    const handleCheckboxChange = (val) => {
        let categories = val.map(item => item.id);
        setState({ ...state, categories: {...state.categories, value:categories}})
    };






    useEffect(() => {
        apiResponse({}, "manage/get-categories-case.php").then((res) => {
            setCategories(res.mas)
        })
    }, [])
    console.log(categories);

    return (
        <div className="case-info">
            <div className="case-info-inner">
                <h1>{info.general.name} <span style={{ color: "var(--main-color)" }}>№{info.general.id}</span></h1>
                <div className="case-info-inner-left-cards">
                    <div className="case-info-card">
                        <span>
                            <div className="case-info-card-img">
                                <img src={phoneImg} alt="" />
                            </div>
                            <div className="case-info-card-text">
                                {state.phone1.edit ?
                                    <Input type="number" value={state.phone1.value} onChange={(e) => { handleDataChange("phone1", e.target.value) }} />
                                    :
                                    <span><p title="Номер телефону 1"><a href={`tel:${state.phone1.value}`}>{state.phone1.value}</a></p></span>
                                }
                            </div>
                        </span>
                        <div className="case-info-card-img" >
                            {state.phone1.edit ? <img src={save} alt="Зберегти" onClick={() => { saveHandler("phone1", state.phone1.value) }} />
                                :
                                <img src={edit} alt="Редагувати" onClick={(() => { handleEditChange("phone1") })} />
                            }
                        </div>
                    </div>
                    <div className="case-info-card">
                        <span>
                            <div className="case-info-card-img">
                                <img src={phoneImg} alt="" />
                            </div>
                            <div className="case-info-card-text">
                                {state.phone2.edit ?
                                    <Input type="number" value={state.phone2.value} onChange={(e) => { handleDataChange("phone2", e.target.value, "general") }} />
                                    :
                                    <span><p title="Номер телефону 2"><a href={`tel:${state.phone2.value}`}>{state.phone2.value}</a></p></span>
                                }
                            </div>
                        </span>
                        <div className="case-info-card-img" >
                            {state.phone2.edit ? <img src={save} alt="Зберегти" onClick={() => { saveHandler("phone2", state.phone2.value, "general") }} />
                                :
                                <img src={edit} alt="Редагувати" onClick={(() => { handleEditChange("phone2") })} />
                            }
                        </div>
                    </div>
                    <div className="case-info-card">
                        <span>
                            <div className="case-info-card-img">
                                <img src={emailImg} alt="" />
                            </div>
                            <div className="case-info-card-text">
                                {state.email.edit ?
                                    <Input type="text" value={state.email.value} onChange={(e) => { handleDataChange("email", e.target.value) }} />
                                    :
                                    <span><p title="Пошта"><a href={`tel:${state.email.value}`}>{state.email.value}</a></p></span>
                                }
                            </div>
                        </span>
                        <div className="case-info-card-img" >
                            {state.email.edit ? <img src={save} alt="Зберегти" onClick={() => { saveHandler("email", state.phone2.value, "general") }} />
                                :
                                <img src={edit} alt="Редагувати" onClick={(() => { handleEditChange("email") })} />
                            }
                        </div>
                    </div>
                    <div className="case-info-card">
                        <span>
                            <div className="case-info-card-img">
                                <img src={addressImg} alt="" />
                            </div>
                            <div className="case-info-card-text">
                                {state.address_live.edit ?
                                    <Input type="text" value={state.address_live.value} onChange={(e) => { handleDataChange("address_live", e.target.value) }} />
                                    :
                                    <span><p title="Адреса"><a href={`tel:${state.address_live.value}`}>{state.address_live.value}</a></p></span>
                                }
                            </div>
                        </span>
                        <div className="case-info-card-img" >
                            {state.address_live.edit ? <img src={save} alt="Зберегти" onClick={() => { saveHandler("address_live", state.address_live.value, "data") }} />
                                :
                                <img src={edit} alt="Редагувати" onClick={(() => { handleEditChange("address_live") })} />
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="case-info-right">
                <div className="case-info-right-card">
                    <span>
                        <div className="case-info-card-img">
                            <img src={dateCreatedImg} alt="" />
                        </div>
                        <div className="case-info-card-text">
                            <span>Дата створення</span>
                            <p>{info.general.date_created}</p>
                        </div>
                    </span>
                </div>
                <div className="case-info-right-card">
                    <span>
                        <div className="case-info-card-img">
                            <img src={contractImg} alt="" />
                        </div>
                        <div className="case-info-card-text">
                            <span>Договір</span>
                            {state.contract.edit ?
                                <div className="case-info-card-contract">
                                    <Input type="date" value={state.contract.date} onChange={(e) => { handleContractChange("date", e.target.value) }} />
                                    <p>№</p>
                                    <Input type="number" value={state.contract.number} onChange={(e) => { handleContractChange("number", e.target.value) }} />
                                </div>
                                :
                                <div>
                                    <p>{state.contract.date} № {state.contract.number}</p>
                                </div>
                            }
                        </div>
                    </span>
                    <div className="case-info-card-img" >
                        {state.contract.edit ? <img src={save} alt="Зберегти" onClick={() => { saveHandler("contract", state.contract, "data") }} />
                            :
                            <img src={edit} alt="Редагувати" onClick={(() => { handleEditChange("contract") })} />
                        }
                    </div>
                </div>
                <div className="case-info-right-card">
                    <span>
                        <div className="case-info-card-img">
                            <img src={channelImg} alt="" />
                        </div>
                        <div className="case-info-card-text">
                            <span>Канал комунікації</span>
                            {state.channel.edit ?
                                <Input type="text" value={state.channel.value} onChange={(e) => { handleDataChange("channel", e.target.value) }} />
                                :
                                <p title="Адреса">{info.data.channel}</p>
                            }
                        </div>
                    </span>
                    <div className="case-info-card-img" >
                        {state.channel.edit ? <img src={save} alt="Зберегти" onClick={() => { saveHandler("channel", state.channel.value, "data") }} />
                            :
                            <img src={edit} alt="Редагувати" onClick={(() => { handleEditChange("channel") })} />
                        }
                    </div>
                </div>
                <div className="case-info-right-card">
                    <span>
                        <div className="case-info-card-img">
                            <img src={categoriesImg} alt="" />
                        </div>
                        <div className="case-info-card-text">
                            <span>Категорії</span>
                            {categories && info.data.categories && info.data.categories.map((item, index) => {
                                let option = categories[item]
                                return (
                                    <p key={index}>{option.text}</p>
                                )
                            })}
                            {/* <CheckboxForm allMas={categories} checkedMas={info.categories} onChange={(value)=>{handleCheckboxChange(value)}}/> */}
                        </div>
                    </span>
                    <div className="case-info-card-img" >
                        {state.categories.edit ? <img src={save} alt="Зберегти" onClick={() => { saveHandler("categories", state.categories.value, "data") }} />
                            :
                            <img src={edit} alt="Редагувати" onClick={(() => { handleEditChange("categories") })} />
                        }
                    </div>
                </div>
            </div>
            {alert && <SmallNotification isSuccess={true} text={"Дані збережено успішно"} close={() => {
                setAlert(false);
                console.log(alert);
            }} />}
        </div>

    )
}

export default CaseShortInfo;