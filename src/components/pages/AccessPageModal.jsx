import React, { useState } from 'react'
import ModalSimple from '../Modals/ModalSimple'
const AccessPageModal = ({ close }) => {
    const [data,setData] = useState({
        name:"",
        desc:""
    })
    const [state,setState] = useState(null)
    useEffect(()=>{
        apiResponse({},'access/filename.php').then((res)=>setState(res))
        console.log("test")
    },[
    ])
    return (
        <ModalSimple>
            <div className='AccessPage-modal'>
                <div className='AccessPage-modal-cross' onClick={close}>
                    <div className='AccessPage-modal-cross-c1'></div>
                    <div className='AccessPage-modal-cross-c2'></div>
                </div>
                <h2>Додати права</h2>
                <div className='AccessPage-modal-option'>
                    <p>Ім'я</p>
                    <input type="text" value={data.name} onChange={(e)=>{
                    setData({...data,name:e.target.value})
                }} />
                </div>
                <div className='AccessPage-modal-option'>
                    <p>Опис</p>
                    <textarea name="" id="" cols="50" rows="10" onChange={(e)=>{
                    setData({...data,desc:e.target.value})
                }}></textarea>
                </div>
                <button className='AccessPage-button' onClick={()=>{
                    if(data.name.length>0){
                        close()
                    }else{
                        alert("Помилка: введіть назву ролі.")
                    }
                }}>Зберегти</button>
            </div>
        </ModalSimple>
    )
}

export default AccessPageModal