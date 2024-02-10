import React from "react";
import { Component } from "react";
import { createPortal } from "react-dom";
import s from "./Modal.module.css";
const modalRoot = document.querySelector('#modal-root');


export class ModalPortal extends Component {
    render()
    {
     return createPortal(
         <div className={s.modal__portal}>
             {this.props.children}
         </div>,
         modalRoot
     )
    } 
  }
  export default ModalPortal;