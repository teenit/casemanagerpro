import { TextField } from "@mui/material";
import { DateTimeField } from "@mui/x-date-pickers/DateTimeField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";

import React from "react";
const components = {
    "datetime-local": DateTimePicker,
    "datetime": DateTimePicker,
    'text': TextField,
    'date': DatePicker
}
const Input = ({ 
    value = "", 
    onChange, 
    label = "", 
    type = "text", 
    variant = "outlined", 
    disabled = false, 
    addClass = "", 
    size = "small", 
    multiline = false }) => {

    const Component = components[type] ? components[type] : TextField;

    const getValue = (type, val) => {
        let newVal = val;
        if(type == "datetime-local" || type == "datetime") {
            newVal = moment(val);
        }
        if (type == 'date') {
            newVal = moment(val);
        }

        return newVal;
    }

    const getProps = () => {
        let elementProps = {
            value: getValue(type, value),
            label: label,
            onChange: onChangeHandler,
            className: addClass,
            variant: variant,
            type: type,
            size: size,
            multiline: multiline,
            disabled: disabled,
            slotProps: {}
        }

        if ((type == "datetime-local" || type == "datetime" || type == "date")) {
            elementProps.slotProps.textField = {
                size: size,
                variant: variant,
               
            }
            elementProps.minDate = moment('0000-01-01')
        }

        return elementProps;
    }

    const onChangeHandler = (e) => {
        let event = {
            target: {
                value: null
            }
        }

        if ((type == "datetime-local" || type == "datetime") && e) {
            event.target.value = e.format('YYYY-MM-DD HH:mm');
        } else if (type == 'date'){
            event.target.value = e.format('YYYY-MM-DD');
        }
        else {
            event.target.value = e?.target?.value || null
        }

        onChange(event);
    }

    const componentProps = getProps();
    return (
        <div className={`Input ${addClass}`}>
            <Component
               {...componentProps}
            />
        </div>
    )
}

export default Input;