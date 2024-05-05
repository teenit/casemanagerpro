import React, { useState } from "react";
import Input from "../../elements/Inputs/Input";
import { changeAps, changeApsBr } from "../../Functions/translateString";
import { apiResponse } from '../../Functions/get_apiObj'
import CheckboxForm from "./CheckboxForm";
import SmallNotification from "../../elements/Notifications/SmallNotification";
import { useSelector } from "react-redux";
const checkedMas = []
const AddCaseForm = () => {
    const options = []
    const [alert, setAlert] = useState(false)
    const [state, setState] = useState({
        general: true
    })
    const caseCategories = useSelector(state => state.categories["case"]);
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
    const handleCheckboxChange = (value, options) => {
        let categories = value.map(item => item.id);
        setStateData({ ...stateData, categories: categories })
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
        if (stateGeneral.first_name.length > 0) {
            sendGeneral()

        } else {
            alert("Будь ласка, введіть ім'я кейсу")
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
        apiResponse({ ...stateData }, "case/insert-case-info.php").then(data => {
            console.log(data)
        })
        setAlert(true)
    }
    function saveHandler() {
        if (stateData.categories.length > 0) {
            sendData()
        } else {
            alert("Виберіть хоча б одну категорію кейсу")
        }
    }

    return (
        <div className="AddCaseForm">
            <h1>Додати кейс</h1>
            {switchData.general ?
                <div className="AddCaseForm-inner">
                    <div className="AddCaseForm-inner-line-three">
                        <div>
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
                    <div className="AddCaseForm-inner-line-two">
                        <div>
                            <p>Номер телефону 1</p>
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

                    <div className="AddCaseForm-inner-line-two">
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
                    <button className="primary__btn" onClick={handleSubmit}>Зберегти</button>
                </div>
                :
                <div className="AddCaseForm-inner">
                    <div className="AddCaseForm-inner-line-three">
                        <div>
                            <p>Місце проживання по прописці</p>
                            <Input
                                value={stateData.address_registered}
                                onChange={(e) => {
                                    changeHandlerData("address_registered", changeAps(e.target.value))
                                }}
                            />
                        </div>
                        <div>
                            <p>Фактичне місце проживання</p>
                            <Input
                                value={stateData.address_live}
                                onChange={(e) => {
                                    changeHandlerData("address_live", changeAps(e.target.value))
                                }}
                            />
                        </div>
                        <div>
                            <p>Канал комунікації</p>
                            <Input
                                value={stateData.channel}
                                onChange={(e) => {
                                    changeHandlerData("channel", changeAps(e.target.value))
                                }}
                            />
                        </div>
                    </div>
                    <div className="AddCaseForm-inner-line-three">
                        <div>
                            <p>Дата першого контакту</p>
                            <Input
                                type="date"
                                value={stateData.date_first_contact}
                                onChange={(e) => {
                                    changeHandlerData("date_first_contact", changeAps(e.target.value))
                                }}
                            />
                        </div>
                        <div>
                            <p>Дата укладення договору</p>
                            <Input
                                type="date"
                                value={stateData.contract_date}
                                onChange={(e) => {
                                    changeHandlerData("contract_date", changeAps(e.target.value))
                                }}
                            />
                        </div>
                        <div>
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

                    <div>
                        <p>Потреба, запит</p>
                        <textarea rows={10} cols={70}
                            value={stateData.potreba}
                            onChange={(e) => {
                                changeHandlerData("potreba", changeApsBr(e.target.value))
                            }}
                        />
                    </div>

                    <div>
                        <p>Сімейний стан, деталі про сім'ю, її склад</p>
                        <textarea rows={10} cols={70}
                            value={stateData.family_info}
                            onChange={(e) => {
                                changeHandlerData("family_info", changeApsBr(e.target.value))
                            }}
                        />
                    </div>
                    <div>
                        <p>Історія сім'ї / особи</p>
                        <textarea rows={10} cols={70}
                            value={stateData.history}
                            onChange={(e) => {
                                changeHandlerData("history", changeApsBr(e.target.value))
                            }}
                        />
                    </div>
                    <div>
                        <div>
                            <p>Категорія кейсу<span className="required">*</span></p>
                            <CheckboxForm allMas={caseCategories} checkedMas={checkedMas} onChange={(value) => handleCheckboxChange(value, caseCategories)} />
                        </div>

                    </div>
                    <div>
                        <p>Коментар</p>
                        <textarea rows={10} cols={70}
                            value={stateData.comment}
                            onChange={(e) => {
                                changeHandlerData("comment", changeApsBr(e.target.value))
                            }}
                        />
                    </div>
                    <button className="primary__btn" onClick={saveHandler}>Зберегти</button>
                </div>
            }
            {alert &&
                <SmallNotification isSuccess={true} text="Дані збережено успішно" close={() => {
                        setAlert(false);
                        console.log(alert);
                    }}
                />
            }
        </div>
    )
}

export default AddCaseForm;