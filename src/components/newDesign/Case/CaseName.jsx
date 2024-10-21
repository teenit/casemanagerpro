import React, { useEffect, useState } from 'react';
import { apiResponse } from '../../Functions/get_apiObj';
import Icon from '../../elements/Icons/Icon';
import Input from '../../elements/Inputs/Input';
import SmallNotification from '../../elements/Notifications/SmallNotification';
import { LANG } from '../../../services/config';

const CaseName = ({ dataState, view, id, getCaseInfo }) => {
    const [editName, setEditName] = useState(false);
    const [alert, setAlert] = useState({
        success: false,
        error: false,
        message: ""
    });
    const alertHandler = (key, message = "") => {
        setAlert({ ...alert, [key]: !alert[key], message: message })
    }
    const [name, setName] = useState({
        first_name: dataState.first_name,
        last_name: dataState.last_name,
        middle_name: dataState.middle_name,
    });

    useEffect(()=>{
        setName({...dataState})
    },[dataState])

    const fullName = `${dataState.middle_name} ${dataState.first_name} ${dataState.last_name}`;

    const changeName = () => {
        apiResponse({
            case_id: id,
            first_name: name.first_name,
            last_name: name.last_name,
            middle_name: name.middle_name,
        }, "case/update-case-name.php").then((res) => {
            getCaseInfo();
            alertHandler("success", "Дані успішно змінено")
            setEditName(false);
        }).catch(() => {
            alertHandler("error", "Помилка при зміні даних")
            setEditName(false);
        });
    };

    const handleInputChange = (field, value) => {
        setName({ ...name, [field]: value.trim() });
    };

    return (
        <div className="name-item">
            <div className="CaseInfoBlock-inner">
                {view && (
                    <div className="InputBlock">
                        {!editName && (
                            <div className="InputBlock-default">
                                <div className="CaseInfoBlock-line-title">
                                    {name.middle_name} {name.first_name} {name.last_name} <span style={{ color: "var(--main-color)" }}>№{id}</span>
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
                                    label={LANG.case_data.middle_name}
                                    value={name.middle_name}
                                    onChange={(e) => handleInputChange('middle_name', e.target.value)}
                                />
                                <Input
                                    type="text"
                                    label={LANG.case_data.first_name}
                                    value={name.first_name}
                                    onChange={(e) => handleInputChange('first_name', e.target.value)}
                                />
                                <Input
                                    type="text"
                                    label={LANG.case_data.last_name}
                                    value={name.last_name}
                                    onChange={(e) => handleInputChange('last_name', e.target.value)}
                                />
                                <div className="InputBlock-editer-icons">
                                    <span onClick={changeName}>
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
            {alert.success && <SmallNotification isSuccess={true} text={alert.message} close={() => { alertHandler("success") }} />}
            {alert.error && <SmallNotification isSuccess={false} text={alert.message} close={() => { alertHandler("error") }} />}
        </div>
    );
};

export default CaseName;
