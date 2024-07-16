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
import ProfilePhotoBlock from "../../blocks/ProfilePhotoBlock";

const CaseInfoBlock = ({ case_id, info, changeGeneral, changeData, getCaseInfo, profileImg }) => {
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
        setDataState(prevState => ({ ...prevState, [key]: val }));
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


    const selectOptions = [
        { value: "male", label: LANG.selects.sex.male },
        { value: "female", label: LANG.selects.sex.female },
        { value: "other", label: LANG.selects.sex.other }]

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
                                        label={LANG.case_data.first_name}
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
                    <ProfilePhotoBlock profileImg={profileImg} meta={{
                        key: "case_profile_img",
                        case_id: case_id,
                        type: "case"
                    }}/>
                )}
                <div className="CaseInfoBlock-column">
                    {(info.viewInfo.view_phone) && <div className="CaseInfoBlock-line">
                        {/* <CaseInfoNameBlock title={LANG.case_data.phone} /> */}
                        <InputBlock
                            value={dataState.phone1}
                            onChange={(e) => { handleDataChange("phone1", e.target.value) }}
                            link={`tel:${dataState.phone1}`}
                            icon={"phone"}
                            label={dataState.phone1}
                            inputType={"number"}
                            saveHandler={(val) => saveHandler("phone1", val, "general")}
                            titleDefault={LANG.case_data.phone}
                        />
                    </div>}
                    {(info.viewInfo.view_phone) && <div className="CaseInfoBlock-line">
                        {/* <span>{LANG.case_data.phone}</span> */}
                        <InputBlock
                            value={dataState.phone2}
                            onChange={(e) => { handleDataChange("phone2", e.target.value) }}
                            link={`tel:${dataState.phone2}`}
                            icon={"phone"}
                            label={dataState.phone2}
                            inputType={"number"}
                            saveHandler={(val) => saveHandler("phone2", val, "general")}
                            titleDefault={LANG.case_data.phone}
                        />
                    </div>}
                    {(info.viewInfo.view_email) && <div className="CaseInfoBlock-line">
                        {/* <span>{LANG.case_data.email}</span> */}
                        <InputBlock
                            value={dataState.email}
                            onChange={(e) => { handleDataChange("email", e.target.value) }}
                            link={`mailto:${dataState.email}`}
                            icon={"email"}
                            label={dataState.email}
                            inputType={"text"}
                            saveHandler={(val) => saveHandler("email", val, "general")}
                            titleDefault={LANG.case_data.email}
                        />
                    </div>}
                    {(info.viewInfo.view_birthday) && <div className="CaseInfoBlock-line">
                        {/* <span>{LANG.case_data.birthday}</span> */}
                        <InputBlock
                            value={dataState.happy_bd}
                            age={true}
                            onChange={(e) => { handleDataChange("happy_bd", e.target.value) }}
                            icon={"birthday"}
                            label={dataState.happy_bd}
                            inputType={"date"}
                            saveHandler={(val) => saveHandler("happy_bd", val, "general")}
                            titleDefault={LANG.case_data.birthday}
                        />
                    </div>}
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

                </div>
                <div className="CaseInfoBlock-column">
                    {(info.viewInfo.view_address) && <div className="CaseInfoBlock-line">
                        {/* <span>{LANG.case_data.address_live}</span> */}
                        <InputBlock
                            value={dataState.address_live}
                            onChange={(e) => { handleDataChange("address_live", e.target.value) }}
                            icon={"location"}
                            label={dataState.address_live}
                            inputType={"text"}
                            saveHandler={(val) => saveHandler("address_live", val, "data")}
                            titleDefault={LANG.case_data.address_live}
                        />
                    </div>}
                    {(info.viewInfo.view_address) && <div className="CaseInfoBlock-line">
                        {/* <span>{LANG.case_data.address_registered}</span> */}
                        <InputBlock
                            value={dataState.address_registered}
                            onChange={(e) => { handleDataChange("address_registered", e.target.value) }}
                            icon={"location"}
                            label={dataState.address_registered}
                            inputType={"text"}
                            saveHandler={(val) => saveHandler("address_registered", val, "data")}
                            titleDefault={LANG.case_data.address_registered}
                        />
                    </div>}

                </div>

                {alert && <SmallNotification isSuccess={true} text={"Дані збережено успішно"} close={() => setAlert(false)} />}
            </div>
        </div>
    );
};

export default CaseInfoBlock;
