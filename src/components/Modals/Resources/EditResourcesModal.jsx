import { Component } from "react";
import Modal from "../Modal";
import { Button } from "@mui/material";
import { LANG } from "../../../services/config";
import Input from "../../elements/Inputs/Input";
import Textarea from "../../elements/Inputs/Textarea";
import { apiResponse } from "../../Functions/get_apiObj";
import SmallTextEditor from "../../elements/TextEditor/SmallTextEditor"
class EditResourcesModal extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentDidMount() {
        this.setState(this.props.resource)
    }
    editHandler = (key, value) => {
        this.setState({ [key]: value })
    }
    saveHandler = () => {
        apiResponse({...this.state}, "/resources").then(res=>{
            this.props.close()
            this.props.loadResources()
        })
    }
    render() {
        const { type } = this.state
        return <Modal header={"Редагувати ресурс"} closeHandler={this.props.close} footer={
            <>
                <Button variant="contained" onClick={this.saveHandler}>{LANG.GLOBAL.save}</Button>
                <Button variant="contained" color="error" onClick={this.props.close}>{LANG.GLOBAL.cancel}</Button>
            </>
        }>
            <>
                <Input addClass="w100" value={this.state.title} onChange={(e) => { this.editHandler("title", e.target.value) }} label={LANG.GLOBAL.title} />
                <SmallTextEditor onChange={(e) => { this.editHandler("description", e) }} value={this.state.description}/>
                {/* <Textarea addClass="w100" value={this.state.description} onChange={(e) => { this.editHandler("description", e.target.value) }} label={LANG.GLOBAL.description} /> */}
                {type == "link" && <Input addClass="w100" value={this.state.link} onChange={(e) => { this.editHandler("link", e.target.value) }} label={LANG.GLOBAL.link} />}
            </>
        </Modal>
    }
}
export default EditResourcesModal