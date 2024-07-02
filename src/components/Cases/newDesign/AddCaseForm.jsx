import React, { useEffect, useState } from "react";
import Input from "../../elements/Inputs/Input";
import { changeAps, changeApsBr } from "../../Functions/translateString";
import { apiResponse } from '../../Functions/get_apiObj'
import SmallNotification from "../../elements/Notifications/SmallNotification";
import { useSelector } from "react-redux";
import Textarea from "../../elements/Inputs/Textarea"
import { Button, MenuItem, Select } from "@mui/material";
import CheckboxListAccess from "../../elements/CheckBoxes/CheckboxListAccess";
import { NavLink, useNavigate } from "react-router-dom";
import { LANG } from "../../../services/config";
const AddCaseForm = () => {
    const navigate = useNavigate();
    const [isDataEmpty, setIsDataEmpty] = useState({
        data:true,
        categories:true
    })
    const [id,setId] = useState(0)
    const [alert, setAlert] = useState(false)
    const [errorAlert, setErrorAlert] = useState({
        status:false,
        text:""
    })
    const categories = useSelector(state => state.categories.case);  
    const [checkedMas, setCheckedMas] = useState([])
    const [stateGeneral, setStateGeneral] = useState({
        first_name: "",
        middle_name: "",
        last_name: "",
        phone1: "",
        phone2: "",
        sex:" ",
        email: "",
        happy_bd: " ",
    })
    const initialStateData = {
        case_id: id,
        address_registered: "",
        address_live: "",
        categories: [],
        channel: "",
        date_first_contact: "",
        contract_date: "",
        contract_number: "",
        comment: "",
        potreba: "",
        family_info: "",
        history: ""
    }
    const [stateData, setStateData] = useState({...initialStateData})
    function checkChanges(obj){
        const hasChanges = (JSON.stringify(initialStateData) !== JSON.stringify(obj));
        console.log(JSON.stringify(initialStateData), JSON.stringify(obj));
        setIsDataEmpty({...isDataEmpty,data:!hasChanges});
    }
    const handleCheckboxChange = (value, options) => {
        let categories = [];
        if (options.includes(value)) {
          categories = options.filter(element => element !== value);
          
        } else {
          categories = [...options, value];
        }
        setCheckedMas([...categories])
        if(JSON.stringify(categories)===JSON.stringify([])){
            setIsDataEmpty({...isDataEmpty, categories:true})
        }else{
            setIsDataEmpty({...isDataEmpty, categories:false})
        }
      };


    const [switchData, setSwitchData] = useState({
        general: true,
        data: false
    })
    function changeHandlerGeneral(key, val) {
        setStateGeneral({ ...stateGeneral, [key]: val })
    }

    function changeHandlerData(key, val) {
        setStateData({ ...stateData, [key]: val });
        checkChanges({ ...stateData, [key]: val })
    }
    
    function handleSubmit() {
        if (stateGeneral.first_name.length < 1) {
            setErrorAlert({...alert,status:true,text:LANG.add_case.alertMessages.name})
        } else if (stateGeneral.phone1.length < 10 || stateGeneral.phone1.length > 13) {
            setErrorAlert({...alert,status:true,text:LANG.add_case.alertMessages.phone})
        }else{
            sendGeneral()
        }
    }
    function sendGeneral() {
        apiResponse({ ...stateGeneral }, "case/create-case.php").then(data => {
            if (data.id) {
                setStateData({ ...stateData, case_id: data.id });
                setSwitchData({ ...switchData, general: false, data: true });
                setId(data.id)
            };
        })
    }
    function sendData() {
        // if (checkedMas.length == 0) return setErrorAlert({...errorAlert,status:true,text:"Виберіть хоча б одну категорію кейсу"});
        apiResponse({ ...stateData, categories: categories }, "case/update-case-data").then(data => {
            navigate("/case/" + stateData.case_id)
        })
        setAlert(true)
    }

    function saveHandler() {
        sendData()
    }
    return (
        <div className="AddCaseForm">
            <h1>{LANG.add_case.title}</h1>
            {switchData.general ?
                <div className="AddCaseForm-inner">
                    <div className="AddCaseForm-inner-line-three w100">
                        <div >
                            <p>{LANG.case_data.first_name} <span className="required">*</span></p>
                            <Input
                                value={stateGeneral.first_name}
                                onChange={(e) => {
                                    changeHandlerGeneral("first_name", changeAps(e.target.value))
                                }}
                            />
                        </div>
                        <div>
                            <p>{LANG.case_data.middle_name}</p>
                            <Input
                                value={stateGeneral.middle_name}
                                onChange={(e) => {
                                    changeHandlerGeneral("middle_name", changeAps(e.target.value))
                                }}
                            />
                        </div>
                        <div>
                            <p>{LANG.case_data.last_name}</p>
                            <Input
                                value={stateGeneral.last_name}
                                onChange={(e) => {
                                    changeHandlerGeneral("last_name", changeAps(e.target.value))
                                }}
                            />
                        </div>
                    </div>
                    <div className="AddCaseForm-inner-line-three w100">
                        <div>
                            <p>{LANG.case_data.phone} 1<span className="required">*</span></p>
                            <Input
                                type="number"
                                value={stateGeneral.phone1}
                                onChange={(e) => {
                                    changeHandlerGeneral("phone1", changeAps(e.target.value))
                                }}
                            />
                        </div>
                        <div>
                            <p>{LANG.case_data.phone} 2</p>
                            <Input
                                type="number"
                                value={stateGeneral.phone2}
                                onChange={(e) => {
                                    changeHandlerGeneral("phone2", changeAps(e.target.value))
                                }}
                            />
                        </div>
                        <div>
                        <p>{LANG.case_data.sex}</p>
                        <Select value={stateGeneral.sex} onChange={(e)=>{changeHandlerGeneral("sex", e.target.value)}}>
                                <MenuItem value="male">{LANG.selects.sex.male}</MenuItem>
                                <MenuItem value="female">{LANG.selects.sex.female}</MenuItem>
                                <MenuItem value="other">{LANG.selects.sex.other}</MenuItem>
                        </Select>
                        </div>
                    </div>

                    <div className="AddCaseForm-inner-line-two w100">
                        <div>
                            <p>{LANG.case_data.email}</p>
                            <Input
                                value={stateGeneral.email}
                                onChange={(e) => {
                                    changeHandlerGeneral("email", changeAps(e.target.value))
                                }}
                            />
                        </div>
                        <div>
                            <p>{LANG.case_data.birthday}</p>
                            <Input
                                type="date"
                                value={stateGeneral.happy_bd}
                                onChange={(e) => {
                                    changeHandlerGeneral("happy_bd", changeAps(e.target.value))
                                }}
                            />
                        </div>
                    </div>
                    <Button variant="contained" onClick={handleSubmit}>Зберегти</Button>
                </div>
                :
                <div className="AddCaseForm-inner">
                    <div className="AddCaseForm-inner-line-three w100">
                        <div className="w100">
                            <p>{LANG.case_data.address_registered}</p>
                            <Input
                                value={stateData.address_registered}
                                onChange={(e) => {
                                    changeHandlerData("address_registered", changeAps(e.target.value))
                                }}
                            />
                        </div>
                        <div className="w100">
                            <p>{LANG.case_data.address_live}</p>
                            <Input
                                value={stateData.address_live}
                                onChange={(e) => {
                                    changeHandlerData("address_live", changeAps(e.target.value))
                                }}
                            />
                        </div>
                        <div className="w100">
                            <p>{LANG.case_data.channel}</p>
                            <Input
                                value={stateData.channel}
                                onChange={(e) => {
                                    changeHandlerData("channel", changeAps(e.target.value))
                                }}
                            />
                        </div>
                    </div>
                    <div className="AddCaseForm-inner-line-three w100">
                        <div className="w100">
                            <p>{LANG.case_data.first_contact}</p>
                            <Input
                                type="date"
                                value={stateData.date_first_contact}
                                onChange={(e) => {
                                    changeHandlerData("date_first_contact", changeAps(e.target.value))
                                }}
                            />
                        </div>
                        <div className="w100">
                            <p>{LANG.case_data.contract_date}</p>
                            <Input
                                type="date"
                                value={stateData.contract_date}
                                onChange={(e) => {
                                    changeHandlerData("contract_date", changeAps(e.target.value))
                                }}
                            />
                        </div>
                        <div className="w100">
                            <p>{LANG.case_data.contract_number}</p>
                            <Input
                                type="number"
                                value={stateData.contract_number}
                                onChange={(e) => {
                                    changeHandlerData("contract_number", changeAps(e.target.value))
                                }}
                            />
                        </div>
                    </div>

                    <div className="w100">
                        <p>{LANG.case_data.potreba}</p>
                        <Textarea rows={10} cols={70}
                            value={stateData.potreba}
                            onChange={(e) => {
                                changeHandlerData("potreba", changeApsBr(e.target.value))
                            }}
                        />
                    </div>

                    <div className="w100">
                        <p>{LANG.case_data.family}</p>
                        <Textarea rows={10} cols={70}
                            value={stateData.family_info}
                            onChange={(e) => {
                                changeHandlerData("family_info", changeApsBr(e.target.value))
                            }}
                        />
                    </div>
                    <div className="w100">
                        <p>{LANG.case_data.history}</p>
                        <Textarea rows={10} cols={70}
                            value={stateData.history}
                            onChange={(e) => {
                                changeHandlerData("history", changeApsBr(e.target.value))
                            }}
                        />
                    </div>
                    <div className="w100">
                            <p>{LANG.case_data.category}</p>
                            <CheckboxListAccess
                                allMas={()=>{return categories}} 
                                checkedMas={checkedMas}
                                onChange={(value)=>{
                                    handleCheckboxChange(value, checkedMas)}}
                            />
                        

                    </div>
                    <div className="w100">
                        <p>{LANG.case_data.comment}</p>
                        <Textarea rows={10} cols={70}
                            value={stateData.comment}
                            onChange={(e) => {
                                changeHandlerData("comment", e.target.value)
                            }}
                        />
                    </div>
                    <div>

                    </div>
                    <div className="AddCaseForm-inner-line-buttons">
                    <Button variant="contained" color="error" onClick={()=>{navigate("/case/" + stateData.case_id)}}>{LANG.GLOBAL.skip}</Button>
                    <Button variant="contained" disabled={isDataEmpty.data && isDataEmpty.categories} onClick={saveHandler}>{LANG.save}</Button>
                    </div>
                </div>
            }
            {alert &&
                <SmallNotification isSuccess={true} text="Дані збережено успішно" close={() => {
                        setAlert(false);
                    }}
                />
            }
            {errorAlert.status &&
                <SmallNotification isSuccess={false} text={errorAlert.text} close={() => {
                        setErrorAlert({...alert,status:false})
                    }}
                />
            }
        </div>
    )
}

export default AddCaseForm;