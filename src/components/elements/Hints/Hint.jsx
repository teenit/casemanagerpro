import { Tooltip } from '@mui/material'
import React from 'react'
import Icon from '../Icons/Icon'


const Hint = ({ icon = "warning", text='', placement="bottom" }) => {
    return (
        <div className='Hint'>
            <Tooltip title={text} placement={placement}>
                <span>
                    <Icon icon={icon} addClass={"hint-icon"} />
                </span>
            </Tooltip>
        </div>
    )
}

export default Hint