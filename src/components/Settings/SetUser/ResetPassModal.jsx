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
            this.alertHandler(false, "Паролі не співпадають")
        } else if (this.state.formData.password.length < 6) {
            this.alertHandler(false, "Пароль повинен бути довжиною від 6 символів")
        } else {
            this.handleSubmit()
        }
    }

    handleSubmit = () => {
        const data = {
            password: this.state.formData.password,
            userId: this.props.userId
        }
        apiResponse(data, "user/reset-password.php").then((res) => {
            this.alertHandler(true, "Пароль оновлено")
        })
    };
    alertHandler = (isSuccess, message) => {
        this.setState({
            alert: {
                active: true,
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
                header="Скинути пароль"
                footer={
                    <>
                        <Button variant="contained" onClick={this.validate}>{LANG.GLOBAL.save}</Button>
                        <Button variant="contained" color="error" onClick={this.props.close}>{LANG.GLOBAL.cancel}</Button>
                    </>
                }
            >
                <form>
                    <Input value={formData.password} label='Новий пароль' onChange={(e) => { this.handleChange("password", e.target.value) }} />
                    <Input value={formData.confirmPassword} label='Підтвердити пароль' onChange={(e) => { this.handleChange("confirmPassword", e.target.value) }} />
                {alert.active && <SmallNotification isSuccess={alert.isSuccess} text={alert.message} close={() => this.alertHandler(false, '')} />}
                </form>

            </Modal>
        );
    }
}

export default ResetPassModal;
