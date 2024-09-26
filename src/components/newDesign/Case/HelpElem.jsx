import React, { useState } from "react"
import { apiResponse } from "../../Functions/get_apiObj"
import Input from "../../elements/Inputs/Input"
import moment from "moment"
import Textarea from "../../elements/Inputs/Textarea"
import SelectStatus from "../../elements/Selects/SelectStatus"
import Modal from "../../Modals/Modal"
import { Button } from "@mui/material"
import SmallNotification from "../../elements/Notifications/SmallNotification"
import editImg from "./../../../img/icons/edit.svg";
import saveImg from "./../../../img/icons/save-50.png";
import { LANG } from "../../../services/config"
import Icon from "../../elements/Icons/Icon"
import TextDescription from "../../elements/TextFormatters/TextDescription"
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"

const HelpElem = ({ help, categories, getCaseInfo }) => {

    const [state, setState] = useState({
        ...help,
        editHelp: false,
        edit: false
    })
    const [notification, setNotification] = useState({
        show: false,
        status: null,
        message: null
    })
    const getCategory = (id) => {
        const category = Object.values(categories).find(item => item.id === id)
        return {
            color: category.color,
            name: category.name
        }
    }
    const saveHandler = () => {
        apiResponse({
            ...state,
            case_id: state.case_id,
            help_id: state.id
        }, "case/update-help.php").then((res) => {
            setState({ ...state, edit: false })
            setNotification({
                show: true,
                status: res.status,
                message: res.message
            })
            getCaseInfo();
        })

    }
    const changeHandler = (key, value) => {
        setState({
            ...state,
            [key]: value
        })
    }
    return (
        <div className="Help-content-element">
            <div className="str">
                <div className="str-date">
                    <div className="dates">
                        <div className="dates-start">
                            {
                                state.editHelp
                                    ?
                                    <>
                                        <Input
                                            type="datetime-local"
                                            label={LANG.start_time}
                                            value={state.date_time}
                                            variant="standard"
                                            onChange={(e) => {
                                                changeHandler("date_time", e.target.value)
                                            }}
                                        />
                                        <Input
                                            type="text"
                                            label={LANG.give_help.who_give_help}
                                            value={state.who}
                                            variant="standard"
                                            onChange={(e) => {
                                                changeHandler("who", e.target.value)
                                            }}
                                        />
                                    </>
                                    :
                                    <>
                                        <span> {state.date_time && moment(state.date_time).format("DD-MM-YYYY")} </span>
                                            {state.who && <NavLink to={`/user/${state.user_id}`}>{state.who}</NavLink>}
                                        <div className="dates-start-category">
                                            <span> {state.category && getCategory(state.category).name} </span>
                                            <span className="Help-content-element-color" style={{ backgroundColor: getCategory(state.category).color }}></span>
                                        </div>
                                    </>
                            }
                        </div>
                    </div>
                    <div className="controls">
                        {
                            state.editHelp
                                ?
                                <span onClick={saveHandler} >
                                    <Icon icon={"save"} addClass={"save-icon"} />
                                </span>
                                :
                                <span onClick={() => { setState({ ...state, edit: true }) }}  >
                                    <Icon icon={"edit"} addClass={"default-icon"} />
                                </span>
                        }
                    </div>
                </div>
                <div className="task">
                    {
                        state.editHelp
                            ?
                            <div className="task-textarea">
                                <Textarea
                                    label={LANG.task_plan}
                                    value={state.text}
                                    onChange={(e) => {
                                        changeHandler("text", e.target.value)
                                    }}
                                />
                            </div>
                            :
                            <div className="task-value">
                                <TextDescription text={state.text} />
                            </div>
                    }
                </div>
                <div className="bottom">
                    <div className="bottom-date">
                        {moment(state.start_time).format("DD-MM-YYYY")}
                    </div>
                    <div className="bottom-status">
                        {
                            state.editHelp
                                ?
                                <SelectStatus statuses={categories} value={state.category} type={"help"} onChange={(e) => changeHandler("category", e)} />
                                :
                                <div style={{
                                    backgroundColor: categories[state.category]?.color
                                }}>
                                    {
                                        LANG.status_plan[state.status]
                                    }
                                </div>
                        }
                    </div>
                </div>
            </div>
            {
                state.edit && <Modal
                    header={LANG.give_help.edit_help}
                    closeHandler={() => changeHandler("edit", false)}
                    footer={
                        <div className="Modal--footer">
                            <Button onClick={() => changeHandler("edit", false)} color="error" variant="contained">{LANG.cancel}</Button>
                            <Button onClick={saveHandler} variant="contained">{LANG.save}</Button>
                        </div>
                    }
                >
                    <div className="Help-create">
                        <div className="Help-create-date">
                            <Input
                                type="datetime-local"
                                value={state.date_time}
                                variant="standard"
                                onChange={(e) => {
                                    changeHandler("date_time", e.target.value)
                                }}
                            />
                            <Input
                                type="text"
                                label={LANG.give_help.who_give_help}
                                value={state.who}
                                variant="standard"
                                onChange={(e) => {
                                    changeHandler("who", e.target.value)
                                }}
                            />
                        </div>
                        <div className="Help-create-status">
                            <div className="bold">{LANG.status}</div>
                            <SelectStatus statuses={categories} value={state.category} onChange={(e) => changeHandler("category", e)} />
                        </div>
                        <div className="Help-create-value">
                            <Textarea
                                label={LANG.give_help.details_help}
                                value={state.text}
                                onChange={(e) => {
                                    changeHandler("text", e.target.value)
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

export default HelpElem;