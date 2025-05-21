import React, { Component } from 'react';

import Modal from '../../Modals/Modal';
import { Button, MenuItem, Select } from '@mui/material';
import Input from '../../elements/Inputs/Input';
import Textarea from '../../elements/Inputs/Textarea';
import SmallNotification from "../../elements/Notifications/SmallNotification";
import { apiResponse } from "../../Functions/get_apiObj";
import { LANG } from '../../../services/config';

class SetUserModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        userName: '',
        userPhone: '',
        userEmail: '',
        userAddress: '',
        userType: 'volunteer',
        userWork: '',
        userAnotherData: '',
        pass: ''
      },
      alert: {
        active:false,
        message: ''
      }
    };

    this.selectOptions = [
      { name: LANG.set_user.volonter, value: "volunteer" },
      { name: LANG.set_user.manager, value: "manager" },
      { name: LANG.set_user.specialist, value: "expert" },
      { name: LANG.set_user.fsr, value: "fsr" },
      { name: LANG.set_user.worker, value: "worker" },
      { name: LANG.set_user.admin, value: "administrator" }
    ];
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
    const { formData } = this.state;
    let valid = true;
    if (!formData.userName || formData.userName.length < 3) {
      this.setAlert(false, LANG.set_user.alertMessages.pib);
      valid = false;
    } else if (!formData.userPhone || formData.userPhone.length < 10) {
      this.setAlert(false, LANG.set_user.alertMessages.phone);
      valid = false;
    } else if (!formData.userEmail || formData.userEmail.length < 5 || !formData.userEmail.includes('@')) {
      this.setAlert(false, LANG.set_user.alertMessages.email);
      valid = false;
    } else if (formData.userAddress && formData.userAddress.length < 5) {
      this.setAlert(false, LANG.set_user.alertMessages.adress);
      valid = false;
    } else if (!formData.userWork || formData.userWork.length < 3) {
      this.setAlert(false, LANG.set_user.alertMessages.work);
      valid = false;
    } else if (!formData.pass || formData.pass.length < 6) {
      this.setAlert(false, LANG.set_user.alertMessages.pass);
      valid = false;
    }
    return valid;
  };

  setAlert = (isSuccess, message) => {
    this.setState({
      alert: {
        active:!this.state.alert.active,
        isSuccess: isSuccess,
        message:message
      }
    });
  };

  handleSubmit = (e) => {
    e.preventDefault()

    if (!this.validate()) return;

    const levelObj = {
      activeNewUser: false,
      addCase: false,
      addEditCategoriesCase: false,
      addEditCategoriesUser: false,
      case: false,
      cases: false,
      changeResponsibleCase: false,
      contacts: false,
      createIndividualPlan: false,
      deactivateUsers: false,
      editOwnCase: false,
      editSomeonesCase: false,
      history: false,
      loadDocument: false,
      loadPhotoVideo: false,
      ownCab: false,
      reports: false,
      searchCasesUsers: false,
      settings: false,
      specificationUsers: false,
      statistics: false
    };

    const data = { ...this.state.formData, level: levelObj }

    apiResponse(data, "user-register.php").then(response => {
      const isSuccess = response.marker !== "red"
      this.setAlert(isSuccess, response.message)

      if (isSuccess) {
        this.setState({
          formData: {
            userName: '',
            userPhone: '',
            userEmail: '',
            userAddress: '',
            userType: 'volunteer',
            userWork: '',
            userAnotherData: '',
            pass: ''
          }
        });
        if (this.props.successHandler) 
            this.props.successHandler();
        
        this.props.close()
      }
    }).catch((error)=>console.log(error))
  };

  render() {
    const { formData, alert } = this.state

    return (
      <Modal
        closeHandler={this.props.close}
        header="Зареєструвати користувача"
        footer={
          <>
            <Button variant="contained" onClick={this.handleSubmit}>{LANG.GLOBAL.save}</Button>
            <Button variant="contained" color="error" onClick={this.props.close}>{LANG.GLOBAL.cancel}</Button>
          </>
        }
      >
        <form className="SetUserModal" onSubmit={this.handleSubmit}>
          <div className="SetUserModal-split">
            <Input type="text" label={LANG.set_user.name} name="userName" value={formData.userName} onChange={(e) => this.handleChange("userName", e.target.value)} />
            <Input type="number" label={LANG.set_user.phone} name="userPhone" value={formData.userPhone} onChange={(e) => this.handleChange("userPhone", e.target.value)} />
          </div>
          <div className="SetUserModal-split">
            <Input type="text" label="E-mail" name="userEmail" value={formData.userEmail} onChange={(e) => this.handleChange("userEmail", e.target.value)} />
            <Input type="text" label={LANG.set_user.adress} name="userAddress" value={formData.userAddress} onChange={(e) => this.handleChange("userAddress", e.target.value)} />
          </div>
          <div className="SetUserModal-block">
            <label>{LANG.set_user.user_type}</label>
            <Select size="small" name="userType" value={formData.userType} onChange={(e) => this.handleChange("userType", e.target.value)}>
              {this.selectOptions.map((item, index) => (
                <MenuItem key={index} value={item.value}>{item.name}</MenuItem>
              ))}
            </Select>
          </div>
          <div className="SetUserModal-split">
            <Input type="text" label={LANG.set_user.work} name="userWork" value={formData.userWork} onChange={(e) => this.handleChange("userWork", e.target.value)} />
            <Input type="password" label={LANG.set_user.password} name="pass" value={formData.pass} onChange={(e) => this.handleChange("pass", e.target.value)} />
          </div>
          <div className="input-wrap">
            <Textarea label={LANG.set_user.about} name="userAnotherData" value={formData.userAnotherData} onChange={(e) => this.handleChange("userAnotherData", e.target.value)} />
          </div>
          {alert.active && <SmallNotification isSuccess={alert.isSuccess} text={alert.message} close={() => this.setAlert(false, '')} />}
        </form>
      </Modal>
    );
  }
}

export default SetUserModal;
