import { Component } from "react";
import { apiResponse } from "../Functions/get_apiObj";
import LoadingPage from "../Loading/LoadingPage";
import InputBlock from "../elements/Inputs/InputBlock";
import { Button } from "@mui/material";
import { connect } from "react-redux";
import TaskModal from "../Modals/tasks/TaskModal";
import Input from "../elements/Inputs/Input";
class TaskPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            task: {},
            feedbacks: [],
            editModal: false,
            feedback: ""
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
            this.setState({feedbacks: res.data})
        })
    }
    addFeedback = () => {
         apiResponse({ task_id: this.props.params.id, feedback: this.state.feedback, action: "add_feedback" }, "tasks/task.php").then((res) => {
            this.loadData()
        })
    }
    deleteTask = () => {
        apiResponse({ task_id: this.state.current_task.id, action: "delete_task" }, "tasks/task.php").then((res) => {
            this.loadData()
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

    render() {
        const {loading, task, feedbacks} = this.state;

        console.log(this.state)

        return !loading ? (
            <div className="Task">
              <div className="Task-control">
                <Button onClick={()=>this.setState({editModal: true})}>Редагувати задачу</Button>
              </div>
              <div className="Task-details">
                <div className="Task-details-info">
                    <div className="Task-details-info-name"></div>
                    <div className="Task-details-info-description"></div>
                </div>
                <div className="Task-details-block">
                    <span></span>
                </div>
              </div>
              <div className="Task-feedbacks">
                {feedbacks.map((item)=>{
                    return <div className="Task-feedbacks-feedback">{item.feedback}</div>
                })}
                <Input
                    type="text"
                    value={this.state.feedback}
                    onChange={(e)=>{this.setState({feedback: e.target.value})}}
                    multiline={true}
                />
                <Button onClick={this.addFeedback}>Save</Button>
              </div>
              {this.state.editModal &&
                <TaskModal users={this.state.users} data={this.state.task} loadData={this.loadData} close={() => { this.setState({editModal: false}) }} />
              }
            </div>
        ) : (<LoadingPage effload={true}/>)
    }
}
const mapStateToProps = (state) => {
    console.log(state)
    return {
        user: state
    }
};


export default connect(mapStateToProps)(TaskPage);