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
import AccessCheck from "../Functions/AccessCheck";
const AccessPage = () => {

    const [modal, setModal] = useState(false)
    const [state, setState] = useState([])
    const [addAccess, setAccess] = useState({
        description: "",
        name: ""
    })
    const [alert, setAlert] = useState({
        success: false,
        error: false,
        message:""
    })
    const alertHandler = (key, message="") => {
        setAlert({ ...alert, [key]: !alert[key], message:message })
    }
    const loadList = () => {
        apiResponse({}, 'access/get-list.php').then((res) => {
            setState(res)
        })
    }
    useEffect(() => {
        loadList()
    }, []);

    const addNewAccess = () => {
        if (addAccess.name.length < 1) return alertHandler("error", "Введіть назву шаблону права")
        apiResponse({ name: changeAps(addAccess.name), description: changeApsBr(addAccess.description) }, "access/add-access.php").then((res) => {
            alertHandler("success", "Шаблон прав додано")
            loadList()
            setModal(false)
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
            {AccessCheck('yes_no', 'a_page_access_create') && <Button variant="contained" onClick={() => {
                setModal(true)
            }}>{LANG.access_text.add_template}</Button>}
            
            {alert.error && <SmallNotification isSuccess={false} text={alert.message} close={() => { alertHandler("error") }} />}
            {alert.success && <SmallNotification isSuccess={true} text={alert.message} close={() => { alertHandler("success") }} />}
        </div>

    )
}

export default AccessPage;