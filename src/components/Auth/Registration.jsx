import React, { useState } from "react";
import './Registration.css';

import { Button, MenuItem, Select } from '@mui/material';
import Input from '../elements/Inputs/Input'
import SmallNotification from "../elements/Notifications/SmallNotification"
import Textarea from "../elements/Inputs/Textarea"
import { apiResponse } from "../Functions/get_apiObj";

const Registration = ({ switchForms }) => {
    const alertMessages = {
        required: "Обов'язково до заповнення",
        pib: "ПІБ повинен бути довжиною мінімум 3 символа",
        phone: "Номер телефону повинен бути довжиною мінімум 10 символів",
        email: "Пошта повинна бути довжиною мінімум 5 символів",
        adress: "Адреса повинна бути довжиною мінімум 5 символів",
        work: "Назва роботи повиннна бути довжиною мінімум 3 символа",
        pass: "Пароль повинен бути довжиною мінімум 6 символів"
    };

    const selectOptions = [
        { name: "Волонтер", value: "volunteer" },
        { name: "Менеджер", value: "manager" },
        { name: "Залучений спеціаліст", value: "expert" },
        { name: "ФСР", value: "fsr" },
        { name: "Працівник", value: "worker" },
        { name: "Адміністратор", value: "administrator" }
    ];

    const [formData, setFormData] = useState({
        userName: '',
        userPhone: '',
        userEmail: '',
        userAddress: '',
        userType: 'volunteer',
        userWork: '',
        userAnotherData: '',
        pass: ''
    });

    const [alert, setAlert] = useState({
        success: false,
        error: false,
        message: ""
    });

    const validate = () => {
        let valid = true;
        if (!formData.userName || formData.userName.length < 3) {
            setAlert({ error: true, message: alertMessages.pib });
            valid = false;
        }
        else if (!formData.userPhone || formData.userPhone.length < 10) {
            setAlert({ error: true, message: alertMessages.phone });
            valid = false;
        }
        else if (!formData.userEmail || formData.userEmail.length < 5) {
            setAlert({ error: true, message: alertMessages.email });
            valid = false;
        }
        else if (formData.userAddress && formData.userAddress.length < 5) {
            setAlert({ error: true, message: alertMessages.adress });
            valid = false;
        }
        else if (!formData.userWork || formData.userWork.length < 3) {
            setAlert({ error: true, message: alertMessages.work });
            valid = false;
        }
        else if (!formData.pass || formData.pass.length < 6) {
            setAlert({ error: true, message: alertMessages.pass });
            valid = false;
        }
        return valid;
    };

    const handleChange = (key, value) => {
        setFormData({ ...formData, [key]: value })
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        const levelObj = {
            activeNewUser: false,
            addCase: false,
            addEditCategoriesCase: false,
            addEditCategoriesUser: false,
            case: false,
            cases: false,
            changeResponsibleCase: false,
            contacts: false,
            createIndividualPlan: false,
            deactivateUsers: false,
            editOwnCase: false,
            editSomeonesCase: false,
            history: false,
            loadDocument: false,
            loadPhotoVideo: false,
            ownCab: false,
            reports: false,
            searchCasesUsers: false,
            settings: false,
            specificationUsers: false,
            statistics: false
        };

        const data = { ...formData, level: levelObj };
        apiResponse(data, "user-register.php").then((response) => {
            let isSuccess = response.marker == "red" ? "error" : "success"
            setAlert({ [isSuccess]: true, message: response.message });
            // switchForms()
            // setFormData({
            //     userName: '',
            //     userPhone: '',
            //     userEmail: '',
            //     userAddress: '',
            //     userType: 'volunteer',
            //     userWork: '',
            //     userAnotherData: '',
            //     pass: ''
            // });
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <form className="reg__form" onSubmit={handleSubmit}>
            <div className="reg__split">
                <Input type="text" label="ПІБ" name="userName" value={formData.userName} onChange={(e) => { handleChange("userName", e.target.value) }} />
                <Input type="number" label="Номер телефону" name="userPhone" value={formData.userPhone} onChange={(e) => { handleChange("userPhone", e.target.value) }} />
            </div>
            <div className="reg__split">
                <Input type="text" label="E-mail" name="userEmail" value={formData.userEmail} onChange={(e) => { handleChange("userEmail", e.target.value) }} />
                <Input type="text" label="Адреса" name="userAddress" value={formData.userAddress} onChange={(e) => { handleChange("userAddress", e.target.value) }} />
            </div>
            <div className="reg__block">
                <label>Тип користувача</label>
                <Select name="userType" value={formData.userType} onChange={(e) => { handleChange("userType", e.target.value) }}>
                    {selectOptions.map((item, index) => (
                        <MenuItem key={index} value={item.value}>{item.name}</MenuItem>
                    ))}
                </Select>
            </div>
            <div className="reg__split">
                <Input type="text" label="Спеціалізація / Робота" name="userWork" value={formData.userWork} onChange={(e) => { handleChange("userWork", e.target.value) }} />
                <Input type="password" label="Пароль" name="pass" value={formData.pass} onChange={(e) => { handleChange("pass", e.target.value) }} />
            </div>
            <div className="input__wrap">
                <Textarea label="Розкажіть про себе" name="userAnotherData" value={formData.userAnotherData} onChange={(e) => { handleChange("userAnotherData", e.target.value) }} />
            </div>
            <Button variant="contained" type="submit">Реєстрація</Button>
            {alert.error && <SmallNotification isSuccess={false} text={alert.message} close={() => { setAlert({ ...alert, error: false }) }} />}
            {alert.success && <SmallNotification isSuccess={true} text={alert.message} close={() => { setAlert({ ...alert, success: false }) }} />}
        </form>
    );
};

export default Registration;
