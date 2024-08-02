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
import CheckboxForm from "../../Cases/newDesign/CheckboxForm"

const ICONS = {
    phone:phoneImg,
    social:socialImg,
    giving:givingImg,
    email: emailImg,
    address: addressImg,
    date: dateImg,
    dateCreated: dateCreatedImg,
    categories: categoriesImg,
    channel: channelImg,
    contact: contractImg,
    edit: edit,
    save: save,
}

const CaseShortInfo = ({ info, changeGeneral, changeData }) => {
    const [categories, setCategories] = useState(null)
    const [alert, setAlert] = useState(null)
    // State for data
    const [dataState, setDataState] = useState({
        phone1: info.general.phone1,
        phone2: info.general.phone2,
        email: info.general.email,
        address_live: info.data.address_live,
        date_created: info.general.date_created,
        contract: {
            date: info.data.contract_date,
            number: info.data.contract_number
        },
        channel: info.data.channel,
        categories: info.data.categories
    });
    useEffect(()=>{
        setDataState({
            phone1: info.general.phone1,
            phone2: info.general.phone2,
            email: info.general.email,
            address_live: info.data.address_live,
            date_created: info.general.date_created,
            contract: {
                date: info.data.contract_date,
                number: info.data.contract_number
            },
            channel: info.data.channel,
            categories: info.data.categories
        });
    },[info])
    // State for edit status
    const [editState, setEditState] = useState({
        phone1: false,
        phone2: false,
        email: false,
        address_live: false,
        date_created: false,
        contract: false,
        channel: false,
        categories: false
    });

    const handleDataChange = (key, val) => {
        setDataState(prevState => ({ ...prevState, [key]: val }));
    };

    const handleEditChange = (key) => {
        setEditState(prevState => ({ ...prevState, [key]: !prevState[key] }));
    };

    const handleContractChange = (key, val) => {
        setDataState(prevState => ({
            ...prevState,
            contract: {
                ...prevState.contract,
                [key]: val
            }
        }));
    };

    const saveHandler = (key, value, type) => {
        const originalValue = type === "general" ? info.general[key] : info.data[key];
        if (originalValue !== value) {
            if (type === "general") {
                changeGeneral(key, value);
            } else if (type === "data") {
                if (key !== "contract") {
                    changeData(key, value);
                } else {
                    changeData(key, { date: value.date, number: value.number });
                }
            }
            handleEditChange(key);
            setAlert(true);
        } else {
            handleEditChange(key);
        }
    };

    const handleCheckboxChange = (val) => {
        let categories = val.map(item => item.id);
        setDataState(prevState => ({
            ...prevState,
            categories: categories
        }));
    };


    useEffect(() => {
        apiResponse({}, "manage/get-categories-case.php").then((res) => {
            setCategories([...res.mas]);
        });
    }, []);

    const InputBlock = ({value = "", onChange, link = null, title="", icon = null}) => {
        return (
            <div className="InputBlock">
                 <span>
                        {icon && <div className="case-info-card-img">
                            <img src={icon} alt="" />
                        </div>}
                        <div className="case-info-card-text">
                            {editState.phone1 ?
                                <Input type="number" value={value} onChange={onChange} />
                                :
                                <span>
                                    <p title={title}>
                                        {link ? <a href={link}>{value}</a>: value}
                                    </p>
                                </span>
                            }
                        </div>
                    </span>
            </div>
        )
    }

    return (
        <div className="case-info">
            <div className="case-info-inner">
                <h1>{info.general.name} <span style={{ color: "var(--main-color)" }}>№{info.general.id}</span></h1>
                <div className="case-info-inner-left-cards">
                    <div className="case-info-card">
                        <InputBlock
                            value={dataState.phone1}
                            onChange={(e) => { handleDataChange("phone1", e.target.value) }}
                            link={`tel:${dataState.phone1}`}
                            title="Номер телефону 1"
                            icon={ICONS.phone}
                        />
                        <span>
                            <div className="case-info-card-img">
                                <img src={phoneImg} alt="" />
                            </div>
                            <div className="case-info-card-text">
                                {editState.phone1 ?
                                    <Input type="number" value={dataState.phone1} onChange={(e) => { handleDataChange("phone1", e.target.value) }} />
                                    :
                                    <span><p title="Номер телефону 1"><a href={`tel:${dataState.phone1}`}>{dataState.phone1}</a></p></span>
                                }
                            </div>
                        </span>
                        <div className="case-info-card-img" >
                            {editState.phone1 ? <img src={save} alt="Зберегти" onClick={() => { saveHandler("phone1", dataState.phone1, "general") }} />
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
                                {editState.phone2 ?
                                    <Input type="number" value={dataState.phone2} onChange={(e) => { handleDataChange("phone2", e.target.value, "general") }} />
                                    :
                                    <span><p title="Номер телефону 2"><a href={`tel:${dataState.phone2}`}>{dataState.phone2}</a></p></span>
                                }
                            </div>
                        </span>
                        <div className="case-info-card-img" >
                            {editState.phone2 ? <img src={save} alt="Зберегти" onClick={() => { saveHandler("phone2", dataState.phone2, "general") }} />
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
                                {editState.email ?
                                    <Input type="text" value={dataState.email} onChange={(e) => { handleDataChange("email", e.target.value) }} />
                                    :
                                    <span><p title="Пошта"><a href={`tel:${dataState.email}`}>{dataState.email}</a></p></span>
                                }
                            </div>
                        </span>
                        <div className="case-info-card-img" >
                            {editState.email ? <img src={save} alt="Зберегти" onClick={() => { saveHandler("email", dataState.email, "general") }} />
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
                                {editState.address_live ?
                                    <Input type="text" value={dataState.address_live} onChange={(e) => { handleDataChange("address_live", e.target.value) }} />
                                    :
                                    <span><p title="Адреса"><a href={`tel:${dataState.address_live}`}>{dataState.address_live}</a></p></span>
                                }
                            </div>
                        </span>
                        <div className="case-info-card-img" >
                            {editState.address_live ? <img src={save} alt="Зберегти" onClick={() => { saveHandler("address_live", dataState.address_live, "data") }} />
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
                {(dataState.contract.date || dataState.contract.number) &&
                    <div className="case-info-right-card">
                        <span>
                            <div className="case-info-card-img">
                                <img src={contractImg} alt="" />
                            </div>
                            <div className="case-info-card-text">
                                <span>Договір</span>
                                {editState.contract ?
                                    <div className="case-info-card-contract">
                                        <Input type="date" value={dataState.contract.date} onChange={(e) => { handleContractChange("date", e.target.value) }} />
                                        <p>№</p>
                                        <Input type="number" value={dataState.contract.number} onChange={(e) => { handleContractChange("number", e.target.value) }} />
                                    </div>
                                    :
                                    <div>
                                        <p>{dataState.contract.date} № {dataState.contract.number}</p>
                                    </div>
                                }
                            </div>
                        </span>
                        <div className="case-info-card-img" >
                            {editState.contract ? <img src={save} alt="Зберегти" onClick={() => { saveHandler("contract", dataState.contract.date, "data") }} />
                                :
                                <img src={edit} alt="Редагувати" onClick={(() => { handleEditChange("contract") })} />
                            }
                        </div>
                    </div>
                }
                {dataState.channel && <div className="case-info-right-card">
                    <span>
                        <div className="case-info-card-img">
                            <img src={channelImg} alt="" />
                        </div>
                        <div className="case-info-card-text">
                            <span>Канал комунікації</span>
                            {editState.channel ?
                                <Input type="text" value={dataState.channel} onChange={(e) => { handleDataChange("channel", e.target.value) }} />
                                :
                                <p title="Адреса">{dataState.channel}</p>
                            }
                        </div>
                    </span>
                    <div className="case-info-card-img" >
                        {editState.channel ? <img src={save} alt="Зберегти" onClick={() => { saveHandler("channel", dataState.channel, "data") }} />
                            :
                            <img src={edit} alt="Редагувати" onClick={(() => { handleEditChange("channel") })} />
                        }
                    </div>
                </div>}

                <div className="case-info-right-card">
                    <span>
                        <div className="case-info-card-img">
                            <img src={categoriesImg} alt="" />
                        </div>
                        <div className="case-info-card-text">
                            <span>Категорії</span>
                            {!editState.categories ?
                                (categories && categories.length > 0 && info.data.categories && info.data.categories.length > 0 && info.data.categories.map((item, index) => {
                                    let option = categories[item];
                                    return (
                                        <p key={index}>{option.text}</p>
                                    );
                                }))
                                :
                                (<CheckboxForm allMas={categories} checkedMas={info.data.categories} onChange={(value) => { handleCheckboxChange(value) }} />)
                            }



                        </div>
                    </span>
                    <div className="case-info-card-img" >
                        {editState.categories ? <img src={save} alt="Зберегти" onClick={() => { saveHandler("categories", dataState.categories, "data") }} />
                            :
                            <img src={edit} alt="Редагувати" onClick={(() => { handleEditChange("categories") })} />
                        }
                    </div>
                </div>
            </div>
            {alert && <SmallNotification isSuccess={true} text={"Дані збережено успішно"} close={() => {
                setAlert(false);
            }} />}
        </div>

    )
}

export default CaseShortInfo;