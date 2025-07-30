import React, { useEffect, useState } from 'react';
import Icon from '../../elements/Icons/Icon';
import Modal from '../../Modals/Modal';
import { Button, MenuItem, Select } from '@mui/material';
import { LANG } from '../../../services/config';
import { apiResponse } from '../../Functions/get_apiObj';
import Textarea from '../../elements/Inputs/Textarea';
import SmallNotification from '../../elements/Notifications/SmallNotification';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import AccessCheck from '../../Functions/AccessCheck';

const GroupConnections = ({ case_id, type, cg }) => {
    const [open, setOpen] = useState(false);
    const openHandler = () => {
        localStorage.setItem("page_case_connections", !open);
        setOpen(!open);
    };
    const access = {
        case_connection_edit: AccessCheck("view_edit", "a_page_case_connection", "edit") && cg,
        case_connection_view: AccessCheck("view_edit", "a_page_case_connection", "view"),
        super: AccessCheck('super')
    }
    useEffect(() => {
        let item = localStorage.getItem("page_case_connections");
        if (item) {
            if (item === "true") {
                setOpen(true);
            } else {
                setOpen(false);
            }
        } else {
            setOpen(false);
        }
    }, []);
    const [modal, setModal] = useState({
        add: false,
        info: false
    });
    const [allGroups, setAllGroups] = useState([]);
    const [connections, setConnections] = useState([]);
    const [data, setData] = useState({
        group_id: "",
        why: ""
    });
    const [alert, setAlert] = useState({
        success: false,
        error: false,
        message: ""
    });

    const loadConnections = () => {
        apiResponse({ ...data, client_id: case_id, type: type }, "groups/get-group-connect-by-case-id.php").then((res) => {
            setConnections([...res]);
        });
    };
    useEffect(() => {
        apiResponse({}, "groups/get-case-groups.php").then((res) => {
            setAllGroups(res);
            setData(prev => ({
                ...prev,
                group_id: res.length > 0 ? res[0].id : ""
            }));
        });
        loadConnections();
    }, []);


    const dataHandler = (key, value) => {
        let val = key === "group_id" ? Number(value) : value;
        setData({ ...data, [key]: val });
    };

    const alertHandler = (key, message = "") => {
        setAlert({ ...alert, [key]: !alert[key], message });
    };

    const modalHandler = (key) => {
        setModal({ ...modal, [key]: !modal[key] });
    };

    const checkForm = () => {
        if (data.group_id === "") {
            alertHandler("error", LANG.groups.alertMessages.error);
        } else if (data.why.length > 150) {
            alertHandler("error", `Причина зв'язку повинна бути довжиною до 150 символів. Поточна довжина: ${data.why.length} символів`);
        } else {
            successHandler();
        }
    };

    const successHandler = () => {
        apiResponse({ ...data, client_id: case_id, type: type }, "groups/add-group-connect.php").then((res) => {
            alertHandler("success", LANG.groups.alertMessages.success);
            modalHandler("add");
            setOpen(true);
            dataHandler("why", "");
            apiResponse({ ...data, client_id: case_id, type: type }, "groups/get-group-connect-by-case-id.php").then((res) => {
                setConnections(res);
                const unused = allGroups.filter(item => !res.some(conn => item.name === conn.name));
                if (unused.length > 0) {
                    setData(prev => ({ ...prev, group_id: unused[0].id }));
                } else {
                    setData(prev => ({ ...prev, group_id: "" }));
                }
            });
        });
    };


    const getUnusedGroups = () => {
        return allGroups.filter(item => !connections.some(conn => item.name === conn.name));
    };

    const deleteGroupConnect = (id) => {
        apiResponse({
            connect_id: id
        }, "groups/delete-group-connect.php").then((res) => {
            apiResponse({ ...data, client_id: case_id, type: type }, "groups/get-group-connect-by-case-id.php").then((res) => {
                setConnections([...res]);
            });
        });
    };

    return (
        <div className='GroupConnections'>
            <div className="GroupConnections-title">
                <div className='GroupConnections-title-panel' onClick={openHandler}>
                    <span>{LANG.groups.title_case}</span>
                    <Icon addClass={`fs16`} icon={'arrow_down'} />
                </div>
                {(access.case_connection_edit || access.super) && <span onClick={() => modalHandler("add")}>
                    <Icon icon={"add"} />
                </span>}
            </div>
            {open && <div className='GroupConnections-list'>
                {connections.length > 0 ? connections.map((item, index) => {
                    return (
                        <div key={index} className='GroupConnections-list-item'>
                            <span><NavLink to={`/group/${item.group_id}`}>{item.name}</NavLink>: {item.why}</span>
                            {access.case_connection_edit && <Icon addClass={"delete-icon"} icon={'delete'} onClick={() => deleteGroupConnect(item.id)} />}
                        </div>
                    )
                }) : <p style={{ margin: "15px 0px" }}>{LANG.no_records}</p>}
            </div>}

            {modal.add && (
                <Modal header={LANG.groups.add} closeHandler={() => modalHandler("add")}
                    footer={<Button variant='contained' onClick={checkForm}>{LANG.save}</Button>}>
                    <div className='GroupConnections-select'>
                        <span>{LANG.groups.title_case}</span>
                        <Select value={data.group_id} onChange={(e) => dataHandler("group_id", e.target.value)}>
                            {getUnusedGroups().map((item, index) => {
                                return <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                            })}
                        </Select>
                    </div>
                    <Textarea label={LANG.placeholders.connect} value={data.why} onChange={(e) => { dataHandler("why", e.target.value) }} />
                </Modal>
            )}
            {alert.error && <SmallNotification isSuccess={false} text={alert.message} close={() => { alertHandler("error") }} />}
            {alert.success && <SmallNotification isSuccess={true} text={alert.message} close={() => { alertHandler("success") }} />}
        </div>
    );
}

export default GroupConnections;
