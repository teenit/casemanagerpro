import React, { useState } from "react";
import FilesUploader from "../elements/Uploaders/FilesUploader";
import Input from "../elements/Inputs/Input";
import Textarea from "../elements/Inputs/Textarea";
import SmallNotification from "../elements/Notifications/SmallNotification";
import Modal from "../Modals/Modal";
import { Button, MenuItem, Select } from "@mui/material";
import { apiResponse } from "../Functions/get_apiObj";
import { LANG } from "../../services/config";
import { Label } from "@mui/icons-material";

const AddResources = ({ close, loadResources }) => {
    const [alert, setAlert] = useState({
        success: false,
        error: false,
        message: ""
    });
    const [meta, setMeta] = useState({
        title: "",
        description: "",
        link: ""
    });

    const [typeResource, setTypeResource] = useState('files');

    const handleAlertChange = (key, message = "") => {
        setAlert({ ...alert, [key]: !alert[key], message });
    };

    const handleMetaChange = (key, value) => {
        setMeta({ ...meta, [key]: value });
    };

    const successHandler = () => {
        handleAlertChange("success", "Ресурс додано");
        close();
        loadResources();
    };

    const addLinkResource = () => {
        if (meta.title.length < 1 || (typeResource === "link" && meta.link.length < 1)) {
            return handleAlertChange('error', "Введіть назву та посилання(якщо треба) на ресурс");
        }
        if (meta.title.length > 150) {
            return handleAlertChange('error', `Назва ресурсу не може перевищувати 150 символів. Поточна довжина: ${meta.title.length} символів`)
        }
        apiResponse({
            resource: {
                title: meta.title,
                description: meta.description,
                link: meta.link,
                type: 'link'
            },
            type: "link"
        }, "resources/add-links-resource.php").then((res) => {
            if (res.status) successHandler();
            else handleAlertChange('error', "Помилка при додаванні ресурсу");
        });
    };

    return (
        <>
            <Modal
                closeHandler={close}
                header="Додати ресурс"
                footer={
                    <div className="Modal--footer">
                        <Button onClick={close} color="error" variant="contained">{LANG.cancel}</Button>
                        {typeResource !== 'files' && <Button onClick={addLinkResource} variant="contained">{LANG.GLOBAL.save}</Button>}
                    </div>
                }
            >
                <div className="AddResources">
                    <span>Тип ресурсу</span>
                    <Select value={typeResource} onChange={(e) => setTypeResource(e.target.value)}>
                        <MenuItem value={'files'}>Файл</MenuItem>
                        <MenuItem value={'link'}>Посилання</MenuItem>
                    </Select>
                    <Input
                        type="text"
                        label="Назва Ресурсу"
                        value={meta.title}
                        onChange={(e) => handleMetaChange("title", e.target.value)}
                    />
                    <Textarea
                        label="Опис Ресурсу"
                        value={meta.description}
                        onChange={(e) => handleMetaChange("description", e.target.value)}
                    />
                    {typeResource === 'files' && <FilesUploader
                        multiple={true}
                        type="resource"
                        successHandler={successHandler}
                        meta={{
                            key: "files",
                            title: meta.title,
                            description: meta.description
                        }}
                    />}
                    {typeResource === 'link' && <Input
                        type="text"
                        label="Посилання на ресурс"
                        value={meta.link}
                        onChange={(e) => handleMetaChange("link", e.target.value)}
                    />}
                </div>
            </Modal>
            {alert.success && <SmallNotification isSuccess={true} text={alert.message} close={() => { handleAlertChange("success") }} />}
            {alert.error && <SmallNotification isSuccess={false} text={alert.message} close={() => { handleAlertChange("error") }} />}
        </>
    );
};

export default AddResources;
