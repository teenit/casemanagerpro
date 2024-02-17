import { FormControl, InputLabel, MenuItem } from '@material-ui/core';
import React, { useState } from 'react';
import Select from '@mui/material/Select';
import CatCheckBoxes from '../CheckBoxes/CatCheckBoxes';


const SelectElem = ({ options = [], defaultValue, onChange, title = "" }) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue || 0);
  const [active,setActive] = useState(false)
// console.log(defaultValue);
  const handleChange = (e) => {
    const value = e.target.value;
    
    if(value==1){
      setActive(true)
    }else{
      setActive(false)
    }
    setSelectedValue(value);
    if (onChange) {
      onChange(value);
    }
  };
const categoryData  =[
  {id:0,text:"Підлітковий клуб", color:"rgb(255, 197, 82)",value:"cat1",selected:false},
  {id:1,text:"СЖО", color:"rgb(145, 173, 237)",value:"cat2",selected:false},
  {id:2,text:"ВПО", color:"rgb(151, 237, 145)",value:"cat3",selected:false},
  {id:3,text:"Сімейний клуб", color:"rgb(235, 146, 237)",value:"cat4",selected:false},
  {id:4,text:"Сирота", color:"rgb(145, 237, 214)",value:"cat5",selected:false},
  {id:5,text:"Маяк", color:"rgb(0, 161, 216)",value:"cat6",selected:false},
]

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
            {active&&(<CatCheckBoxes data = {categoryData}/>)}
        </FormControl>
    </div>
  );
};

export default SelectElem;
