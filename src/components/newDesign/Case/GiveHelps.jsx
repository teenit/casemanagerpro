import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import Input from "../../elements/Inputs/Input";
import Textarea from "../../elements/Inputs/Textarea";
import Icon from "../../elements/Icons/Icon";
import Modal from "../../Modals/Modal";
import SmallNotification from "../../elements/Notifications/SmallNotification";
import SelectStatus from "../../elements/Selects/SelectStatus";
import HelpElem from "./HelpElem";
import { LANG } from "../../../services/config";
import { apiResponse } from "../../Functions/get_apiObj";
import AccessCheck from "../../Functions/AccessCheck";
import moment from "moment";

const GiveHelps = ({ helps, case_id, getCaseInfo, cg }) => {
    const categories = useSelector(state => state.categories.help);
    const [open, setOpen] = useState(false);
    const [state, setState] = useState({
        date_time: moment().format("YYYY-MM-DDTHH:mm"),
        text: "",
        category: "",
        who: "",
        date_created: "",
        create: false
    });
    const [notification, setNotification] = useState({
        show: false,
        status: null,
        message: null
    });

    const openHandler = () => {
        const newState = !open;
        localStorage.setItem("page_case_help", newState);
        setOpen(newState);
    };

    useEffect(() => {
        const item = localStorage.getItem("page_case_help");
        setOpen(item === "true");
    }, []);

    const changeHandler = (key, value) => {
        setState({
            ...state,
            [key]: value
        });
    };

    const createHelp = () => {
        const { date_time, text, category, who } = state;

        if (!date_time || !text || !category || !who || text.trim().length == 0 || who.trim().length == 0) {
            setNotification({
                show: true,
                status: false,
                message: LANG.give_help.error_data
            });
            return;
        }

        apiResponse({ ...state, case_id }, "case/create-help.php")
            .then((res) => {
                setState({ ...state, create: false });
                setNotification({
                    show: true,
                    status: res.status,
                    message: res.message
                });
                openHandler()
                if (res.status) getCaseInfo();
            })
            .catch((error) => {
                setNotification({
                    show: true,
                    status: false,
                    message: LANG.give_help.error
                });
            });
    };
    const access = {
        case_help_edit: AccessCheck("view_edit", "a_page_case_help", "edit") && cg,
    }
    return (
        <div className="Help">
            <div className="Help-title">
                <div className="Help-title-panel" onClick={openHandler}>
                    <div>{LANG.give_help.helping}</div>
                    <Icon icon="arrow_down" addClass="fs35 arrow" />
                </div>
                {access.case_help_edit && <span onClick={() => changeHandler("create", true)}>
                    <Icon icon="add" />
                </span>}
            </div>
            {open && (
                <div className="content">
                    {helps.length > 0 ? (
                        <div className="Help-content">
                            {helps.map(help => (
                                <HelpElem
                                    getCaseInfo={getCaseInfo}
                                    categories={categories}
                                    key={help.id}
                                    help={help}
                                    editor={access.case_help_edit && cg}
                                />
                            ))}
                        </div>
                    ) : (
                        <p>{LANG.no_records}</p>
                    )}
                </div>
            )}
            {state.create && access.case_help_edit && (
                <Modal
                    header={LANG.give_help.add_help}
                    closeHandler={() => changeHandler("create", false)}
                    footer={
                        <div className="Modal--footer">
                            <Button
                                onClick={() => changeHandler("create", false)}
                                color="error"
                                variant="contained"
                            >
                                {LANG.cancel}
                            </Button>
                            <Button onClick={createHelp} variant="contained">
                                {LANG.save}
                            </Button>
                        </div>
                    }
                >
                    <div className="Help-create">
                        <div className="Help-create-date">
                            <Input
                                addClass="w100"
                                type="datetime-local"
                                value={state.date_time}
                                variant="standard"
                                onChange={(e) => changeHandler("date_time", e.target.value)}
                            />
                            <Input
                                addClass="w100"
                                type="text"
                                label={LANG.give_help.who_give_help}
                                value={state.who}
                                variant="standard"
                                onChange={(e) => changeHandler("who", e.target.value)}
                            />
                        </div>
                        <div className="Help-create-status">
                            <div className="bold">{LANG.status}</div>
                            <SelectStatus
                                statuses={categories}
                                value={state.category}
                                onChange={(e) => changeHandler("category", e)}
                            />
                        </div>
                        <div className="Help-create-value">
                            <Textarea
                                label={LANG.give_help.details_help}
                                value={state.text}
                                onChange={(e) => changeHandler("text", e.target.value)}
                            />
                        </div>
                    </div>
                </Modal>
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

export default GiveHelps;
