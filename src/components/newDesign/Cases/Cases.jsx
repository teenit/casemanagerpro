import React, { useEffect, useState } from "react";
import { apiResponse } from "../../Functions/get_apiObj";
import GetCases from "../../Cases/GetCases";
import Pagination from "../../elements/Pagination/Pagination";
import { LANG } from "../../../services/config";
import Table from "../../elements/Table/Table";
import { Button, MenuItem, Select, Switch } from "@mui/material";
import HeaderFormatter from "../../elements/HeaderFormatter/HeaderFormatter";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Input from "../../elements/Inputs/Input";
import ExportPDFCasesModal from "../../Modals/ExportPDFCasesModal";
import EmptyData from "../../EmptyData/EmptyData";
import AccessCheck from "../../Functions/AccessCheck";
import useAccessCheckCases from "../../Functions/AccessCheckCases"; // теперь это кастомный хук

const columnsTable = [
    {
        dataField: 'id',
        text: LANG.casesList.caseNumber,
        fixed: false,
        isHidden: false,
        sort: true,
    },
    {
        dataField: 'name',
        text: LANG.casesList.pib,
        fixed: false,
        isHidden: false,
        sort: true,
        formatter: (cell, row) => <NavLink to={'/case/' + row.id}>{cell}</NavLink>
    },
    {
        dataField: 'contract_number',
        text: LANG.casesList.contract,
        fixed: false,
        isHidden: false,
        sort: false,
        formatter: (cell, row) => <div>{cell} {row.contractDate}</div>
    },
    {
        dataField: 'email',
        text: LANG.casesList.email,
        fixed: false,
        isHidden: false,
        sort: true,
        formatter: (cell) => <div>{cell}</div>
    },
    {
        dataField: 'phone1',
        text: LANG.casesList.phone,
        fixed: false,
        isHidden: false,
        sort: false,
        formatter: (cell, row) => <div>{cell} {row.phone2}</div>
    },
    {
        dataField: 'addressLive',
        text: LANG.casesList.address,
        fixed: false,
        isHidden: false,
        sort: false
    },
    {
        dataField: 'active',
        text: LANG.casesList.status,
        fixed: false,
        isHidden: false,
        sort: true,
        formatter: (cell) => (
            <div style={{ color: cell == 0 ? "red" : "green" }}>
                {cell == 0 ? LANG.casesList.inactive : LANG.casesList.active}
            </div>
        )
    }
];

const mode = "cases_filter";

