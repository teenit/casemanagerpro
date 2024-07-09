import React, { useState } from "react";
import Icon from "../Icons/Icon";
import { NavLink } from "react-router-dom";
import { MenuItem, Select } from "@mui/material";
import Input from "./Input";
import { LANG } from "../../../services/config";
import moment from 'moment';



const InputBlock = ({ age = false, saveHandler, disabled = false, inputType = "text", value = "", onChange, link = null, title = "", icon = null, label = "", titleDefault = "" }) => {
    const [showEdit, setShowEdit] = useState(false);
    const [stateValue, setStateValue] = useState(value);
    const handleSave = () => {
        const displayValue = stateValue;
        saveHandler(stateValue, displayValue);
        setShowEdit(false);
    };
    const howOldIsCase = (birthday) => {
        const birthDate = moment(birthday);
        const age = moment().diff(birthDate, 'years');
        return `, ${age} ${LANG.GLOBAL.years}`;
    };
    return (
        <div className="InputBlock">
            {!showEdit && (
                <div className="InputBlock-default">
                    {icon && <Icon icon={icon} addClass={"default-icon"} />}
                    <div className="case-info-card-text">
                        <div title={titleDefault}>
                            {link && (label !== "" && label !== null) ? (
                                <NavLink to={link}>
                                    {label}
                                </NavLink>
                            ) : (
                                <>
                                    {label == "" || label == null ? <span className="InputBlock-title-default">{titleDefault}</span> : 
                                    <span className="InputBlock-title-main">{`${label}${inputType=="date" ? howOldIsCase(value):""}`}</span>}
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
                        <Input label={title} type={inputType} value={stateValue} onChange={(e) => {
                            setStateValue(e.target.value)
                        }} />
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

export default InputBlock;