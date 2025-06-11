import { Component } from "react";
import AddButton from "../elements/Buttons/AddButton";
import { LANG } from "../../services/config";
import SetUserModal from "../Settings/SetUser/SetUserModal";
import { NavLink } from "react-router-dom";
import Table from "../elements/Table/Table";
import ActionMenu from "../Portals/ActionMenu";
import { apiResponse } from "../Functions/get_apiObj";
import ResetPassModal from "../Settings/SetUser/ResetPassModal";
import EditUserModal from "../Modals/Settings/EditUserModal";
import AccessCheck from "../Functions/AccessCheck";
import Pagination from "../elements/Pagination/Pagination";

class UsersPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modals: {
                addUser: false,
                resetPass: false,
                editUser: false,
            },
            editUserTitle: LANG.USERS_PAGE.set_access,
            users: [],
            accessList: [],
            currentUser: null,
            loading: false,
            access: {
                edit: false,
                show_name: false,
                show_phone: false,
                activate: false,
                deactivate: false
            }
        };
    }

    componentDidMount() {
        this.loadData();
        apiResponse({}, 'access/get-list.php').then((res) => {
            this.setState({ accessList: res })
        });

        this.setState({
            access: {
                edit: () => AccessCheck("view_edit", "a_page_settings_change_accesses", "edit"),
                show_name: () => AccessCheck("yes_no", "a_page_settings_show_name"),
                show_phone: () => AccessCheck("yes_no", "a_page_settings_show_phones"),
                activate: () => AccessCheck("yes_no", "a_page_settings_activate_users"),
                deactivate: () => AccessCheck("yes_no", "a_page_settings_deactivate_users")
            }
        });
    }

    loadData = () => {
        this.setState({ loading: true });
        apiResponse({}, "user/get-users.php").then((res) => {
            this.setState({ users: res })
        }).catch((err) => {
            console.error(err)
        })
        this.setState({ loading: false })
    };

    modalHandler = (name) => {
        this.setState({ modals: { ...this.state.modals, [name]: !this.state.modals[name] } })
    };
    activateUser = (arg, userID, text, keyt) => {
        this.setState({ loading: true });

        apiResponse({
            activate: arg,
            userId: userID,
            text: text,
            keyt: keyt
        }, "user/activate.php")
            .then(() => {
                let user = this.state.users.find(item => item.id === userID)
                if (arg === "true" && (user.access==="0" || user.access==null)) {
                    this.modalHandler("editUser")
                    this.setState({ currentUser: user, editUserTitle: `${LANG.USERS_PAGE.wish_set_access} ${user.userName}?` })
                }
            })
            .finally(() => {
                this.loadData()
                this.setState({ loading: false });
            });
    };




    getStatusData = (row) => {
        if (row.active === "true" && this.state.access.deactivate) {
            return {
                title: LANG.USERS_PAGE.deactivate,
                isHidden: false,
                icon: "eye_off",
                color: "error",
                click: () => {
                    this.activateUser("false", row.id, "Деактивовано", "deactivateUsers")
                }
            };
        } else if (row.active === "false" && this.state.access.activate) {
            return {
                title: LANG.USERS_PAGE.activate,
                isHidden: false,
                icon: "eye",
                click: () => {
                    this.activateUser("true", row.id, "Активовано", "activeNewUser")
                }
            };
        }
    };

    getAccess = (access) => {
        const level = this.state.accessList.find(item => item.id == access)
        return level ? level.name : LANG.USERS_PAGE.no_level
    };

    get tableColumns() {
        const { show_name, show_phone } = this.state.access
        return [
            {
                dataField: 'id',
                text: "ID",
                sort: true,
                fixed: false,
                isHidden: false,
            },
            show_name && {
                dataField: 'name',
                text: LANG.GLOBAL.pib,
                sort: true,
                formatter: (cell, row) => (
                    <NavLink to={'/user/' + row.id}>{row.userName}</NavLink>
                )
            },
            show_phone && {
                dataField: 'phone',
                text: LANG.casesList.phone,
                sort: false,
                formatter: (cell) => (
                    <a href={`tel:${cell}`}>{cell}</a>
                )
            },
            {
                dataField: 'email',
                text: LANG.casesList.email,
                sort: true,
                formatter: (cell) => (
                    <a href={`mailto:${cell}`}>{cell}</a>
                )
            },
            {
                dataField: 'access',
                text: LANG.USERS_PAGE.access,
                sort: true,
                formatter: (cell) => (
                    <div>{this.getAccess(cell)}</div>
                )
            },
            {
                dataField: 'status',
                text: LANG.GLOBAL.status,
                sort: true,
                formatter: (cell, row) => (
                    <div style={{ color: row.active === "false" ? "red" : "green" }}>
                        {row.active === "false" ? LANG.casesList.inactive : LANG.casesList.active}
                    </div>
                )
            },
            {
                dataField: 'row_menu',
                text: '',
                fixed: true,
                formatter: (cell, row) => {
                    const menuItems = [
                        this.getStatusData(row),
                        (this.state.access.activate && this.state.access.deactivate) && {
                            title: LANG.USERS_PAGE.reset_password,
                            isHidden: false,
                            icon: "reset_password",
                            click: () => {
                                this.modalHandler("resetPass");
                                this.setState({ currentUser: row });
                            }
                        },
                        this.state.access.edit && {
                            title: LANG.USERS_PAGE.set_access,
                            isHidden: false,
                            icon: "edit",
                            click: () => {
                                this.modalHandler("editUser");
                                this.setState({ currentUser: row });
                            }
                        }
                    ];

                    return <ActionMenu menuItems={menuItems} />
                }
            }
        ];
    }
    get rowStyle (){
        return [
            { class: "table-green", condition: (row) => row.active === "true" }
        ]
    }
    render() {
        const { modals, users, currentUser, access, accessList, loading } = this.state
        const canResetPassword = access.activate && access.deactivate

        if (loading) return <p>{LANG.GLOBAL.loading}</p>

        return (
            <div className="UsersPage">
                {access.activate && <AddButton title={LANG.USERS_PAGE.add_user} click={() => this.modalHandler("addUser")} />}
                <Table rowStyle={this.rowStyle} columns={this.tableColumns} data={users} />
                {modals.addUser && <SetUserModal successHandler={this.loadData} close={() => this.modalHandler("addUser")} />}
                {modals.resetPass && canResetPassword && currentUser && <ResetPassModal close={() => this.modalHandler("resetPass")} {...currentUser} />}
                {modals.editUser && access.edit && currentUser && <EditUserModal close={() => this.modalHandler("editUser")} {...currentUser}
                    accessList={accessList} successHandler={this.loadData} title={this.state.editUserTitle}
                    deactivate={(user_id) => { this.activateUser("false", user_id, "Деактивовано", "deactivateUsers"); }}

                />}
            </div>
        );
    }
}

export default UsersPage;
