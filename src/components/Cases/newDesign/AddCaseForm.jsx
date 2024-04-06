import React, { useState } from "react";
import Input from "../../elements/Inputs/Input";
import { changeAps, changeApsBr } from "../../Functions/translateString";
import {apiResponse} from '../../Functions/get_apiObj'
const AddCaseForm = () => {
    const [state, setState] = useState({
        general: true
    })

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
    const [switchData, setSwitchData] = useState({
        general: true,
        data: false
    })
    function changeHandlerGeneral(key, val) {
        setStateGeneral({ ...stateGeneral, [key]: val })
    }
    function handleSubmit() {
        if (stateGeneral.first_name.length > 0) {
            sendGeneral()
           // setSwitchData({ ...switchData, general: false, data: true })
        } else {
            alert("Будь ласка, введіть ім'я кейсу")
        }
    }
    function sendGeneral(){
        apiResponse({...stateGeneral},"case/create-case.php").then(data=>{
            console.log(data)
        })
    }
    return (
        <div className="AddCaseForm">
            <h1>Додати кейс</h1>
            {switchData.general ?
                <div className="AddCaseForm-inner">
                    <div className="AddCaseForm-inner-line-three">
                        <div>
                            <Input
                                value={stateGeneral.first_name}
                                label="Ім'я"
                                onChange={(e) => {
                                    changeHandlerGeneral("first_name", changeAps(e.target.value))
                                }}
                            />
                        </div>
                        <div>
                            <Input
                                value={stateGeneral.middle_name}
                                label="Прізвище"
                                onChange={(e) => {
                                    changeHandlerGeneral("middle_name", changeAps(e.target.value))
                                }}
                            />
                        </div>
                        <div>
                            <Input
                                value={stateGeneral.last_name}
                                label="По батькові"
                                onChange={(e) => {
                                    changeHandlerGeneral("last_name", changeAps(e.target.value))
                                }}
                            />
                        </div>
                    </div>
                    <div className="AddCaseForm-inner-line-two">
                        <div>
                            <Input
                                type="number"
                                value={stateGeneral.phone1}
                                label="Номер телефону 1"
                                onChange={(e) => {
                                    changeHandlerGeneral("phone1", changeAps(e.target.value))
                                }}
                            />
                        </div>
                        <div>
                            <Input
                                type="number"
                                value={stateGeneral.phone2}
                                label="Номер телефону 2"
                                onChange={(e) => {
                                    changeHandlerGeneral("phone2", changeAps(e.target.value))
                                }}
                            />
                        </div>
                    </div>

                    <div className="AddCaseForm-inner-line-two">
                        <div>
                            <Input
                                value={stateGeneral.email}
                                label="Електронна пошта"
                                onChange={(e) => {
                                    changeHandlerGeneral("email", changeAps(e.target.value))
                                }}
                            />
                        </div>
                        <div>
                            <Input
                                type="date"
                                value={stateGeneral.happy_bd}
                                label="Дата народження"
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
                            <Input
                                value={stateData.address_registered}
                                label="Місце проживання по прописці"
                                onChange={(e) => {
                                    changeHandlerGeneral("adress_registered", changeAps(e.target.value))
                                }}
                            />
                        </div>
                        <div>
                            <Input
                                value={stateData.address_live}
                                label="Фактичне місце проживання"
                                onChange={(e) => {
                                    changeHandlerGeneral("adress_live", changeAps(e.target.value))
                                }}
                            />
                        </div>
                        <div>
                            <Input
                                value={stateData.channel}
                                label="Канал комунікації"
                                onChange={(e) => {
                                    changeHandlerGeneral("channel", changeAps(e.target.value))
                                }}
                            />
                        </div>
                    </div>
                    <div className="AddCaseForm-inner-line-three">
                        <div>
                            <Input
                                type="date"
                                value={stateData.date_first_contact}
                                label="Дата першого контакту"
                                onChange={(e) => {
                                    changeHandlerGeneral("date_first_contact", changeAps(e.target.value))
                                }}
                            />
                        </div>
                        <div>
                            <Input
                                type="date"
                                value={stateData.contract_date}
                                label="Дата укладення договору"
                                onChange={(e) => {
                                    changeHandlerGeneral("contract_date", changeAps(e.target.value))
                                }}
                            />
                        </div>
                        <div>
                            <Input
                                type="number"
                                value={stateData.contract_number}
                                label="Номер договору"
                                onChange={(e) => {
                                    changeHandlerGeneral("contract_date", changeAps(e.target.value))
                                }}
                            />
                        </div>
                    </div>

                    <div>
                        <p>Коментар</p>
                        <textarea rows={10} cols={70}
                            value={stateData.comment}
                            onChange={(e) => {
                                changeHandlerGeneral("comment", changeApsBr(e.target.value))
                            }}
                        />
                    </div>
                    <div>
                        <p>Потреба, запит</p>
                        <textarea rows={10} cols={70}
                            value={stateData.potreba}
                            onChange={(e) => {
                                changeHandlerGeneral("potreba", changeApsBr(e.target.value))
                            }}
                        />
                    </div>

                    <div>
                        <p>Сімейний стан, деталі про сім'ю, її склад</p>
                        <textarea rows={10} cols={70}
                            value={stateData.family_info}
                            onChange={(e) => {
                                changeHandlerGeneral("family_info", changeApsBr(e.target.value))
                            }}
                        />
                    </div>
                    <div>
                        <p>Історія сім'ї / особи</p>
                        <textarea rows={10} cols={70}
                            value={stateData.history}
                            onChange={(e) => {
                                changeHandlerGeneral("history", changeApsBr(e.target.value))
                            }}
                        />
                    </div>

                    <button className="primary__btn">Зберегти</button>
                </div>
            }

        </div>
    )
}

export default AddCaseForm;