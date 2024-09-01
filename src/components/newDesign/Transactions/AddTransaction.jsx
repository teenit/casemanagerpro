import React, { useEffect, useState } from "react";
import { apiResponse } from "../../Functions/get_apiObj";
import Modal from "../../Modals/Modal";
import { Button, MenuItem, Select } from "@mui/material";
import { LANG } from "../../../services/config";
import Input from "../../elements/Inputs/Input";
import Textarea from "../../elements/Inputs/Textarea";
import SmallNotification from "../../elements/Notifications/SmallNotification";

const AddTransaction = ({ onTransactionAdded, action, close, id = null }) => {
    const [transactionData, setTransactionData] = useState({
        transaction_type: "",
        amount: "",
        currency: "UAH",
        status: "pending",
        reference_id: "",
        description: "",
        payment_method: "card",
        location: "",
    });

    const [alert, setAlert] = useState({
        active: false,
        message: "",
    });

    const [loading, setLoading] = useState(false);

    const alertHandler = (message = "") => {
        setAlert((prev) => ({ ...prev, active: !prev.active, message }));
    };

    const dataHandler = (key, value) => {
        setTransactionData((prev) => ({ ...prev, [key]: value }));
    };

    const getTransaction = () => {
        apiResponse({ transaction_id: id }, "transactions/get-by-id.php")
            .then((res) => {
                if (res.status) {
                    setTransactionData({ ...res.transaction });
                } else {
                    alertHandler("Не вдалося завантажити дані транзакції");
                }
            })
            .catch(() => {
                alertHandler("Помилка при завантаженні даних.");
            });
    };

    useEffect(() => {
        if (id) {
            getTransaction();
        }
    }, [id]);

    const handleSubmit = () => {

        if (transactionData.amount.trim() === "" || transactionData.transaction_type.trim() === "") {
            return alertHandler("Введіть суму та тип транзакції");
        }

        setLoading(true);

        const obj = id ? { ...transactionData, transaction_id: id } : transactionData
        const link = id ? "transactions/edit.php" : "transactions/create.php"
        apiResponse(obj, link).then((res) => {
            if (res.status) {
                onTransactionAdded()
                setTransactionData({
                    transaction_type: "",
                    amount: "",
                    currency: "UAH",
                    status: "pending",
                    reference_id: "",
                    description: "",
                    payment_method: "card",
                    location: "",
                });
                close()
            } else {
                alertHandler(res.message);
            }
        })
            .catch(() => {
                alertHandler("Виникла помилка. Будь ласка, спробуйте пізніше");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <Modal
            header={id ? "Редагувати транзакцію" : "Додати транзакцію"}
            footer={
                <>
                    <Button variant="contained" onClick={handleSubmit} disabled={loading}>
                        {loading ? "Зберігається..." : LANG.GLOBAL.save}
                    </Button>
                    <Button variant="contained" color="error" onClick={close} disabled={loading}>
                        {LANG.GLOBAL.cancel}
                    </Button>
                </>
            }
            closeHandler={close}
        >
            <form className="AddTransaction">
                <div className="AddTransaction-split">
                    <Input
                        type="number"
                        label="Сума"
                        name="amount"
                        value={transactionData.amount}
                        onChange={(e) => dataHandler("amount", e.target.value)}
                    />
                    <div className="AddTransaction-select">
                        <Select
                            name="currency"
                            value={transactionData.currency}
                            onChange={(e) => dataHandler("currency", e.target.value)}
                        >
                            <MenuItem value="UAH">UAH</MenuItem>
                            <MenuItem value="USD">USD</MenuItem>
                            <MenuItem value="EUR">EUR</MenuItem>
                        </Select>
                    </div>
                </div>
                <div className="AddTransaction-split">
                    <Input
                        type="text"
                        label="Тип транзакції"
                        name="transaction_type"
                        value={transactionData.transaction_type}
                        onChange={(e) => dataHandler("transaction_type", e.target.value)}
                    />
                    <Input
                        type="text"
                        label="Розташування"
                        name="location"
                        value={transactionData.location}
                        onChange={(e) => dataHandler("location", e.target.value)}
                    />
                </div>
                <div className="AddTransaction-split">
                    <div className="AddTransaction-select">
                        <label>Метод оплати</label>
                        <Select
                            name="payment_method"
                            value={transactionData.payment_method}
                            onChange={(e) => dataHandler("payment_method", e.target.value)}
                        >
                            <MenuItem value="card">Карта</MenuItem>
                            <MenuItem value="currency">Готівка</MenuItem>
                        </Select>
                    </div>
                    <div className="AddTransaction-select">
                        <label>Статус</label>
                        <Select
                            name="status"
                            value={transactionData.status}
                            onChange={(e) => dataHandler("status", e.target.value)}
                        >
                            <MenuItem value="pending">Очікується</MenuItem>
                            <MenuItem value="completed">Завершено</MenuItem>
                            <MenuItem value="failed">Не вдалося</MenuItem>
                        </Select>
                    </div>
                </div>
                <Input
                    type="number"
                    label="ID посилання"
                    name="reference_id"
                    value={transactionData.reference_id}
                    onChange={(e) => dataHandler("reference_id", e.target.value)}
                />
                <Textarea
                    label="Опис"
                    name="description"
                    value={transactionData.description}
                    onChange={(e) => dataHandler("description", e.target.value)}
                />
            </form>
            {alert.active && (
                <SmallNotification isSuccess={false} text={alert.message} close={alertHandler} />
            )}
        </Modal>
    );
};

export default AddTransaction;
