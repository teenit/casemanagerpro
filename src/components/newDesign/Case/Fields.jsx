import React, { useEffect, useState } from 'react';
import Icon from '../../elements/Icons/Icon';
import { LANG } from '../../../services/config';
import Textarea from "../../elements/Inputs/Textarea";
import SmallNotification from "../../elements/Notifications/SmallNotification";
import Modal from "../../Modals/Modal";
import { Button } from '@mui/material';
import Input from '../../elements/Inputs/Input';
import { apiResponse } from '../../Functions/get_apiObj';
import ModalConfirm from "../../Modals/ModalConfirm";
import AccessCheck from '../../Functions/AccessCheck';
import { useSelector } from 'react-redux';
import ActionMenu from '../../Portals/ActionMenu';

const Fields = ({ fields, getCaseInfo, case_id, cg }) => {
    const [alert, setAlert] = useState({
        success: false,
        error: false,
        message: ""
    });
    const [open, setOpen] = useState(false);
    const [dataState, setDataState] = useState(fields);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        file_id: null
    });
    const [isEditing, setIsEditing] = useState(false);
    const [modal, setModal] = useState({
        add: false,
        confirm: false,
        deleteId: null
    });

    useEffect(() => {
        let item = localStorage.getItem("page_case_fields");
        if (item) {
            setOpen(item === "true");
        } else {
            setOpen(false);
        }
    }, []);

    const openHandler = () => {
        localStorage.setItem("page_case_fields", !open);
        setOpen(!open);
    };

    const handleFormChange = (key, value) => {
        setFormData({ ...formData, [key]: value });
    };

    const handleSubmit = () => {
        if (formData.title.length < 1 || formData.description.length < 1) {
            return handleAlertChange("error", LANG.fields.alertMessages.errorAddEmpty);
        }
        if (formData.title.length > 125) {
            return handleAlertChange("error", `${LANG.fields.alertMessages.errorAddLong}. Поточна довжина: ${formData.title.length} символів`);
        }

        if (isEditing) {
            updateInfo();
        } else {
            addInfo();
        }
    };

    const addInfo = () => {
        apiResponse({ ...formData, type: "field", client_id: case_id }, "manage/files/create.php").then((res) => {
            handleAlertChange("success", LANG.fields.alertMessages.successAdd);
            getCaseInfo();
            setModal({ ...modal, add: false });
            setFormData({ title: "", description: "", file_id: null });
        }).catch((err) => {
            handleAlertChange("error", LANG.fields.alertMessages.errorAdd);
        });
    };

    const updateInfo = () => {
        apiResponse({...formData, type: "field",}, "manage/files/update.php").then((res) => {
            handleAlertChange("success", LANG.fields.alertMessages.successEdit);
            getCaseInfo();
            setModal({ ...modal, add: false });
            setFormData({ title: "", description: "", file_id: null });
            setIsEditing(false);
        }).catch((err) => {
            handleAlertChange("error", LANG.fields.alertMessages.errorEdit);
        });
    };

    const handleEdit = (item) => {
        setFormData({ title: item.title, description: item.description, file_id: item.id });
        setIsEditing(true);
        setModal({ ...modal, add: true });
    };

    const handleDelete = () => {
        apiResponse({ file_id: modal.deleteId }, "manage/files/delete.php").then((res) => {
            handleAlertChange("success", "Інформацію видалено");
            getCaseInfo();
            setModal({ ...modal, confirm: false, deleteId: null });
        }).catch((err) => {
            handleAlertChange("error", "Помилка при видаленні");
        });
    };

    const handleAlertChange = (key, message) => {
        setAlert({ ...alert, [key]: !alert[key], message: message });
    };

    const handleModalChange = (key, value = null) => {
        setModal({ ...modal, [key]: !modal[key], deleteId: value });
    };

    const access = {
        case_simple_info_edit: AccessCheck("view_edit", "a_page_case_simple_info", "edit"),
        super: AccessCheck('super')
    }

    const InfoBlock = ({ item }) => {
            const menuItems = [
                {
                    title: LANG.GLOBAL.edit,
                    isHidden: false,
                    icon: "edit",
                    click: () => {
                        handleEdit(item)
                    }
                },
                {
                    itemType: 'divider'
                },
                {
                    title: LANG.GLOBAL.delete,
                    isHidden: false,
                    icon: "delete",
                    color: 'error',
                    click: () => {
                        handleModalChange("confirm", item.id)
                    }
                },
            ]
        const user = useSelector(state=>state.auth);

        return (
            <div className='Fields-InfoBlock'>
                <div className='Fields-InfoBlock-title'>
                    <div className='Fields-InfoBlock-title-block'>{item.title}</div>
                    {((access.case_simple_info_edit && item.user_id === user.id) || access.super) && 
                    <ActionMenu menuItems={menuItems}/>
                    }
                </div>
                <span>{item.description}</span>
            </div>
        );
    };



    return (
        <div className='Fields'>
            <div className='Fields-title'>
                <div className='Fields-title-panel' onClick={openHandler}>
                    <div>{LANG.fields.title}</div>
                    <Icon icon={"arrow_down"} addClass={"fs35 arrow"} />
                </div>
                {(access.case_simple_info_edit || access.super) && <Icon icon={"add"} addClass={"fs35"} onClick={() => { setModal({ ...modal, add: true }); setIsEditing(false); setFormData({ title: "", description: "", id: null }); }} />}
            </div>
            {open && <div>
                {fields.length > 0 && fields ? <div className='Fields-content'>
                    {fields.map((item, index) => {
                        return (
                            <InfoBlock key={index} item={item} />
                        );
                    })}
                </div> : <p>{LANG.no_records}</p>}
            </div>}
            {modal.add && <Modal closeHandler={() => { setModal({ ...modal, add: false }) }} header={isEditing ? LANG.fields.edit : LANG.fields.add} footer={
                <div className="Modal--footer">
                    <Button color="error" variant="contained" onClick={() => { setModal({ ...modal, add: false }) }}>{LANG.cancel}</Button>
                    <Button variant="contained" onClick={handleSubmit}>{LANG.save}</Button>
                </div>
            }>
                <Input addClass='w100' value={formData.title} onChange={(e) => { handleFormChange("title", e.target.value) }} label={LANG.GLOBAL.title} />
                <Textarea value={formData.description} onChange={(e) => { handleFormChange("description", e.target.value) }} label={LANG.GLOBAL.description} />
            </Modal>}
            {modal.confirm && <ModalConfirm closeHandler={() => { handleModalChange("confirm") }} successHandler={handleDelete}
                text={"Ви впевнені, що хочете видалити цю інформацію?"} />}
            {alert.success && <SmallNotification isSuccess={true} text={alert.message} close={() => { handleAlertChange("success", "") }} />}
            {alert.error && <SmallNotification isSuccess={false} text={alert.message} close={() => { handleAlertChange("error", "") }} />}
        </div>
    );
}

export default Fields;
