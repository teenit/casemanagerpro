import { Component } from "react";
import Modal from "../Modal";
import { LANG } from "../../../services/config";
import { Button, MenuItem, Select } from "@mui/material";
import { apiResponse } from "../../Functions/get_apiObj"

class EditUserModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            access: this.props.access
        }
    }
    accessHandler = (val) => {
        this.setState({ access: val })
    }

    saveHandler = () => {
        apiResponse({access_id:this.state.access, user_id:this.props.id}, "access/set-user-access.php").then((res) => {
            if(this.state.access === "0"){
                this.props.deactivate(this.props.id)
            }
            if(this.props.active=="false" && this.state.access !== "0"){
                this.props.activate(this.props.id)
            }
            this.props.close()
            this.props.successHandler()
        })
    }
    render() {
        return (
            <Modal closeHandler={this.props.close} header={LANG.USERS_PAGE.set_access}
                footer={<>
                    <Button variant="contained" onClick={this.saveHandler}>{LANG.GLOBAL.save}</Button>
                    <Button variant="contained" color="error" onClick={this.props.close}>{LANG.GLOBAL.cancel}</Button>
                </>}>
                <Select
                    value={this.state.access}
                    onChange={(e) => { this.accessHandler(e.target.value) }}
                >
                    <MenuItem value={"0"}>{LANG.USERS_PAGE.no_level}</MenuItem>
                    {this.props.accessList.map((item, index) => {
                        return <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                    })}
                </Select>
            </Modal>
        )
    }
}
export default EditUserModal