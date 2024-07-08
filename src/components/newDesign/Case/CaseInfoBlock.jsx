import React, { useEffect, useState } from "react";
import { apiResponse } from "../../Functions/get_apiObj";
import SmallNotification from "../../elements/Notifications/SmallNotification";
import Input from "../../elements/Inputs/Input";
import { useSelector } from "react-redux";
import Icon from "../../elements/Icons/Icon";
import { LANG } from "../../../services/config";
import InputBlock from "../../elements/Inputs/InputBlock";
import CaseProfilePhoto from "./CaseProfilePhoto";
import CaseInfoNameBlock from "./CaseInfoNameBlock";
import SelectBlock from "../../elements/Selects/SelectBlock";

const CaseInfoBlock = ({ case_id, info, changeGeneral, changeData, getCaseInfo, profileImg }) => {
    const categories = useSelector(state => state.categories.case);
    const [checkedMas, setCheckedMas] = useState([]);
    const [userNames, setUserNames] = useState(null);
    const [alert, setAlert] = useState(null);
    const [editName, setEditName] = useState(false);
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
        if (key === "responsible_id") {
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

    const changeName = () => {
        apiResponse({
            case_id: case_id,
            first_name: dataState.first_name,
            last_name: dataState.last_name,
            middle_name: dataState.middle_name,
        }, "case/update-case-name.php").then((res) => {
            setAlert(true);
            getCaseInfo();
            setEditName(false);
        });
    };

    const howOldIsCase = (birthday) => {
        if (!birthday) return "";

        const birthDate = new Date(birthday);
        const today = new Date();
        let ageYears = today.getFullYear() - birthDate.getFullYear();
        const isBirthdayPassed = (
            today.getMonth() > birthDate.getMonth() ||
            (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate())
        );
        if (!isBirthdayPassed) {
            ageYears--;
        }

        return `, ${ageYears} років`;
    };
    const selectOptions = [
        {value:"male", label:LANG.selects.sex.male},
        {value:"female", label:LANG.selects.sex.female},
        {value:"other", label:LANG.selects.sex.other}]
    const infoBlocks = [
        { view: info.viewInfo.view_phone, key: "phone1", icon: "phone", type: "number", title: LANG.case_data.phone, typeData: "general" },
        { view: info.viewInfo.view_phone, key: "phone2", icon: "phone", type: "number", title: LANG.case_data.phone, typeData: "general" },
        { view: info.viewInfo.view_email, key: "email", icon: "email", type: "text", title: LANG.case_data.email, typeData: "general" },
        { view: info.viewInfo.view_birthday, key: "happy_bd", icon: "birthday", type: "date", title: LANG.case_data.birthday, typeData: "general" },
        { view: info.viewInfo.view_address, key: "address_live", icon: "location", type: "text", title: LANG.case_data.address_live, typeData: "data" },
        { view: info.viewInfo.view_address, key: "address_registered", icon: "location", type: "text", title: LANG.case_data.address_registered, typeData: "data" },
    ];

    return (
        <div className="CaseInfoBlock-name-item">
            <div className="name-item">
                <div className="CaseInfoBlock-inner">
                    {(info.viewInfo.view_name) && (
                        <div className="InputBlock">
                            {!editName && (
                                <div className="InputBlock-default">
                                    <div className="CaseInfoBlock-line-title">
                                        {info.general.name} <span style={{ color: "var(--main-color)" }}>№{info.general.id}</span>
                                    </div>
                                    <div>
                                        <div className="edit-icon" onClick={() => setEditName(true)}>
                                            <Icon icon={"edit"} addClass={"default-icon"} />
                                        </div>
                                    </div>
                                </div>
                            )}
                            {editName && (
                                <div className="InputBlock-pib">
                                    <Input
                                        type="text"
                                        label={LANG.case_data.name}
                                        value={dataState.first_name}
                                        onChange={(e) => setDataState({ ...dataState, first_name: e.target.value.trim() })}
                                    />
                                    <Input
                                        type="text"
                                        label={LANG.case_data.last_name}
                                        value={dataState.last_name}
                                        onChange={(e) => setDataState({ ...dataState, last_name: e.target.value.trim() })}
                                    />
                                    <Input
                                        type="text"
                                        label={LANG.case_data.middle_name}
                                        value={dataState.middle_name}
                                        onChange={(e) => setDataState({ ...dataState, middle_name: e.target.value.trim() })}
                                    />
                                    <div className="InputBlock-editer-icons">
                                        <span onClick={() => changeName()}>
                                            <Icon icon={"save"} addClass={"save-icon"} />
                                        </span>
                                        <span onClick={() => setEditName(false)}>
                                            <Icon icon={"close"} addClass={"close-icon"} />
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <div className="CaseInfoBlock">
                {info.viewInfo.view_ProfilePhoto && (
                    <CaseProfilePhoto profileImg={profileImg} getCaseInfo={getCaseInfo} case_id={case_id} />
                )}
                <div className="CaseInfoBlock-column">
                    {infoBlocks.map((item, index) => (
                        item.view && (
                            <div key={index} className="CaseInfoBlock-line">
                                {/* <CaseInfoNameBlock title={item.title}/> */}
                                <InputBlock
                                    value={dataState[item.key]}
                                    onChange={(e) => handleDataChange(item.key, e.target.value)}
                                    link={item.type === "number" ? `tel:${dataState[item.key]}` : item.type === "email" ? `mailto:${dataState[item.key]}` : undefined}
                                    icon={item.icon}
                                    label={dataState[item.key]}
                                    inputType={item.type}
                                    saveHandler={(val) => saveHandler(item.key, val, item.typeData)}
                                    titleDefault={item.title}
                                />
                            </div>
                        )
                    ))}
                </div>
                {info.viewInfo.view_sex && (
                    <div className="CaseInfoBlock-column">
                        <div className="CaseInfoBlock-line">
                            <SelectBlock
                                value={dataState.sex}
                                onChange={(e) => handleDataChange("sex", e.target.value)}
                                icon={"sex"}
                                label={LANG.selects.sex[dataState.sex]}
                                saveHandler={(val, displayVal) => saveHandler("sex", val, "general", displayVal)}
                                titleDefault={LANG.case_data.sex}
                                selectOptions={selectOptions}
                            />
                        </div>
                    </div>
                )}
                {alert && (
                    <SmallNotification isSuccess={true} text={"Дані збережено успішно"} close={() => setAlert(false)} />
                )}
            </div>
        </div>
    );
};

export default CaseInfoBlock;
