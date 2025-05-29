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

import Button from "@mui/material/Button"; // используем для футера
import Modal from "../../Modals/Modal";
import ActionMenu from "../../Portals/ActionMenu";

const PlanElem = ({ plan, editor, getCaseInfo }) => {
    const [notification, setNotification] = useState({
        show: false,
        status: null,
        message: null
    });

    const [confirmModal, setConfirmModal] = useState(false);
    const [editModal, setEditModal] = useState(false);

    const [state, setState] = useState({ ...plan });
    const [originalState, setOriginalState] = useState({ ...plan });
                const menuItems = [
                    {
                        title: LANG.GLOBAL.edit,
                        isHidden: false,
                        icon:"edit",
                        click: ()=>{
                            setEditModal(!editModal)
                        }
                    },
                    {
                        itemType: 'divider'
                    },
                    {
                        title: LANG.GLOBAL.delete,
                        isHidden: false,
                        icon: "delete",
                        color: 'error',
                        click: ()=>{
                            setConfirmModal(!confirmModal)
                        }
                    },
                ]
    const changeHandler = (key, value) => {
        setState({ ...state, [key]: value });
    };

    const notificationHandler = (status, message) => {
        setNotification({
            show: true,
            status: status,
            message: message
        });
    };

    const saveHandler = () => {
        const startDate = moment(state.start_time, "YYYY-MM-DDTHH:mm");
        const endDate = moment(state.end_time, "YYYY-MM-DDTHH:mm");

        if (startDate.isAfter(endDate)) {
            return notificationHandler(false, LANG.plan.error_date);
        }

        if (state.end_time.length <= 1 || state.start_time.length <= 1) {
            return notificationHandler(false, LANG.plan.error);
        }

        apiResponse({
            ...state,
            plan_id: state.id
        }, "case/update-plan-task.php").then((res) => {
            setEditModal(false);
        });
    };

    const cancelHandler = () => {
        setState({ ...originalState });
        setEditModal(false);
    };

    const deletePlan = () => {
        apiResponse({ plan_id: plan.id }, "case/delete-plan.php").then(() => {
            getCaseInfo();
        }).catch(() => {
            notificationHandler(false, LANG.GLOBAL.alertMessages.delete_error);
        });
    };

    return (
        <div className="Plan-content-element">
            <div className="str">
                <div className="str-date">
                    <div className="dates">
                        <div className="dates-start">
                            <span>{moment(state.start_time).format("DD-MM-YYYY")}</span>
                            <span>{moment(state.end_time).format("DD-MM-YYYY")}</span>
                        </div>
                    </div>
                        {editor && <ActionMenu menuItems={menuItems}/>}
                </div>
                <div className="task">
                    <div className="task-value">
                        {state.value}
                    </div>
                </div>
                <div className="bottom">
                    <div className="bottom-date">
                        {moment(state.start_time).format("DD-MM-YYYY")}
                    </div>
                    <div className="bottom-status">
                        <div style={{
                            backgroundColor: appConfig.statusPlan[state.status]?.color
                        }}>
                            {LANG.status_plan[state.status]}
                        </div>
                    </div>
                </div>
            </div>

            {editModal && (
                <Modal
                    header={LANG.plan.edit}
                    closeHandler={cancelHandler}
                    footer={
                        <div className="Modal--footer">
                            <Button onClick={cancelHandler} color="error" variant="contained">{LANG.cancel}</Button>
                            <Button onClick={saveHandler} variant="contained">{LANG.save}</Button>
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
                            onChange={(e) => changeHandler("start_time", e.target.value)}
                        />
                        <Input
                            type="datetime-local"
                            label={LANG.end_time}
                            value={state.end_time}
                            variant="standard"
                            onChange={(e) => changeHandler("end_time", e.target.value)}
                        />
                        </div>
                        <div className="Plan-create-status">

                        <SelectStatusPlan
                            value={state.status}
                            onChange={(e) => changeHandler("status", e)}
                        />
                        </div>
                        <div className="Plan-create-value">
                        <Textarea
                            label={LANG.task_plan}
                            value={state.value}
                            onChange={(e) => changeHandler("value", e.target.value)}
                        />
                        </div>
                    </div>
                </Modal>
            )}

            {confirmModal && (
                <ModalConfirm
                    closeHandler={() => setConfirmModal(false)}
                    text={LANG.GLOBAL.delete_confirm}
                    successHandler={deletePlan}
                />
            )}

            {notification.show && (
                <SmallNotification
                    isSuccess={notification.status}
                    text={notification.message}
                    close={() => setNotification({ show: false })}
                />
            )}
        </div>
    );
};

export default PlanElem;
