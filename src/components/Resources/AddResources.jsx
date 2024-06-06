import React, { useState } from "react";
import FilesUploader from "../elements/Uploaders/FilesUploader";
import Input from "../elements/Inputs/Input";
import Textarea from "../elements/Inputs/Textarea";
import SmallNotification from "../elements/Notifications/SmallNotification";
import Modal from "../Modals/Modal";
import { Button } from "@mui/material";
import { apiResponse } from "../Functions/get_apiObj";
import { LANG } from "../../services/config";

const AddResources = ({ close, loadGroups }) => {
    const [alert, setAlert] = useState({
        success: false,
        error: false
    });
    const [meta, setMeta] = useState({
        title: "",
        description: ""
    });

    const handleAlertChange = (key) => {
        setAlert({ ...alert, [key]: !alert[key] });
    };

    const handleMetaChange = (key, value) => {
        setMeta({ ...meta, [key]: value });
    };

    const successHandler = () => {
        close();
        handleAlertChange("success");
        loadGroups()
    };

    return (
        <>
            <Modal
                closeHandler={close}
                header="Додати ресурс"
                footer={
                    <div className="Modal--footer">
                        <Button onClick={close} color="error" variant="contained">{LANG.cancel}</Button>
                    </div>
                }
            >
                <div className="AddResources">
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
                    <FilesUploader
                        multiple={true}
                        type="resource"
                        successHandler={successHandler}
                        meta={{
                            key: "files",
                            title: meta.title,
                            description: meta.description
                        }}
                    />
                </div>
            </Modal>
            {alert.success && <SmallNotification isSuccess={true} text={"Ресурс додано"} close={() => { handleAlertChange("success") }} />}
            {alert.error && <SmallNotification isSuccess={false} text={"Введіть назву ресурсу"} close={() => { handleAlertChange("error") }} />}

        </>

    );
};

export default AddResources;
