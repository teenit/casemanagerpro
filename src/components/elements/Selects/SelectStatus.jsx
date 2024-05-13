import { FormControl, MenuItem } from '@material-ui/core';
import React, { useState } from 'react';
import Select from '@mui/material/Select';
import { LANG } from '../../../services/config';


const SelectStatus = ({ value = " ", onChange, statuses = {}, type}) => {
  const [selectedValue, setSelectedValue] = useState(value || "");
  const handleChange = (e, child) => {
    const value = e.target.value;
    setSelectedValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className='Select'>
        <FormControl className='w100'>
            <Select
                value={selectedValue}
                label={LANG.status_task}
                onChange={handleChange}
                variant='standard'
            >
            {
                Object.keys(statuses).map((item,ind)=>{
                    return <MenuItem  key={item} selectedId={item} value={item} style={{backgroundColor:statuses[item].color}}>{statuses[item].name}</MenuItem>
                })
            }
            </Select>
            {

            }
        </FormControl>
    </div>
  );
};

export default SelectStatus;
