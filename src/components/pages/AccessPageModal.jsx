import React, { useEffect, useState } from 'react'
import ModalMessage from '../Modals/ModalMessage'
import { apiResponse } from '../Functions/get_apiObj'
import { LANG } from '../../services/config'
const AccessPageModal = ({ close }) => {
    const [data,setData] = useState({
        name:"",
        desc:""
    })
    const [state,setState] = useState(null)
    useEffect(()=>{
        
         apiResponse ({},'access/filename.php').then((res)=>setState(res))
    },[
    ])
    return (
        <ModalMessage>
            <div className='AccessPage-modal'>
                <div className='AccessPage-modal-cross' onClick={close}>
                    <div className='AccessPage-modal-cross-c1'></div>
                    <div className='AccessPage-modal-cross-c2'></div>
                </div>
                <h2>{LANG.ACCESS_PAGE.add}</h2>
                <div className='AccessPage-modal-option'>
                    <p>{LANG.GLOBAL.name}</p>
                    <input type="text" value={data.name} onChange={(e)=>{
                    setData({...data,name:e.target.value})
                }} />
                </div>
                <div className='AccessPage-modal-option'>
                    <p>{LANG.GLOBAL.description}</p>
                    <textarea name="" id="" cols="50" rows="10" onChange={(e)=>{
                    setData({...data,desc:e.target.value})
                }}></textarea>
                </div>
                <button className='AccessPage-button' onClick={()=>{
                    if(data.name.length>0){
                        close()
                    }else{
                        alert(LANG.ACCESS_PAGE.error_no_role_name)
                    }
                }}>{LANG.GLOBAL.save}</button>
            </div>
        </ModalMessage>
    )
}

export default AccessPageModal