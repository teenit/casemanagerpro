import React, { useState } from "react";
import axios from "axios";
import { serverAddres } from "../Functions/serverAddres";
import { LANG } from "../../services/config";
import { Button } from '@mui/material';
import Input from "../elements/Inputs/Input";
import SmallNotification from "../elements/Notifications/SmallNotification";
import { apiResponse } from "../Functions/get_apiObj";
const ForgotPass = () => {
    const [email, setEmail] = useState("");
    const [modalInfo, setModalInfo] = useState("");
    const [alert, setAlert] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const forgotPass = (email) => {
        apiResponse({email:email},"user/forget-pass.php").then((response) => {
            setModalInfo(response.data.message);
            setEmail("");
            setAlert(true);
            setIsSuccess(true);
        })
        .catch((error) => {
            setModalInfo("Виникла помилка, перевірте дані або спробуйте пізніше");
            setAlert(true);
            setIsSuccess(false);
        });
        
    };

    return (
        <>
            <div className="forget__form">
                <h2>{LANG.forgotPass.title}</h2>
                <div className="input__wrap">
                    <Input 
                        type="text" 
                        value={email} 
                        label={LANG.placeholders.email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>
                <Button variant="contained" onClick={() => forgotPass(email)}>
                    {LANG.buttonTexts.recover}
                </Button>
            </div>
            {alert && (
                <SmallNotification 
                    isSuccess={isSuccess} 
                    text={modalInfo} 
                    close={() => setAlert(false)} 
                />
            )}
        </>
    );
};

export default ForgotPass;
