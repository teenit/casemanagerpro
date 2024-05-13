import React from "react";
import Modal from "../Modals/Modal";

const OpenPhoto = ({url, close}) => {
    return (
        <Modal closeHandler={close}>
            <div className="OpenPhoto">
                <img className="OpenPhoto-img" src={url} alt="" />
            </div>
        </Modal>
    )
}

export default OpenPhoto