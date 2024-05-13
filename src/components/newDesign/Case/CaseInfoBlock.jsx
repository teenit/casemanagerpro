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
import { NavLink } from "react-router-dom";
import { Edit, Email, MailOutline } from "@mui/icons-material";
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useSelector } from "react-redux";
import CheckboxListAccess from "../../elements/CheckBoxes/CheckboxListAccess";
import NotificationsIcon from '@mui/icons-material/Notifications';
import AssignmentIcon from '@mui/icons-material/Assignment';
const ICONS = {
    phone: PhoneAndroidIcon,
    social: socialImg,
    giving: givingImg,
    email: emailImg,
    address: addressImg,
    date: dateImg,
    dateCreated: dateCreatedImg,
    categories: categoriesImg,
    channel: channelImg,
    contract: contractImg,
    edit: edit,
    save: save,
}

const Icons = ({ icon }) => {
    let ico = "";
    switch (icon) {
        case "phone":
            ico = <PhoneAndroidIcon />
            break;
        case "email":
            ico = <MailOutline />
            break;
        case "location":
            ico = <LocationOnIcon />
            break;
        case "channel":
            ico = <NotificationsIcon />
            break;
        case "contract_date":
            ico = <AssignmentIcon />
            break;
        case "contract_number":
            ico = <AssignmentIcon />
            break;
    }
    return (
        <>
            {
                ico
            }
        </>
    )
}

const CaseInfoBlock = ({ info, changeGeneral, changeData }) => {
    const categories = useSelector(state => state.categories.case);
    const [checkedMas, setCheckedMas] = useState([])
    const [alert, setAlert] = useState(null)
    // State for data
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
        setCheckedMas([...info.data.categories])
    }, [info])
    // State for edit status
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
                    {icon && <Icons icon={icon} />}

                    <div className="case-info-card-text">

                        <div title={title}>
                            {link ? <NavLink to={link}>{label}</NavLink> : label}
                        </div>

                    </div>
                    {!disabled && <Edit className="edit-icon" onClick={() => { setShowEdit(true) }} />}
                </div>}
                {showEdit && <div className="InputBlock-editer">
                    <div className="InputBlock-editer-withicon">
                        {icon && <Icons icon={icon} />}
                        <Input type={inputType} value={stateValue} onChange={(e) => {
                            setStateValue(e.target.value)
                        }} />
                    </div>

                    <div>
                        <CheckIcon onClick={() => { saveHandler(stateValue) }} />
                        <CloseIcon onClick={() => { setShowEdit(false) }} />
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
                        // onChange={(e) => { handleDataChange("phone1", e.target.value) }}
                        title={info.general.name}
                        addClass="title"
                        disabled={true}
                        label={<>
                            {info.general.name} <span style={{ color: "var(--main-color)" }}>№{info.general.id}</span>
                        </>}
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
                <div className="case-info-right-card">
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
                <div className="case-info-right-card">
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


                <div className="case-info-right-card">
                    <span>
                        <div className="case-info-card-img">
                            <img src={categoriesImg} alt="" />
                        </div>
                        <div className="case-info-card-text">
                            <span>Категорії</span>
                            {!editState.categories ?
                                (categories && categories.length > 0 && info.data.categories && info.data.categories.length > 0 && categories.map((item, index) => {
                                    if (info.data.categories.indexOf(item.id) !== -1) return <div className="cat">
                                        <div className="cat-color" style={{backgroundColor:item.color}}></div>
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
                        <div className="case-info-card-img" >
                            {editState.categories ?
                                <>
                                    <CheckIcon onClick={() => { saveHandler("categories", dataState.categories, "data") }} />
                                    <CloseIcon onClick={() => { handleEditChange("categories") }} />
                                </>

                                :
                                <>
                                    <Edit className="edit-icon" onClick={() => { handleEditChange("categories") }} />
                                </>
                            }
                        </div>
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