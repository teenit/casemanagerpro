import { Component } from "react";
import { apiResponse } from "../Functions/get_apiObj";
import LoadingPage from "../Loading/LoadingPage";
import InputBlock from "../elements/Inputs/InputBlock";
import { Button } from "@mui/material";
import { connect } from "react-redux";
import TaskModal from "../Modals/tasks/TaskModal";
import Input from "../elements/Inputs/Input";
import { LANG } from "../../services/config";
import { NavLink } from "react-router-dom";
import Textarea from "../elements/Inputs/Textarea";
import Icon from "../elements/Icons/Icon";
import ModalConfirm from "../Modals/ModalConfirm"
import Modal from "../Modals/Modal";
import SmallNotification from "../elements/Notifications/SmallNotification";
class TaskPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            task: {},
            feedbacks: [],
            modals: {
                edit_task: false,
                edit_feedback: false,
                confirm_delete_task: false
            },
            current_feedback: null,
            feedback: "",
            alert: {
                active: false,
                isSuccess: false,
                message: ""
            }
        };

    }

    loadData = () => {
        this.setState({ loading: true })
        let obj = {
            action: "get_task",
            task_id: this.props.params.id
        };

        apiResponse(obj, 'tasks/task.php').then((res) => {
            this.setState({ task: res.data });
            this.setState({ loading: false });
            this.loadFeedback();
        });
    }
    getUsers = () => {
        this.setState({ loading: true })

        apiResponse({ action: "get_users_list" }, "user/users.php").then((res) => {
            this.setState({ users: res.data })
            this.setState({ loading: false })

        })
    }
    loadFeedback = () => {
        apiResponse({ task_id: this.props.params.id, action: "get_feedback_list" }, "tasks/task.php").then((res) => {
            this.setState({ feedbacks: res.data })
        })
    }
    addFeedback = () => {
        if (this.state.feedback.length < 1) return this.alertHandler(false, LANG.TASK_PAGE.empty_feedback)
        apiResponse({ task_id: this.props.params.id, feedback: this.state.feedback, action: "add_feedback" }, "tasks/task.php").then((res) => {
            this.loadData()
            this.setState({ feedback: "" })
        })
    }
    deleteTask = () => {
        apiResponse({ task_id: this.state.task.id, action: "delete_task" }, "tasks/task.php").then((res) => {
            this.props.navigate("/tasks")
        })
    }
    finishTask = (data) => {
        const actionFinished = data.is_finished ? 0 : 1
        apiResponse({ ...data, action: "edit_task", task_id: data.id, is_finished: actionFinished }, 'tasks/task.php').then((res) => {
            this.loadData()
        })
    }
    archiveHandler = (data) => {
        const actionArchive = data.is_archived ? 0 : 1
        apiResponse({ ...data, action: "edit_task", task_id: data.id, is_archived: actionArchive }, 'tasks/task.php').then((res) => {
            this.loadData()
        })
    }
    componentDidMount() {
        this.loadData();
        this.getUsers();

    }
    modalHandler = (key) => {
        this.setState({ modals: { ...this.state.modals, [key]: !this.state.modals[key] } })
    }
    editFeedbackHandler = (key, value) => {
        this.setState({ current_feedback: { ...this.state.current_feedback, [key]: value } })
    }
    alertHandler = (isSuccess = false, message = "") => {
        this.setState({ alert: { ...!this.state.alert, active: !this.state.alert.active, isSuccess: isSuccess, message: message } })
    }
    render() {
        const { loading, task, feedbacks, users, modals, current_feedback } = this.state;

        console.log(this.state)

        return !loading ? (
            <div className="Task">
                <div className="Task-control">
                    <Button variant="contained" onClick={() => { this.modalHandler("edit_task") }}>{LANG.TASK_PAGE.edit_task}</Button>
                    <Button variant="contained" color="error" onClick={() => { this.modalHandler("confirm_delete_task") }}>
                        {LANG.TASK_PAGE.delete_task}</Button>
                </div>
                <div className="Task-details">
                    {task.dead_line && (
                        <div>
                            <span className="bold">{LANG.TASKS_PAGE.dead_line}: </span>
                            {task.dead_line}
                        </div>)}

                    {task.from && users?.[task.from] && (
                        <div>
                            <span className="bold">{LANG.TASKS_PAGE.from}: </span>
                            <NavLink to={`/user/${task.from}`}>{users[task.from]}</NavLink>
                        </div>)}

                    {task.to && users?.[task.to] && (
                        <div>
                            <span className="bold">{LANG.TASKS_PAGE.to}: </span>
                            <NavLink to={`/user/${task.to}`}>{users[task.to]}</NavLink>
                        </div>)}

                    {task.reviewer_id && users?.[task.reviewer_id] && (
                        <div>
                            <span className="bold">{LANG.TASKS_PAGE.reviewer_id}: </span>
                            <NavLink to={`/user/${task.reviewer_id}`}>{users[task.reviewer_id]}</NavLink>
                        </div>)}

                    {task.date_created && (
                        <div>
                            <span className="bold">{LANG.GLOBAL.date_created}: </span>
                            {task.date_created}
                        </div>)}

                    {task.updated_at && (
                        <div>
                            <span className="bold">{LANG.TASKS_PAGE.updated_at}: </span>
                            {task.updated_at}
                        </div>)}

                    {task.priority && (
                        <div>
                            <span className="bold">{LANG.TASKS_PAGE.priority_text}: </span>
                            {LANG.TASKS_PAGE.priority[task.priority]}
                        </div>)}

                    <div>
                        <span className="bold">{LANG.TASKS_PAGE.finished}: </span>
                        {task.is_finished ? LANG.GLOBAL.yes : LANG.GLOBAL.no}
                    </div>
                    <div>
                        <span className="bold">{LANG.TASKS_PAGE.is_archived}: </span>
                        {task.is_archived ? LANG.GLOBAL.yes : LANG.GLOBAL.no}
                    </div>
                </div>

                <div className="Task-info">
                    <div className="Task-info-title">{task.title}</div>
                    <div className="Task-info-description">{task.description}</div>
                </div>
                <div className="Task-feedbacks">
                    <div className="Task-feedbacks-title">{LANG.TASK_PAGE.feedbacks}</div>
                    {feedbacks && feedbacks.map((item, index) => {
                        return <div key={index} className="Task-feedbacks-feedback">
                            <div className="Task-feedbacks-feedback-info">
                                {item.user_id && <div>
                                    <span className="bold">{LANG.TASK_PAGE.created_feedback}: </span>
                                    <NavLink to={`/user/${item.user_id}`}>{users[item.user_id]}</NavLink>
                                </div>}
                                {item.category_feedback && <div>
                                    <span className="bold">{LANG.GLOBAL.category}: </span>
                                    {item.category_feedback}
                                </div>}
                                {item.date_created && <div>
                                    <span className="bold">{LANG.GLOBAL.date_created}: </span>
                                    {item.date_created}
                                </div>}
                                <div>
                                    <span className="bold">{LANG.TASK_PAGE.is_read}: </span>
                                    {item.is_read ? LANG.GLOBAL.yes : LANG.GLOBAL.no}
                                </div>
                                {item.rating && <div>
                                    <span className="bold">{LANG.TASK_PAGE.rating}: </span>
                                    {item.rating}
                                </div>}
                            </div>
                            <div className="Task-feedbacks-feedback-text">{item.feedback}
                                <Icon icon={"edit"} addClass="default-icon" onClick={() => {
                                    this.modalHandler("edit_feedback")
                                    this.setState({ current_feedback: item })
                                }} />
                            </div>
                        </div>
                    })}
                    <div className="Task-feedbacks-add">
                        <Textarea addClass="w100"
                            type="text"
                            value={this.state.feedback}
                            onChange={(e) => { this.setState({ feedback: e.target.value }) }}
                            multiline={true}
                        />
                        <Button variant="contained" onClick={this.addFeedback}>{LANG.GLOBAL.add}</Button>
                    </div>
                </div>
                {modals.edit_task &&
                    <TaskModal users={this.state.users} data={this.state.task} loadData={this.loadData} close={() => { this.modalHandler("edit_task") }} />
                }
                {modals.confirm_delete_task && <ModalConfirm text={LANG.TASK_PAGE.confirm_delete}
                    closeHandler={() => { this.modalHandler("confirm_delete_task") }} successHandler={this.deleteTask} />
                }
                {modals.edit_feedback && <Modal closeHandler={() => { this.modalHandler("edit_feedback") }} header={LANG.TASK_PAGE.edit_feedback}
                    footer={<>
                        <Button variant="contained">{LANG.GLOBAL.save}</Button>
                        <Button variant="contained" color="error">{LANG.GLOBAL.cancel}</Button>
                    </>}>
                    <Textarea addClass="w100"
                        type="text"
                        value={current_feedback.feedback}
                        onChange={(e) => { this.editFeedbackHandler("feedback", e.target.value) }}
                        multiline={true}
                    />
                </Modal>}
                {this.state.alert.active && <SmallNotification isSuccess={this.state.alert.isSuccess} text={this.state.alert.message}
                    close={() => { this.alertHandler() }} />}
            </div>
        ) : (<LoadingPage effload={true} />)
    }
}
const mapStateToProps = (state) => {
    console.log(state)
    return {
        user: state
    }
};


export default connect(mapStateToProps)(TaskPage);