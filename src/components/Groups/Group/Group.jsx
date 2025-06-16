import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { apiResponse } from '../../Functions/get_apiObj';
import Icon from '../../elements/Icons/Icon';
import { LANG } from '../../../services/config';
import ModalConfirm from '../../Modals/ModalConfirm';
import { useSelector } from 'react-redux'
import { Switch } from '@mui/material';
import AccessCheck from '../../Functions/AccessCheck';
import ActionMenu from "../../Portals/ActionMenu"
import AddGroup from '../AddGroup';
const Group = () => {
    const categories = useSelector(state => state.categories)
    const [data, setData] = useState({});
    const [modal, setModal] = useState({
        confirm_delete_group: false,
        confirm_delete_user: false,
        edit: false,
    });
    const [currentUser, setCurrentUser] = useState(null)
    const showName = AccessCheck("yes_no", "a_page_group_names");
    const showPhone = AccessCheck("yes_no", "a_page_group_phones");
    const showFavourite = AccessCheck("yes_no", "a_page_group_favourite");

    const modalHandler = (key) => {
        setModal({ ...modal, [key]: !modal[key] });
    };
const navigate = useNavigate()
    const params = useParams();
    const getGroupData = () => {
        apiResponse({ group_id: params.id }, 'groups/get-group-by-id.php').then((res) => {
            setData(res)
        })
    }
    useEffect(() => {
        getGroupData()

    }, [params.id]);
    const cutString = (str) => {
        return str.length <= 15 ? str : str.slice(0, 15) + "..."
    }

    const saveHandler = (key, value) => {

        apiResponse({ [key]: value, group_id: params.id }, "groups/update-group-by-id.php").then((res) => {
            if (res.status) {
                getGroupData()
            }
        })
    }
    const Member = ({ item, index }) => {

        const [editMember, setEditMember] = useState(0);
        return (
            <div className='Group-member' onMouseEnter={() => { setEditMember(1); }} onMouseLeave={() => { setEditMember(0); }}>
                {index + 1}.
                {showName && <NavLink to={`/case/${item.case_id}`}>{item.name}</NavLink>}
                {showPhone && <NavLink to={`tel:${item.phone1}`}>{item.phone1}</NavLink>}
                <div title={item.why}>{cutString(item.why)}</div>
                <span style={{ opacity: editMember }}>
                    <Icon icon={'delete'} addClass={'delete-icon'} onClick={() => { 
                        modalHandler('confirm_delete_user'); 
                        setCurrentUser(item)
                        }} />
                </span>
                {/* {modal.delete && <ModalConfirm successHandler={() => { deleteHandler(index); }} closeHandler={() => { modalHandler('delete'); }}
                    text={`${LANG.groups.group.confirm} ${item.name}?`} />} */}
            </div>
        );
    };
    const getCategoryName = (id) => {
        const category = Object.values(categories.groups).find(category => category.id === id);
        return category ? category.name : '';
    }

    const getString = (cat) => {
        if (cat) {
            let mas = cat.map(id => getCategoryName(id))
            return mas.join(', ')
        } else {
            return null
        }
    }
    const menuItems = [
        {
            title: LANG.GLOBAL.edit,
            isHidden: false,
            icon: "edit",
            click: () => {
                modalHandler("edit")
            }
        }, {
            itemType: "divider"
        },
        {
            title: LANG.GLOBAL.delete,
            isHidden: false,
            icon: "delete",
            color: 'error',
            click: () => {
                modalHandler("confirm_delete_group")
            }
        }
    ]
    const deleteUser = () => {
        apiResponse({ connect_id: currentUser.connect_id }, "groups/delete-group-connect.php").then((res) => {
            getGroupData()
        });
    };
    const deleteGroup = ()=>{
        apiResponse({group_id:data.group.group_id}, "groups/delete-group.php").then((res)=>{
            navigate("/groups")
        })
    }
    return (
        <div className='Group'>
            {/* {settings ? <SettingsModal close={() => { setSettings(!settings); }} /> : (
                <div className='Group-settings'>
                    <Icon icon={'settings'} onClick={() => { setSettings(!settings); }} />
                </div>
            )} */}
            <div className='Group-title'>
                <div>
                    <div>{data.group?.groupName}</div>
                    <div className='Group-title-line' style={{ backgroundColor: data.group?.groupColor ? data.group.groupColor : "#000" }}></div>
                </div>
                <div className='Group-title-desc'>{data.group?.groupDescription}</div>
            </div>
            <div className="Group-info">
                <div className='Group-info-members'>
                    <div className='Group-info-title'>
                        <div>{LANG.groups.group.members}</div>
                    </div>
                    <div className='Group-info-inner'>
                        {data.members && data.members.length > 0 && data.members.map((item, index) => {
                            return <Member key={index} item={item} index={index} />;
                        })}
                    </div>
                </div>

                <div className='Group-info-stats'>
                    <div className='Group-info-title'>
                        <div>{LANG.groups.info}</div>
                        <ActionMenu menuItems={menuItems} />
                    </div>
                    <div className='Group-info-inner'>
                        <div className='Group-info-stats-item'>
                            <Icon icon={"date_created"} addClass={"default-icon"} />
                            <div className='Group-info-stats-item-text'>
                                <div>{LANG.groups.group.date_created}</div>
                                <span>{data.group?.groupDateCreated}</span>
                            </div>
                        </div>
                        {showFavourite && <div className='Group-info-stats-item'>
                            <Icon icon={"date_created"} addClass={"default-icon"} />
                            <div className='Group-info-stats-item-text'>
                                <div>{LANG.groups.group.favorites}
                                    <Switch checked={data.group?.is_favourite == 1 ? true : false} onChange={(e) => {
                                        if (e.target.checked) {
                                            saveHandler("is_favourite", 1);
                                        } else {
                                            saveHandler("is_favourite", 0);
                                        }
                                    }} /></div>

                            </div>
                        </div>}
                        <div className='Group-info-stats-item'>
                            <Icon icon={"categories"} addClass={"default-icon"} />
                            <div className='Group-info-stats-item-text'>
                                <div>{LANG.GLOBAL.category}</div>
                                <span>{getString(data.group?.groupCategories)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {modal.edit && <AddGroup data={{
                name: data.group.groupName,
                description: data.group.groupDescription,
                categories: data.group.groupCategories,
                color:data.group.groupColor
            }} close={()=>{modalHandler("edit")}}
            id={data.group.group_id} loadGroups={getGroupData}/>}
            {modal.confirm_delete_group && <ModalConfirm text={LANG.groups.group.delete_confirm} successHandler={deleteGroup} closeHandler={() => { modalHandler("confirm_delete_group") }} />}
            {modal.confirm_delete_user && <ModalConfirm text={LANG.groups.group.confirm} successHandler={deleteUser}  closeHandler={() => { modalHandler("confirm_delete_user") }} />}
        </div>
    );
};

export default Group;
