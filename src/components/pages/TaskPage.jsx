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
import ActionMenu from '../Portals/ActionMenu'
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
                confirm_delete_task: false,
                confirm_delete_feedback: false
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
            console.log(res.data)
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
    finishTask = () => {
        const { task } = this.state
        const actionFinished = task.is_finished ? 0 : 1
        apiResponse({ ...task, action: "edit_task", task_id: task.id, is_finished: actionFinished }, 'tasks/task.php').then((res) => {
            this.loadData()
        })
    }
    archiveHandler = () => {
        const { task } = this.state
        const actionArchive = task.is_archived ? 0 : 1
        apiResponse({ ...task, action: "edit_task", task_id: task.id, is_archived: actionArchive }, 'tasks/task.php').then((res) => {
            this.loadData()
        })
    }
    editFeedback = () => {
        let feedback = this.state.current_feedback
        apiResponse({ ...feedback, action: "edit_feedback", feedback_id: feedback.id }, 'tasks/task.php').then((res) => {
            this.modalHandler("edit_feedback")
            this.loadData()
        })
    }
    deleteFeedback = () => {
        let feedback = this.state.current_feedback
        apiResponse({ action: "delete_feedback", feedback_id: feedback.id }, "tasks/task.php").then((res) => {
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
    getMenuItems = (feedback) => [
        {
            title: LANG.GLOBAL.edit,
            isHidden: false,
            icon: "edit",
            click: () => {
                this.setState({ current_feedback: feedback }, () => {
                    this.modalHandler("edit_feedback");
                });
            }
        },
        {
            itemType: "divider"
        },
        {
            title: LANG.GLOBAL.delete,
            isHidden: false,
            icon: "delete",
            color: 'error',
            click: () => {
                this.setState({ current_feedback: feedback }, () => {
                    this.modalHandler("confirm_delete_feedback");
                });
            }
        }
    ];

    render() {
        const { loading, task, feedbacks, users, modals, current_feedback } = this.state;


        return !loading ? (
            <div className="Task">
                <div className="Task-control">
                    <Icon icon={"edit"} addClass="default-icon large" onClick={() => { this.modalHandler("edit_task") }} />
                    <Icon icon={task.is_archived ? "unarchive" : "archive"} addClass="default-icon large" onClick={this.archiveHandler} />
                    <Icon icon={task.is_finished ? "close" : "save"} addClass="default-icon large" onClick={this.finishTask} />
                    <Icon icon={"delete"} addClass="delete-icon large" onClick={() => { this.modalHandler("confirm_delete_task") }} />
                </div>
                <div className="Task-details">
                    {task.dead_line && (
                        <div>{LANG.TASKS_PAGE.dead_line}:
                            <span className="bold"> {task.dead_line}</span>
                        </div>)}

                    {task.from && users?.[task.from] && (
                        <div>{LANG.TASKS_PAGE.from}:
                            <NavLink to={`/user/${task.from}`}> {users[task.from]}</NavLink>
                        </div>)}

                    {task.to && users?.[task.to] && (
                        <div>{LANG.TASKS_PAGE.to}:
                            <NavLink to={`/user/${task.to}`}> {users[task.to]}</NavLink>
                        </div>)}

                    {task.reviewer_id && users?.[task.reviewer_id] && (
                        <div>{LANG.TASKS_PAGE.reviewer_id}:
                            <NavLink to={`/user/${task.reviewer_id}`}> {users[task.reviewer_id]}</NavLink>
                        </div>)}

                    {task.date_created && (
                        <div>{LANG.GLOBAL.date_created}:
                            <span className="bold"> {task.date_created} </span>
                        </div>)}

                    {task.updated_at && (
                        <div>{LANG.TASKS_PAGE.updated_at}:
                            <span className="bold"> {task.updated_at}</span>
                        </div>)}

                    {task.priority && (
                        <div>{LANG.TASKS_PAGE.priority_text}:
                            <span className="bold"> {LANG.TASKS_PAGE.priority[task.priority]} </span>
                        </div>)}

                    <div>{LANG.TASKS_PAGE.finished}:
                        <span className="bold"> {Boolean(task.is_finished) ? LANG.GLOBAL.yes : LANG.GLOBAL.no} </span>
                    </div>
                    <div>{LANG.TASKS_PAGE.is_archived}:
                        <span className="bold"> {Boolean(task.is_archived) ? LANG.GLOBAL.yes : LANG.GLOBAL.no} </span>
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
                                {item.user_id && (
                                    <div>
                                        {LANG.TASK_PAGE.created_feedback}:{" "}
                                        <span className="bold">
                                            <NavLink to={`/user/${item.user_id}`}>{users[item.user_id]}</NavLink>
                                        </span>
                                    </div>
                                )}

                                {item.category_feedback && (
                                    <div>
                                        {LANG.GLOBAL.category}: <span className="bold">{item.category_feedback}</span>
                                    </div>
                                )}

                                {item.date_created && (
                                    <div>
                                        {LANG.GLOBAL.date_created}: <span className="bold">{item.date_created}</span>
                                    </div>
                                )}

                                <div>
                                    {LANG.TASK_PAGE.is_read}:{" "}
                                    <span className="bold">{item.is_read ? LANG.GLOBAL.yes : LANG.GLOBAL.no}</span>
                                </div>

                                {item.rating && (
                                    <div>
                                        {LANG.TASK_PAGE.rating}: <span className="bold">{item.rating}</span>
                                    </div>
                                )}

                                {item.date_stamp && (
                                    <div>
                                        {LANG.TASK_PAGE.date_stamp}: <span className="bold">{item.date_stamp}</span>
                                    </div>
                                )}

                            </div>
                            <div className="Task-feedbacks-feedback-text">{item.feedback}
                                <ActionMenu menuItems={this.getMenuItems(item)} />
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
                {modals.confirm_delete_feedback && <ModalConfirm text={LANG.TASK_PAGE.confirm_delete_feedback}
                    closeHandler={() => { this.modalHandler("confirm_delete_feedback") }} successHandler={this.deleteFeedback} />
                }
                {modals.edit_feedback && <Modal closeHandler={() => { this.modalHandler("edit_feedback") }} header={LANG.TASK_PAGE.edit_feedback}
                    footer={<>
                        <Button variant="contained" color="error" onClick={() => this.modalHandler("edit_feedback")}>
                            {LANG.GLOBAL.cancel}</Button>
                        <Button variant="contained" onClick={this.editFeedback}>{LANG.GLOBAL.save}</Button>
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