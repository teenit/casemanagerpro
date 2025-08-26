import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import Hint from "../Hints/Hint"
import { LANG } from '../../../services/config';
export default function CheckboxListAccess({allMas, checkedMas, onChange, onCheckedAll, checkedAll = false}) {
  const [checked, setChecked] = useState([checkedMas]);
  const [allMasElements, setAllMasElements] = useState(allMas());
  const handleToggle = (value) => () => {
    onChange(value.id)
    const currentIndex = checked.indexOf(value.id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value.id);
    } else {
      newChecked.splice(currentIndex, 1);
    }
  };

  useEffect(()=>{setChecked(checkedMas)},[checkedMas])

  const checkChecked = (val) =>{
    let check = false;
    checked.forEach(element => {
        if (element === val) check = true  
    });
    return check;
  }

  const allChecked = (e) => {
    let checkedElems = []
    if (e.target.checked) {
      allMasElements.forEach((item) => {
        checkedElems.push(item.id)
      })
    }

    onCheckedAll(checkedElems);
  }

  return (
    <div className='CheckboxListAccess'>
        {checkedAll && <div className='CheckboxListAccess-all'>
          <label><Checkbox size='small'
                  onChange={allChecked}
                /> {LANG.GLOBAL.pick_all}</label>
        </div>}
         <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {allMasElements.map((item) => {
        const labelId = `checkbox-list-label-${item.id + 1}`;
        return (
          <ListItem
            key={item.id + item.name}
            // secondaryAction={
            //   <IconButton edge="end" aria-label="comments">
            //     <CommentIcon />
            //   </IconButton>
            // }
            disablePadding
          >
            <ListItemButton role={undefined} onClick={handleToggle(item)} dense>
              <ListItemIcon>
                <Checkbox
                  size='small'
                  edge="start"
                  checked={checkChecked(item.id)}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={item.name} />
              {item.description && <Hint text={item.description} placement='left'/>}
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
    </div>
  );
}
