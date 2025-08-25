import React, { useState } from "react";
import moment from "moment";
import { Button, Switch } from "@mui/material";
import Input from "../../elements/Inputs/Input";
import InputColor from "../../elements/Inputs/InputColor";
import Textarea from "../../elements/Inputs/Textarea";
import TextDescription from "../../elements/TextFormatters/TextDescription";
import SmallNotification from "../../elements/Notifications/SmallNotification";
import { LANG } from "../../../services/config";
import { apiResponse } from "../../Functions/get_apiObj";
import Modal from "../../Modals/Modal";

const AddCalendarEvent = ({ data = {}, loadEvents, close }) => {
    const exists = data?.calendar_id;
    const [state, setState] = useState({ ...data });
    const [alert, setAlert] = useState({
        active: false,
        isSuccess: false,
        message: ""
    });

    const alertHandler = (isSuccess = false, message = "") => {
        setAlert({
            active: true,
            isSuccess,
            message
        });
    };

    const handleChange = (key, value) => {
        setState({ ...state, [key]: value });
    };

    const sendForm = () => {
        if (state.key === "happyCase")
            return alertHandler(false, LANG.calendar.alertMessages.cant_edit);
        if (!state.title || state.title.trim().length === 0 || !state.start || state.start.length === 0 || !state.end || state.end.length === 0)
            return alertHandler(false, LANG.calendar.add_event.alertMessages.error);

        const m = moment(state.start, moment.ISO_8601, true);
        let day = "";
        let month = "";
        let year = "";

        if (m.isValid()) {
            day = m.date();
            month = m.month() + 1;
            year = m.year();
        } else {
            day = state.day || "";
            month = state.month || "";
            year = state.year || "";
        }

        const payload = {
            ...state,
            color: state.color || "#000000",
            day,
            month,
            year
        };

        setState(payload);

        const endpoint = exists ? "calendar/update.php" : "calendar/add.php";
        apiResponse(payload, endpoint)
            .then(() => {
                loadEvents();
                close();
            })
            .catch(err => {
                console.error(err);
                alertHandler(false, LANG.calendar.add_event.alertMessages.error);
            });
    };

    return (
        <Modal closeHandler={close} header={exists ? LANG.calendar.add_event.edit : LANG.calendar.add_event.title} footer={
            <div className="Modal--footer" style={{ justifyContent: "space-between", width: "100%" }}>
                <Button onClick={close} color="error" variant="contained">{LANG.cancel}</Button>
                <Button onClick={sendForm} variant="contained">{LANG.save}</Button>
            </div>
        }>
            <div className="AddCalendarEvent">
                <div className="two-element">
                    <Input
                        value={state.title}
                        label={LANG.GLOBAL.title}
                        type="text"
                        addClass="w100"
                        onChange={(e) => handleChange("title", e.target.value)}
                    />
                    <InputColor
                        value={state.color}
                        addClass="w100"
                        onChange={(e) => handleChange("color", e.target.value)}
                    />
                </div>

                <div className="two-element">
                    <label>{LANG.GLOBAL.start}
                        <Input
                            value={state.start}
                            addClass="w100"
                            type="datetime-local"
                            onChange={(e) => handleChange("start", e.target.value)}
                        />
                    </label>
                </div>
                <div className="two-element">
                    <label>{LANG.GLOBAL.end}
                        <Input
                            value={state.end}
                            addClass="w100"
                            type="datetime-local"
                            onChange={(e) => handleChange("end", e.target.value)}
                        />
                    </label>
                </div>

                <div className="one-element">
                    <Textarea
                        value={state.text}
                        label={LANG.GLOBAL.description}
                        cols="30"
                        rows="10"
                        onChange={(e) => handleChange("text", e.target.value)}
                    />
                </div>

                <div className="one-element">
                    <label>{LANG.calendar.add_event.for_all}
                        <Switch
                            checked={state.key === "forAll"}
                            onChange={(e) =>
                                handleChange("key", e.target.checked ? "forAll" : "myCalendar")
                            }
                        />
                    </label>
                </div>

                <div className="one-element">
                    <label>{LANG.calendar.add_event.repeat}
                        <Switch
                            checked={state.every_year === 1}
                            onChange={(e) => handleChange("every_year", e.target.checked ? 1 : 0)}
                        />
                    </label>
                </div>

                <div className="two-element">
                    <Input
                        addClass="w100"
                        value={state.link}
                        type="text"
                        label={LANG.GLOBAL.link}
                        onChange={(e) => handleChange("link", e.target.value)}
                    />
                </div>

                {alert.active && (
                    <SmallNotification
                        isSuccess={alert.isSuccess}
                        text={alert.message}
                        close={() => setAlert({ ...alert, active: false })}
                    />
                )}

            </div>
        </Modal>
    );
};

export default AddCalendarEvent;
