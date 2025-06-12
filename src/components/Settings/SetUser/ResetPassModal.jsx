import React, { Component } from 'react';

import Modal from '../../Modals/Modal';
import { Button, MenuItem, Select } from '@mui/material';
import Input from '../../elements/Inputs/Input';
import Textarea from '../../elements/Inputs/Textarea';
import SmallNotification from "../../elements/Notifications/SmallNotification";
import { apiResponse } from "../../Functions/get_apiObj";
import { LANG } from '../../../services/config';

class ResetPassModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                password: "",
                confirmPassword: ""
            },
            alert: {
                active: false,
                isSuccess: false,
                message: ""
            }
        };

    }


    handleChange = (key, value) => {
        this.setState(prevState => ({
            formData: {
                ...prevState.formData,
                [key]: value
            }
        }));
    };

    validate = () => {
        if (this.state.formData.password !== this.state.formData.confirmPassword) {
            this.alertHandler(false, LANG.set_user.alertMessages.dont_match)
        } else if (this.state.formData.password.length < 6) {
            this.alertHandler(false, LANG.set_user.alertMessages.pass)
        } else {
            this.handleSubmit()
        }
    }

    handleSubmit = () => {
        const data = {
            password: this.state.formData.password,
            userId: this.props.id
        }
        apiResponse(data, "user/reset-password.php").then((res) => {
            this.alertHandler(true, LANG.set_user.alertMessages.password_updated)
            setTimeout(()=>{
                this.props.close()
            }, 1500)
        })
    };
    alertHandler = (isSuccess, message) => {
        this.setState({
            alert: {
                active: !this.state.alert.active,
                isSuccess: isSuccess,
                message: message
            }
        });

    }
    render() {
        const { formData, alert } = this.state
        return (
            <Modal
                closeHandler={this.props.close}
                header={`${LANG.set_user.reset_password_for} ${this.props.userName}`}
                footer={
                    <>
                        <Button variant="contained" onClick={this.validate}>{LANG.GLOBAL.save}</Button>
                        <Button variant="contained" color="error" onClick={this.props.close}>{LANG.GLOBAL.cancel}</Button>
                    </>
                }
            >
                <form className='ResetPassModal'>
                    <Input addClass='w100' type='password' value={formData.password} label={LANG.set_user.new_password} onChange={(e) => { this.handleChange("password", e.target.value) }} />
                    <Input addClass='w100' type='password' value={formData.confirmPassword} label={LANG.set_user.confirm_password} onChange={(e) => { this.handleChange("confirmPassword", e.target.value) }} />
                {alert.active && <SmallNotification isSuccess={alert.isSuccess} text={alert.message} close={() => this.alertHandler(false, '')} />}
                </form>

            </Modal>
        );
    }
}

export default ResetPassModal;
