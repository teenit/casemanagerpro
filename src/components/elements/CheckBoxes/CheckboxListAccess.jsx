import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';

export default function CheckboxListAccess({allMas, checkedMas, onChange}) {
  const [checked, setChecked] = useState([checkedMas]);
  const [allMasElements, setAllMasElements] = useState(allMas());
    // useEffect(()=>{
    //     console.log(allMas())
    //    // setAllMasElements()
    // },[])
  const handleToggle = (value) => () => {
    //return console.log(value)
    onChange(value.id)
    const currentIndex = checked.indexOf(value.id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value.id);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    //setChecked(newChecked);
  };

  useEffect(()=>{setChecked(checkedMas)},[checkedMas])

  const checkChecked = (val) =>{
    let check = false;
    checked.forEach(element => {
        if (element === val) check = true  
    });
    return check;
  }

  return (
    <div className='CheckboxListAccess'>
         <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {allMasElements.map((item) => {
        const labelId = `checkbox-list-label-${item.id + 1}`;
        return (
          <ListItem
            key={item.id + item.name}
            secondaryAction={
              <IconButton edge="end" aria-label="comments">
                <CommentIcon />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton role={undefined} onClick={handleToggle(item)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checkChecked(item.id)}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={item.id + " " + item.name} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
    </div>
  );
}
