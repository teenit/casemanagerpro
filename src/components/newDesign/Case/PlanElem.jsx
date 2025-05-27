import React, { useState } from "react";
import { apiResponse } from "../../Functions/get_apiObj";
import Input from "../../elements/Inputs/Input";
import moment from "moment";
import Icon from "../../elements/Icons/Icon";
import Textarea from "../../elements/Inputs/Textarea";
import SelectStatusPlan from "../../elements/Selects/SelectStatusPlan";
import { LANG, appConfig } from "../../../services/config";
import SmallNotification from "../../elements/Notifications/SmallNotification";
import ModalConfirm from "../../Modals/ModalConfirm";

const PlanElem = ({ plan, editor, getCaseInfo }) => {
    const [notification, setNotification] = useState({
        show: false,
        status: null,
        message: null
    });
    const [confirmModal,setConfirmModal] = useState(false)
    const [state, setState] = useState({
        ...plan,
        editPlan: false
    });
    const [originalState, setOriginalState] = useState({ ...plan });

    const editHandler = () => {
        if (!state.editPlan) {
            setOriginalState({ ...state });
        }
        setState({ ...state, editPlan: !state.editPlan });
    };

    const saveHandler = () => {
        const startDate = moment(state.start_time, "YYYY-MM-DDTHH:mm");
        const endDate = moment(state.end_time, "YYYY-MM-DDTHH:mm");

        if (startDate.isAfter(endDate)) {
            return notificationHandler(false, LANG.plan.error_date)
        }

        if (state.end_time.length <= 1 || state.start_time.length <= 1) {
            return notificationHandler(false, LANG.plan.error)
        }

        apiResponse({
            ...state,
            plan_id: state.id
        }, "case/update-plan-task.php").then((res) => {
            setState({ ...state, editPlan: false });
        });
    };

    const cancelHandler = () => {
        setState({ ...originalState, editPlan: false });
    };

    const changeHandler = (key, value) => {
        setState({
            ...state,
            [key]: value
        });
    };
const notificationHandler = (status, message) =>{
            setNotification({
            show: true,
            status: status,
            message: message
        })
}
const deletePlan = ()=>{
    apiResponse({plan_id:plan.id}, "case/delete-plan.php").then((res)=>{
        getCaseInfo()
    }).catch((err)=>{
        notificationHandler(false, LANG.GLOBAL.alertMessages.delete_error)
    })
}
    return (
        <div className="Plan-content-element">
            <div className="str">
                <div className="str-date">
                    <div className="dates">
                        <div className="dates-start">
                            {
                                state.editPlan && editor
                                    ?
                                    <>
                                        <Input
                                            type="datetime-local"
                                            label={LANG.start_time}
                                            value={state.start_time}
                                            variant="standard"
                                            onChange={(e) => {
                                                changeHandler("start_time", e.target.value);
                                            }}
                                        />
                                        <Input
                                            type="datetime-local"
                                            label={LANG.end_time}
                                            value={state.end_time}
                                            variant="standard"
                                            onChange={(e) => {
                                                changeHandler("end_time", e.target.value);
                                            }}
                                        />
                                    </>
                                    :
                                    <>
                                        <span>{moment(state.start_time).format("DD-MM-YYYY")}</span>
                                        <span>{moment(state.end_time).format("DD-MM-YYYY")}</span>
                                    </>
                            }
                        </div>
                    </div>
                    <div className="controls">
                        {
                            state.editPlan && editor
                                ?
                                <span>
                                    <Icon icon={"save"} addClass={"save-icon"} onClick={saveHandler} />
                                    <Icon icon={"close"} addClass={"close-icon"} onClick={cancelHandler} />
                                </span>
                                :
                                <>
                                {editor && <span onClick={editHandler}>
                                    <Icon icon={"edit"} addClass={"default-icon"} />
                                </span>}
                                </>
                                
                        }
                        <Icon icon={"delete"} addClass="delete-icon" onClick={()=>{setConfirmModal(!confirmModal)}}/>
                    </div>
                </div>
                <div className="task">
                    {
                        state.editPlan
                            ?
                            <div className="task-textarea">
                                <Textarea
                                    label={LANG.task_plan}
                                    value={state.value}
                                    onChange={(e) => {
                                        changeHandler("value", e.target.value);
                                    }}
                                />
                            </div>
                            :
                            <div className="task-value">
                                {state.value}
                            </div>
                    }
                </div>
                <div className="bottom">
                    <div className="bottom-date">
                        {moment(state.start_time).format("DD-MM-YYYY")}
                    </div>
                    <div className="bottom-status">
                        {
                            state.editPlan
                                ?
                                <SelectStatusPlan value={state.status} onChange={(e) => changeHandler("status", e)} />
                                :
                                <div style={{
                                    backgroundColor: appConfig.statusPlan[state.status]?.color
                                }}>
                                    {LANG.status_plan[state.status]}
                                </div>
                        }
                    </div>
                </div>
            </div>
            {confirmModal && <ModalConfirm closeHandler={()=>{setConfirmModal(!confirmModal)}}
                text={LANG.GLOBAL.delete_confirm} successHandler={deletePlan}/>}
            {
                notification.show && (
                    <SmallNotification
                        isSuccess={notification.status}
                        text={notification.message}
                        close={() => setNotification({ show: false })}
                    />
                )
            }
        </div>
    );
};

export default PlanElem;
