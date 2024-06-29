import React, { useEffect, useState } from "react";
import { apiResponse } from "../../Functions/get_apiObj"
import SmallNotification from "../../elements/Notifications/SmallNotification";
import Input from "../../elements/Inputs/Input";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import CheckboxListAccess from "../../elements/CheckBoxes/CheckboxListAccess";
import Icon from "../../elements/Icons/Icon";
import { MenuItem, Select } from "@mui/material";
import { LANG } from "../../../services/config";
const CaseInfoBlock = ({ case_id, info, changeGeneral, changeData, getCaseInfo }) => {
    const categories = useSelector(state => state.categories.case);
    const [checkedMas, setCheckedMas] = useState([])
    const [userNames, setUserNames] = useState(null)
    const [alert, setAlert] = useState(null)
    const [editName, setEditName] = useState(false)
    const [dataState, setDataState] = useState({
        phone1: info.general.phone1,
        phone2: info.general.phone2,
        happy_bd: info.general.happy_bd,
        email: info.general.email,
        responsible_id: info.general.responsible_id,
        address_live: info.data.address_live,
        address_registered: info.data.address_registered,
        date_created: info.general.date_created,
        contract_date: info.data.contract_date,
        contract_number: info.data.contract_number,
        channel: info.data.channel,
        categories: info.data.categories,
        responsible_id: info.general.responsible_id,
        responsible_name: info.general.responsible_name,
        name: info.general.name,
        first_name: info.general.first_name,
        middle_name: info.general.middle_name,
        last_name: info.general.last_name,
        sex: info.general.sex
    });
    useEffect(() => {
        setDataState({
            phone1: info.general.phone1,
            phone2: info.general.phone2,
            happy_bd: info.general.happy_bd === "0000-00-00" ? "" : info.general.happy_bd,
            email: info.general.email,
            address_live: info.data.address_live,
            address_registered: info.data.address_registered,
            date_created: info.general.date_created,
            contract_date: info.data.contract_date,
            contract_number: info.data.contract_number,
            channel: info.data.channel,
            categories: info.data.categories,
            responsible_id: info.general.responsible_id,
            responsible_name: info.general.responsible_name,
            name: info.general.name,
            first_name: info.general.first_name,
            middle_name: info.general.middle_name,
            last_name: info.general.last_name,
            sex: info.general.sex
        });
        apiResponse({}, "user/get-all-users-name.php").then((res) => {
            setUserNames(res);
        });
    }, [info]);


    const [editState, setEditState] = useState({
        phone1: false,
        phone2: false,
        happy_bd: false,
        email: false,
        address_live: false,
        address_registered: false,
        date_created: false,
        contract: false,
        channel: false,
        categories: false,
        responsible_id: false,
        sex: false
    });

    const handleDataChange = (key, val) => {

        if (key == "responsible_id") {
            setDataState(prevState => ({ ...prevState, [key]: +val }));
        } else {
            setDataState(prevState => ({ ...prevState, [key]: val }));
        }

    };

    const handleEditChange = (key) => {
        setEditState(prevState => ({ ...prevState, [key]: !prevState[key] }));
    };



    const saveHandler = (key, value, type) => {
        const originalValue = type === "general" ? info.general[key] : info.data[key];
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

    const changeName = () => {
        apiResponse({
            case_id: case_id,
            first_name: dataState.first_name,
            last_name: dataState.last_name,
            middle_name: dataState.middle_name,
        }, "case/update-case-name.php").then((res) => {
            setAlert(true)
            getCaseInfo();
            setEditName(false);
        })
    }

    const howOldIsCase = (birthday) => {
        if (!birthday) return ""
        const birthDate = new Date(birthday)
        const today = new Date()
        let ageYears = today.getFullYear() - birthDate.getFullYear()
        let ageMonths = today.getMonth() - birthDate.getMonth()
        if (ageMonths < 0 || (ageMonths === 0 && today.getDate() < birthDate.getDate())) {
            ageYears--
            ageMonths += 12
        }
        if (today.getDate() < birthDate.getDate()) {
            ageMonths--
        }

        return `, ${ageYears} років ${ageMonths} місяці`;
    };


    const InputBlock = ({ select = false, age = false, saveHandler, disabled = false, inputType = "text", value = "", onChange, link = null, title = "", icon = null, label = "" }) => {
        const [showEdit, setShowEdit] = useState(false);
        const [stateValue, setStateValue] = useState(value);

        const handleSave = () => {
            const displayValue = select ? LANG.selects.sex[stateValue] : stateValue;
            saveHandler(stateValue, displayValue);
            setShowEdit(false);
        };

        return (
            <div className="InputBlock">
                {!showEdit && (
                    <div className="InputBlock-default">
                        {icon && <Icon icon={icon} addClass={"default-icon"} />}
                        <div className="case-info-card-text">
                            <div title={title}>
                                {link ? (
                                    <NavLink to={link}>
                                        {label} {age && howOldIsCase(stateValue)}
                                    </NavLink>
                                ) : (
                                    <>
                                        {label} {age && howOldIsCase(stateValue)}
                                    </>
                                )}
                            </div>
                        </div>
                        {!disabled && (
                            <div className="edit-icon" onClick={() => { setShowEdit(true) }}>
                                <Icon icon={"edit"} addClass={"default-icon"} />
                            </div>
                        )}
                    </div>
                )}
                {showEdit && (
                    <div className="InputBlock-editer">
                        <div className="InputBlock-editer-withicon">
                            {icon && <Icon icon={icon} addClass={"default-icon"} />}
                            {select ? <Select value={stateValue} onChange={(e) => {
                                setStateValue(e.target.value);
                            }}>
                                <MenuItem value="male">{LANG.selects.sex.male}</MenuItem>
                                <MenuItem value="female">{LANG.selects.sex.female}</MenuItem>
                                <MenuItem value="other">{LANG.selects.sex.other}</MenuItem>
                            </Select>
                                : <Input label={title} type={inputType} value={stateValue} onChange={(e) => {
                                    setStateValue(e.target.value)
                                }} />}
                        </div>
                        <div className="InputBlock-editer-icons">
                            <span onClick={handleSave}>
                                <Icon icon={"save"} addClass={"save-icon"} />
                            </span>
                            <span onClick={() => { setShowEdit(false) }}>
                                <Icon icon={"close"} addClass={"close-icon"} />
                            </span>
                        </div>
                    </div>
                )}
            </div>
        );
    }


    return (
        <>
            <div className="CaseInfoBlock name-block">
                <div className="CaseInfoBlock-inner">
                    <div className="InputBlock">
                        {!editName && <div className="InputBlock-default">
                            <div className="CaseInfoBlock-line-title">
                                {info.general.name} <span style={{ color: "var(--main-color)" }}>№{info.general.id}</span>
                            </div>
                            <div>
                                <div className="edit-icon" onClick={() => { setEditName(true) }}>
                                    <Icon icon={"edit"} addClass={"default-icon"} />
                                </div>
                            </div>
                        </div>}
                        {
                            editName &&
                            <div className="InputBlock-pib">
                                <Input
                                    type="text"
                                    label={LANG.case_data.name}
                                    value={dataState.first_name}
                                    onChange={(e) => {
                                        setDataState({ ...dataState, first_name: e.target.value.trim() });
                                    }}
                                />
                                <Input
                                    type="text"
                                    label={LANG.case_data.last_name}
                                    value={dataState.last_name}
                                    onChange={(e) => {
                                        setDataState({ ...dataState, last_name: e.target.value.trim() });
                                    }}
                                />
                                <Input
                                    type="text"
                                    label={LANG.case_data.middle_name}
                                    value={dataState.middle_name}
                                    onChange={(e) => {
                                        setDataState({ ...dataState, middle_name: e.target.value.trim() });
                                    }}
                                />
                                <div className="InputBlock-editer-icons">
                                    <span onClick={() => { changeName() }} >
                                        <Icon icon={"save"} addClass={"save-icon"} />
                                    </span>
                                    <span onClick={() => { setEditName(false) }} >
                                        <Icon icon={"close"} addClass={"close-icon"} />
                                    </span>
                                </div>
                            </div>
                        }

                    </div>
                </div>
            </div>
            <div className="CaseInfoBlock">
                <div className="CaseInfoBlock-inner">
                    <div className="CaseInfoBlock-line">


                    </div>
                    <div className="CaseInfoBlock-line">
                        <span>{LANG.case_data.phone}</span>
                        <InputBlock
                            value={dataState.phone1}
                            onChange={(e) => { handleDataChange("phone1", e.target.value) }}
                            link={`tel:${dataState.phone1}`}
                            icon={"phone"}
                            label={dataState.phone1}
                            inputType={"number"}
                            saveHandler={(val) => saveHandler("phone1", val, "general")}
                        />
                    </div>
                    <div className="CaseInfoBlock-line">
                        <span>{LANG.case_data.phone}</span>
                        <InputBlock
                            value={dataState.phone2}
                            onChange={(e) => { handleDataChange("phone2", e.target.value) }}
                            link={`tel:${dataState.phone2}`}
                            icon={"phone"}
                            label={dataState.phone2}
                            inputType={"number"}
                            saveHandler={(val) => saveHandler("phone2", val, "general")}
                        />
                    </div>
                    <div className="CaseInfoBlock-line">
                        <span>{LANG.case_data.birthday}</span>
                        <InputBlock
                            value={dataState.happy_bd}
                            age={true}
                            onChange={(e) => { handleDataChange("happy_bd", e.target.value) }}
                            icon={"birthday"}
                            label={dataState.happy_bd}
                            inputType={"date"}
                            saveHandler={(val) => saveHandler("happy_bd", val, "general")}
                        />
                    </div>
                    <div className="CaseInfoBlock-line">
                        <span>{LANG.case_data.sex}</span>
                        <InputBlock
                            value={dataState.sex}
                            select={true}
                            onChange={(e) => { handleDataChange("sex", e.target.value) }}
                            icon={"sex"}
                            label={LANG.selects.sex[dataState.sex]}
                            saveHandler={(val, displayVal) => saveHandler("sex", val, "general", displayVal)}
                        />
                    </div>

                    <div className="CaseInfoBlock-line">
                        <span>{LANG.case_data.email}</span>
                        <InputBlock
                            value={dataState.email}
                            onChange={(e) => { handleDataChange("email", e.target.value) }}
                            link={`mailto:${dataState.email}`}
                            icon={"email"}
                            label={dataState.email}
                            inputType={"text"}
                            saveHandler={(val) => saveHandler("email", val, "general")}
                        />
                    </div>
                    <div className="CaseInfoBlock-line">
                        <span>{LANG.case_data.address_live}</span>
                        <InputBlock
                            value={dataState.address_live}
                            onChange={(e) => { handleDataChange("address_live", e.target.value) }}
                            icon={"location"}
                            label={dataState.address_live}
                            inputType={"text"}
                            saveHandler={(val) => saveHandler("address_live", val, "data")}
                        />
                    </div>
                    <div className="CaseInfoBlock-line">
                        <span>{LANG.case_data.address_registered}</span>
                        <InputBlock
                            value={dataState.address_registered}
                            onChange={(e) => { handleDataChange("address_registered", e.target.value) }}
                            icon={"location"}
                            label={dataState.address_registered}
                            inputType={"text"}
                            saveHandler={(val) => saveHandler("address_registered", val, "data")}
                        />
                    </div>
                </div>
                <div className="case-info-right">
                    <div className="CaseInfoBlock-line">
                        <span>{LANG.case_data.date_created}</span>
                        <InputBlock
                            value={dataState.date_created}
                            icon={"date_created"}
                            label={dataState.date_created}
                            disabled={true}
                        />
                    </div>
                    <div className="CaseInfoBlock-line">
                        <span>{LANG.case_data.contract_date}</span>
                        <InputBlock
                            value={dataState.contract_date}
                            onChange={(e) => { handleDataChange("contract_date", e.target.value) }}
                            icon={"contract_date"}
                            label={dataState.contract_date}
                            inputType={"date"}
                            saveHandler={(val) => saveHandler("contract_date", val, "data")}
                        />
                    </div>
                    <div className="CaseInfoBlock-line">
                        <span>{LANG.case_data.contract_number}</span>
                        <InputBlock
                            value={dataState.contract_number}
                            onChange={(e) => { handleDataChange("contract_number", e.target.value) }}
                            icon={"contract_number"}
                            label={dataState.contract_number}
                            inputType={"number"}
                            saveHandler={(val) => saveHandler("contract_number", val, "data")}
                        />
                    </div>
                    <div className="CaseInfoBlock-line">
                        <span>{LANG.case_data.channel}</span>
                        <InputBlock
                            value={dataState.channel}
                            onChange={(e) => { handleDataChange("channel", e.target.value) }}
                            icon={"channel"}
                            label={dataState.channel}
                            inputType={"text"}
                            saveHandler={(val) => saveHandler("channel", val, "data")}
                        />
                    </div>


                    <div className="CaseInfoBlock-categories">
                        <span className="CaseInfoBlock-categories-title">{LANG.case_data.category}</span>
                        <span className="CaseInfoBlock-categories-content">
                            <Icon icon="categories" addClass={"default-icon"} />
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
                    <div className="CaseInfoBlock-line">
                        <span>{LANG.case_data.responsible}</span>
                        <div className="CaseInfoBlock-line-select">
                            <Icon icon="categories" addClass={"default-icon"} />
                            {editState.responsible_id ? (
                                <Select
                                    value={dataState.responsible_id}
                                    onChange={(e) => {
                                        handleDataChange("responsible_id", e.target.value);
                                    }}
                                >
                                    {Object.values(userNames).map((item, index) => (
                                        <MenuItem key={index} value={item.id}>
                                            {item.userName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            ) : (
                                <div className="case-info-card-text">
                                    {userNames && userNames[dataState.responsible_id].userName}

                                </div>
                            )}
                            {editState.responsible_id ? (
                                <>
                                    <span onClick={() => { saveHandler("responsible_id", dataState.responsible_id, "general") }}>
                                        <Icon icon={"save"} addClass={"save-icon"} />
                                    </span>
                                    <span onClick={() => { handleEditChange("responsible_id") }}>
                                        <Icon icon={"close"} addClass={"close-icon"} />
                                    </span>
                                </>
                            ) : (
                                <div className="edit-icon" onClick={() => { handleEditChange("responsible_id") }}>
                                    <Icon icon="edit" addClass="default-icon" />
                                </div>
                            )}
                        </div>


                    </div>

                </div>
                {alert && <SmallNotification isSuccess={true} text={"Дані збережено успішно"} close={() => {
                    setAlert(false);
                }} />}
            </div>
        </>


    )
}

export default CaseInfoBlock;