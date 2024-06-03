import React, { useEffect, useState } from 'react';
import Icon from '../../elements/Icons/Icon';
import Modal from '../../Modals/Modal';
import { Button } from '@mui/material';
import { LANG } from '../../../services/config';
import { apiResponse } from '../../Functions/get_apiObj';
import CheckboxListAccess from '../../elements/CheckBoxes/CheckboxListAccess';

const GroupConnections = () => {
    const [modal, setModal] = useState(false);
    const [allGroups,setAllGroups] = useState([])
    const [groups, setGroups] = useState([])
    useEffect(()=>{
        apiResponse({}, "groups/get-case-groups.php").then((res) => {
            setAllGroups([...res]);
            console.log(res);
        });
    },[])
    const handleCheckboxChange = (value) => {
        let categories = [];
        if (groups.includes(value)) {
            categories = groups.filter(element => element !== value);

        } else {
            categories = [...groups, value];
        }
        console.log(groups);
        setGroups([ ...groups ]);
    };
    return (
        <div className='GroupConnections'>
            <div className="GroupConnections-title">
                <span>Групи кейсу</span>
                <span onClick={() => setModal(true)}>
                    <Icon icon={"add"} />
                </span>
            </div>
            {modal && (
                <Modal header="Додати групу для кейсу" closeHandler={() => setModal(false)} 
                    footer={<Button variant='contained'>{LANG.save}</Button>}>
                    <div>
                        <span>Групи</span>
                        {groups.map((item,index)=>{
                            return <CheckboxListAccess allMas={allGroups} checkedMas={groups} onChange={(value)=>handleCheckboxChange(value)}/>
                        })}
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default GroupConnections;
