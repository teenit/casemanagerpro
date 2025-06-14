import { Component } from "react";
import AddButton from "../elements/Buttons/AddButton"
import { LANG } from "../../services/config";
import { apiResponse } from "../Functions/get_apiObj";
import TaskModal from "../Modals/tasks/TaskModal";
import Table from "../elements/Table/Table";
import ActionMenu from "../Portals/ActionMenu";
import { Box } from "@mui/system";
import { Button, Tab, Tabs } from "@mui/material";
import HeaderFormatter from "../elements/HeaderFormatter/HeaderFormatter";
import EmptyData from "../EmptyData/EmptyData";
import { NavLink } from "react-router-dom";
import moment from "moment";
import ModalConfirm from "../Modals/ModalConfirm"
import Modal from "../Modals/Modal";
import SearchInput from "../elements/Inputs/SearchInput";
import Pagination from "../elements/Pagination/Pagination";
import AccessCheck from "../Functions/AccessCheck";
class TasksPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modals: {
                add_task: false,
                edit_task: false,
                confirm_delete: false,
                info: false
            },
            current_task: null,
            tasks: [],
            tabValue: 0,
            loading: false,
            sort: {
                field: 'id',
                order: 'ASC'
            },
            search: "",
            users: {},
            access: {
                edit: false
            },
        };

    }

    loadData = () => {
        this.setState({ loading: true })
        let obj = {
            action: "get_tasks",
            main_mode: this.tabData[this.state.tabValue]?.mode,
            sort: this.state.sort.order,
            order: this.state.sort.field,
            search: this.state.search
        };

        apiResponse(obj, 'tasks/task.php').then((res) => {
            this.setState({ tasks: res.data });
            this.setState({ loading: false })
        });
    }
    getUsers = () => {
        this.setState({ loading: true })

        apiResponse({ action: "get_users_list" }, "user/users.php").then((res) => {
            this.setState({ users: res.data })
            this.setState({ loading: false })

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
        this.loadData()
        this.getUsers()
        this.setState({
            access: {
                edit: () => AccessCheck('view_edit', 'a_task_manager', 'edit')
            }
        });

    }


    handleSortClick = (field) => {
        const { sort } = this.state;
        const newOrder = sort.field === field && sort.order === 'ASC' ? 'DESC' : 'ASC';
        this.setState({ sort: { field, order: newOrder } }, this.loadData)

    };

    modalHandler = (key) => {
        this.setState({ modals: { ...this.state.modals, [key]: !this.state.modals[key] } })
    }
    tabHandler = (event, value) => {
        //Не удалять event
        this.setState({ tabValue: value }, this.loadData);
    };
    searchHandler(value) {
        this.setState({ search: value }, this.loadData);
    }


    get tableColumns() {
        return [
            {
                dataField: 'id',
                text: "ID",
                sort: true,
                fixed: false,
                isHidden: false,
                headerFormatter: () =>
                    <HeaderFormatter
                        text="ID"
                        dataField="id"
                        sortField={this.state.sort.field}
                        sortOrder={this.state.sort.order}
                        onSortClick={this.handleSortClick}
                    />
            },
            {
                dataField: 'title',
                text: LANG.GLOBAL.title,
                sort: true,
                formatter: (cell, row) => {
                    return <div style={{ cursor: "pointer" }} title={cell} onClick={() => {
                        this.modalHandler("info")
                        this.setState({ current_task: row })
                    }}>{this.cutTitle(cell, 50)}</div>
                },
                headerFormatter: () =>
                    <HeaderFormatter
                        text={LANG.GLOBAL.title}
                        dataField="title"
                        sortField={this.state.sort.field}
                        sortOrder={this.state.sort.order}
                        onSortClick={this.handleSortClick}
                    />
            },
            {
                dataField: 'description',
                text: LANG.GLOBAL.description,
                sort: false,
                formatter: (cell, row) => {
                    return <div style={{ cursor: "pointer" }} title={cell} onClick={() => {
                        this.modalHandler("info")
                        this.setState({ current_task: row })
                    }}>{this.cutTitle(cell, 75) || LANG.GLOBAL.no_description}</div>
                },
            },
            {
                dataField: 'dead_line',
                text: LANG.TASKS_PAGE.dead_line,
                sort: false,
                headerFormatter: () =>
                    <HeaderFormatter
                        text={LANG.TASKS_PAGE.dead_line}
                        dataField="dead_line"
                        sortField={this.state.sort.field}
                        sortOrder={this.state.sort.order}
                        onSortClick={this.handleSortClick}
                    />,
                formatter: (cell, row) => {
                    return <div className="in-row">{moment(cell).format('DD-MM-YYYY HH:MM')}</div>
                }
            },
            {
                dataField: 'from',
                text: LANG.TASKS_PAGE.from,
                sort: true,
                headerFormatter: () =>
                    <HeaderFormatter
                        text={LANG.TASKS_PAGE.from}
                        dataField="from"
                        sortField={this.state.sort.field}
                        sortOrder={this.state.sort.order}
                        onSortClick={this.handleSortClick}
                    />,
                formatter: (cell, row) => {
                    return <NavLink to={`/user/${row.from}`}>{this.state.users[row.from] || LANG.GLOBAL.unknown_user}</NavLink>
                }
            },
            {
                dataField: 'to',
                text: LANG.TASKS_PAGE.to,
                sort: true,
                formatter: (cell, row) => {
                    return <NavLink to={`/user/${row.to}`}>{this.state.users[row.to] || LANG.GLOBAL.unknown_user}</NavLink>
                }
            },
            {
                dataField: 'reviewer',
                text: LANG.TASKS_PAGE.reviewer,
                sort: false,
                formatter: (cell, row) => {
                    return <NavLink to={`/user/${row.reviewer_id}`}>{this.state.users[row.reviewer_id] || LANG.GLOBAL.unknown_user}</NavLink>
                }
            },
            {
                dataField: 'date_created',
                text: LANG.GLOBAL.date_created,
                sort: true,
            },
            {
                dataField: 'priority',
                text: LANG.TASKS_PAGE.priority_text,
                sort: true,
                formatter: (cell, row) => {
                    return LANG.TASKS_PAGE.priority[cell] || ''
                }
            },
            {
                dataField: 'row_menu',
                text: '',
                fixed: false,
                formatter: (cell, row) => {
                    const { edit } = this.state.access
                    const menuItems = [
                        edit && {
                            title: LANG.GLOBAL.edit,
                            isHidden: false,
                            icon: "edit",
                            click: () => {
                                this.modalHandler("edit_task")
                                this.setState({ current_task: row })
                            }
                        },
                        edit && {
                            title: row.is_finished ? LANG.TASKS_PAGE.make_active : LANG.TASKS_PAGE.finish,
                            isHidden: false,
                            icon: "save",
                            click: () => {
                                this.finishTask(row)
                            }
                        },
                        {
                            title: row.is_archived ? LANG.TASKS_PAGE.unarchive : LANG.TASKS_PAGE.archive,
                            isHidden: false,
                            icon: row.is_archived ? "unarchive" : "archive",
                            click: () => {
                                this.archiveHandler(row)
                            }
                        },
                        {
                            itemType: "divider"
                        },
                        edit && {
                            title: LANG.GLOBAL.delete,
                            isHidden: false,
                            icon: "delete",
                            color: 'error',
                            click: () => {
                                this.modalHandler("confirm_delete")
                                this.setState({ current_task: row })
                            }
                        }
                    ].filter(Boolean)

                    return <ActionMenu menuItems={menuItems} />
                }
            }
        ];
    }
    get tabData() {
        return [
            { title: LANG.TASKS_PAGE.tabs.all, value: 0, mode: "all" },
            { title: LANG.TASKS_PAGE.tabs.active, value: 1, mode: "active" },
            { title: LANG.TASKS_PAGE.tabs.finished, value: 2, mode: "finished" },
            { title: LANG.TASKS_PAGE.tabs.archived, value: 3, mode: "archived" }
        ]
    }
    get rowStyle() {
        return [
            { class: "table-red", condition: (row) => moment().isAfter(moment(row.dead_line)) }
        ]
    }
    cutTitle = (str, length) => {
        return str.length > length ? str.slice(0, length) + "..." : str
    }
    render() {
        const { modals, tabValue, current_task, loading } = this.state


        return (
            <div className="Tasks">
                <div className="Tasks-header">
                    <SearchInput handler={(data) => { this.searchHandler(data) }} />
                    <AddButton title={LANG.TASKS_PAGE.add} click={() => { this.modalHandler("add_task") }} />
                </div>
                <Box sx={{ width: "100%" }}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider", overflowX: "auto", whiteSpace: "nowrap" }}>
                        <Tabs
                            value={tabValue}
                            onChange={this.tabHandler}
                            variant="scrollable"
                            scrollButtons="auto"
                        >
                            {this.tabData.map((item, index) => (
                                <Tab key={index} label={item.title} value={item.value} />
                            ))}
                        </Tabs>
                    </Box>

                    <div role="tabpanel" style={{ paddingTop: "15px" }}>
                        <Table
                            loading={this.state.loading}
                            rowStyle={this.rowStyle}
                            columns={this.tableColumns}
                            data={this.state.tasks}
                            keyField="id"
                            sortField={this.state.sort.field}
                            sortOrder={this.state.sort.order}
                            emptyTable={
                                <EmptyData
                                    title={LANG.TASKS_PAGE.not_found}
                                    buttonText={LANG.TASKS_PAGE.add}
                                    click={() => {
                                        this.modalHandler("add_task");
                                    }}
                                />
                            }
                        />
                    </div>
                </Box>

                {/* <Pagination/> */}
                {modals.add_task && <TaskModal users={this.state.users} loadData={this.loadData} close={() => { this.modalHandler("add_task") }} />}
                {modals.edit_task && <TaskModal users={this.state.users} data={this.state.current_task} loadData={this.loadData} close={() => { this.modalHandler("edit_task") }} />}
                {modals.confirm_delete && <ModalConfirm text={LANG.GLOBAL.delete_confirm} closeHandler={() => { this.modalHandler("confirm_delete") }}
                    successHandler={this.deleteTask} />}
                {modals.info && <Modal header={LANG.TASKS_PAGE.info} closeHandler={() => { this.modalHandler("info") }}
                    footer={<Button variant="contained" color="error" onClick={() => { this.modalHandler("info") }}>{LANG.GLOBAL.close}</Button>}>
                    <div className="Tasks-info">
                        <div><span className="Tasks-info-title">{LANG.GLOBAL.title}</span>: {current_task.title}</div>
                        <div><span className="Tasks-info-title">{LANG.GLOBAL.description}</span>: {current_task.description || LANG.GLOBAL.no_description}</div>
                        {/* <div><span className="Tasks-info-title">{LANG.TASKS_PAGE.dead_line}</span>: {current_task.dead_line}</div>
                        <div><span className="Tasks-info-title">{LANG.TASKS_PAGE.from}</span>: {<NavLink to={`/user/${current_task.from}`}>{this.state.users[current_task.from]}</NavLink> || LANG.GLOBAL.unknown_user}</div>
                        <div><span className="Tasks-info-title">{LANG.TASKS_PAGE.to}</span>: {<NavLink to={`/user/${current_task.to}`}>{this.state.users[current_task.to]}</NavLink> || LANG.GLOBAL.unknown_user}</div>
                        <div><span className="Tasks-info-title">{LANG.TASKS_PAGE.reviewer}</span>: {<NavLink to={`/user/${current_task.reviewer_id}`}>{this.state.users[current_task.reviewer_id]}</NavLink> || LANG.GLOBAL.unknown_user}</div>
                        <div><span className="Tasks-info-title">{LANG.GLOBAL.date_created}</span>: {current_task.date_created}</div>
                        <div><span className="Tasks-info-title">{LANG.GLOBAL.date_updated}</span>: {current_task.updated_at}</div>
                        <div><span className="Tasks-info-title">{LANG.TASKS_PAGE.is_archived}</span>: {current_task.is_archived == "1" ? LANG.GLOBAL.yes : LANG.GLOBAL.no}</div>
                        <div><span className="Tasks-info-title">{LANG.GLOBAL.status}</span>: {current_task.is_finished == 0 ? LANG.TASKS_PAGE.active : LANG.TASKS_PAGE.finished}</div> */}
                    </div>
                </Modal>}
            </div>
        )
    }
}
export default TasksPage