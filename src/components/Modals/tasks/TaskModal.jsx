import { Button, MenuItem, Select, InputLabel, FormControl } from "@mui/material"
import Modal from "../Modal"
import { LANG } from "../../../services/config"
import { Component } from "react"
import Input from "../../elements/Inputs/Input"
import Textarea from "../../elements/Inputs/Textarea"
import { apiResponse } from "../../Functions/get_apiObj"
import SmallNotification from "../../elements/Notifications/SmallNotification"
import SelectUsers from "../../elements/Selects/SelectUsers"
import moment from "moment"
import SmallTextEditor from "../../elements/TextEditor/SmallTextEditor"

class TaskModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.data || {
                title: "",
                description: LANG.GLOBAL.description,
                dead_line: " ",
                from: " ",
                to: " ",
                reviewer_id: " ",
                priority: 2
            },
            alert: {
                active: false,
                isSuccess: false,
                message: ""
            }
        }
    }
    editTask = () => {
        let updated_at = moment().format("dd-MM-YYYY hh:mm:ss")
        apiResponse({ ...this.state.data, action: "edit_task", task_id: this.state.data.id, updated_at: updated_at }, 'tasks/task.php').then((res) => {
            this.props.close()
            this.props.loadData()
        })
    }
    addTask = () => {
        apiResponse({ ...this.state.data, action: "add_task" }, 'tasks/task.php').then((res) => {
            this.props.close()
            this.props.loadData()
        })
    }
    validate = () => {
        const { title, dead_line, from, to, reviewer_id } = this.state.data
        if (title.length > 0 && dead_line.length>1 && from!==" " && to!==" " && reviewer_id!==" ") {
            if (this.props.data) {
                this.editTask()
            } else {
                this.addTask()
            }
        } else {
            this.alertHandler(false, LANG.TASKS_PAGE.invalid_data)
        }
    }

    alertHandler = (isSuccess = false, message = "") => {
        this.setState({
            alert: {
                ...this.state.alert,
                active: !this.state.alert.active,
                isSuccess: isSuccess,
                message: message
            }
        })
    }

    dataHandler = (key, value) => {
        this.setState({ data: { ...this.state.data, [key]: value } })
    }

    render() {
        const { data, alert } = this.state
        const users = Object.keys(this.props.users)

        return (
            <>
                <Modal
                    header={this.props.data ? LANG.TASKS_PAGE.edit : LANG.TASKS_PAGE.add}
                    closeHandler={this.props.close}
                    footer={
                        <>
                            <Button variant="contained" onClick={this.validate}>
                                {LANG.GLOBAL.save}
                            </Button>
                            <Button variant="contained" color="error" onClick={this.props.close}>
                                {LANG.GLOBAL.cancel}
                            </Button>
                        </>
                    }
                >
                    <>
                        <div className="Modal--split">
                            <Input addClass="w100"
                                value={data.title}
                                label={LANG.GLOBAL.title}
                                onChange={(e) => this.dataHandler("title", e.target.value)}
                            />
                            <SelectUsers title={LANG.TASKS_PAGE.from} value={data.from} menuItems={this.props.users}
                                onChange={(e) => { this.dataHandler("from", e.target.value) }} />

                        </div>
                        <SmallTextEditor value={data.description} onChange={(e) => this.dataHandler("description", e)}/>
                        {/* <Textarea
                            value={data.description}
                            label={LANG.GLOBAL.description}
                            onChange={(e) => this.dataHandler("description", e.target.value)}
                        /> */}

                        <div className="Modal--split">
                            <Input
                                addClass="w100"
                                type="datetime-local"
                                value={data.dead_line}
                                label={LANG.TASKS_PAGE.dead_line}
                                onChange={(e) => this.dataHandler("dead_line", e.target.value)}
                            />

                            <SelectUsers title={LANG.TASKS_PAGE.to} value={data.to} menuItems={this.props.users}
                                onChange={(e) => { this.dataHandler("to", e.target.value) }} />
                        </div>


                        <div className="Modal--split">
                            <FormControl>
                                <InputLabel>{LANG.TASKS_PAGE.priority_text}</InputLabel>
                                <Select size="small"
                                    label={LANG.TASKS_PAGE.priority_text}
                                    value={data.priority}
                                    onChange={(e) => this.dataHandler("priority", e.target.value)}
                                >
                                    {Object.keys(LANG.TASKS_PAGE.priority).map((item, index) => {
                                        return <MenuItem key={index} value={item}>{LANG.TASKS_PAGE.priority[item]}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>

                            <SelectUsers title={LANG.TASKS_PAGE.reviewer_id} value={data.reviewer_id} menuItems={this.props.users}
                                onChange={(e) => { this.dataHandler("reviewer_id", e.target.value) }} />
                        </div>
                    </>
                </Modal>

                {alert.active && (
                    <SmallNotification
                        isSuccess={alert.isSuccess}
                        text={alert.message}
                        close={() => this.alertHandler()}
                    />
                )}
            </>
        )
    }
}

export default TaskModal
