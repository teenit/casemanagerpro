import { Component } from "react";
import ExportCasesPage from "../pages/ExportCasesPage";
import Modal from "./Modal";
import { Button } from "@mui/material";
import { LANG } from "../../services/config";
class ExportCasesModal extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
  


    render() {
        const { type } = this.state
        return <Modal header={LANG.resources.edit_resource} closeHandler={this.props.closeHandler} footer={
            <>
                <Button variant="contained" onClick={this.saveHandler}>{LANG.GLOBAL.save}</Button>
                <Button variant="contained" color="error" onClick={this.props.closeHandler}>{LANG.GLOBAL.cancel}</Button>
            </>
        }>
            <>
                <ExportCasesPage case_id = {this.props.case_id } successHandler={this.props.closeHandler}/>
            </>
        </Modal>
    }
}
export default ExportCasesModal