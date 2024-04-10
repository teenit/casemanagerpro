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
    setChecked(checkedMas);
  }, [checkedMas]);

  useEffect(() => {
    setAllMasElements(allMas);
  }, [allMas]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.findIndex(item => item.id === value.id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    onChange(newChecked);
  };

  const checkChecked = (val) => {
    let check = false;
    checked.forEach(element => {
      if (element.id === val.id) check = true;
    });
    return check;
  }

  return (
    <div className='CheckboxForm'>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {allMasElements.map((item) => {
          const labelId = `checkbox-list-label-${item.id + 1}`;
          return (
            <ListItem
              key={item.id}
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
                    checked={checkChecked(item)}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={item.name} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}
