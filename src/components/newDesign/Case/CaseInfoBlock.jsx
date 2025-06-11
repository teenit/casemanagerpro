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
import CaseName from "./CaseName";
import PersonalInfo from "./PersonalInfo";
import AccessCheck from "../../Functions/AccessCheck";

const CaseInfoBlock = ({ case_id, info, changeGeneral, changeData, getCaseInfo, profileImg, cg = false }) => {
    const [alert, setAlert] = useState(null);
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
        sex: info.general.sex,
        date_first_contact: info.data.date_first_contact
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
            sex: info.general.sex,
            date_first_contact: info.data.date_first_contact
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

    const selectOptions = [
        { value: "male", label: LANG.selects.sex.male },
        { value: "female", label: LANG.selects.sex.female },
        { value: "other", label: LANG.selects.sex.other }]

    const access = {
        contact_info_edit: AccessCheck("view_edit", "a_page_case_contact_info", "edit") && cg,
        contact_info_view: AccessCheck("view_edit", "a_page_case_contact_info", "view"),
        simple_info_edit: AccessCheck("view_edit", "a_page_case_simple_info", "edit") && cg,
        simple_info_view: AccessCheck("view_edit", "a_page_case_simple_info", "view"),
    }

    return (
        <div className="CaseInfoBlock">
            <div className="CaseInfoBlock-media">
                {info.viewInfo.view_ProfilePhoto && access.contact_info_view && (
                    <ProfilePhotoBlock editor={access.contact_info_edit} data={{
                        sex: dataState.sex,
                        age: dataState.happy_bd
                    }} profileImg={profileImg} meta={{
                        key: "case_profile_img",
                        case_id: case_id,
                        type: "case"
                    }} />
                )}
                <div className="CaseInfoBlock-right">
                    <CaseName editor={access.contact_info_edit} dataState={dataState} view={info.viewInfo.view_name} id={info.general.id} getCaseInfo={getCaseInfo} />
                    <div className="CaseInfoBlock-right-columns">
                        <div className="CaseInfoBlock-right-columns-column">

                            {(info.viewInfo.view_phone) && access.contact_info_view && <div className="CaseInfoBlock-line">
                                <InputBlock
                                    hintMessage={`${LANG.hints.phone}. ${LANG.hints.required}`}
                                    value={dataState.phone1}
                                    onChange={(e) => { handleDataChange("phone1", e.target.value) }}
                                    link={`tel:${dataState.phone1}`}
                                    icon={"phone"}
                                    label={dataState.phone1}
                                    inputType={"number"}
                                    saveHandler={(val) => saveHandler("phone1", val, "general")}
                                    titleDefault={LANG.case_data.phone}
                                    disabled={!access.contact_info_edit}
                                />
                            </div>}
                            {(info.viewInfo.view_phone) && access.contact_info_view && <div className="CaseInfoBlock-line">
                                <InputBlock
                                    hintMessage={LANG.hints.phone}
                                    value={dataState.phone2}
                                    onChange={(e) => { handleDataChange("phone2", e.target.value) }}
                                    link={`tel:${dataState.phone2}`}
                                    icon={"phone"}
                                    label={dataState.phone2}
                                    inputType={"number"}
                                    saveHandler={(val) => saveHandler("phone2", val, "general")}
                                    titleDefault={LANG.case_data.phone}
                                    disabled={!access.contact_info_edit}
                                />
                            </div>}
                            {(info.viewInfo.view_email) && access.contact_info_view && <div className="CaseInfoBlock-line">
                                <InputBlock
                                    hintMessage={LANG.hints.email}
                                    value={dataState.email}
                                    onChange={(e) => { handleDataChange("email", e.target.value) }}
                                    link={`mailto:${dataState.email}`}
                                    icon={"email"}
                                    label={dataState.email}
                                    inputType={"text"}
                                    saveHandler={(val) => saveHandler("email", val, "general")}
                                    titleDefault={LANG.case_data.email}
                                    disabled={!access.contact_info_edit}
                                />
                            </div>}
                            {(info.viewInfo.view_birthday) && access.simple_info_view && <div className="CaseInfoBlock-line">
                                <InputBlock
                                    value={dataState.happy_bd}
                                    age={true}
                                    onChange={(e) => { 
                                        handleDataChange("happy_bd", e.target.value) 
                                    }}
                                    icon={"birthday"}
                                    label={dataState.happy_bd}
                                    inputType={"date"}
                                    saveHandler={(val) => saveHandler("happy_bd", val, "general")}
                                    titleDefault={LANG.case_data.birthday}
                                    disabled={!access.simple_info_edit}
                                />
                            </div>}
                            {info.viewInfo.view_sex && access.simple_info_view && (
                                <div className="CaseInfoBlock-right-columns-column">
                                    <div className="CaseInfoBlock-line">
                                        <SelectBlock
                                            value={dataState.sex}
                                            onChange={(e) => handleDataChange("sex", e.target.value)}
                                            icon={"sex"}
                                            label={LANG.selects.sex[dataState.sex]}
                                            saveHandler={(val, displayVal) => saveHandler("sex", val, "general", displayVal)}
                                            titleDefault={LANG.case_data.sex}
                                            selectOptions={selectOptions}
                                            disabled={!access.simple_info_edit}
                                        />

                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="CaseInfoBlock-right-columns-column">
                            {(info.viewInfo.view_date_first_contact) && access.simple_info_view && <div className="CaseInfoBlock-line">
                                <InputBlock
                                    value={dataState.date_first_contact}
                                    onChange={(e) => { handleDataChange("date_first_contact", e.target.value) }}
                                    icon={"calendar"}
                                    label={dataState.date_first_contact}
                                    inputType={"date"}
                                    saveHandler={(val) => saveHandler("date_first_contact", val, "data")}
                                    titleDefault={LANG.case_data.date_first_contact}
                                    disabled={!access.simple_info_edit}
                                />
                            </div>}
                            {(info.viewInfo.view_address) && access.contact_info_view && <div className="CaseInfoBlock-line">
                                <InputBlock
                                    value={dataState.address_live}
                                    onChange={(e) => { handleDataChange("address_live", e.target.value) }}
                                    icon={"location"}
                                    label={dataState.address_live}
                                    inputType={"text"}
                                    saveHandler={(val) => saveHandler("address_live", val, "data")}
                                    titleDefault={LANG.case_data.address_live}
                                    disabled={!access.contact_info_edit}
                                />
                            </div>}

                            {(info.viewInfo.view_address) && access.contact_info_view && <div className="CaseInfoBlock-line">
                                <InputBlock
                                    value={dataState.address_registered}
                                    onChange={(e) => { handleDataChange("address_registered", e.target.value) }}
                                    icon={"location"}
                                    label={dataState.address_registered}
                                    inputType={"text"}
                                    saveHandler={(val) => saveHandler("address_registered", val, "data")}
                                    titleDefault={LANG.case_data.address_registered}
                                    disabled={!access.contact_info_edit}
                                />
                            </div>}

                        </div>

                    </div>
                </div>


            </div>
            <PersonalInfo cg={cg} case_id={case_id} getCaseInfo={getCaseInfo} info={info} changeData={changeData} changeGeneral={changeGeneral} />
            {alert && <SmallNotification isSuccess={true} text={LANG.GLOBAL.alertMessages.updated_success} close={() => setAlert(false)} />}
        </div>
    );
};

export default CaseInfoBlock;
