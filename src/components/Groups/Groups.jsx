import React, { useEffect, useState } from "react";
import AddGroup from "./AddGroup";
import { apiResponse } from "../Functions/get_apiObj";
import Icon from "../elements/Icons/Icon";
import { useSelector } from "react-redux";
import { LANG, appConfig } from "../../services/config";
import { NavLink } from "react-router-dom";
import AccessCheck from "../Functions/AccessCheck";
import moment from "moment";

const GroupCard = ({ item, loadGroups }) => {
    const categories = useSelector(state => state.categories);
    const accessEdit = AccessCheck("view_edit", "a_page_groups", "edit");
    const [edit, setEdit] = useState(false);
    const [data, setData] = useState({
        name: item.name,
        description: item.description,
        color: item.color,
        categories: item.categories
    });

    const getCategoryName = (id) => {
        const category = Object.values(categories.groups).find(category => category.id === id);
        return category ? category.name : '';
    };

    const getString = () => {
        let mas = data.categories.map(id => getCategoryName(id));
        return mas ? mas.join(', ') : null;
    };

    const cutDescription = (str) => {
        return str.length > 100 ? str.slice(0, 100) + "..." : str;
    };

    return (
        <div className="GroupCard" style={{ boxShadow: `0px 0px 5px 0px ${item.color}` }}>
            <div className="GroupCard-inner">
                <div className="GroupCard-line" style={{ backgroundColor: item.color }}></div>
                <NavLink to={`/group/${item.id}`}>{item.name}</NavLink>
                <div>{cutDescription(item.description)}</div>
                <div>{LANG.groups.amount}: {item.connect_count}</div>
                <div>
                    {getString() ? <span>{LANG.categories.category}: <b>{getString()}</b></span>
                        : <span>{LANG.categories.noCategory}</span>}
                </div>
            </div>
            <div className="GroupCard-split">
                {accessEdit && <Icon icon={"edit"} addClass={"default-icon"} onClick={() => { setEdit(!edit) }} />}
                <div className="GroupCard-split-date">{moment(item.date_created).format('DD-MM-YYYY')}</div>
            </div>
            {edit && <AddGroup loadGroups={loadGroups} action={"edit"} data={data} id={item.id} close={() => { setEdit(false) }} />}
        </div>
    );
};

const Groups = () => {
    const categories = useSelector(state => state.categories);
    const [add, setAdd] = useState(false);
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        loadGroups();
    }, []);

    const loadGroups = () => {
        apiResponse({}, "groups/get-case-groups.php").then((res) => {
            setGroups([...res]);
        });
    };

    return (
        <div className="Groups">
            <div className="Groups-title">
                <p>{appConfig.pages.groups.title}</p>
                {AccessCheck('yes_no', 'a_groups_create') && <Icon icon={"add"} onClick={() => setAdd(true)} />}
                {add && <AddGroup loadGroups={loadGroups} action={"add"} close={() => { setAdd(false) }} />}
            </div>
            <div className="Groups-list">
                {groups.map((item, index) => (
                    <GroupCard loadGroups={loadGroups} key={index} item={item} />
                ))}
            </div>
        </div>
    );
};

export default Groups;
