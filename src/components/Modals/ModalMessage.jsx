import React from "react";
import { Component } from "react";
import { createPortal } from "react-dom";
import s from "./Modal.module.css";
import RootPortal from "../Portals/RootPortal";
const modalRoot = document.querySelector('#modal-root');


const ModalMessage = ({footer,header,close})=> {
     return (
        <RootPortal>
         <div className="ModalMessage">
             <div className="ModalMessage-inner">
                <p>{header}</p>
                 <div className="ModalMessage-inner-footer">
                    {footer}
                 </div>
             </div>
         </div>
         </RootPortal>
     )
    } 
  export default ModalMessage;