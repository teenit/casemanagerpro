import React, { useEffect, useState } from "react";
import AddGroup from "./AddGroup";
import { apiResponse } from "../Functions/get_apiObj";
import Icon from "../elements/Icons/Icon";
import { rgbToHex } from "../Functions/rgbToHex";
import Input from "../elements/Inputs/Input";
import { useSelector } from "react-redux";
const GroupCard = ({ item, loadGroups }) => {
    
    const [edit, setEdit] = useState(false)
    const [data, setData] = useState({
        name: item.name,
        description: item.description,
        color: item.color
    })
    const dataHandler = (key, value) => {
        setData({ ...data, [key]: value })
    }
    return (
        <div className="GroupCard">
            <div className="GroupCard-split">
                <div>{item.name}</div>
                <div className="GroupCard-split-color" style={{ backgroundColor: item.color }}></div>
            </div>
            <div>{item.description}</div>
            <div>Кількість об`єктів: {item.connect_count}</div>
            <div className="GroupCard-split">
                <div className="GroupCard-split-date">{item.date_created}</div>
                <span onClick={() => { setEdit(!edit) }}>
                    <Icon icon={"edit"} addClass={"default-icon"} />
                </span>
            </div>
            {edit && <AddGroup loadGroups={loadGroups} action={"edit"} data={data} id={item.id} close={()=>{setEdit(false)}} />}
        </div>
    )
}
const Groups = () => {
    
    const [add,setAdd] = useState(false)
    const [groups, setGroups] = useState([])
    useEffect(() => {
        loadGroups();
    }, [])
    const loadGroups = () => {
        apiResponse({}, "groups/get-case-groups.php").then((res) => {
            setGroups([...res])
            console.log(res)
        })
       
    }
    return (
        <div className="Groups">
            <div className="Groups-title">
                <p>Groups</p>
                <div className="AddGroup">
                    <div className="AddGroup-plus" onClick={() => setAdd(true)}>
                        <Icon icon={"add"} />
                    </div>
                </div>
                {add && <AddGroup loadGroups={loadGroups} action={"add"} close={()=>{setAdd(false)}} />}
                    
                </div>
                <div className="Groups-list">
                    {groups.map((item, index) => {
                        return (
                            <GroupCard loadGroups={loadGroups} key={index} item={item} />
                        )
                    })}
                </div>
            </div>
            )
}

            export default Groups;