const Cases = () => {
    const fields = useSelector(state => state.fields.cases);
    const activeFilter = localStorage.getItem(mode) ? JSON.parse(localStorage.getItem(mode)) : null;

    const [state, setState] = useState([]);
    const [options, setOptions] = useState({
        page: activeFilter?.page || 0,
        limit: activeFilter?.limit || 10,
        sort: {
            field: activeFilter?.sort?.field || "id",
            order: activeFilter?.sort?.order || "DESC"
        },
        search: ""
    });

    const [listToExport, setListToExport] = useState([]);
    const [exportModal, setExportModal] = useState(false);
    const [totalCount, setTotalCount] = useState("hidden");
    const [view, setView] = useState("cards");

    // права на кейсы
    const casesAccess = useAccessCheckCases(state);

    const navigate = useNavigate();

    const access = {
        add: AccessCheck('yes_no', 'a_page_case_add'),
        print: AccessCheck('yes_no', "a_page_cases_print"),
        mask: AccessCheck('yes_no', "a_page_cases_mask"),
        look_list: AccessCheck('yes_no', "a_page_cases_look_list"),
        sort: AccessCheck('yes_no', "a_page_cases_sort"),
    };

    useEffect(() => {
        loadCases();
        localStorage.setItem(mode, JSON.stringify(options));
    }, [options.page, options.limit, options.sort, options.search]);

    const loadCases = () => {
        apiResponse({
            page: options.page + 1,
            limit: options.limit,
            sort: options.sort,
            search: options.search
        }, "case/get/cases-page-list.php").then((res) => {
            setState(res.list || []);
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
        setOptions(prev => ({ ...prev, page: prev.page + 1 }));
    };

    const handlePrevPage = () => {
        setOptions(prev => ({ ...prev, page: Math.max(prev.page - 1, 0) }));
    };

    const handleChangeRowsPerPage = (newLimit) => {
        setOptions(prev => ({ ...prev, page: 0, limit: newLimit }));
    };

    const handleSortClick = (field, order) => {
        setOptions(prev => ({ ...prev, sort: { field, order } }));
    };

    const prepareColumns = (columns) => {
        return columns.map((column) => {
            if (typeof column.formatter !== 'function') {
                column.formatter = (cell) => cell;
            }
            if (typeof column.headerFormatter !== 'function' && column.sort) {
                column.headerFormatter = (field, order) => (
                    <HeaderFormatter
                        sortOrder={order}
                        sortField={field}
                        text={column.text}
                        dataField={column.dataField}
                        onSortClick={handleSortClick}
                    />
                );
            }
            return column;
        });
    };

    const getColumns = () => {
        const extraFields = [...fields.works, ...fields.contacts, ...fields.another].map((item) => ({
            dataField: 'field' + item.id,
            text: item.name,
            fixed: false,
            isHidden: false,
            sort: false,
            formatter: (cell) => (
                <>
                    {item.type === "boolean"
                        ? <div>{cell == 1 ? "Так" : cell == undefined ? "" : "Ні"}</div>
                        : <div>{cell}</div>}
                </>
            )
        }));
        return [...columnsTable, ...extraFields];
    };

    const exportCasesToPdf = () => {
        apiResponse({}, "case/get/cases-page-list.php").then((res) => {
            setListToExport(res.list || []);
            setExportModal(true);
        });
    };

    const casesColumns = prepareColumns(getColumns());

    // применяем фильтр прав
    const filteredCases = casesAccess.look;

    return (
        <div className="ListCases">
            <div className="ListCases-sort">
                <div className="ListCases-sort-left">
                    <Input
                        size="small"
                        label="Пошук"
                        value={options.search || ""}
                        onChange={(e) => {
                            setOptions({ ...options, search: e.target?.value?.trim() || null });
                        }}
                    />
                </div>
                <div className="ListCases-sort-right">
                    {access.look_list && (
                        <div>Як таблицю
                            <Switch
                                size="small"
                                checked={view === 'table'}
                                onChange={(e) => setView(e.target.checked ? 'table' : 'cards')}
                            />
                        </div>
                    )}

                    {access.sort && (
                        <Select
                            size="small"
                            value={options.sort.field}
                            onChange={(e) => setOptions({ ...options, sort: { ...options.sort, field: e.target.value } })}
                        >
                            {columnsTable.map((item) =>
                                item.sort && (
                                    <MenuItem key={item.dataField} value={item.dataField}>
                                        За {item.text}
                                    </MenuItem>
                                )
                            )}
                        </Select>
                    )}

                    {access.sort && (
                        <Select
                            size="small"
                            value={options.sort.order}
                            onChange={(e) => setOptions({ ...options, sort: { ...options.sort, order: e.target.value } })}
                        >
                            <MenuItem value={"ASC"}>{LANG.casesList.ascending}</MenuItem>
                            <MenuItem value={"DESC"}>{LANG.casesList.descending}</MenuItem>
                        </Select>
                    )}

                    {access.print && (
                        <Button size="small" onClick={exportCasesToPdf}>
                            {LANG.casesList.export}
                        </Button>
                    )}
                </div>
            </div>

            {filteredCases.length > 0 && view === "cards" && (
                <GetCases
                    posts={filteredCases}
                    postsChange={() => {}}
                    loadCasesMore={loadCases}
                />
            )}

            {view === 'table' && (
                <div className="ListCases-table">
                    <Table
                        columns={casesColumns}
                        data={filteredCases}
                        keyField={'id'}
                        addClass="without-row-menu"
                        sortField={options.sort.field}
                        sortOrder={options.sort.order}
                        emptyTable={
                            <EmptyData
                                access={access.add}
                                title={LANG.casesList.no_cases}
                                buttonText={LANG.casesList.add_case}
                                click={() => {
                                    if (options.page !== 0) {
                                        setOptions(prev => ({ ...prev, page: 0 }));
                                    } else {
                                        navigate("/add-case");
                                    }
                                }}
                            />
                        }
                    />
                </div>
            )}

            {filteredCases.length === 0 && view === 'cards' && (
                <EmptyData
                    access={access.add}
                    title={LANG.casesList.no_cases}
                    buttonText={options.page !== 0 ? "Скинути фільтри" : LANG.casesList.add_case}
                    click={() => {
                        if (options.page !== 0) {
                            setOptions(prev => ({ ...prev, page: 0 }));
                        } else {
                            navigate("/add-case");
                        }
                    }}
                />
            )}

            {filteredCases.length > 0 && (
                <div className="ListCases-pagination">
                    <Pagination
                        page={options.page}
                        count={filteredCases.length}
                        nextPage={handleNextPage}
                        prewPage={handlePrevPage}
                        rowsPerPage={options.limit}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        rowsPerPageOptions={[10, 25, 50, 100]}
                        totalCount={totalCount}
                        loadTotalCount={loadTotalCount}
                    />
                </div>
            )}

            {exportModal && (
                <ExportPDFCasesModal
                    list={listToExport}
                    close={() => setExportModal(false)}
                />
            )}
        </div>
    );
};

export default Cases;
