import React, { useEffect, useState } from "react";
import { apiResponse } from "../Functions/get_apiObj";
import AddTransaction from "../newDesign/Transactions/AddTransaction";
import Table from "../elements/Table/Table";
import { LANG } from "../../services/config";
import ModalConfirm from "../Modals/ModalConfirm"
import Pagination from "../elements/Pagination/Pagination";
import HeaderFormatter from "../elements/HeaderFormatter/HeaderFormatter";
import EmptyData from "../EmptyData/EmptyData";
import AddButton from "../elements/Buttons/AddButton";
import ActionMenu from "../Portals/ActionMenu";
import { Box, Tab, Tabs } from "@mui/material";

const TransactionsPage = () => {
    const [transactionId, setTransactionId] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modal, setModal] = useState({ active: false, action: "" });
    const [totalCount, setTotalCount] = useState("hidden");
    const [tabValue, setTabValue] = useState(0);

    const [options, setOptions] = useState({
        page: 0,
        limit: 10,
        sort: {
            field: "id",
            order: "DESC"
        }
    });

    const tabData = [
        { title: LANG.TRANSACTIONS.tabs.all, value: 0, mode: "all" },
        // { title: LANG.TRANSACTIONS.tabs.pending, value: 1, mode: "pending" },
        // { title: LANG.TRANSACTIONS.tabs.failed, value: 2, mode: "failed" },
        // { title: LANG.TRANSACTIONS.tabs.completed, value: 3, mode: "completed" }
    ];

    const modalHandler = (action = "") => {
        setModal(prev => ({ ...prev, active: !prev.active, action }));
    };

    const cutTitle = (str, length) => str.length > length ? str.slice(0, length) : str;

    const columnsTable = [
        {
            dataField: 'id',
            text: 'ID',
            sort: true,
        },
        {
            dataField: 'transaction_type',
            text: LANG.TRANSACTIONS.transaction_type,
            sort: true,
            breakWord: true
        },
        {
            dataField: 'description',
            text: LANG.TRANSACTIONS.description,
            sort: true,
            breakWord: true,
            formatter: (cell) => <div>{cutTitle(cell, 75) || LANG.GLOBAL.no_description}</div>
        },
        {
            dataField: 'amount',
            text: LANG.TRANSACTIONS.amount,
            sort: true,
            formatter: (cell, row) => <div>{cell} {row.currency}</div>
        },
        {
            dataField: 'payment_method',
            text: LANG.TRANSACTIONS.payment_method,
            sort: true
        },
        {
            dataField: 'status',
            text: LANG.TRANSACTIONS.status,
            sort: true,
            formatter: (cell) => <div className={`status ${cell}`}>{LANG.TRANSACTIONS[cell]}</div>
        },
        {
            dataField: 'created_at',
            text: LANG.TRANSACTIONS.created_at,
            sort: true
        },
        {
            dataField: 'ip_address',
            text: 'IP',
            sort: false
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
                        icon: "edit",
                        click: () => {
                            modalHandler("edit");
                            setTransactionId(row.id);
                        }
                    },
                    { itemType: "divider" },
                    {
                        title: LANG.GLOBAL.delete,
                        icon: "delete",
                        color: "error",
                        click: () => {
                            modalHandler("delete");
                            setTransactionId(row.id);
                        }
                    }
                ];
                return <ActionMenu menuItems={menuItems} />;
            }
        }
    ];

    const prepareColumns = (columns) => {
        return columns.map(column => {
            if (typeof column.formatter !== 'function') {
                column.formatter = (cell) => cell;
            }
            if (column.sort && typeof column.headerFormatter !== 'function') {
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

    const fetchTransactions = async () => {
        setLoading(true);
        try {
            const res = await apiResponse(
                {
                    page: options.page + 1,
                    limit: options.limit,
                    field: options.sort.field,
                    order: options.sort.order,
                    main_mode: tabData[tabValue]?.mode
                },
                "transactions/get-list.php"
            );
            if (res.status) {
                setTransactions(res.transactions);
            } else {
                setError(res.message);
            }
        } catch (err) {
            setError("Помилка при отриманні даних.");
        }
        setLoading(false);
    };

    const loadTotalCount = () => {
        apiResponse({}, "transactions/get-total-count.php").then((res) => {
            if (res.status) setTotalCount(+res.total);
        });
    };

    const handleDelete = async (transactionId) => {
        setLoading(true);
        try {
            const res = await apiResponse({ transaction_id: transactionId }, "transactions/delete.php");
            if (res.status) {
                fetchTransactions();
            } else {
                setError(res.message);
            }
        } catch (err) {
            setError("Помилка при видаленні даних.");
        }
        setLoading(false);
    };

    const handleTransactionAdded = () => {
        fetchTransactions();
        modalHandler();
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

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
        // Здесь можно подгружать разные данные в зависимости от tabData[newValue].mode
        fetchTransactions(); // Пока просто обновим список
    };

    useEffect(() => {
        fetchTransactions();
    }, [options]);

    const transactionColumns = prepareColumns(columnsTable);

    const addTransaction = () => {
        modalHandler("add");
        setTransactionId(null);
    };

    return (
        <div className="Transactions">
            <div className="Transactions-header">
                <AddButton title={LANG.TRANSACTIONS.add} click={addTransaction} />
            </div>
            {/* access needed */}
            <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider", overflowX: "auto", whiteSpace: "nowrap" }}>
                    <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        variant="scrollable"
                        scrollButtons="auto"
                    >
                        {tabData.map((item, index) => (
                            <Tab key={index} label={item.title} value={item.value} />
                        ))}
                    </Tabs>
                </Box>

                <div role="tabpanel" style={{ paddingTop: "15px" }}>
                    <Table
                        loading={loading}
                        columns={transactionColumns}
                        data={transactions}
                        keyField="id"
                        sortField={options.sort.field}
                        sortOrder={options.sort.order}
                        emptyTable={
                            <EmptyData
                                title={LANG.TRANSACTIONS.no_transactions}
                                buttonText={LANG.TRANSACTIONS.add_transaction}
                                click={addTransaction}
                            />
                        }
                    />
                </div>
            </Box>

            {transactions.length > 0 && (
                <div className="Transactions-pagination">
                    <Pagination
                        page={options.page}
                        count={transactions.length}
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

            {modal.active && modal.action === "delete" && (
                <ModalConfirm
                    text={LANG.TRANSACTIONS.confirm_delete}
                    closeHandler={() => modalHandler("")}
                    successHandler={() => handleDelete(transactionId)}
                />
            )}

            {modal.active && modal.action !== "delete" && (
                <AddTransaction
                    id={transactionId}
                    onTransactionAdded={handleTransactionAdded}
                    action={modal.action}
                    close={modalHandler}
                />
            )}
        </div>
    );
};

export default TransactionsPage;
