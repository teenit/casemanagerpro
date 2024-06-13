import React, { useEffect, useState } from 'react';
import Icon from '../../elements/Icons/Icon';
import Modal from '../../Modals/Modal';
import { Button, MenuItem, Select } from '@mui/material';
import { LANG } from '../../../services/config';
import { apiResponse } from '../../Functions/get_apiObj';
import CheckboxListAccess from '../../elements/CheckBoxes/CheckboxListAccess';
import Textarea from '../../elements/Inputs/Textarea';
import SmallNotification from '../../elements/Notifications/SmallNotification';
import { useSelector } from 'react-redux';

const GroupConnections = ({ case_id, type }) => {
    const categories = useSelector(state => state.categories)
    const [modal, setModal] = useState({
        add: false,
        info: false
    });
    const [allGroups, setAllGroups] = useState([])
    const [connections, setConnections] = useState([])
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [data, setData] = useState({
        group_id: "",
        why: ""
    })
    const [alert, setAlert] = useState({
        success: false,
        error: false
    })

    const [showList, setShowList] = useState(false);
    
    useEffect(() => {
        apiResponse({}, "groups/get-case-groups.php").then((res) => {
            setAllGroups([...res]);
        });
        apiResponse({ ...data, client_id: case_id, type: type }, "groups/get-group-connect-by-case-id.php").then((res) => {
            setConnections([...res])
        });
    }, [case_id, type, data])
    
    const dataHandler = (key, value) => {
        let val = key === "group_id" ? Number(value) : value
        setData({ ...data, [key]: val })
    }
    
    const alertHandler = (key) => {
        setAlert({ ...alert, [key]: !alert[key] })
    }
    
    const modalHandler = (key) => {
        setModal({ ...modal, [key]: !modal[key] })
    }
    
    const checkForm = () => {
        if (data.group_id === "") {
            alertHandler("error")
        } else {
            successHandler()
        }
    }
    
    const successHandler = () => {
        apiResponse({ ...data, client_id: case_id, type: type }, "groups/add-group-connect.php").then((res) => {
            alertHandler("success")
        })
    }
    
    const getUnusedGroups = () => {
        return allGroups.filter(item => !connections.some(conn => item.name === conn.name))
    }
    
    const getCategoryName = (id) => {
        const category = Object.values(categories.groups).find(category => category.id === id);
        return category ? category.name : '';
    }
    
    const getString = (cat) => {
        if (cat) {
            let mas = JSON.parse(cat).map(id => getCategoryName(id))
            return mas.join(', ')
        } else {
            return null
        }
    }
    
    const showGroupInfo = (group) => {
        setSelectedGroup(group);
        modalHandler('info');
    }

    const deleteGroupConnect = (id) => {
        apiResponse({
            connect_id: id
        },"groups/delete-group-connect.php").then((res)=>{
            apiResponse({ ...data, client_id: case_id, type: type }, "groups/get-group-connect-by-case-id.php").then((res) => {
                setConnections([...res])
            });
        })
    }
    
    return (
        <div className='GroupConnections'>
            <div className="GroupConnections-title">
                <span>Групи кейсу</span>
                <span onClick={() => modalHandler("add")}>
                    <Icon icon={"add"} />
                </span>
                <span onClick={()=>setShowList(!showList)}>
                    <Icon icon={'arrow_down'}/>
                </span>
            </div>
            {showList && <>
                {connections.map((item, index) => {
                return (
                    <div key={index} className='GroupConnections-item'>
                        <span><b onClick={() => item.status === 1 && showGroupInfo(item)}>{item.name}</b>: {item.why}</span>
                        <span onClick={()=>deleteGroupConnect(item.id)}><Icon icon={'delete'} /></span>
                    </div>
                )
                })}
            </>}
            

            {modal.add && (
                <Modal header="Додати групу для кейсу" closeHandler={() => modalHandler("add")}
                    footer={<Button variant='contained' onClick={checkForm}>{LANG.save}</Button>}>
                    <div className='GroupConnections-select'>
                        <span>Групи</span>
                        <Select value={data.group_id} onChange={(e) => dataHandler("group_id", e.target.value)}>
                            {getUnusedGroups().map((item, index) => {
                                return <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                            })}
                        </Select>
                    </div>
                    <Textarea label={LANG.placeholders.connect} value={data.why} onChange={(e) => { dataHandler("why", e.target.value) }} />
                </Modal>
            )}
            {modal.info && selectedGroup && (
                <Modal header={`Інформація про групу ${selectedGroup.name}`} closeHandler={() => modalHandler("info")}
                    footer={<Button variant='contained' onClick={() => modalHandler("info")}>{LANG.buttonTexts.ok}</Button>}>
                    <div className='GroupConnections-modal'>
                        <span><b>Опис групи:</b> {selectedGroup.description}</span>
                        <span><b>Дата створення групи:</b> {selectedGroup.date_created}</span>
                        {getString(selectedGroup.categories) ? <span><b>{LANG.categories.category}</b>: {getString(selectedGroup.categories)}</span>
                            : <span>{LANG.categories.noCategory}</span>}
                    </div>
                </Modal>
            )}
            {alert.error && <SmallNotification isSuccess={false} text={LANG.groups.alertMessages.error} close={() => { alertHandler("error") }} />}
            {alert.success && <SmallNotification isSuccess={true} text={LANG.groups.alertMessages.success} close={() => { alertHandler("success") }} />}
        </div>
    );
}

export default GroupConnections;
