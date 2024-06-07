import React from "react";
import s from "./style.module.css"
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

const FilterCalendar = ({ filtered }) => {

    return (
        <div className={s.show__cal}>
            <h3>Відобразити у календарі</h3>
            <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked onChange={(e) => {
                if (e.target.checked) {
                    filtered("myCalendar", "myCalendar")
                } else {
                    filtered("myCalendar", "myCalendar0")
                }
            }} />} label="Мій календар" />
                <FormControlLabel control={<Checkbox defaultChecked onChange={(e) => {
                if (e.target.checked) {
                    filtered("forAll", "forAll")
                } else {
                    filtered("forAll", "forAll0")
                }
            }} />} label="Записи для всіх" />
                <FormControlLabel control={<Checkbox defaultChecked onChange={(e) => {
                    if (e.target.checked) {
                        filtered("happyCase", "happyCase")
                    } else {
                        filtered("happyCase", "happyCase0")
                    }
                }} />} label="Дні народження кейсів" />
            </FormGroup>
        </div>
    )
}
export default FilterCalendar;