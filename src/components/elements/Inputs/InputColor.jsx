import React from 'react'
import { MuiColorInput } from 'mui-color-input'

const InputColor = ({value, onChange, addClass, disabled = false}) => {

  return <MuiColorInput disabled={disabled} value={value} onChange={onChange} className={addClass}/>
}

export default InputColor;