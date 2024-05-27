import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/Slices/userSlice";
import './Registration.css';
import { serverAddres } from "../Functions/serverAddres";
import { LANG } from "../../services/config";
import { Button } from '@mui/material';
import Input from "../elements/Inputs/Input";
import SmallNotification from "../elements/Notifications/SmallNotification";
import { apiResponse } from "../Functions/get_apiObj";

const LoginForm = ({ show }) => {
    const alertMessages = {
        errorEmail: LANG.loginForm.emailMinLengthMessage,
        errorPass: LANG.loginForm.passwordMinLengthMessage,
    };
    const [inputData, setInputData] = useState({
        login: "",
        password: ""
    });
    const handleInputDataChange = (key, value) => {
        setInputData({ ...inputData, [key]: value });
    };
    const [alert, setAlert] = useState({
        alert: false,
        message: ""
    });
    const checkForm = (event) => {
        event.preventDefault()
        if (inputData.login == "" || inputData.login.length < 8) {
            setAlert({ ...alert, alert: true, message: alertMessages.errorEmail });
        } else if (inputData.password == "" || inputData.password.length < 5) {
            setAlert({ ...alert, alert: true, message: alertMessages.errorPass });
        } else {
            getUser(inputData);
        }
    };
    const dispatch = useDispatch();
    async function getUser(data) {
        apiResponse(data, "login.php")
        .then((data) => {
            if ("message" in data) {
                console.log(data);
                setAlert({ ...alert, alert: true, message: data.message });
            } else {
                localStorage.setItem("token", data.token);
                localStorage.setItem("email", data.email);
                localStorage.setItem("id", data.user_id);
                localStorage.setItem("userName", data.userName);
                localStorage.setItem("profilePhoto", data.profilePhoto);
                dispatch(setUser({
                    email: data.email,
                    id: data.user_id,
                    token: data.token,
                    userName: data.userName,
                    profilePhoto: data.profilePhoto,
                    access: data.access
                }));

                window.location.href = "/";
            }
        })
        .catch(rejected => {
            console.log(rejected);
        });
           
    }
    return (
        <>
            <form action="" className="reg__form" onSubmit={checkForm}>
                <div className="reg__split">
                    <Input type="email" label={LANG.loginForm.emailLabel} value={inputData.login} onChange={(e) => { handleInputDataChange("login", e.target.value) }} />
                    <Input type="password" label={LANG.loginForm.passwordLabel} value={inputData.password} onChange={(e) => { handleInputDataChange("password", e.target.value) }} />
                </div>
                <Button variant="contained" type="submit">{LANG.buttonTexts.auth}</Button>
            </form>
            {alert.alert && <SmallNotification isSuccess={false} text={alert.message} close={() => { setAlert({ ...alert, alert: false }) }} />}
        </>
    );
};

export default LoginForm;
