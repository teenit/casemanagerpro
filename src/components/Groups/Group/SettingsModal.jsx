import React from 'react'


const SettingsModal = ({close}) => {
  return (
    <div className='SettingsModal' onClick={close}>
        <div className='SettingsModal-inner'>
            <div className='SettingsModal-inner-title'>Group</div>
            <div className='SettingsModal-inner-option'>
                <div>Додати учасника групи</div>
            </div>
        </div>
    </div>
  )
}

export default SettingsModal