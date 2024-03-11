import React from "react";
import RootPortal from "../Portals/RootPortal";

const Modal = (props) => {
    console.log(props)
    const closeHandler = () =>{
        props.closeHandler();
    }
    return (
        <RootPortal>
        <div className="Modal">
            <div className="Modal--outside" onClick={closeHandler} />
            <div className="Modal--inner">
                <div className="Modal--head">
                    {props.header}
                    <div className="Modal--head-close" onClick={closeHandler}>
                        <span className="Modal--head-close-s1"></span>
                        <span className="Modal--head-close-s2"></span>
                    </div>
                </div>
                <div className="Modal--body">
                    {props.children}
                </div>
                <div className="Modal--footer">
                    {props.footer}
                </div>
            </div>
        </div>
        </RootPortal>
       
    )
}

export default Modal