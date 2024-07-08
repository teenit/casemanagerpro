import React, { useState } from "react";
import Icon from "../Icons/Icon";
import { NavLink } from "react-router-dom";
import { MenuItem, Select } from "@mui/material";
import Input from "./Input";
import { LANG } from "../../../services/config";

<Table
  ref={(n) => (this.node = n)}
  data={filteredData}
  wrapperClass="TableSeparateRow-wrap"
  classes="TableSeparateRow"
  bordered={false}
  columns={columns}
  keyField="id"
  rowRenderer={(
    { columns, row, rowIndex, keyField, selectRow, index }
  ) => {
    let rowClassName = '';
    if ((filteredData.length - index) < 6) rowClassName = 'center';
    if ((filteredData.length - index) < 3) rowClassName = 'up';

    return <TRow
      key={rowIndex}
      columns={columns}
      row={row}
      rowIndex={rowIndex}
      keyField={keyField}
      rowClassName={rowClassName}
    />;
  }}
  noDataIndication={() => (
    <EmptyTable
      message={LANG.FUNNELS.empty_table_text}
    />
  )}
/>

  

const InputBlock = ({ select = false, age = false, saveHandler, disabled = false, inputType = "text", value = "", onChange, link = null, title = "", icon = null, label = "", titleDefault = "" }) => {
    const [showEdit, setShowEdit] = useState(false);
    const [stateValue, setStateValue] = useState(value);

    const handleSave = () => {
        const displayValue = select ? LANG.selects.sex[stateValue] : stateValue;
        saveHandler(stateValue, displayValue);
        setShowEdit(false);
    };
    const howOldIsCase = (birthday) => {
        if (!birthday) return "";

        const birthDate = new Date(birthday);
        const today = new Date();
        let ageYears = today.getFullYear() - birthDate.getFullYear();
        const isBirthdayPassed = (
            today.getMonth() > birthDate.getMonth() ||
            (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate())
        )
        if (!isBirthdayPassed) {
            ageYears--
        }

        return `, ${ageYears} років`;
    };
    return (
        <div className="InputBlock">
            {!showEdit && (
                <div className="InputBlock-default">
                    {icon && <Icon icon={icon} addClass={"default-icon"} />}
                    <div className="case-info-card-text">
                        <div title={titleDefault}>
                            {link && (label !== "" && label !== null) ? (
                                <NavLink to={link}>
                                    {label}
                                </NavLink>
                            ) : (
                                <>
                                    {label == "" || label==null ? <span className="InputBlock-title-default">{titleDefault}</span> : <span className="InputBlock-title-main">{label}</span>}
                                </>
                            )}
                        </div>
                    </div>
                    {!disabled && (
                        <div className="edit-icon" onClick={() => { setShowEdit(true) }}>
                            <Icon icon={"edit"} addClass={"default-icon"} />
                        </div>
                    )}
                </div>
            )}
            {showEdit && (
                <div className="InputBlock-editer">
                    <div className="InputBlock-editer-withicon">
                        {icon && <Icon icon={icon} addClass={"default-icon"} />}
                        {select ? <Select value={stateValue} onChange={(e) => {
                            setStateValue(e.target.value);
                        }}>
                            <MenuItem value="male">{LANG.selects.sex.male}</MenuItem>
                            <MenuItem value="female">{LANG.selects.sex.female}</MenuItem>
                            <MenuItem value="other">{LANG.selects.sex.other}</MenuItem>
                        </Select>
                            : <Input label={title} type={inputType} value={stateValue} onChange={(e) => {
                                setStateValue(e.target.value)
                            }} />}
                    </div>
                    <div className="InputBlock-editer-icons">
                        <span onClick={handleSave}>
                            <Icon icon={"save"} addClass={"save-icon"} />
                        </span>
                        <span onClick={() => { setShowEdit(false) }}>
                            <Icon icon={"close"} addClass={"close-icon"} />
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default InputBlock;