import axios from "axios";
import React, { useState, useEffect } from "react";
import { serverAddres } from "../../Functions/serverAddres";
import s from "./modal.module.css";
import Input from '../../elements/Inputs/Input';
import { apiResponse } from "../../Functions/get_apiObj";
import { Button } from "@mui/material";
import SmallNotification from "../../elements/Notifications/SmallNotification";
import { LANG } from "../../../services/config";

const SearchCase = ({ eventID, getUsers }) => {
    const [sCase, setSCase] = useState({ userName: "", phone: "", id: 0 });
    const [searchVal, setSearchVal] = useState("");
    const [userInSystem, setSCaseInSystem] = useState(true);
    const [searchRes, setSearchRes] = useState([]);
    const [alert, setAlert] = useState({
        success:false,
        error:false
    })
    const alertHandler = (key)=>{
        setAlert({...alert, [key]:!alert[key]})
    }
    useEffect(() => {
        if (searchVal.trim()) {
            search()
        } else {
            setSearchRes([])
        }
    }, [searchVal]);

    function search() {
        apiResponse({ val:searchVal }, "case/search.php")
            .then((data) => {
                // const filteredResults = data.mas.filter(item =>
                //     item.name.toLowerCase().includes(searchVal.toLowerCase())
                // );
                setSearchRes(data.mas)
            })
            .catch((error) => console.log(error))
    }

    function addUser() {
        if (sCase.userName === "" || sCase.phone === "" || (sCase.phone && sCase.phone.length !== 10 && sCase.phone.length !== 13)) {
            return alertHandler("error");
          }
          
        let obj = {
            userName: sCase.userName,
            phone: sCase.phone,
            userID: sCase.id,
            eventID: eventID
        };
        apiResponse({...obj}, "event/add-member-case.php").then((data) => {
                if (data) {
                    alertHandler("success")
                    getUsers(eventID, "eventMemberCase")
                }
            })
            .catch((error) => console.log(error))
    }

    return (
        <div className={s.add__user__wrap}>
            <p className={s.add__user__title}>Додати учасника івента (для кого івент)</p>
            <p className={s.add__user__choice}>
                <span className={userInSystem ? s.active__choice : null} onClick={() => {
                    setSCaseInSystem(true)
                    setSCase({ userName: "" })
                }}>Існуючий</span> |
                <span className={!userInSystem ? s.active__choice : null} onClick={() => {
                    setSCaseInSystem(false)
                    setSCase({ userName: "", phone: "", id: 0 })
                }}>Новий</span>
            </p>
            {userInSystem ?
                <div className={s.add__user__search}>
                    <Input
                        label={LANG.GLOBAL.search}
                        value={sCase.userName}
                        className={s.search__inp}
                        type="text"
                        onChange={(val) => {
                            setSearchVal(val.target.value);
                            setSCase({ ...sCase, userName: val.target.value });
                        }}
                    />
                    <div className={s.add__case__results}>
                        <div className={s.add__user__result}>
                            {searchRes.map((item, index) => {
                               return <div
                                    key={item.id}
                                    className={s.add__user__item}
                                    onClick={() => {
                                        let pib = item.name.trim()
                                        setSCase({ ...sCase, userName: pib, id: item.id, phone: item.phone1 })
                                        setSearchRes([])
                                    }}
                                >
                                    <p className={s.add__user__item__p}>{item.name}</p>
                                </div>
                            })}
                        </div>
                    </div>
                </div>
                :
                <div className={s.add__user__form}>
                    <Input
                        value={sCase.userName}
                        label={LANG.GLOBAL.pib}
                        type="text"
                        onChange={(e) => {
                            setSCase({ ...sCase, userName: e.target.value });
                        }}
                    />
                    <Input
                        value={sCase.phone}
                        label={LANG.GLOBAL.phone}
                        type="number"
                        onChange={(e) => {
                            setSCase({ ...sCase, phone: e.target.value.trim() });
                        }}
                    />
                </div>
            }
            <div className={s.button__wrap}>
                <Button variant="contained" onClick={addUser}>{LANG.ADD_MEMBERS.add}</Button>
            </div>
            {alert.error&&<SmallNotification isSuccess={false} text={LANG.ADD_MEMBERS.error_data} close={()=>{alertHandler("error")}}/>}
            {alert.success&&<SmallNotification isSuccess={true} text={LANG.ADD_MEMBERS.success} close={()=>{alertHandler("success")}}/>}
        </div>
    )
}

export default SearchCase;
