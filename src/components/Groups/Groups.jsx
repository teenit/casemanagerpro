import React, { useEffect, useState } from "react";
import AddGroup from "./AddGroup";
import { apiResponse } from "../Functions/get_apiObj";
import Icon from "../elements/Icons/Icon";
import { useSelector } from "react-redux";
import { LANG, appConfig } from "../../services/config";

const GroupCard = ({ item, loadGroups }) => {
    const categories = useSelector(state => state.categories);
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
        return mas ? mas.join(', ') : null
    };

    return (
        <div className="GroupCard">
            <div className="GroupCard-split">
                <div onClick={()=>{
                    apiResponse({group_id: item.id},'groups/get-group-by-id.php').then((res)=>{
                        console.log(res)
                    })
                }}>{item.name}</div>
                <div className="GroupCard-split-color" style={{ backgroundColor: item.color }}></div>
            </div>
            <div>{item.description}</div>
            <div>{LANG.groups.amount}: {item.connect_count}</div>
            <div>
                {getString() ? <span>{LANG.categories.category}: <b>{getString()}</b></span>
                :<span>{LANG.categories.noCategory}</span>}
            </div>
            <div className="GroupCard-split">
                <div className="GroupCard-split-date">{item.date_created}</div>
                <span onClick={() => { setEdit(!edit) }}>
                    <Icon icon={"edit"} addClass={"default-icon"} />
                </span>
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
    }, [categories]);

    const loadGroups = () => {
        apiResponse({}, "groups/get-case-groups.php").then((res) => {
            setGroups([...res]);
        });
    };

    return (
        <div className="Groups">
            <div className="Groups-title">
                <p>{appConfig.pages.groups.title}</p>
                <div className="AddGroup">
                    <div className="AddGroup-plus" onClick={() => setAdd(true)}>
                        <Icon icon={"add"} />
                    </div>
                </div>
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
