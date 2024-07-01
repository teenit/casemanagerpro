import React from "react";
import s from "./style.module.css"
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { LANG } from "../../../services/config";

const FilterCalendar = ({ filtered }) => {

    return (
        <div className={s.show__cal}>
            <h3>{LANG.calendar.filter.title}</h3>
            <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked onChange={(e) => {
                if (e.target.checked) {
                    filtered("myCalendar", "myCalendar")
                } else {
                    filtered("myCalendar", "myCalendar0")
                }
            }} />} label={LANG.calendar.filter.my_calendar} />
                <FormControlLabel control={<Checkbox defaultChecked onChange={(e) => {
                if (e.target.checked) {
                    filtered("forAll", "forAll")
                } else {
                    filtered("forAll", "forAll0")
                }
            }} />} label={LANG.calendar.filter.notes_for_all} />
                <FormControlLabel control={<Checkbox defaultChecked onChange={(e) => {
                    if (e.target.checked) {
                        filtered("happyCase", "happyCase")
                    } else {
                        filtered("happyCase", "happyCase0")
                    }
                }} />} label={LANG.calendar.filter.birthdays} />
            </FormGroup>
        </div>
    )
}
export default FilterCalendar;