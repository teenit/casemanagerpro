import React from "react";
import "./modal.css"
const ModalInfo = ({info,func})=>{
    return info.showModal ?(
        <div className={`modal__window`}>
            <div className="modal__window__inner">
                <div className={`modal__window__message ${info.marker}`}>
                    <p>{info.message}</p>
                    <div className="primary__btn" onClick={()=>{func()}}>OK</div>
                </div>
            </div>
        </div>
    ):(
        <></>
    )
}
export default ModalInfo;