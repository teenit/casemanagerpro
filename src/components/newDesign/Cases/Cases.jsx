import React, { useEffect, useState } from "react";
import { apiResponse } from "../../Functions/get_apiObj";
import GetCases from "../../Cases/GetCases";
import Pagination from "../../elements/Pagination/Pagination";
import { LANG } from "../../../services/config";
import Table from "../../elements/Table/Table";
import { MenuItem, Select, Switch } from "@mui/material";
import HeaderFormatter from "../../elements/HeaderFormatter/HeaderFormatter";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Input from "../../elements/Inputs/Input";

const columnsTable = [
    {
        dataField: 'id',
        text: 'Номер',
        fixed: false,
        isHidden: false,
        sort: true,
    },
    {
        dataField: 'name',
        text: "Ім'я",
        fixed: false,
        isHidden: false,
        sort: true,
        formatter: (cell, row) => <NavLink to={'/case/'+row.id}>{cell}</NavLink>
    },
    {
        dataField: 'contract_number',
        text: 'Договір',
        fixed: false,
        isHidden: false,
        sort: true,
        formatter: (cell, row) => {
            return <div>{cell} {row.contractDate}</div>
        }
    },
    {
        dataField: 'email',
        text: 'EMAIL',
        fixed: false,
        isHidden: false,
        sort: true,
        formatter: (cell, row) => {
            return <div>{cell}</div>
        }
    },
    {
        dataField: 'phone1',
        text: "Телефон",
        fixed: false,
        isHidden: false,
        sort: false,
        formatter: (cell, row) => {
            return <div>{cell} {row.phone2}</div>
        }
    },
    {
        dataField: 'addressLive',
        text: 'Адреса проживання',
        fixed: false,
        isHidden: false,
        sort: false
    },
    {
        dataField: 'active',
        text: 'Статус',
        fixed: false,
        isHidden: false,
        sort: true,
        formatter: (cell, row)=>{
            return <div style={{color: cell == 0 ? "red" : "green"}}>{ cell == 0 ? "Деактивовано" : "Активовано"}</div>
        }
    }
];

const mode = "cases_filter";

const Cases = () => {
    const fields = useSelector(state => state.fields.cases);
    const activeFilter = localStorage.getItem(mode) ? JSON.parse(localStorage.getItem(mode)) : null
    const [state, setState] = useState([]);
    const [options, setOptions] = useState({
        page: (activeFilter ? activeFilter?.page : 0),
        limit: (activeFilter ? activeFilter?.limit : 10),
        sort: {
            field: (activeFilter ? activeFilter?.sort?.field : "id"),
            order: (activeFilter ? activeFilter?.sort?.order : 'DESC')
        },
        search: ""
    });
    const [totalCount, setTotalCount] = useState("hidden");
    const [view, setView] = useState("cards")
    useEffect(() => {
        loadCases();
        localStorage.setItem(mode, JSON.stringify(options))
    }, [options.page, options.limit, options.sort, options.search]);

    const loadCases = () => {
        apiResponse({
            page: options.page + 1,
            limit: options.limit,
            sort: {
                field: options.sort.field,
                order: options.sort.order
            },
            search: options.search
        }, "case/get/cases-page-list.php").then((res) => {
            console.log(res)
            setState([...res.list]);
        });
    };

    const loadTotalCount = () => {
        apiResponse({}, "case/get/cases-list-count.php").then((res) => {
            if (res.status) {
                setTotalCount(res.total_count);
            }
        });
    };

    const handleNextPage = () => {
        setOptions((prevOptions) => ({
            ...prevOptions,
            page: prevOptions.page + 1,
        }));
    };

    const handlePrevPage = () => {
        setOptions((prevOptions) => ({
            ...prevOptions,
            page: Math.max(prevOptions.page - 1, 0),
        }));
    };

    const handleChangeRowsPerPage = (newLimit) => {
        setOptions({
            ...options,
            page: 0,
            limit: newLimit,
        });
    };

    const handleSortClick = (field, order) => {
        setOptions((prevOptions) => ({
            ...prevOptions,
            sort: {
                field,
                order
            }
        }));
    };

    const prepareColumns = (columns) => {
        return columns.map((item) => prepareColumn(item));
    };

    const prepareColumn = (column) => {
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
                        onSortClick={handleSortClick}
                    />
                );
            };
        }
        return column;
    };

    const getColumns = () => {
        const testArray = [...fields.works, ...fields.contacts, ...fields.another].map((item)=>{
            return {
                dataField: 'field' + item.id,
                text: item.name,
                fixed: false,
                isHidden: false,
                sort: false,
                formatter: (cell, row)=>{
                    
                    return (
                        <>
                            {item.type == "boolean" && <div>{cell == 1 ? "Так" : cell == undefined ? "" : "Ні" }</div>}
                            {item.type !== "boolean" && <div>{cell}</div>}
                        </>
                    )
                }
            }
        })
        return [...columnsTable, ...testArray];
    }

    const casesColumns = prepareColumns(getColumns());
    return (
        <div className="ListCases">
            <div className="ListCases-sort">
                <Input label="Пошук" value={options.search} onChange={(e)=>{
                    setOptions({ ...options, search: e.target.value.trim() });
                }}/>
                <Select
                    value={options.sort.field}
                    onChange={(e) => {
                        setOptions({ ...options, sort: { ...options.sort, field: e.target.value } });
                    }}
                >
                    {columnsTable.map((item) => {
                        if (item.sort) return (
                            <MenuItem key={item.dataField} value={item.dataField}>
                                За {item.text}
                            </MenuItem>
                        );
                    })}
                </Select>
                <Select
                    value={options.sort.order}
                    onChange={(e) => {
                        setOptions({ ...options, sort: { ...options.sort, order: e.target.value } });
                    }}
                >
                    <MenuItem value={"ASC"}>
                        Від меншого до більшого
                    </MenuItem>
                    <MenuItem value={"DESC"}>
                        Від більшого до меншого
                    </MenuItem>
                </Select>
                <div>Як таблицю
                <Switch checked={view == 'table'} onChange={(e) => {
                                if (e.target.checked) {
                                    setView('table')
                                } else {
                                    setView('cards')
                                }
                    }} />
                </div>
            </div>

            {state.length > 0 && view === "cards" && (
                <GetCases 
                    posts={state} 
                    postsChange={() => {}} 
                    loadCasesMore={loadCases} 
                />
            )}
            {view === 'table' && <div className="ListCases-table">
                <Table
                    columns={casesColumns}
                    data={state}
                    keyField={'id'}
                    addClass="without-row-menu"
                    sortField={options.sort.field}
                    sortOrder={options.sort.order}
                />
            </div>}
            <div className = "ListCases-pagination">
                <Pagination 
                    page={options.page}
                    count={state.length}
                    nextPage={handleNextPage}
                    prewPage={handlePrevPage}
                    rowsPerPage={options.limit}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[10, 25, 50, 100]}
                    totalCount={totalCount}
                    loadTotalCount={loadTotalCount}
                />
            </div>
        </div>
    );
};

export default Cases;
