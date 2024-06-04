import React, { useEffect, useState } from "react";
import { apiResponse } from "../../Functions/get_apiObj"
import SmallNotification from "../../elements/Notifications/SmallNotification";
import Input from "../../elements/Inputs/Input";
import { NavLink } from "react-router-dom";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from "react-redux";
import CheckboxListAccess from "../../elements/CheckBoxes/CheckboxListAccess";
import Icon from "../../elements/Icons/Icon";
const CaseInfoBlock = ({ info, changeGeneral, changeData }) => {
    const categories = useSelector(state => state.categories.case);
    const [checkedMas, setCheckedMas] = useState([])
    const [alert, setAlert] = useState(null)
    const [dataState, setDataState] = useState({
        phone1: info.general.phone1,
        phone2: info.general.phone2,
        email: info.general.email,
        address_live: info.data.address_live,
        address_registered: info.data.address_registered,
        date_created: info.general.date_created,
        contract_date: info.data.contract_date,
        contract_number: info.data.contract_number,
        channel: info.data.channel,
        categories: info.data.categories
    });
    useEffect(() => {
        setDataState({
            phone1: info.general.phone1,
            phone2: info.general.phone2,
            email: info.general.email,
            address_live: info.data.address_live,
            address_registered: info.data.address_registered,
            date_created: info.general.date_created,
            contract_date: info.data.contract_date,
            contract_number: info.data.contract_number,
            channel: info.data.channel,
            categories: info.data.categories
        });
        if (info.data.categories) setCheckedMas([...info.data.categories])
        
    }, [info])
    const [editState, setEditState] = useState({
        phone1: false,
        phone2: false,
        email: false,
        address_live: false,
        address_registered: false,
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
    

    const saveHandler = (key, value, type) => {
        const originalValue = type === "general" ? info.general[key] : info.data[key];
        console.log(originalValue)
        if (originalValue !== value) {
            if (type === "general") {
                changeGeneral(key, value);
            } else if (type === "data") {
                changeData(key, value);
            }
            handleEditChange(key);
            setAlert(true);
        } else {
            handleEditChange(key);
        }
    };

    const handleCheckboxChange = (value, options) => {
        let categories = [];
        if (options.includes(value)) {
            categories = options.filter(element => element !== value);

        } else {
            categories = [...options, value];
        }
        setCheckedMas([...categories]);
        setDataState({ ...dataState, categories: [...categories] });
    };

    const InputBlock = ({ saveHandler, disabled = false, inputType = "text", value = "", onChange, link = null, title = "", icon = null, label = "" }) => {
        const [showEdit, setShowEdit] = useState(false)
        const [stateValue, setStateValue] = useState(value)
        return (
            <div className="InputBlock">
                {!showEdit && <div className="InputBlock-default">
                    {icon && <Icon icon={icon} addClass={"default-icon"} />}

                    <div className="case-info-card-text">

                        <div title={title}>
                            {link ? <NavLink to={link}>{label}</NavLink> : label}
                        </div>

                    </div>
                    {!disabled && <div className="edit-icon" onClick={() => { setShowEdit(true) }}>
                        <Icon icon={"edit"} addClass={"default-icon"} />
                    </div>}
                </div>}
                {showEdit && <div className="InputBlock-editer">
                    <div className="InputBlock-editer-withicon">
                        {icon && <Icon icon={icon} addClass={"default-icon"} />}
                        <Input type={inputType} value={stateValue} onChange={(e) => {
                            setStateValue(e.target.value)
                        }} />
                    </div>

                    <div>
                        <span onClick={() => { setShowEdit(false) }} >
                            <Icon icon={"close"} addClass={"close-icon"} />
                        </span>
                        <span onClick={() => { saveHandler(stateValue) }} >
                            <Icon icon={"save"} addClass={"save-icon"} />
                        </span>
                    </div>
                </div>

                }
            </div>
        )
    }

    return (
        <div className="CaseInfoBlock">
            <div className="CaseInfoBlock-inner">
                <div className="CaseInfoBlock-line">
                    <InputBlock
                        value={info.general.name}
                        title={info.general.name}
                        addClass="title"
                        disabled={true}
                        label={<div className="CaseInfoBlock-line-title">
                            {info.general.name} <span style={{ color: "var(--main-color)" }}>№{info.general.id}</span>
                        </div>}
                    />
                </div>
                <div className="CaseInfoBlock-line">
                    <span>Номер телефону</span>
                    <InputBlock
                        value={dataState.phone1}
                        onChange={(e) => { handleDataChange("phone1", e.target.value) }}
                        link={`tel:${dataState.phone1}`}
                        title="Номер телефону 1"
                        icon={"phone"}
                        label={dataState.phone1}
                        inputType={"number"}
                        saveHandler={(val) => saveHandler("phone1", val, "general")}
                    />
                </div>
                <div className="CaseInfoBlock-line">
                    <span>Номер телефону</span>
                    <InputBlock
                        value={dataState.phone2}
                        onChange={(e) => { handleDataChange("phone2", e.target.value) }}
                        link={`tel:${dataState.phone2}`}
                        title="Номер телефону 2"
                        icon={"phone"}
                        label={dataState.phone2}
                        inputType={"number"}
                        saveHandler={(val) => saveHandler("phone2", val, "general")}
                    />
                </div>
                <div className="CaseInfoBlock-line">
                    <span>Поштова адреса</span>
                    <InputBlock
                        value={dataState.email}
                        onChange={(e) => { handleDataChange("email", e.target.value) }}
                        link={`mailto:${dataState.email}`}
                        title="Email"
                        icon={"email"}
                        label={dataState.email}
                        inputType={"text"}
                        saveHandler={(val) => saveHandler("email", val, "general")}
                    />
                </div>
                <div className="CaseInfoBlock-line">
                    <span>Адреса проживання</span>
                    <InputBlock
                        value={dataState.address_live}
                        onChange={(e) => { handleDataChange("address_live", e.target.value) }}
                        title="Адреса проживання"
                        icon={"location"}
                        label={dataState.address_live}
                        inputType={"text"}
                        saveHandler={(val) => saveHandler("address_live", val, "data")}
                    />
                </div>
                <div className="CaseInfoBlock-line">
                    <span>Адреса реєстрації</span>
                    <InputBlock
                        value={dataState.address_registered}
                        onChange={(e) => { handleDataChange("address_registered", e.target.value) }}
                        title="Адреса реєстрації"
                        icon={"location"}
                        label={dataState.address_registered}
                        inputType={"text"}
                        saveHandler={(val) => saveHandler("address_registered", val, "data")}
                    />
                </div>
            </div>
            <div className="case-info-right">
                <div className="CaseInfoBlock-line">
                    <span>Дата створення</span>
                    <InputBlock
                        value={dataState.date_created}
                        title="Дата створення кейсу"
                        icon={"date_created"}
                        label={dataState.date_created}
                        disabled={true}
                    />
                </div>
                <div className="CaseInfoBlock-line">
                    <span>Дата укладання договіру</span>
                    <InputBlock
                        value={dataState.contract_date}
                        onChange={(e) => { handleDataChange("contract_date", e.target.value) }}
                        title="Дата створення контракту"
                        icon={"contract_date"}
                        label={dataState.contract_date}
                        inputType={"date"}
                        saveHandler={(val) => saveHandler("contract_date", val, "data")}
                    />
                </div>
                <div className="CaseInfoBlock-line">
                    <span>Номер договіру</span>
                    <InputBlock
                        value={dataState.contract_number}
                        onChange={(e) => { handleDataChange("contract_number", e.target.value) }}
                        title="Номер контракту"
                        icon={"contract_number"}
                        label={dataState.contract_number}
                        inputType={"number"}
                        saveHandler={(val) => saveHandler("contract_number", val, "data")}
                    />
                </div>
                <div className="CaseInfoBlock-line">
                    <span>Канал комунікації</span>
                    <InputBlock
                        value={dataState.channel}
                        onChange={(e) => { handleDataChange("channel", e.target.value) }}
                        title="Канал комунікації"
                        icon={"channel"}
                        label={dataState.channel}
                        inputType={"text"}
                        saveHandler={(val) => saveHandler("channel", val, "data")}
                    />
                </div>


                <div className="CaseInfoBlock-categories">
                    <span className="CaseInfoBlock-categories-title">Категорії</span>
                    <span className="CaseInfoBlock-categories-content">
                        <Icon icon="categories" addClass={"default-icon"}/>
                        <div className="case-info-card-text">

                            {!editState.categories ?
                                (categories && categories.length > 0 && info.data.categories && info.data.categories.length > 0 && categories.map((item, index) => {
                                    if (info.data.categories.indexOf(item.id) !== -1) return <div className="cat" key={index}>
                                        <div className="cat-color" style={{ backgroundColor: item.color }}></div>
                                        <div className="cat-text"><span key={item.id}> {item.name} </span></div>
                                    </div>

                                }))
                                :
                                <CheckboxListAccess
                                    allMas={() => { return categories }}
                                    checkedMas={checkedMas}
                                    onChange={(value) => {
                                        handleCheckboxChange(value, checkedMas)
                                    }}
                                />
                            }
                        </div>
                        {editState.categories ?
                            <>
                            <span onClick={() => { saveHandler("categories", dataState.categories, "data") }}>
                                <Icon icon={"save"} addClass={"save-icon"} />
                            </span>
                            <span onClick={() => { handleEditChange("categories") }}>
                                <Icon icon={"close"} addClass={"close-icon"} />
                            </span>
                            </>

                            :
                            <div className="edit-icon" onClick={() => { handleEditChange("categories") }}>
                                <Icon icon="edit" addClass="default-icon" />
                            </div>
                        }
                    </span>

                </div>
            </div>
            {alert && <SmallNotification isSuccess={true} text={"Дані збережено успішно"} close={() => {
                setAlert(false);
            }} />}
        </div>

    )
}

export default CaseInfoBlock;