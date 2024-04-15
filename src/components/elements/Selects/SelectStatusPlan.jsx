import { FormControl, InputLabel, MenuItem } from '@material-ui/core';
import React, { useState } from 'react';
import Select from '@mui/material/Select';
import CatCheckBoxes from '../CheckBoxes/CatCheckBoxes';
import { LANG, appConfig } from '../../../services/config';


const SelectStatusPlan = ({ value = 0, onChange}) => {
  const [selectedValue, setSelectedValue] = useState(value || 0);
  const [selectedId, setSelectedId] = useState(value || 0);
  const [active,setActive] = useState(false);
  const statuses = appConfig.statusPlan;
  const test = ()=> {
    Object.values(statuses).map(item=>console.log(item))
  }
  const handleChange = (e, child) => {
    const value = e.target.value;
   console.log(e,child)
  //   if(value==1){
  //     setActive(true)
  //   }else{
  //     setActive(false)
  //   }
    setSelectedValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className='Select'>
        <FormControl>
        <InputLabel id="demo-controlled-open-select-label">{LANG.status_task}</InputLabel>
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
                    return <MenuItem  key={item} selectedId={item} value={item} style={{backgroundColor:statuses[item].color}}>{statuses[item].title}</MenuItem>
                })
            }
            </Select>
            {

            }
        </FormControl>
    </div>
  );
};

export default SelectStatusPlan;