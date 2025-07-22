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
import Icon from "../elements/Icons/Icon";
import TextDescription from "../elements/TextFormatters/TextDescription";
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
            current_feedbacks: null,
            tasks: [],
            tabValue: 0,
            loading: false,
            totalCount: null,
            sort: {
                field: 'id',
                order: 'ASC'
            },
            options: {
                page: 0,
                limit: 10
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
            search: this.state.search,
            page: this.state.options.page + 1,
            limit: this.state.options.limit
        };

        apiResponse(obj, 'tasks/task.php').then((res) => {
            this.setState({ tasks: res.data });
            this.setState({ loading: false })
            this.loadTotalCount();
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
    loadTotalCount = () => {
        apiResponse({ action: "get_total_count",main_mode: this.tabData[this.state.tabValue]?.mode }, "tasks/task.php").then((res) => {
            if (res.status) {
                this.setState({ totalCount: res.data?.total || null })
            }
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
        const savedMode = localStorage.getItem('tasks_mode');
        const tabIndex = this.tabData.findIndex(tab => tab.mode === savedMode);

        this.setState({
            tabValue: tabIndex !== -1 ? tabIndex : 0,
            access: {
                edit: () => AccessCheck('view_edit', 'a_task_manager', 'edit')
            }
        }, () => {
            this.loadData();
            this.getUsers();
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
        const mode = this.tabData[value]?.mode;
        localStorage.setItem('tasks_mode', mode);

        this.setState({ tabValue: value }, this.loadData);
    };

    searchHandler(value) {
        this.setState({ search: value }, this.loadData);
    }
    handleNextPage = () => {
        this.setState(prev => ({ options: { ...prev.options, page: prev.options.page + 1 } }), this.loadData);
    };

    handlePrevPage = () => {

        this.setState(prev => ({ options: { ...prev.options, page: Math.max(prev.options.page - 1, 0) } }), this.loadData);
    };

    handleChangeRowsPerPage = (newLimit) => {
        this.setState(prev => ({ options: { ...prev.options, page: 0, limit: newLimit } }), this.loadData);
    };
    loadFeedback = (data) => {
        apiResponse({ task_id: data.id, action: "get_feedback_list" }, "tasks/task.php").then((res) => {
            this.setState({ current_feedbacks: res.data })
        })
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
                dataField: 'watch',
                text: "",
                sort: false,
                fixed: false,
                isHidden: false,
                formatter: (cell, row) => {
                    return <Icon icon={"eye"} addClass="watch-task-icon" onClick={() => {
                        this.modalHandler("info")
                        this.setState({ current_task: row })
                        this.loadFeedback(row)
                    }} />
                }
            },
            {
                dataField: 'title',
                text: LANG.GLOBAL.title,
                sort: true,
                formatter: (cell, row) => {
                    return <NavLink to={`/task/${row.id}`}>{this.cutTitle(cell, 50)}</NavLink>
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
                    return <div style={{ maxHeight: "50px", overflowY: "auto" }} title={cell}>
                        <TextDescription text={cell || LANG.GLOBAL.no_description} />
                    </div>
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
                    return <div>{moment(cell).format('DD-MM-YYYY HH:MM')}</div>
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
                headerFormatter: () =>
                    <HeaderFormatter
                        text={LANG.TASKS_PAGE.to}
                        dataField="to"
                        sortField={this.state.sort.field}
                        sortOrder={this.state.sort.order}
                        onSortClick={this.handleSortClick}
                    />,
                formatter: (cell, row) => {
                    return <NavLink to={`/user/${row.to}`}>{this.state.users[row.to] || LANG.GLOBAL.unknown_user}</NavLink>
                }
            },
            {
                dataField: 'reviewer',
                text: LANG.TASKS_PAGE.reviewer_id,
                sort: false,
                headerFormatter: () =>
                    <HeaderFormatter
                        text={LANG.TASKS_PAGE.reviewer_id}
                        dataField="reviewer"
                        sortField={this.state.sort.field}
                        sortOrder={this.state.sort.order}
                        onSortClick={this.handleSortClick}
                    />,
                formatter: (cell, row) => {
                    return <NavLink to={`/user/${row.reviewer_id}`}>{this.state.users[row.reviewer_id] || LANG.GLOBAL.unknown_user}</NavLink>
                }
            },
            {
                dataField: 'date_created',
                text: LANG.GLOBAL.date_created,
                sort: true,
                headerFormatter: () =>
                    <HeaderFormatter
                        text={LANG.GLOBAL.date_created}
                        dataField="date_created"
                        sortField={this.state.sort.field}
                        sortOrder={this.state.sort.order}
                        onSortClick={this.handleSortClick}
                    />,
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
            { class: "table-green", condition: (row) => !row.is_finished }
        ]
    }
    cutTitle = (str, length) => {
        return str.length > length ? str.slice(0, length) + "..." : str
    }
    render() {
        const { modals, tabValue, current_task, loading, users } = this.state

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
                                    access={this.state.access.edit}
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
                <div className="Tasks-pagonation">
                    {this.state.tasks.length > 0 && <Pagination
                        page={this.state.options.page}
                        count={this.state.tasks.length}
                        nextPage={this.handleNextPage}
                        prewPage={this.handlePrevPage}
                        rowsPerPage={this.state.options.limit}
                        onRowsPerPageChange={this.handleChangeRowsPerPage}
                        rowsPerPageOptions={[10, 25, 50, 100]}
                        totalCount={this.state.totalCount}
                        loadTotalCount={this.loadTotalCount}
                    />}
                </div>
                {modals.add_task && <TaskModal users={this.state.users} loadData={this.loadData} close={() => { this.modalHandler("add_task") }} />}
                {modals.edit_task && <TaskModal users={this.state.users} data={this.state.current_task} loadData={this.loadData} close={() => { this.modalHandler("edit_task") }} />}
                {modals.confirm_delete && <ModalConfirm text={LANG.GLOBAL.delete_confirm} closeHandler={() => { this.modalHandler("confirm_delete") }}
                    successHandler={this.deleteTask} />}
                {modals.info && <Modal header={LANG.TASKS_PAGE.info} closeHandler={() => { this.modalHandler("info") }}
                    footer={<Button variant="contained" color="error" onClick={() => { this.modalHandler("info") }}>{LANG.GLOBAL.close}</Button>}>
                    <div className="Tasks-info">
                        <div className="Tasks-info-header">
                            <div className="Tasks-info-title">{current_task.title}</div>
                            <TextDescription text={current_task.description || LANG.GLOBAL.no_description}/>
                        </div>
                        {Array.isArray(this.state.current_feedbacks) && this.state.current_feedbacks.length > 0 && (
                            <div>{LANG.TASKS_PAGE.feedbacks}</div>
                        )}

                        <div className="Tasks-info-feedbacks">
                            {this.state.current_feedbacks && this.state.current_feedbacks.map((item, index) => {
                                return <div key={index}><span className="bold">{users[item.user_id]} {LANG.TASKS_PAGE.on} {item.date_created}: </span> <TextDescription text={item.feedback}/></div>
                            })}
                        </div>

                    </div>
                </Modal>}
            </div>
        )
    }
}
export default TasksPage