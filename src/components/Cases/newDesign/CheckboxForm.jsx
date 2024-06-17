import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';

export default function CheckboxForm({allMas, checkedMas, onChange}) {
  const [checked, setChecked] = useState([]);
  const [allMasElements, setAllMasElements] = useState([]);
  useEffect(() => {
    setChecked([...checkedMas]);
  }, [checkedMas]);

  useEffect(() => {
    setAllMasElements([...allMas]);
  }, [allMas]);

  const handleToggle = (value) => () => {
    const checkIndex = allMasElements.findIndex(item => item.id === value.id);
    const isChecked = checked.includes(checkIndex);
  
    const newChecked = isChecked ? checked.filter(index => index !== checkIndex) : [...checked, checkIndex]
    newChecked.sort((a, b) => a - b)
    setChecked(newChecked);
    onChange(newChecked);
  };
  
  
  const checkChecked = (value) => {
    const checkIndex = allMasElements.findIndex(item => item.id === value.id)
    return checked.includes(checkIndex);
  };
  

  return (
    <div className='CheckboxForm'>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {allMasElements.map((item,index) => {
          const labelId = `checkbox-list-label-${item.id + 1}`;
            return (
            <ListItem
              key={index}
              // secondaryAction={
              //   <IconButton edge="end" aria-label="comments">
              //     <CommentIcon />
              //   </IconButton>
              // } 
              disablePadding
            >
              
              <ListItemButton role={undefined} onClick={handleToggle(item)} dense>
              <ListItemText id={labelId} primary={item.name} />
                 <Checkbox
                    edge="start"
                    checked={checkChecked(item)}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
              </ListItemButton>
            </ListItem>
          
          );
        })}
      </List>
    </div>
  );
}