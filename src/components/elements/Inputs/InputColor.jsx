import React from 'react'
import { Input } from '@mui/material';

const InputColor = ({value, onChange, addClass, disabled = false}) => {

  //return <MuiColorInput disabled={disabled} value={value} onChange={onChange} className={addClass}/>
return <Input type='color' disabled={disabled} value={value} onChange={onChange} className={addClass} />
}

export default InputColor;