import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import InputBlock from "../../elements/Inputs/InputBlock";
import { LANG } from "../../../services/config";
import Icon from "../../elements/Icons/Icon";
import CheckboxListAccess from "../../elements/CheckBoxes/CheckboxListAccess";
import SelectBlock from "../../elements/Selects/SelectBlock";
import { apiResponse } from "../../Functions/get_apiObj";
import SmallNotification from "../../elements/Notifications/SmallNotification";

const PersonalInfo = ({ case_id, info, changeGeneral, changeData, getCaseInfo }) => {
    const [alert, setAlert] = useState(null);
    const categories = useSelector(state => state.categories.case);
    const [userNames, setUserNames] = useState(null);
    const [checkedMas, setCheckedMas] = useState(null);
    const [dataState, setDataState] = useState({
        date_created: info.general.date_created,
        contract_date: info.data.contract_date,
        contract_number: info.data.contract_number,
        channel: info.data.channel,
        categories: info.data.categories,
        responsible_id: info.general.responsible_id,
        responsible_name: info.general.responsible_name,
    });

    useEffect(() => {
        setDataState({
            date_created: info.general.date_created,
            contract_date: info.data.contract_date,
            contract_number: info.data.contract_number,
            channel: info.data.channel,
            categories: info.data.categories,
            responsible_id: info.general.responsible_id,
            responsible_name: info.general.responsible_name,
        });
        setCheckedMas(info.data.categories?info.data.categories:[]);
        apiResponse({}, "user/get-all-users-name.php").then((res) => {
            setUserNames(res);
        });
    }, [info]);

    const [editState, setEditState] = useState({
        date_created: false,
        contract: false,
        channel: false,
        categories: false,
        responsible_id: false,
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

    return (
        <div className="PersonalInfo">
            {info.viewInfo.view_date_created && <div className="PersonalInfo-line">
                <InputBlock
                    hintMessage={LANG.hints.disabled}
                    value={dataState.date_created}
                    icon={"date_created"}
                    label={dataState.date_created}
                    disabled={true}
                    titleDefault={LANG.case_data.date_created}
                />
            </div>}
            {info.viewInfo.view_contract && <div className="PersonalInfo-line">
                <InputBlock
                    value={dataState.contract_date}
                    onChange={(e) => handleDataChange("contract_date", e.target.value)}
                    icon={"contract_date"}
                    label={dataState.contract_date}
                    inputType={"date"}
                    saveHandler={(val) => saveHandler("contract_date", val, "data")}
                    titleDefault={LANG.case_data.contract_date}
                />
            </div>}
            {info.viewInfo.view_contract && <div className="PersonalInfo-line">
                <InputBlock
                    value={dataState.contract_number}
                    onChange={(e) => handleDataChange("contract_number", e.target.value)}
                    icon={"contract_number"}
                    label={dataState.contract_number}
                    inputType={"number"}
                    saveHandler={(val) => saveHandler("contract_number", val, "data")}
                    titleDefault={LANG.case_data.contract_number}
                />
            </div>}
            {info.viewInfo.view_channel && <div className="PersonalInfo-line">
                <InputBlock
                    value={dataState.channel}
                    onChange={(e) => handleDataChange("channel", e.target.value)}
                    icon={"channel"}
                    label={dataState.channel}
                    inputType={"text"}
                    saveHandler={(val) => saveHandler("channel", val, "data")}
                    titleDefault={LANG.case_data.channel}
                />
            </div>}
            {info.viewInfo.view_categories && (
                <div className="PersonalInfo-categories">
                    <span className="PersonalInfo-categories-content">
                        <Icon icon="categories" addClass={"default-icon"} />
                        <div className="case-info-card-text">
                            {!editState.categories ? (
                                    categories && categories.length > 0 && info.data.categories && info.data.categories.length > 0 ? (
                                        categories.map((item, index) => {
                                            if (info.data.categories.indexOf(item.id) !== -1) {
                                                return (
                                                    <div className="cat" key={index}>
                                                        <div className="cat-color" style={{ backgroundColor: item.color }}></div>
                                                        <div className="cat-text"><span key={item.id}> {item.name} </span></div>
                                                    </div>
                                                );
                                            } else {
                                                return null;
                                            }
                                        })
                                    ) : (
                                        <span>{LANG.case_data.category}</span>
                                    )
                                ) : (
                                    <CheckboxListAccess
                                        allMas={() => categories}
                                        checkedMas={checkedMas}
                                        onChange={(value) => handleCheckboxChange(value, checkedMas)}
                                    />
                                )
                            }

                        </div>
                        {editState.categories ? (
                            <>
                                <span onClick={() => saveHandler("categories", dataState.categories, "data")}>
                                    <Icon icon={"save"} addClass={"save-icon"} />
                                </span>
                                <span onClick={() => handleEditChange("categories")}>
                                    <Icon icon={"close"} addClass={"close-icon"} />
                                </span>
                            </>
                        ) : (
                            <div className="edit-icon" onClick={() => handleEditChange("categories")}>
                                <Icon icon="edit" addClass="default-icon" />
                            </div>
                        )}
                    </span>
                </div>
            )}
            {info.viewInfo.view_responsible && (
                <div className="PersonalInfo-line">
                    <div className="PersonalInfo-line-select">
                        <Icon icon="categories" addClass={"default-icon"} />
                        <SelectBlock
                            value={dataState.responsible_id}
                            onChange={(val) => handleDataChange("responsible_id", val)}
                            saveHandler={(val, displayVal) => saveHandler("responsible_id", val, "general")}
                            icon="responsible"
                            label={userNames && userNames[dataState.responsible_id]?.userName}
                            titleDefault={LANG.case_data.responsible}
                            selectOptions={userNames ? Object.values(userNames).map((user) => ({ value: user.id, label: user.userName })) : []}
                        />
                    </div>
                </div>
            )}
            {alert && <SmallNotification isSuccess={true} text={"Дані збережено успішно"} close={() => setAlert(false)} />}
        </div>
    );
};

export default PersonalInfo;
