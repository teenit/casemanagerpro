import React, { useEffect, useState } from "react";
import Modal from "../Modals/Modal";
import Icon from "../elements/Icons/Icon";
import { Button } from "@mui/material";
import { LANG, appConfig } from "../../services/config";
import Input from "../elements/Inputs/Input";
import Textarea from "../elements/Inputs/Textarea";
import InputColor from "../elements/Inputs/InputColor";
import { apiResponse } from "../Functions/get_apiObj";
import SmallNotification from "../elements/Notifications/SmallNotification";
import { rgbToHex } from "../Functions/rgbToHex";

const AddGroup = ({ action, data, id, close }) => {
    const [state, setState] = useState({
        name: "",
        description: "",
        color: appConfig.default.color
    });

    useEffect(() => {
        if (action === "add") {
            setState({ name: "", description: "", color: appConfig.default.color });
        } else {
            setState(data);
        }
    }, [action, data]);

    const [alert, setAlert] = useState({
        success: false,
        error: false,
    });

    const [form, setForm] = useState(false);

    const alertHandler = (key) => {
        setAlert({...alert,[key]:!alert.key});
    };

    const checkForm = () => {
        if (state.name.trim().length < 1 || state.description.trim().length < 1) {
            alertHandler("error");
        } else {
            successHandler();
        }
    };

    const successHandler = () => {
        if (action === "add") {
            apiResponse({ ...state }, "groups/add-group.php").then((res) => {
                console.log(res);
                close()
                alertHandler("success");
            });
        }else{
            apiResponse({ ...state, group_id:id }, "groups/edit-group.php").then((res) => {
                console.log(res);
                close();
                alertHandler("success");
            });
        }
        
    };

    const changeHandler = (key, value) => {
        setState({ ...state, [key]: value });
    };

    return (
        <>
            
                <Modal closeHandler={close}
                    footer={<Button variant="contained" onClick={checkForm}>{LANG.GLOBAL.save}</Button>
                    }>
                    <div className="AddGroup-split">
                        <Input value={state.name} type="text" label={LANG.GLOBAL.title} onChange={(e) => changeHandler("name", e.target.value)} />
                        <InputColor value={state.color} onChange={(color) => changeHandler("color", rgbToHex(color))} />
                    </div>
                    <Textarea value={state.description} label={LANG.GLOBAL.description} onChange={(e) => changeHandler("description", e.target.value)} />
                </Modal>
        

            {alert.success && (
                <SmallNotification isSuccess={true} text={`Групу успішно ${action=="add"?"додано":"змінено"}`} close={() => alertHandler("success")} />
            )}
            {alert.error && (
                <SmallNotification isSuccess={false} text={"Введіть назву групи"} close={() => alertHandler("error")} />
            )}
        </>
    );
};

export default AddGroup;
