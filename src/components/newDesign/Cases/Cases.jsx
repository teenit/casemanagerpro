import React, { useEffect, useState } from "react";
import { apiResponse } from "../../Functions/get_apiObj";
import GetCases from "../../Cases/GetCases";
import Pagination from "../../elements/Pagination/Pagination";
import { LANG } from "../../../services/config";
import Table from "../../elements/Table/Table";
import { MenuItem, Select, Switch } from "@mui/material";
import HeaderFormatter from "../../elements/HeaderFormatter/HeaderFormatter";
import { NavLink } from "react-router-dom";

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
        dataField: 'Телефон',
        text: LANG.TRANSACTIONS.payment_method,
        fixed: false,
        isHidden: false,
        sort: false,
        formatter: (cell, row) => {
            return <div>{cell} {row.phone2}</div>
        }
    },
    {
        dataField: 'Адреса проживання',
        text: LANG.TRANSACTIONS.status,
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

const Cases = () => {
    const [state, setState] = useState([]);
    const [options, setOptions] = useState({
        page: 0,
        limit: 10,
        sort: {
            field: "id",
            order: 'DESC'
        }
    });
    const [totalCount, setTotalCount] = useState("hidden");
    const [view, setView] = useState("cards")
    useEffect(() => {
        loadCases();
    }, [options.page, options.limit, options.sort]);

    const loadCases = () => {
        apiResponse({
            page: options.page + 1,
            limit: options.limit,
            sort: {
                field: options.sort.field,
                order: options.sort.order
            }
        }, "case/get/cases-page-list.php").then((res) => {
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

    const casesColumns = prepareColumns(columnsTable);

    return (
        <div className="ListCases">
            <div className="ListCases-sort">
                <Select
                    value={options.sort.field}
                    onChange={(e) => {
                        setOptions({ ...options, sort: { ...options.sort, field: e.target.value } });
                    }}
                >
                    {columnsTable.map((item) => {
                        if (item.sort) return (
                            <MenuItem key={item.dataField} value={item.dataField}>
                                Сортувати за {item.text}
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
                        Сортувати від меншого до більшого
                    </MenuItem>
                    <MenuItem value={"DESC"}>
                        Сортувати від більшого до меншого
                    </MenuItem>
                </Select>
                <div>Відобразити як таблицю
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
