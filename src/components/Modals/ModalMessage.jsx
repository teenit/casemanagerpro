import React from "react";
import { Component } from "react";
import { createPortal } from "react-dom";
import s from "./Modal.module.css";
const modalRoot = document.querySelector('#modal-root');


export class ModalMessage extends Component {
    render()
    {
     return createPortal(
         <div className="ModalMessage">
             <div className="ModalMessage-inner">
                 <div className={`${s.info}`}>
                        {this.props.children}
                 </div>
                 <div className="ModalMessage-inner-footer"></div>
             </div>
         </div>,
         modalRoot
     )
    } 
  }
  export default ModalMessage;