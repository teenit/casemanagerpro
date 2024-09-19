import { Tooltip } from '@mui/material'
import React, { useState } from 'react'
import Icon from '../Icons/Icon'


const Hint = ({ icon = "warning", text='', placement="bottom" }) => {
    const [open, setOpen] = useState(false)
    return (
        <div className='Hint'>
            <Tooltip open={open} onClose={()=>setOpen(false)} title={text} placement={placement} arrow>
                <span>
                    <Icon icon={icon} addClass={"hint-icon"} onClick={()=>setOpen(true)}/>
                </span>
            </Tooltip>
        </div>
    )
}

export default Hint