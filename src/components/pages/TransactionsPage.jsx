import React, { useEffect, useState } from "react";
import { apiResponse } from "../Functions/get_apiObj";
import AddTransaction from "../newDesign/Transactions/AddTransaction";
import Table from "../elements/Table/Table";
import { LANG } from "../../services/config";
import Icon from "../elements/Icons/Icon"
import ModalConfirm from "../Modals/ModalConfirm"

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
            sort: true
        },
        {
            dataField: 'description',
            text: LANG.TRANSACTIONS.description,
            fixed: false,
            isHidden: false,
            sort: true
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
            sort: true
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
            sort: true
        },
        {
            dataField: 'row_menu',
            text: '',
            fixed: true,
            isHidden: false,
            formatter: (cell, row) => {
                return <div>
                    <Icon icon={"edit"} onClick={() => {
                        modalHandler("edit")
                        setTransactionId(row.id)
                    }} />
                    <Icon icon={"delete"} addClass={"close-icon"} onClick={() => {
                        modalHandler("delete")
                        setTransactionId(row.id)
                    }} />
                </div>
            }
        },
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
        return column;
    }

    useEffect(() => {
        fetchTransactions();
    }, [page, limit]);

    const fetchTransactions = async () => {
        setLoading(true);
        try {
            const res = await apiResponse({ page, limit }, "transactions/get-list.php");
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

    const handleEdit = (transactionId) => {
        console.log("Edit transaction:", transactionId);
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

    if (loading) return <p>Завантаження...</p>;
    // if (error) return <p>Помилка: {error}</p>;

    const transactionColumns = prepareColumns(columnsTable);

    return (
        <div className="Transactions">
            <div className="Transactions-title">
                <div>Список транзакцій</div>
                <Icon icon={"add"} addClass={"fs35"} onClick={() => { modalHandler("add"); setTransactionId(null) }} />
            </div>
            <Table
                columns={transactionColumns}
                data={transactions}
                keyField={'id'}
            />
            {modal.active && modal.action == "delete" && <ModalConfirm text={"Ви впевнені, що хочете видалити цю транзакцію?"}
                closeHandler={() => { modalHandler("") }} successHandler={() => { handleDelete(transactionId) }} />}
            {modal.active && modal.action !== "delete" && <AddTransaction id={transactionId} onTransactionAdded={handleTransactionAdded} action={modal.action} close={modalHandler} />}
            {/* <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Тип транзакції</th>
                        <th>Сума</th>
                        <th>Валюта</th>
                        <th>Статус</th>
                        <th>Дії</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                            <td>{transaction.id}</td>
                            <td>{transaction.transaction_type}</td>
                            <td>{transaction.amount}</td>
                            <td>{transaction.currency}</td>
                            <td>{transaction.status}</td>
                            <td>
                                <button onClick={() => handleEdit(transaction.id)}>Редагувати</button>
                                <button onClick={() => handleDelete(transaction.id)}>Видалити</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table> */}
        </div>
    );
};

export default TransactionsPage;
