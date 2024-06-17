import React, { useEffect, useState } from "react";
import Input from "../../elements/Inputs/Input";
import { changeAps, changeApsBr } from "../../Functions/translateString";
import { apiResponse } from '../../Functions/get_apiObj'
import SmallNotification from "../../elements/Notifications/SmallNotification";
import { useSelector } from "react-redux";
import Textarea from "../../elements/Inputs/Textarea"
import { Button } from "@mui/material";
import CheckboxListAccess from "../../elements/CheckBoxes/CheckboxListAccess";
import { NavLink, useNavigate } from "react-router-dom";
const AddCaseForm = () => {
    const navigate = useNavigate();
    const options = []
    const [width, setWidth] = useState(window.innerWidth)
    const [alert, setAlert] = useState(false)
    const [errorAlert, setErrorAlert] = useState({
        status:false,
        text:""
    })
    const categories = useSelector(state => state.categories.case);  
    const [state, setState] = useState({
        general: true
    })
    // const [categories,setCategories] = useState(null)
    // useEffect(() => {
    //     apiResponse({}, "manage/get-categories-case.php").then((res) => {
    //         setCategories([...res.mas]);
    //     });
    // }, []);
    const [checkedMas, setCheckedMas] = useState([])
    const [stateGeneral, setStateGeneral] = useState({
        first_name: "",
        middle_name: "",
        last_name: "",
        phone1: "",
        phone2: "",
        email: "",
        happy_bd: "",
    })
    const [stateData, setStateData] = useState({
        case_id: 0,
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
    })
    // const handleCheckboxChange = (val) => {
    //     setStateData(prevState => ({
    //         ...prevState,
    //         categories: val
    //     }));
    // };

    const handleCheckboxChange = (value, options) => {
        let categories = [];
        if (options.includes(value)) {
          categories = options.filter(element => element !== value);
          
        } else {
          categories = [...options, value];
        }
       // setState({...state, [key]:{...state[key], value: value}})
        setCheckedMas([...categories])
      };


    const [switchData, setSwitchData] = useState({
        general: true,
        data: false
    })
    function changeHandlerGeneral(key, val) {
        setStateGeneral({ ...stateGeneral, [key]: val })
    }
    function changeHandlerData(key, val) {
        setStateData({ ...stateData, [key]: val })
    }
    function handleSubmit() {
        if (stateGeneral.first_name.length < 1) {
            setErrorAlert({...alert,status:true,text:"Будь ласка, введіть ім'я кейсу"})
        } else if (stateGeneral.phone1.length < 10 || stateGeneral.phone1.length > 13) {
            setErrorAlert({...alert,status:true,text:"Будь ласка, введіть номер телефону кейсу"})
        }else{
            sendGeneral()
        }
    }
    function sendGeneral() {
        apiResponse({ ...stateGeneral }, "case/create-case.php").then(data => {
            if (data.id) {
                setStateData({ ...stateData, case_id: data.id });
                setSwitchData({ ...switchData, general: false, data: true });
            };
        })
    }
    function sendData() {
        if (checkedMas.length == 0) return setErrorAlert({...errorAlert,status:true,text:"Виберіть хоча б одну категорію кейсу"});
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
            <h1>Додати кейс</h1>
            {switchData.general ?
                <div className="AddCaseForm-inner">
                    <div className="AddCaseForm-inner-line-three w100">
                        <div >
                            <p>Ім'я <span className="required">*</span></p>
                            <Input
                                value={stateGeneral.first_name}
                                onChange={(e) => {
                                    changeHandlerGeneral("first_name", changeAps(e.target.value))
                                }}
                            />
                        </div>
                        <div>
                            <p>Прізвище</p>
                            <Input
                                value={stateGeneral.middle_name}
                                onChange={(e) => {
                                    changeHandlerGeneral("middle_name", changeAps(e.target.value))
                                }}
                            />
                        </div>
                        <div>
                            <p>По батькові</p>
                            <Input
                                value={stateGeneral.last_name}
                                onChange={(e) => {
                                    changeHandlerGeneral("last_name", changeAps(e.target.value))
                                }}
                            />
                        </div>
                    </div>
                    <div className="AddCaseForm-inner-line-two w100">
                        <div>
                            <p>Номер телефону 1 <span className="required">*</span></p>
                            <Input
                                type="number"
                                value={stateGeneral.phone1}
                                onChange={(e) => {
                                    changeHandlerGeneral("phone1", changeAps(e.target.value))
                                }}
                            />
                        </div>
                        <div>
                            <p>Номер телефону 2</p>
                            <Input
                                type="number"
                                value={stateGeneral.phone2}
                                onChange={(e) => {
                                    changeHandlerGeneral("phone2", changeAps(e.target.value))
                                }}
                            />
                        </div>
                    </div>

                    <div className="AddCaseForm-inner-line-two w100">
                        <div>
                            <p>Електронна пошта</p>
                            <Input
                                value={stateGeneral.email}
                                onChange={(e) => {
                                    changeHandlerGeneral("email", changeAps(e.target.value))
                                }}
                            />
                        </div>
                        <div>
                            <p>Дата народження</p>
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
                            <p>Місце проживання по прописці</p>
                            <Input
                                value={stateData.address_registered}
                                onChange={(e) => {
                                    changeHandlerData("address_registered", changeAps(e.target.value))
                                }}
                            />
                        </div>
                        <div className="w100">
                            <p>Фактичне місце проживання</p>
                            <Input
                                value={stateData.address_live}
                                onChange={(e) => {
                                    changeHandlerData("address_live", changeAps(e.target.value))
                                }}
                            />
                        </div>
                        <div className="w100">
                            <p>Канал комунікації</p>
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
                            <p>Дата першого контакту</p>
                            <Input
                                type="date"
                                value={stateData.date_first_contact}
                                onChange={(e) => {
                                    changeHandlerData("date_first_contact", changeAps(e.target.value))
                                }}
                            />
                        </div>
                        <div className="w100">
                            <p>Дата укладення договору</p>
                            <Input
                                type="date"
                                value={stateData.contract_date}
                                onChange={(e) => {
                                    changeHandlerData("contract_date", changeAps(e.target.value))
                                }}
                            />
                        </div>
                        <div className="w100">
                            <p>Номер договору</p>
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
                        <p>Потреба, запит</p>
                        <Textarea rows={10} cols={70}
                            value={stateData.potreba}
                            onChange={(e) => {
                                changeHandlerData("potreba", changeApsBr(e.target.value))
                            }}
                        />
                    </div>

                    <div className="w100">
                        <p>Сімейний стан, деталі про сім'ю, її склад</p>
                        <Textarea rows={10} cols={70}
                            value={stateData.family_info}
                            onChange={(e) => {
                                changeHandlerData("family_info", changeApsBr(e.target.value))
                            }}
                        />
                    </div>
                    <div className="w100">
                        <p>Історія сім'ї / особи</p>
                        <Textarea rows={10} cols={70}
                            value={stateData.history}
                            onChange={(e) => {
                                changeHandlerData("history", changeApsBr(e.target.value))
                            }}
                        />
                    </div>
                    <div className="w100">

                            <p>Категорія кейсу<span className="required">*</span></p>
                            <CheckboxListAccess
                                allMas={()=>{return categories}} 
                                checkedMas={checkedMas}
                                onChange={(value)=>{
                                    handleCheckboxChange(value, checkedMas)}}
                            />
                        

                    </div>
                    <div className="w100">
                        <p>Коментар</p>
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
                    <Button variant="contained" color="error" onClick={()=>{navigate("/case/" + stateData.case_id)}}>Пропустити</Button>
                    <Button variant="contained" onClick={saveHandler}>Зберегти</Button>
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