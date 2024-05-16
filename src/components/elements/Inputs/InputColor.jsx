import React from 'react'
import { MuiColorInput } from 'mui-color-input'

const InputColor = ({value, onChange}) => {

  return <MuiColorInput value={value} onChange={onChange}/>
}

export default InputColor;