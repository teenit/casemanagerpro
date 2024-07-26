import React, { useEffect, useState } from "react";
import editImg from "./../../../img/icons/edit.svg";
import saveImg from "./../../../img/icons/save-50.png";
import Input from "../../elements/Inputs/Input";
import 'moment/locale/uk';
import moment from "moment";
import { momentTime } from "../../../services/moment";
import { LANG } from "../../../services/config";
import Textarea from "../../elements/Inputs/Textarea";
import { changeApsBr } from "../../Functions/translateString";
import SelectStatusPlan from "../../elements/Selects/SelectStatusPlan";
import { Button } from "@mui/material";
import { apiResponse } from "../../Functions/get_apiObj";
import Modal from "../../Modals/Modal";
import SmallNotification from "../../elements/Notifications/SmallNotification";
import { appConfig } from "../../../services/config";
import plus from "../../../img/icons/plus.svg"
import Icon from "../../elements/Icons/Icon";
import PlanElem from "./PlanElem";
const Plan = ({ plans, case_id, getCaseInfo }) => {
    const [open, setOpen] = useState(false)
    const openHandler = () => {
        localStorage.setItem("page_case_plan", !open)
        setOpen(!open)
    }
    useEffect(() => {
        let item = localStorage.getItem("page_case_plan")
        if (item) {
            if (item == "true") {
                setOpen(true)
            } else {
                setOpen(false)
            }
        } else {
            setOpen(false)
        }
    }, [])
    const [state, setState] = useState({
        end_time: " ",
        start_time: " ",
        status: 0,
        value: "",
        create: false
    })
    const [notification, setNotification] = useState({
        show: false,
        status: null,
        message: null
    })
    const changeHandler = (key, value) => {
        setState({
            ...state,
            [key]: value
        })
    }

    const createPlan = () => {
        if(moment(state.start_time, "DD-MM-YYYY").isAfter(moment(state.end_time, "DD-MM-YYYY")))
            return setNotification({...notification, show:true, status:false, message:LANG.plan.error_date})
        if(state.end_time.length<=1 || state.start_time.length<=1) 
            return setNotification({...notification, show:true, status:false, message:LANG.plan.error})
            apiResponse({
                ...state,
                case_id: case_id,
            }, "case/create-plan-task.php").then((res) => {
                setState({ ...state, create: false })
                setNotification({
                    show: true,
                    status: res.status,
                    message: res.message
                })
                openHandler()
                getCaseInfo();
            })
        
    }
    return (
        <div className="Plan">
            <div className="Plan-title">
                <div className="Plan-title-panel" onClick={openHandler}>
                    <div>{LANG.planing}</div>
                        <Icon icon={"arrow_down"} addClass={"fs35"}/>
                </div>
                <span onClick={() => changeHandler("create", true)}>
                    <Icon icon={"add"}/>
                </span>
            </div>
            {open && <div className="content">
                {plans.length > 0 ? <div className="Plan-content">
                    {
                        plans.map(plan => <PlanElem key={plan.id} plan={plan} />)
                    }
                </div>:<p>{LANG.no_records}</p>}

            </div>}

            {
                state.create && <Modal
                    header={LANG.plan.create}
                    closeHandler={() => changeHandler("create", false)}
                    footer={
                        <div className="Modal--footer">
                            <Button onClick={() => changeHandler("create", false)} color="error" variant="contained">{LANG.cancel}</Button>
                            <Button onClick={createPlan} variant="contained">{LANG.save}</Button>
                        </div>
                    }
                >
                    <div className="Plan-create">
                        <div className="Plan-create-date">
                            <Input
                                type="datetime-local"
                                label={LANG.start_time}
                                value={state.start_time}
                                variant="standard"
                                onChange={(e) => {
                                    changeHandler("start_time", e.target.value)
                                }}
                            />
                            <Input
                                type="datetime-local"
                                label={LANG.end_time}
                                value={state.end_time}
                                variant="standard"
                                onChange={(e) => {
                                    changeHandler("end_time", e.target.value)
                                }}
                            />
                        </div>
                        <div className="Plan-create-status">
                            <div className="bold">{LANG.status}</div>
                            <SelectStatusPlan value={state.status} onChange={(e) => changeHandler("status", e)} />
                        </div>
                        <div className="Plan-create-value">
                            <Textarea
                                label={LANG.plan.task}
                                value={state.value}
                                onChange={(e) => {
                                    changeHandler("value", e.target.value)
                                }}
                            />
                        </div>

                    </div>
                </Modal>
            }
            {
                notification.show && <SmallNotification isSuccess={notification.status} text={notification.message} close={() => setNotification({ show: false })} />
            }
        </div>
    )

}
export default Plan