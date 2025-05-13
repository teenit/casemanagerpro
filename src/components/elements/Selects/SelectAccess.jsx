// import { FormControl, InputLabel, MenuItem } from '@material-ui/core';
import React, { useState } from 'react';
import Select from '@mui/material/Select';
import CatCheckBoxes from '../CheckBoxes/CatCheckBoxes';
import { LANG } from '../../../services/config';
import { MenuItem } from '@mui/material';


const SelectAccess = ({ options = {}, value, onChange, title = "", label="" }) => {
  const [selectedValue, setSelectedValue] = useState(value || 0);
  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedValue(value);
    if (onChange) {
      onChange(value);
    }
  };
  

  return (
    <div className='SelectAccess'>
       <div className='SelectAccess-label'>{label}</div>
        {/* <InputLabel id="demo-controlled-open-select-label">{title}</InputLabel> */}
            <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                value={selectedValue}
                label={title}
                onChange={handleChange}
            >
              {
                Object.keys(options).map((item)=>{
                  return <MenuItem key={item} value={item}>{LANG.access.get_options[item]}</MenuItem>
                })
              }
           
          
            </Select>       
    </div>
  );
};

export default SelectAccess;
