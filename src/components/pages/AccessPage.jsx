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
import AddButton from "../elements/Buttons/AddButton"
const AccessPage = () => {
    const canCreate = AccessCheck('yes_no', 'a_page_access_create')
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
        if (addAccess.name.length < 1) return alertHandler("error", LANG.ACCESS_PAGE.error_no_name)
        apiResponse({ name: changeAps(addAccess.name), description: changeApsBr(addAccess.description) }, "access/add-access.php").then((res) => {
            alertHandler("success", LANG.ACCESS_PAGE.success_added)
            loadList()
            setModal(false)
        })
    }

    return (
        <div className="AccessPage">
            {canCreate && <AddButton title={LANG.access_text.add_template} click={()=>{setModal(true)}}/>}
            <div className="AccessPage-templates">
                {state.map((item) => {
                    return <NavLink key={item.id} state={item} to={item.id} className="AccessPage-templates-row"><span>{item.name}</span></NavLink>
                })}
            </div>

            {
                modal && <Modal closeHandler={() => { setModal(false) }}
                    header={LANG.access_text.add_template}
                    footer={
                        <>
                        <Button variant="contained" onClick={addNewAccess}>{LANG.save}</Button>
                        <Button variant="contained" color="error" onClick={() => { setModal(false) }}>{LANG.cancel}</Button>
                        </>
                    }
                >
                    <Input addClass="w100" value={addAccess.name} onChange={e => setAccess({ ...addAccess, name: e.target.value })} label={LANG.GLOBAL.title} type="text" />
                    <Textarea value={addAccess.description} onChange={e => setAccess({ ...addAccess, description: e.target.value })} label={LANG.GLOBAL.description} />

                </Modal>
            }
            
            {alert.error && <SmallNotification isSuccess={false} text={alert.message} close={() => { alertHandler("error") }} />}
            {alert.success && <SmallNotification isSuccess={true} text={alert.message} close={() => { alertHandler("success") }} />}
        </div>

    )
}

export default AccessPage;