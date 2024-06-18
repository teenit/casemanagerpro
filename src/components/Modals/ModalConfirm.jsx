import React from "react";
import Modal from "./Modal";
import { LANG } from "../../services/config";
import { Button } from "@mui/material";

const ModalConfirm = ({closeHandler, successHandler, text}) => {

    return(
        <Modal 
            closeHandler={closeHandler}
            header={LANG.GLOBAL.confirm_title}
            footer={
                <>
                    <Button onClick={closeHandler} color="error">{LANG.GLOBAL.cancel}</Button>
                    <Button variant="contained" className="button" onClick={successHandler} >{LANG.GLOBAL.delete}</Button>
                </>
            }
            >
            <div>
                {text}
            </div>
        </Modal>
    )
}

export default ModalConfirm;