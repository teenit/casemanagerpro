import React, { useState } from "react";
import Icon from "../Icons/Icon";
import { NavLink } from "react-router-dom";
import { MenuItem, Select } from "@mui/material";
import { LANG } from "../../../services/config";

const SelectBlock = ({ saveHandler, disabled = false, value = "", onChange, link = null, icon = null, label = "", titleDefault = "", selectOptions = [], size = 'small' }) => {
    const [showEdit, setShowEdit] = useState(false);
    const [stateValue, setStateValue] = useState(value);

    const handleSave = () => {
        saveHandler(stateValue, selectOptions.find(option => option.value === stateValue)?.label);
        setShowEdit(false);
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
                                    {label === "" || label === null ? <span className="InputBlock-title-default">{titleDefault}</span> : <span className="InputBlock-title-main">{label}</span>}
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
                        <Select
                            value={stateValue}
                            size={size}
                            onChange={(e) => {
                                setStateValue(e.target.value);
                                if (onChange) {
                                    onChange(e)
                                }
                            }}
                        >
                            {selectOptions.map((option, index) => (
                                <MenuItem key={index} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>

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
};

export default SelectBlock;
