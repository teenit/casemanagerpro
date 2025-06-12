import React, { useState, useEffect } from "react";
import Icon from "../Icons/Icon";
import { NavLink } from "react-router-dom";
import Input from "./Input";
import { LANG } from "../../../services/config";
import moment from 'moment';
import Textarea from "./Textarea"
import SmallNotification from "../Notifications/SmallNotification";
import Hint from "../Hints/Hint";
import TextDescription from "../TextFormatters/TextDescription";
const InputBlock = ({ 
    hintMessage = null, 
    maxLength = null, 
    header = false, 
    textarea = false, 
    age = false, 
    errorKey = null, 
    saveHandler, 
    disabled = false, 
    inputType = "text",
     value = "", 
     onChange, 
     link = null, 
     title = "", 
     icon = null, 
     label = "", 
     titleDefault = "", 
     showLable=false }) => {
    const [showEdit, setShowEdit] = useState(false);
    const [stateValue, setStateValue] = useState(value);
    useEffect(() => {
        setStateValue(value);
    }, [value]);
    // const errorsData = {
    //     phone: {
    //         check: stateValue && (stateValue.length !== 10 && stateValue.length !== 13),
    //         message: "Введіть правильний номер телефону"
    //     },
    //     email: {
    //         check: stateValue && (!stateValue.includes("@") || !stateValue.includes(".") ||
    //             stateValue.indexOf("@") < 1 || stateValue.indexOf(".") >= stateValue.length - 1 ||
    //             stateValue.length < 8),
    //         message: "Введіть правильну пошту"
    //     },
    //     required: {
    //         check: stateValue && stateValue.length < 1,
    //         message: `Поле ${titleDefault} є обов'язковим`
    //     },
    //     maxLength: {
    //         check: stateValue && stateValue.length >= maxLength,
    //         message: `Допустима довжина для вашого поля: ${maxLength}. Поточна довжина: ${stateValue.length}`
    //     }
    // }
    const [alert, setAlert] = useState({
        alert: false,
        message: ""
    })
    const alertHandler = (message = "") => {
        setAlert({ ...alert, alert: !alert.alert, message: message })
    }
    const handleSave = () => {
        // const key = errorsData[errorKey]
        // if (key && key.check) return alertHandler(key.message)
        // if (maxLength && errorsData.maxLength.check) return alertHandler(errorsData.maxLength.message)
        setShowEdit(false);
        if (value !== stateValue) {
            saveHandler(stateValue);
        }
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
                    {showLable && <b>{title}: </b>}
                    <div className="case-info-card-text">
                        <div title={titleDefault}>
                            {link && (label !== "" && label !== null) ? (
                                <NavLink to={link}>
                                    {label}
                                </NavLink>
                            ) : (
                                <>
                                    {label === "" || label === null ? (
                                        <span className={`InputBlock-title-main ${header && 'header'}`}><TextDescription text={titleDefault}/></span>
                                    ) : (
                                        <span className={`InputBlock-title-main ${header && 'header'}`}><TextDescription text={ `${label}${icon == "birthday" ? howOldIsCase(value) : ""}`}/></span>

                                    )}
                                </>
                            )}
                        </div>
                    </div>
                    {hintMessage && <Hint text={hintMessage} />}
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
                        {textarea ? <Textarea label={title} type={inputType} value={stateValue} onChange={(e) => {
                            setStateValue(e.target.value);
                        }} /> : <Input label={title} type={inputType} value={stateValue} onChange={(e) => {
                            setStateValue(e.target.value);
                        }} />}

                    </div>
                    <div className="InputBlock-editer-icons">
                        <span onClick={handleSave}>
                            <Icon icon={"save"} addClass={"save-icon"} />
                        </span>
                        <span onClick={() => {
                            setShowEdit(false)
                            setStateValue(value)
                        }}>
                            <Icon icon={"close"} addClass={"delete-icon"} />
                        </span>
                    </div>
                </div>
            )}
            {alert.alert && <SmallNotification isSuccess={false} text={alert.message} close={alertHandler} />}
        </div>
    );
}

export default InputBlock;
