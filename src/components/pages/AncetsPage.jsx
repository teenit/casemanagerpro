import { Button } from "@mui/material";
import React, { Component } from "react";
import { connect } from "react-redux";
import Icon from "../elements/Icons/Icon";
import AddAncetsForm from "../Forms/AddAncetsForm";
import { apiResponse } from "../Functions/get_apiObj";
import { NavLink } from "react-router-dom";
import HeaderFormatter from "../elements/HeaderFormatter/HeaderFormatter";
import Table from "../elements/Table/Table";
const COLUMNS = [
    {
        dataField: 'id',
        text: 'ID',
        fixed: false,
        isHidden: false,
        sort: false,
    },
    {
        dataField: 'name',
        text: "Назва",
        fixed: false,
        isHidden: false,
        sort: false,
        formatter: (cell, row) => <NavLink to={'/ancets/'+row.id}>{cell}</NavLink>
    },
    {
        dataField: 'description',
        text: 'Опис',
        fixed: false,
        isHidden: false,
        sort: false,
        formatter: (cell, row) => {
            return <div>{cell}</div>
        }
    },
    {
        dataField: 'question_count',
        text: 'Кіл-ть питань',
        fixed: false,
        isHidden: false,
        sort: false
    },
    {
        dataField: 'type',
        text: 'Тип анкети',
        fixed: false,
        isHidden: false,
        sort: false,
        formatter: (cell, row) => {
            return <div>{cell}</div>
        }
    },
    {
        dataField: 'remember',
        text: "Надувати",
        fixed: false,
        isHidden: false,
        sort: false,
        formatter: (cell, row) => {
            return <div>{cell}</div>
        }
    },
    {
        dataField: 'created_at',
        text: 'Анкету створено',
        fixed: false,
        isHidden: false,
        sort: false
    },
    {
        dataField: 'active',
        text: 'Статус',
        fixed: false,
        isHidden: false,
        sort: false,
        formatter: (cell, row)=>{
            return <div style={{color: cell == 0 ? "red" : "green"}}>{ cell == 0 ? "Деактивовано" : "Активовано"}</div>
        }
    }
];
class AncetsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCreateForm: false,
            showEditForm: false,
            ancets: [],
        };
    }
    
    componentDidMount = () => {
        this.loadAncets()
    }

    createAnceta = (data) => {
        apiResponse(data, "ancets/create.php").then((res)=>{
            if (res.status) {
                this.loadAncets()
                this.setState({showCreateForm: false})
            }
        })
    }
    prepareColumns = (columns) => {
        return columns.map((item) => this.prepareColumn(item));
    };

    prepareColumn = (column) => {
        if (typeof column.formatter !== 'function') {
            column.formatter = (cell, row) => cell;
        }
        if (typeof column.headerFormatter !== 'function' && column.sort) {
            column.headerFormatter = (field, order) => {
                return (
                    <HeaderFormatter 
                        sortOrder={order} 
                        sortField={field} 
                        text={column.text} 
                        dataField={column.dataField}
                    />
                );
            };
        }
        return column;
    };

    loadAncets = () => {

        apiResponse({}, "ancets/get-list.php").then((res)=>{
            if (res.status) {
                this.setState({ancets: res.ancets})
            }
            
        }) 
    }

    render() {
        const { ancets } = this.state;
        const columns = this.prepareColumns(COLUMNS);
        return (
            <div className="AncetsPage">
                <div className="AncetsPage-control">
                    <Button onClick={() => this.setState({ showCreateForm: true })}>
                        <Icon icon={'add'} />
                        Створити анкету
                    </Button>
                </div>
                <div className="AncetsPage-list">
                    <Table
                        columns={columns}
                        data={this.state.ancets}
                        keyField={'id'}
                        addClass="without-row-menu"
                    />
                </div>
                {this.state.showCreateForm && <AddAncetsForm 
                    close={()=>{this.setState({ showCreateForm: false })}}
                    success={this.createAnceta}
                />}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ancets: state.ancets
    }
};

export default connect(mapStateToProps)(AncetsPage);
