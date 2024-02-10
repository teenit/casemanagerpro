import React from "react";
import { Component } from "react";
import { createPortal } from "react-dom";
import s from "./Modal.module.css";
const modalRoot = document.querySelector('#modal-root');


export class ModalSimple extends Component {
    render()
    {
     return createPortal(
         <div className={s.modal__wrap}>
             <div className={s.modal__inner}>
                 <div className={`${s.info}`}>
                        {this.props.children}
                 </div>
             </div>
         </div>,
         modalRoot
     )
    } 
  }
  export default ModalSimple;