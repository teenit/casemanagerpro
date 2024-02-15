import { FormControl, InputLabel, MenuItem } from '@material-ui/core';
import React, { useState } from 'react';
import Select from '@mui/material/Select';


const SelectElem = ({ options = [], defaultValue, onChange, title = "" }) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue || 0);
console.log(defaultValue);
  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className='Select'>
        <FormControl>
        <InputLabel id="demo-controlled-open-select-label">{title}</InputLabel>
            <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                value={selectedValue}
                label={title}
                onChange={handleChange}
            >
            {
                options.map((item)=>{
                    return <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                })
            }
            </Select>
        </FormControl>
    </div>
  );
};

export default SelectElem;
