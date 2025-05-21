import { Button } from '@mui/material'
import React from 'react'
import Icon from '../Icons/Icon'

const AddButton = ({click, title}) => {
    return (
        <div className="AddButton">
            <Button onClick={click}>
                <Icon icon={'add'} />
                {title}
            </Button>
        </div>
    )
}

export default AddButton