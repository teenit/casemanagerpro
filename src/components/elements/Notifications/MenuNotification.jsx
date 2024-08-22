import React from 'react'
import Icon from '../Icons/Icon'

const MenuNotification = ({IsUnread, data, read}) => {
   const eventType = {
    edit:{
        icon:"edit",
        color: "$background-color"
    },
    update:{
        icon:"star",
        color:"#FFE55F"
    },
    birthday:{
        icon:"birthday",
        color: "#9747FF"
    }
   }
  return (
    <div className={`MenuNotification ${!IsUnread && 'MenuNotification-read'}`}>
        <div className='MenuNotification-header'>
            <div className="MenuNotification-header-title">
                <Icon icon={"edit"} addClass={"default-icon"}/>
                <div>hffhfh</div>
            </div>
            {IsUnread && <div className="MenuNotification-header-unread" onClick={()=>{read(data.id)}}>Нове</div>}
            
        </div>
        <div className='MenuNotification-inner'>
            <div>{data.value.message}</div>
            <div className='MenuNotification-inner-date'>{data.date}</div>
            <div className='MenuNotification-inner-options'>
                <button className='MenuNotification-button MenuNotification-inner-options-more'>
                    <div className='MenuNotification-button-content'>
                        <Icon icon={"eye"} addClass={"notification-icon"}/>
                        <div>Детальніше</div>
                    </div>
                </button>
                <button className='MenuNotification-button MenuNotification-inner-options-call'>
                <div className='MenuNotification-button-content'>
                        <Icon icon={"call"} addClass={"notification-icon"}/>
                        <div>Зателефонувати</div>
                    </div>
                </button>
            </div>
        </div>
    </div>
  )
}

export default MenuNotification