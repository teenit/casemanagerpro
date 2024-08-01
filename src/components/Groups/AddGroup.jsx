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
import { useSelector } from "react-redux";
import CheckboxListAccess from "../elements/CheckBoxes/CheckboxListAccess";

const AddGroup = ({ action, data, id, close, loadGroups }) => {
    const categories = useSelector(state => state.categories);
    const [state, setState] = useState({
        name: "",
        description: "",
        color: appConfig.default.color,
        categories: []
    });
    const getGroupsCategories = ()=>{
        return Object.values(categories.groups)
    }
    const handleCheckboxChange = (value) => {
        let categories = [];
        if (state.categories.includes(value)) {
            categories = state.categories.filter(element => element !== value);

        } else {
            categories = [...state.categories, value];
        }
        setState({ ...state, categories: [...categories] });
    };
    useEffect(() => {
        if (action === "add") {
            setState({ name: "", description: "", color: appConfig.default.color, categories:[] });
        } else {
            setState(data);
        }
    }, [action, data]);

    const [alert, setAlert] = useState({
        success: false,
        error: false,
        message:""
    });
    const alertHandler = (key, message) => {
        setAlert({...alert,[key]:!alert[key], message:message});
    };

    const checkForm = () => {
        if (state.name.length < 1) {
            alertHandler("error", "Введіть назву групи");
        } else if(state.name.length>50){
            alertHandler("error", `Назва групи повинна бути дожиною до 50 символів. Поточна довжина: ${state.name.length} символів`)
        }else {
            successHandler();
        }
    };

    const successHandler = () => {
        if (action === "add") {
            apiResponse({ ...state }, "groups/add-group.php").then((res) => {
                loadGroups()
                close()
                alertHandler("success", "Групу додано");
            });
        }else{
            console.log(state);
            apiResponse({ ...state, group_id:id }, "groups/edit-group.php").then((res) => {
                loadGroups()
                close();
                alertHandler("success", "Інформацію про групу оновлено");
            });
        }
        
    };

    const changeHandler = (key, value) => {
        setState({ ...state, [key]: value});
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
                    <div>
                        <span>{LANG.categories.category}</span>
                        <CheckboxListAccess allMas={getGroupsCategories} checkedMas={state.categories} onChange={(value)=>{handleCheckboxChange(value)}}/>
                    </div>
                </Modal>
        

            {alert.success && (
                <SmallNotification isSuccess={true} text={alert.message} close={() => alertHandler("success")} />
            )}
            {alert.error && (
                <SmallNotification isSuccess={false} text={alert.message} close={() => alertHandler("error")} />
            )}
        </>
    );
};

export default AddGroup;
