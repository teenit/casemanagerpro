import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { apiResponse } from "../Functions/get_apiObj";
import Modal from "../Modals/Modal";
import Input from "../elements/Inputs/Input";
import Textarea from "../elements/Inputs/Textarea";
import { Button } from "@mui/material";
import { LANG } from "../../services/config";
import { changeAps, changeApsBr } from "../Functions/translateString";
import SmallNotification from "../elements/Notifications/SmallNotification"
const AccessPage = () => {

    const [modal, setModal] = useState(false)
    const [state, setState] = useState([])
    const [addAccess, setAccess] = useState({
        description: "",
        name: ""
    })
    const [alert, setAlert] = useState({
        success: false,
        error: false
    })
    const alertHandler = (key) => {
        setAlert({ ...alert, [key]: !alert[key] })
    }
    useEffect(() => {
        apiResponse({}, 'access/get-list.php').then((res) => {
            console.log(res)
            setState(res)
        })
    }, []);

    const addNewAccess = () => {
        if (addAccess.name.length < 1) return alertHandler("error")
        apiResponse({ name: changeAps(addAccess.name), description: changeApsBr(addAccess.description) }, "access/add-access.php").then((res) => {
            alertHandler("success")
        })
    }

    return (
        <div className="AccessPage">
            <div className="AccessPage-title">
                <span>{LANG.access_text.title}</span>
            </div>
            <div className="AccessPage-templates">
                {state.map((item) => {
                    return <NavLink key={item.id} state={item} to={item.id} className="AccessPage-templates-row"><span>{item.name}</span></NavLink>
                })}
            </div>

            {
                modal && <Modal closeHandler={() => { setModal(false) }}
                    header={
                        <h3>{LANG.access_text.modal_header}</h3>
                    }
                    footer={
                        <Button variant="contained" className="button" onClick={addNewAccess}>{LANG.save}</Button>
                    }
                >
                    <Input value={addAccess.name} onChange={e => setAccess({ ...addAccess, name: e.target.value })} label={LANG.access_text.add_name} type="text" />
                    <Textarea value={addAccess.description} onChange={e => setAccess({ ...addAccess, description: e.target.value })} label={LANG.access_text.add_description} />

                </Modal>
            }

            <button className="AccessPage-button" onClick={() => {
                setModal(true)
            }}>{LANG.access_text.add_template}</button>
            {alert.error && <SmallNotification isSuccess={false} text="Введіть назву шаблону права" close={() => { alertHandler("error") }} />}
            {alert.success && <SmallNotification isSuccess={true} text="Шаблон прав додано" close={() => { alertHandler("success") }} />}
        </div>

    )
}

export default AccessPage;