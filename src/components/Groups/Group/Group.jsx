import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { apiResponse } from '../../Functions/get_apiObj';
import Icon from '../../elements/Icons/Icon';
import { LANG } from '../../../services/config';
import SettingsModal from './SettingsModal';
import ModalConfirm from '../../Modals/ModalConfirm';
import { useSelector } from 'react-redux'

const Group = () => {
    const categories = useSelector(state => state.categories)
    const [data, setData] = useState({});
    const [settings, setSettings] = useState(false);
    const [modal, setModal] = useState({
        delete: false
    });

    const modalHandler = (key) => {
        setModal({ ...modal, [key]: !modal[key] });
    };

    const deleteHandler = (index) => {
        const newMas = [...data.members];
        newMas.splice(index, 1);
        setData({ ...data, members: newMas });
        modalHandler('delete');
    };

    const params = useParams();

    useEffect(() => {
        
        apiResponse({ group_id: params.id }, 'groups/get-group-by-id.php').then((res) => {
            setData(res)
        })
    }, [params.id]);
    const cutString = (str) => {
        return str.length <= 15 ? str : str.slice(0, 15) + "..."
    }
    const Member = ({ item, index }) => {
        const [editMember, setEditMember] = useState(0);
        return (
            <div className='Group-member' onMouseEnter={() => { setEditMember(1); }} onMouseLeave={() => { setEditMember(0); }}>
                <NavLink to={`/case/${item.case_id}`}>{item.name}</NavLink>
                <NavLink to={`tel:${item.phone1}`}>{item.phone1}</NavLink>
                <div title={item.why}>{cutString(item.why)}</div>
                {/* <span style={{ opacity: editMember }}>
                    <Icon icon={'delete'} addClass={'close-icon'} onClick={() => { modalHandler('delete'); }} />
                </span> */}
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
                    <div className='Group-title-line' style={{backgroundColor:data.group?.groupColor?data.group.groupColor:"#000"}}></div>
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
                    <div className='Group-info-title'>Інформація про групу</div>
                    <div className='Group-info-inner'>
                        <div className='Group-info-stats-item'>
                            <Icon icon={"date_created"} addClass={"default-icon"} />
                            <div className='Group-info-stats-item-text'>
                                <div>Дата створення</div>
                                <span>{data.group?.groupDateCreated}</span>
                            </div>
                        </div>
                        <div className='Group-info-stats-item'>
                            <Icon icon={"categories"} addClass={"default-icon"} />
                            <div className='Group-info-stats-item-text'>
                                <div>Категорія</div>
                                <span>{getString(data.group?.groupCategories)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Group;
