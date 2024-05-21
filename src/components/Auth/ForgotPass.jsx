import React from "react";
import axios from "axios";
import { useState } from "react";
import { serverAddres } from "../Functions/serverAddres";
import ModalMessage from "../Modals/ModalMessage";
import { LANG } from "../../services/config";
import { Button } from '@mui/material';

const ForgotPass = () => {
    const [email, setEmail] = useState("")
    const [modal, setModal] = useState(false)
    const [modalInfo, setModalInfo] = useState(false)
    function forgotPass(mail) {
        axios({
            url: serverAddres("user/forget-pass.php"),
            method: "POST",
            header: { 'Content-Type': 'application/json;charset=utf-8' },
            data: JSON.stringify({ email: mail }),
        })
            .then((data) => {
                setModalInfo(data.data)
                setEmail("")
                setModal(true)
                // window.location.reload()        
            })
            .catch((error) => console.log(error))
    }

    return (
        <>
            <div className="forget__form">
                <h2>{LANG.forgotPass.title}</h2>
                <input type="text"
                    placeholder={LANG.placeholders.email}
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }} />
                <button className="primary__btn"
                    onClick={() => {
                        forgotPass(email)
                    }}>{LANG.buttonTexts.recover}</button>
            </div>
            {modal && <ModalMessage header={modalInfo.message} footer={
                <Button variant="contained" onClick={() => { setModal(false) }}>{LANG.buttonTexts.recover}</Button>
            }>
            </ModalMessage>}
        </>

    )
}
export default ForgotPass;