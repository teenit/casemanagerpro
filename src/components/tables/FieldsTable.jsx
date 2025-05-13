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

class FieldsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createFieldModal: false,
      confirmDelete: false,
      type:"",
      group:"",
      block_view:"",
      sorted: false,
      unique: "",
      name:"",
      icon:"",
      fields: [],
      id: null,
      sort: {
        field: "id",
        order: "DESC",
        page: 0,
        limit: 10
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
        sort: true
    },
    {
        dataField: 'block_view',
        text: LANG.FIELDS.block_view,
        fixed: false,
        isHidden: false,
        sort: true
    },
    {
        dataField: 'group',
        text: LANG.FIELDS.group_field,
        fixed: false,
        isHidden: false,
        sort: true,
        formatter: (cell, row) => {
            return <div>{cell}</div>
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
            return <div className='flex gap10'>
                <Icon icon={"edit"} onClick={() => {
                    this.setState({...row, createFieldModal: true});
                }} />
                <Icon icon={"delete"} addClass={"close-icon"} onClick={() => {
                    this.setState({name: row.name, confirmDelete: true, id: row.id})
                }} />
            </div>
        }
    },
  ];

  componentDidMount() {
    this.getFields({...this.state.sort});
  }

  deleteField = () => {
    apiResponse({field_id: this.state.id},"manage/fields/delete.php").then((res)=>{
        if(res.status) this.getFields({...this.state.sort});
    })
  }

  saveField = () => {
    const {type, group, block_view, sorted, unique, name, icon, id} = this.state;
    if (type == "" || group == "" || block_view == "" || unique == "" || name == "") {
        return alert("FAIL");
    }
    apiResponse({
        type:type, group:group, block_view:block_view, sorted:sorted ? 1 : 0, unique:unique, name:name, icon: icon, field_id: id
        },`manage/fields/${this.state.id ? "update" : "create"}.php`).then((res)=>{
        this.setState({id:null});
        if (res.status) this.getFields({...this.state.sort});
    })
  }

  getFields = (sort) => {
    apiResponse({...sort, page: sort.page == 0 ? 1:sort.page}, "manage/fields/get-list.php").then((res)=>{
        if(res.status) this.setState({fields: res.fields});
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
    this.setState({sort:{...this.state.sort, field: field, order: order}})
    this.getFields({...this.state.sort, field: field, order: order});
};

handleNextPage = () => {
    this.setState({sort:{...this.state.sort, page: this.state.sort.page + 1}})
    this.getFields({...this.state.sort, page:this.state.sort.page + 1});
};

handlePrevPage = () => {
    this.setState({sort:{...this.state.sort, page: Math.max(this.state.sort.page - 1, 0)}})
    this.getFields({...this.state.sort, page: Math.max(this.state.sort.page - 1, 0)});
}

handleChangeRowsPerPage = (limit) => {
    this.setState({sort:{...this.state.sort, page: 0, limit: limit}})
    this.getFields({...this.state.sort, limit: limit, page: 1});
}

  render() {
   const columns = this.prepareColumns(this.columns);

   return <div style={{display:"flex", flexDirection:"column", gap:"25px"}}>
        <div style={{display:"flex", gap:"25px", justifyContent: "end"}}>
        <Button onClick={()=>{this.setState({createFieldModal: true})}} size='small'><Icon icon={'add'}/> Створити поле</Button>
        </div>

            <Table
                columns={columns}
                data={this.state.fields}
                keyField={'id'}
                sortField={this.state.sort.field}
                sortOrder={this.state.sort.order}
            />
            <div className="mrauto wmc">
                <Pagination 
                    page={this.state.sort.page}
                    count={this.state.fields.length}
                    nextPage={this.handleNextPage}
                    prewPage={this.handlePrevPage}
                    rowsPerPage={this.state.sort.limit}
                    onRowsPerPageChange={this.handleChangeRowsPerPage}
                    rowsPerPageOptions={[10, 25, 50, 100]}
                    
                />
            </div>



        {this.state.createFieldModal &&
        <Modal
            header={"Add new Field"}
            closeHandler={()=>this.setState({createFieldModal: false})}
            footer={ <>
                <Button variant="contained" color="error" onClick={() => { this.setState({createFieldModal: false}) }}>{LANG.GLOBAL.cancel}</Button>
                <Button variant="contained" onClick={()=>{
                    this.saveField();
                    this.setState({createFieldModal: false})

                }}>{LANG.GLOBAL.save}</Button>
            </>}
        >
            <Input 
                label={LANG.FIELDS.field_name}
                value={this.state.name}
                onChange={(e)=>this.setState({name:e.target.value})}
             />
             
             <Input 
                label={LANG.FIELDS.unique}
                value={this.state.unique}
                onChange={(e)=>this.setState({unique:e.target.value.trim()})}
             />
             <Input 
                label={LANG.FIELDS.icon_field}
                value={this.state.icon}
                onChange={(e)=>this.setState({icon:e.target.value})}
             />
             <FormControl>
                <InputLabel id="group-label">{LANG.FIELDS.group_field}</InputLabel>
                <Select
                    labelId="group-label"
                    label = {LANG.FIELDS.group_field}
                    value={this.state.group}
                    onChange={(e)=>{this.setState({group: e.target.value})}}
                    variant="standard"
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
                    label = {LANG.FIELDS.block_view}
                    value={this.state.block_view}
                    onChange={(e)=>{this.setState({block_view: e.target.value})}}
                    variant="standard"
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
                    label = {LANG.FIELDS.field_type}
                    value={this.state.type}
                    onChange={(e)=>{this.setState({type: e.target.value})}}
                    variant="standard"
                >
                    {this.state.type == "" && <MenuItem value=''></MenuItem>}
                    {appConfig.fields.map((item)=><MenuItem key={item.key} value={item.key}>{item.label}</MenuItem>)}
                </Select>
            </FormControl>

            <div>
                <Switch checked={this.state.sorted} onChange={(e) => {this.setState({sorted: e.target.checked})}} />
                {LANG.FIELDS.sorted_field}
            </div>
        </Modal>
        }
         {this.state.confirmDelete && <ModalConfirm 
            closeHandler = {()=>this.setState({confirmDelete: false})} 
            successHandler = {this.deleteField} 
            text={`Підтвердіть дію з видалення поля ${this.state.name}. Ця дія видалить поле та пов'язані з ним дані.`}/>}
    </div>
  }
}

export default FieldsTable;
