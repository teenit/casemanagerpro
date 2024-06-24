import React, { useEffect, useState } from "react";
import editImg from "./../../../img/icons/edit.svg";
import saveImg from "./../../../img/icons/save-50.png";
import Input from "../../elements/Inputs/Input";
import 'moment/locale/uk';
import moment from "moment";
import { LANG } from "../../../services/config";
import Textarea from "../../elements/Inputs/Textarea";
import { Button } from "@mui/material";
import { apiResponse } from "../../Functions/get_apiObj";
import Modal from "../../Modals/Modal";
import SmallNotification from "../../elements/Notifications/SmallNotification";
import plus from "../../../img/icons/plus.svg"
import SelectStatus from "../../elements/Selects/SelectStatus";
import { useSelector } from "react-redux";
import HelpElem from "./HelpElem";
import Icon from "../../elements/Icons/Icon";



const GiveHelps = ({ helps, case_id, getCaseInfo }) => {

    const categories = useSelector(state => state.categories.help);
    const [open, setOpen] = useState(false)
    const openHandler = () => {
        localStorage.setItem("page_case_help", !open)
        setOpen(!open)
    }
    useEffect(() => {
        let item = localStorage.getItem("page_case_help")
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
        date_time: "",
        text: "",
        category: "",
        who: "",
        date_created:"",
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
    const createHelp = () => {
       
        apiResponse({
            ...state,
            case_id: case_id,
        }, "case/create-help.php").then((res) => {
            setState({ ...state, create: false })
            setNotification({
                show: true,
                status: res.status,
                message: res.message
            })
            getCaseInfo();
        })
    }
    return (
        <div className="Help">
            <div className="Help-title">
                <div className="Help-title-panel" onClick={openHandler}>
                <div>{LANG.give_help.helping}</div>
                    <Icon icon={"arrow_down"} addClass={"fs35"}/>
                </div>
                <span onClick={() => changeHandler("create", true)}>
                    <Icon icon={"add"}/>
                </span>
            </div>
            {helps.length > 0 && open && <div className="content">
                <div className="Help-content">
                    {
                        helps.map(help => <HelpElem getCaseInfo={getCaseInfo} categories={categories} key={help.id} help={help} />)
                    }
                </div>

            </div>}
            {
                state.create && <Modal
                    header={LANG.give_help.add_help}
                    closeHandler={() => changeHandler("create", false)}
                    footer={
                        <div className="Modal--footer">
                            <Button onClick={() => changeHandler("create", false)} color="error" variant="contained">{LANG.cancel}</Button>
                            <Button onClick={createHelp} variant="contained">{LANG.save}</Button>
                        </div>
                    }
                >
                    <div className="Help-create">
                        <div className="Help-create-date">
                            <Input
                                type="datetime-local"
                                // label={LANG.GLOBAL.date}
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
export default GiveHelps