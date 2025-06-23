import { Button } from '@mui/material'
import React from 'react'
import Icon from '../elements/Icons/Icon'
import { LANG } from '../../services/config'


const EmptyData = ({icon = "no_results", title=LANG.emptyData.notFound, buttonText, click, access=true}) => {
  return (
    <div className="EmptyData">
        <div className="EmptyData-icon">
            <Icon icon={icon}/>
        </div>
        <div className="EmptyData-bottom">
            <div className="EmptyData-bottom-title">{title}</div>
            {buttonText && access && <Button variant='outlined' onClick={click}>{buttonText}</Button>}
        </div>

    </div>
  )
}

export default EmptyData