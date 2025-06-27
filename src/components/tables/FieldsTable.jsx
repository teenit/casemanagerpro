import React, { Component } from 'react';
import { appConfig, LANG } from '../../services/config';
import { Button, FormControl, InputLabel, MenuItem, Select, Switch } from '@mui/material';
import Modal from '../Modals/Modal';
import Input from '../elements/Inputs/Input';
import SelectBlock from '../elements/Selects/SelectBlock';
import { apiResponse } from '../Functions/get_apiObj';
import HeaderFormatter from '../elements/HeaderFormatter/HeaderFormatter';
import Table from '../elements/Table/Table';
import Icon from '../elements/Icons/Icon';
import Pagination from '../elements/Pagination/Pagination';
import ModalConfirm from '../Modals/ModalConfirm';
import EmptyData from '../EmptyData/EmptyData';
import ActionMenu from '../Portals/ActionMenu';
import SmallNotification from "../elements/Notifications/SmallNotification"
class FieldsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            createFieldModal: false,
            confirmDelete: false,
            type: "",
            group: "",
            block_view: "",
            sorted: false,
            unique: "",
            name: "",
            icon: "",
            fields: [],
            id: null,
            sort: {
                field: "id",
                order: "DESC",
                page: 0,
                limit: 10
            },
            alert: {
                active: false,
                isSuccess: false,
                message: ""
            }
        };
    }

    columns = [
        {
            dataField: 'id',
            text: 'ID',
            fixed: false,
            isHidden: false,
            sort: true,
        },
        {
            dataField: 'unique',
            text: LANG.FIELDS.unique,
            fixed: false,
            isHidden: false,
            sort: false,
        },
        {
            dataField: 'name',
            text: LANG.FIELDS.field_name,
            fixed: false,
            isHidden: false,
            sort: true
        },
        {
            dataField: 'type',
            text: LANG.FIELDS.field_type,
            fixed: false,
            isHidden: false,
            sort: true,
            formatter:(cell,row)=>{
                const title = appConfig.fields.find(item=>item.key==cell).label
                return <div>{title}</div>
            }
        },
        {
            dataField: 'block_view',
            text: LANG.FIELDS.block_view,
            fixed: false,
            isHidden: false,
            sort: true,
            formatter:(cell,row)=>{
                return <div>{LANG.FIELDS_TABLE.block_view[cell]}</div>
            }
        },
        {
            dataField: 'group',
            text: LANG.FIELDS.group_field,
            fixed: false,
            isHidden: false,
            sort: true,
            formatter: (cell, row) => {
                return <div>{LANG.FIELDS_TABLE.group[cell]}</div>
            }
        },
        {
            dataField: 'system',
            text: LANG.FIELDS.system_field,
            fixed: false,
            isHidden: false,
            sort: true
        },
        {
            dataField: 'sorted',
            text: LANG.FIELDS.sorted_field,
            fixed: false,
            isHidden: false,
            sort: true
        },
        {
            dataField: 'date_created',
            text: LANG.FIELDS.date_created,
            fixed: false,
            isHidden: false,
            sort: true
        },
        {
            dataField: 'row_menu',
            text: '',
            fixed: true,
            isHidden: false,
            formatter: (cell, row) => {
                const menuItems = [
                    {
                        title: LANG.GLOBAL.edit,
                        isHidden: false,
                        icon: "edit",
                        click: () => {
                            this.setState({ ...row, createFieldModal: true })
                        }
                    },
                    {
                        itemType: 'divider'
                    },
                    {
                        title: LANG.GLOBAL.delete,
                        isHidden: false,
                        icon: "delete",
                        color: 'error',
                        click: () => {
                            this.setState({ name: row.name, confirmDelete: true, id: row.id })
                        }
                    },
                ]

                return <ActionMenu menuItems={menuItems} />
            }
        },
    ];

    componentDidMount() {
        this.getFields({ ...this.state.sort });
    }

    deleteField = () => {
        apiResponse({ field_id: this.state.id }, "manage/fields/delete.php").then((res) => {
            if (res.status) this.getFields({ ...this.state.sort });
        })
    }

    saveField = () => {
        const { type, group, block_view, sorted, unique, name, icon, id } = this.state;
        if (type == "" || group == "" || block_view == "" || unique == "" || name == "") {
            return this.alertHandler(false, LANG.FIELDS_TABLE.invalid_data)
        }
        apiResponse({
            type: type, group: group, block_view: block_view, sorted: sorted ? 1 : 0, unique: unique, name: name, icon: icon, field_id: id
        }, `manage/fields/${this.state.id ? "update" : "create"}.php`).then((res) => {
            this.setState({ id: null, createFieldModal: false });
            if (res.status) this.getFields({ ...this.state.sort });
        })
    }

    getFields = (sort) => {
        apiResponse({ ...sort, page: sort.page == 0 ? 1 : sort.page }, "manage/fields/get-list.php").then((res) => {
            if (res.status) this.setState({ fields: res.fields });
        })
    }

    prepareColumns = (columns) => {
        return columns.map((item) => this.prepareColumn(item))
    }

    prepareColumn = (column) => {
        if (typeof column.formatter !== 'function') {
            column.formatter = (cell, row) => {
                return cell
            }
        }
        if (typeof column.headerFormatter !== 'function' && column.sort) {
            column.headerFormatter = (field, order) => {
                return (
                    <HeaderFormatter
                        sortOrder={order}
                        sortField={field}
                        text={column.text}
                        dataField={column.dataField}
                        onSortClick={this.handleSortClick}
                    />
                );
            };
        }
        return column;
    }
    handleSortClick = (field, order) => {
        this.setState({ sort: { ...this.state.sort, field: field, order: order } })
        this.getFields({ ...this.state.sort, field: field, order: order });
    };

    handleNextPage = () => {
        this.setState({ sort: { ...this.state.sort, page: this.state.sort.page + 1 } })
        this.getFields({ ...this.state.sort, page: this.state.sort.page + 1 });
    };

    handlePrevPage = () => {
        this.setState({ sort: { ...this.state.sort, page: Math.max(this.state.sort.page - 1, 0) } })
        this.getFields({ ...this.state.sort, page: Math.max(this.state.sort.page - 1, 0) });
    }

    handleChangeRowsPerPage = (limit) => {
        this.setState({ sort: { ...this.state.sort, page: 0, limit: limit } })
        this.getFields({ ...this.state.sort, limit: limit, page: 1 });
    }
    modalHandler = () => {
        this.setState({ createFieldModal: true })
    }
    alertHandler = (isSuccess = false, message = "") => {
        const { alert } = this.state
        this.setState({
            alert: {
                active: !alert.active,
                isSuccess: isSuccess,
                message: message
            }
        })
    }
    render() {
        const { alert } = this.state
        const columns = this.prepareColumns(this.columns);

        return <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
            <div style={{ display: "flex", gap: "25px", justifyContent: "end" }}>
                <Button onClick={this.modalHandler} size='small'><Icon icon={'add'} />{LANG.FIELDS.add}</Button>
                {/* access needed */}
            </div>

            <Table
                columns={columns}
                data={this.state.fields}
                keyField={'id'}
                sortField={this.state.sort.field}
                sortOrder={this.state.sort.order}
                emptyTable={<EmptyData title={LANG.FIELDS.no_fields} buttonText={LANG.FIELDS.add_field} click={this.modalHandler} />}
            />
            {this.state.fields.length > 0 && <div className="mrauto wmc">
                <Pagination
                    page={this.state.sort.page}
                    count={this.state.fields.length}
                    nextPage={this.handleNextPage}
                    prewPage={this.handlePrevPage}
                    rowsPerPage={this.state.sort.limit}
                    onRowsPerPageChange={this.handleChangeRowsPerPage}
                    rowsPerPageOptions={[10, 25, 50, 100]}
                />
            </div>}




            {this.state.createFieldModal &&
                <Modal
                    header={this.state.id?LANG.FIELDS_TABLE.edit:LANG.FIELDS_TABLE.add}
                    closeHandler={() => this.setState({ createFieldModal: false })}
                    footer={<>
                        <Button variant="contained" color="error" onClick={() => { this.setState({ createFieldModal: false }) }}>{LANG.GLOBAL.cancel}</Button>
                        <Button variant="contained" onClick={() => {
                            this.saveField();
                        }}>{LANG.GLOBAL.save}</Button>
                    </>}
                >
                    <Input addClass='w100'
                        label={LANG.FIELDS.field_name}
                        value={this.state.name}
                        onChange={(e) => this.setState({ name: e.target.value })}
                    />

                    <Input addClass='w100'
                        label={LANG.FIELDS.unique}
                        value={this.state.unique}
                        onChange={(e) => this.setState({ unique: e.target.value.trim() })}
                    />
                    <Input addClass='w100'
                        label={LANG.FIELDS.icon_field}
                        value={this.state.icon}
                        onChange={(e) => this.setState({ icon: e.target.value })}
                    />
                    <FormControl>
                        <InputLabel id="group-label">{LANG.FIELDS.group_field}</InputLabel>
                        <Select
                            labelId="group-label"
                            label={LANG.FIELDS.group_field}
                            value={this.state.group}
                            onChange={(e) => { this.setState({ group: e.target.value }) }}
                        >
                            {this.state.group == "" && <MenuItem value=''></MenuItem>}
                            <MenuItem value='cases'>{LANG.FIELDS.cases}</MenuItem>
                            <MenuItem value='users'>{LANG.FIELDS.users}</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl>
                        <InputLabel id="block_view-label">{LANG.FIELDS.block_view}</InputLabel>
                        <Select
                            labelId="block_view-label"
                            label={LANG.FIELDS.block_view}
                            value={this.state.block_view}
                            onChange={(e) => { this.setState({ block_view: e.target.value }) }}
                        >
                            {this.state.block_view == "" && <MenuItem value=''></MenuItem>}
                            <MenuItem value='contacts'>{LANG.FIELDS.contacts}</MenuItem>
                            <MenuItem value='works'>{LANG.FIELDS.works}</MenuItem>
                            <MenuItem value='another'>{LANG.FIELDS.another}</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl>
                        <InputLabel id="type-label">{LANG.FIELDS.field_type}</InputLabel>
                        <Select
                            labelId="type-label"
                            label={LANG.FIELDS.field_type}
                            value={this.state.type}
                            onChange={(e) => { this.setState({ type: e.target.value }) }}
                        >
                            {this.state.type == "" && <MenuItem value=''></MenuItem>}
                            {appConfig.fields.map((item) => <MenuItem key={item.key} value={item.key}>{item.label}</MenuItem>)}
                        </Select>
                    </FormControl>

                    <div>
                        <Switch checked={this.state.sorted} onChange={(e) => { this.setState({ sorted: e.target.checked }) }} />
                        {LANG.FIELDS.sorted_field}
                    </div>
                </Modal>
            }
            {this.state.confirmDelete && <ModalConfirm
                closeHandler={() => this.setState({ confirmDelete: false })}
                successHandler={this.deleteField}
                text={`${LANG.FIELDS_TABLE.confirm_delete_start} ${this.state.name}. ${LANG.FIELDS_TABLE.confirm_delete_end}.`} />}
            {alert.active && <SmallNotification isSuccess={alert.isSuccess} text={alert.message} close={() => { this.alertHandler() }} />}
        </div>
    }
}

export default FieldsTable;
