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

const TransactionsPage = () => {
    const [transactionId, setTransactionId] = useState(null)
    const [transactions, setTransactions] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modal, setModal] = useState({
        active: false,
        action: ""
    })
    const [totalCount, setTotalCount] = useState("hidden");
    const [options, setOptions] = useState({
        page: 0,
        limit: 10,
        sort: {
            field: "id",
            order: 'DESC'
        }
    });
    const modalHandler = (action = "") => {
        setModal({ ...modal, active: !modal.active, action: action })
    }
    const columnsTable = [
        {
            dataField: 'id',
            text: 'ID',
            fixed: false,
            isHidden: false,
            sort: true,
        },
        {
            dataField: 'transaction_type',
            text: LANG.TRANSACTIONS.transaction_type,
            fixed: false,
            isHidden: false,
            sort: true,
            breakWord: true
        },
        {
            dataField: 'description',
            text: LANG.TRANSACTIONS.description,
            fixed: false,
            isHidden: false,
            sort: true,
            breakWord: true
        },
        {
            dataField: 'amount',
            text: LANG.TRANSACTIONS.amount,
            fixed: false,
            isHidden: false,
            sort: true,
            formatter: (cell, row) => {
                return <div>{cell} {row.currency}</div>
            }
        },
        {
            dataField: 'payment_method',
            text: LANG.TRANSACTIONS.payment_method,
            fixed: false,
            isHidden: false,
            sort: true
        },
        {
            dataField: 'status',
            text: LANG.TRANSACTIONS.status,
            fixed: false,
            isHidden: false,
            sort: true,
            formatter: (cell, row)=>{
                return <div className={`status ${cell}`}>{LANG.TRANSACTIONS[cell]}</div>
            }
        },
        {
            dataField: 'created_at',
            text: LANG.TRANSACTIONS.created_at,
            fixed: false,
            isHidden: false,
            sort: true
        },
        {
            dataField: 'ip_address',
            text: 'IP',
            fixed: false,
            isHidden: false,
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
                        isHidden: false,
                        icon:"edit",
                        click: ()=>{
                            modalHandler("edit")
                            setTransactionId(row.id)
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
                        click: ()=>{
                            modalHandler("delete")
                            setTransactionId(row.id)
                        }
                    },
                ]

                return <ActionMenu menuItems={menuItems}/>
            }
        },
        // {
        //     dataField: 'row_menu',
        //     text: '',
        //     fixed: true,
        //     isHidden: false,
        //     formatter: (cell, row) => {
        //         return <div className="Table-row-menu default">
        //             <Icon icon={"edit"} onClick={() => {
        //                 modalHandler("edit")
        //                 setTransactionId(row.id)
        //             }} />
        //             <Icon icon={"delete"} addClass={"delete-icon"} onClick={() => {
        //                 modalHandler("delete")
        //                 setTransactionId(row.id)
        //             }} />
        //         </div>
        //     }
        // },
    ]


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
    }

    useEffect(() => {
        fetchTransactions();
    }, [options.page, options.limit, options.sort]);

    const fetchTransactions = async () => {
        setLoading(true);
        try {
            const res = await apiResponse({ page: options.page + 1, limit: options.limit, field: options.sort.field, order: options.sort.order }, "transactions/get-list.php");
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
        apiResponse({}, "transactions/get-total-count.php").then((res)=>{
            if (res.status) setTotalCount(+res.total);
        })
    }

    const handleEdit = (transactionId) => {
    };

    const handleDelete = (transactionId) => {
        setLoading(true);
        apiResponse({ transaction_id: transactionId }, "transactions/delete.php").then((res) => {
            if (res.status) {
                fetchTransactions();
            } else {
                setError(res.message);
            }
        })
            .catch((err) => {
                setError("Помилка при видаленні даних.");
            });

        setLoading(false);
    };

    const handleTransactionAdded = () => {
        fetchTransactions(); // Refresh the list when a new transaction is added
        modalHandler()
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

    if (loading) return <p>{LANG.GLOBAL.loading}</p>;
    // if (error) return <p>Помилка: {error}</p>;

    const transactionColumns = prepareColumns(columnsTable);
const addTransaction = ()=>{
    modalHandler("add")
    setTransactionId(null)
}
    return (
        <div className="Transactions">
                <AddButton title={LANG.TRANSACTIONS.add} click={addTransaction}/>
            <Table
                columns={transactionColumns}
                data={transactions}
                keyField={'id'}
                sortField={options.sort.field}
                sortOrder={options.sort.order}
                emptyTable={<EmptyData title={LANG.TRANSACTIONS.no_transactions} buttonText={LANG.TRANSACTIONS.add_transaction} click={addTransaction}/>}
            />
            {transactions.length > 0 && <div className="Transactions-pagination">
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
            </div>}

            {modal.active && modal.action == "delete" && <ModalConfirm text={LANG.TRANSACTIONS.confirm_delete}
                closeHandler={() => { modalHandler("") }} successHandler={() => { handleDelete(transactionId) }} />}
            {modal.active && modal.action !== "delete" && <AddTransaction id={transactionId} onTransactionAdded={handleTransactionAdded} action={modal.action} close={modalHandler} />}
        </div>
    );
};

export default TransactionsPage;
