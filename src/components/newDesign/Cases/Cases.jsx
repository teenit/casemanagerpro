import React, { useEffect, useState } from "react";
import { apiResponse } from "../../Functions/get_apiObj";
import GetCases from "../../Cases/GetCases";
import Pagination from "../../elements/Pagination/Pagination";
import { LANG } from "../../../services/config";
import Table from "../../elements/Table/Table";
import { MenuItem, Select } from "@mui/material";
import HeaderFormatter from "../../elements/HeaderFormatter/HeaderFormatter";

const columnsTable = [
    {
        dataField: 'id',
        text: '#',
        fixed: false,
        isHidden: false,
        sort: true,
    },
    {
        dataField: 'name',
        text: 'NAME',
        fixed: false,
        isHidden: false,
        sort: true
    },
    {
        dataField: 'contractNumber',
        text: 'DOGOVIR',
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
        text: LANG.TRANSACTIONS.payment_method,
        fixed: false,
        isHidden: false,
        sort: false,
        formatter: (cell, row)=>{
            return <div>{cell} {row.phone2}</div>
        }
    },
    {
        dataField: 'addressLive',
        text: LANG.TRANSACTIONS.status,
        fixed: false,
        isHidden: false,
        sort: false
    },
    {
        dataField: 'active',
        text: 'Active',
        fixed: false,
        isHidden: false,
        sort: true
    }
]

const Cases = () => {
    const [state, setState] = useState([]);
    const [options, setOptions] = useState({
        page: 0,  // Починаємо з нульової сторінки (індекс сторінки 0)
        limit: 10,  // Кількість записів на сторінку
        sort: {
            field: "id",
            order: 'DESC'
        }
    });
    const [totalCount, setTotalCount] = useState("hidden");  // Загальна кількість записів

    useEffect(() => {
        loadCases();
    }, [options.page, options.limit, options.sort]);

    const loadCases = () => {
        apiResponse({
            page: options.page + 1,  // Серверні сторінки зазвичай починаються з 1
            limit: options.limit,
            sort: {
                field: options.sort.field,
                order: options.sort.order
            }
        }, "case/get/cases-page-list.php").then((res) => {
            setState([...res.list]);  // Оновлюємо стан даними
            //setTotalCount(res.totalCount);  // Оновлюємо загальну кількість записів
        });
    };

    const loadTotalCount = () => {
        apiResponse({}, "case/get/cases-list-count.php").then((res) => {
           if (res.status) {
            setTotalCount(res.total_count)
           }
        });
    }

    const handleNextPage = () => {
        setOptions((prevOptions) => ({
            ...prevOptions,
            page: prevOptions.page + 1,
        }));
    };

    const handlePrevPage = () => {
        setOptions((prevOptions) => ({
            ...prevOptions,
            page: Math.max(prevOptions.page - 1, -1),  // Не дозволяємо сторінці йти нижче 0
        }));
    };

    const handleChangeRowsPerPage = (newLimit) => {
        setOptions({
            page: 0,  // Повертаємося на першу сторінку
            limit: newLimit,
        });
    };

    const prepareColumns = (columns) => {
        return columns.map((item) => prepareColumn(item))
    }

    const prepareColumn = (column) => {
        if (typeof column.formatter !== 'function') {
            column.formatter = (cell, row) => {
                return cell
            }
        }
        if (typeof column.headerFormatter !== 'function' && column.sort) {
            column.headerFormatter = () => {
                return (
                    <HeaderFormatter 
                        sortOrder={options.sort.order} 
                        sortField={options.sort.field} 
                        text={column.text} 
                        dataField={column.dataField}
                        onSortClick={(field, order)=>{
                            setOptions((prevOptions) => ({
                                ...prevOptions,
                                sort: {
                                    ...prevOptions.sort,
                                    field: field,
                                    order: order,
                                }
                            }));
                        }}
                    />
                )
            }
        }
        return column;
    }

    const casesColumns = prepareColumns(columnsTable);

    return (
        <div className="ListCases">
            <div className="ListCases-sort">
                <Select
                    value={options.sort.field}
                    onChange={(e) => {
                        setOptions({...options, sort: {...options.sort, field: e.target.value}})
                    }}
                >
                    {columnsTable.map((item)=>{
                        if (item.sort) return (
                            <MenuItem key={item.dataField} value={item.dataField}>
                            Сортувати за {item.text}
                            </MenuItem>)
                        })
                    }
                </Select>
                <Select
                    value={options.sort.order}
                    onChange={(e) => {
                        setOptions({...options, sort: {...options.sort, order: e.target.value}})
                    }}
                >
                    <MenuItem value={"ASC"}>
                        Сортувати від старого до нового
                    </MenuItem>
                    <MenuItem value={"DESC"}>
                        Сортувати від нового до старого
                    </MenuItem>
                </Select>
            </div>
           
            
            {state.length > 0 && (
                <GetCases 
                    posts={state} 
                    postsChange={() => {}} 
                    loadCasesMore={loadCases} 
                />
            )}
              <Table
                columns={casesColumns}
                data={state}
                keyField={'id'}
                addClass="without-row-menu"
            />
            <div style={{
                display: 'flex',
                justifyContent: "center",
                marginTop: '20px'
            }}>
            <Pagination 
                page={options.page}
                count={state.length}  // Кількість записів на поточній сторінці
                nextPage={handleNextPage}
                prewPage={handlePrevPage}
                rowsPerPage={options.limit}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[10, 25, 50, 100]}
                totalCount={totalCount}  // Загальна кількість записів
                loadTotalCount={loadTotalCount}
            />
            </div>

            </div>
    );
};

export default Cases;
