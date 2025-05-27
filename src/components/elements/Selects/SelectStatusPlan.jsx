import { MenuItem } from '@mui/material';
import React, { useState } from 'react';
import Select from '@mui/material/Select';
import { LANG, appConfig } from '../../../services/config';


const SelectStatusPlan = ({ value = 0, onChange}) => {
  const [selectedValue, setSelectedValue] = useState(value || 0);
  const statuses = appConfig.statusPlan;

  const handleChange = (e, child) => {
    const value = e.target.value;
    setSelectedValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className='Select'>
        {/* <InputLabel id="demo-controlled-open-select-label">{LANG.status_task}</InputLabel> */}
            <Select
                labelId="plan_status"
                id="plan_status"
                value={selectedValue}
                label={LANG.status_task}
                onChange={handleChange}
                variant='standard'
                style={{
                  backgroundColor:statuses[selectedValue].color
                }}
            >
            {
                Object.keys(statuses).map((item,ind)=>{
                    return <MenuItem  key={item} selectedid={item} value={item} style={{backgroundColor:statuses[item].color}}>{statuses[item].title}</MenuItem>
                })
            }
            </Select>
       
       
    </div>
  );
};

export default SelectStatusPlan;
