import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import InputBlock from "../../elements/Inputs/InputBlock";
import { LANG } from "../../../services/config";
import Icon from "../../elements/Icons/Icon";
import CheckboxListAccess from "../../elements/CheckBoxes/CheckboxListAccess";
import { MenuItem, Select } from "@mui/material";
import { apiResponse } from "../../Functions/get_apiObj";
import SelectBlock from "../../elements/Selects/SelectBlock"

const PersonalInfo = ({ case_id, info, changeGeneral, changeData, getCaseInfo }) => {
    const [alert, setAlert] = useState(null);
    const categories = useSelector(state => state.categories.case);
    const [checkedMas, setCheckedMas] = useState([]);
    const [userNames, setUserNames] = useState(null);

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

    const infoBlocks = [
        { view: info.viewInfo.view_date_created, key: "date_created", icon: "date_created", type: "text", title: LANG.case_data.date_created, typeData: "general", disabled: true },
        { view: info.viewInfo.view_contract, key: "contract_date", icon: "contract_date", type: "date", title: LANG.case_data.contract_date, typeData: "data" },
        { view: info.viewInfo.view_contract, key: "contract_number", icon: "contract_number", type: "number", title: LANG.case_data.contract_number, typeData: "data" },
        { view: info.viewInfo.view_channel, key: "channel", icon: "channel", type: "text", title: LANG.case_data.channel, typeData: "data" },
    ];

    return (
        <div className="PersonalInfo">
            {infoBlocks.map((block, index) => (
                block.view && (
                    <div key={index} className="PersonalInfo-line">
                        <InputBlock
                            value={dataState[block.key]}
                            onChange={(e) => handleDataChange(block.key, e.target.value)}
                            icon={block.icon}
                            label={dataState[block.key]}
                            inputType={block.type}
                            saveHandler={(val) => saveHandler(block.key, val, block.typeData)}
                            titleDefault={block.title}
                            disabled={block.disabled}
                        />
                    </div>
                )
            ))}
            {info.viewInfo.view_categories && (
                <div className="PersonalInfo-categories">
                    {/* <span className="PersonalInfo-categories-title">{LANG.case_data.category}</span> */}
                    <span className="PersonalInfo-categories-content">
                        <Icon icon="categories" addClass={"default-icon"} />
                        <div className="case-info-card-text">
                            {!editState.categories ? (
                                categories && categories.length > 0 && info.data.categories && info.data.categories.length > 0 && categories.map((item, index) => {
                                    if (info.data.categories.indexOf(item.id) !== -1) return (
                                        <div className="cat" key={index}>
                                            <div className="cat-color" style={{ backgroundColor: item.color }}></div>
                                            <div className="cat-text"><span key={item.id}> {item.name} </span></div>
                                        </div>
                                    );
                                })
                            ) : (
                                <CheckboxListAccess
                                    allMas={() => categories}
                                    checkedMas={checkedMas}
                                    onChange={(value) => handleCheckboxChange(value, checkedMas)}
                                />
                            )}
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
                    {/* <span>{LANG.case_data.responsible}</span> */}
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
        </div>
    );
};

export default PersonalInfo;
