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
                    alertHandler(LANG.TRANSACTIONS.alertMessages.error);
                }
            })
            .catch(() => {
                alertHandler(LANG.TRANSACTIONS.alertMessages.error);
            });
    };

    useEffect(() => {
        if (id) {
            getTransaction();
        }
    }, [id]);

    const handleSubmit = () => {

        if (transactionData.amount.trim() === "" || transactionData.transaction_type.trim() === "") {
            return alertHandler(LANG.TRANSACTIONS.alertMessages.invalid);
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
                alertHandler(LANG.TRANSACTIONS.alertMessages.error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <Modal
            header={id ? LANG.TRANSACTIONS.edit : LANG.TRANSACTIONS.add}
            footer={
                <>
                    <Button variant="contained" onClick={handleSubmit} disabled={loading}>
                        {loading ? LANG.GLOBAL.saving : LANG.GLOBAL.save}
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
                        label={LANG.TRANSACTIONS.sum}
                        name="amount"
                        value={transactionData.amount}
                        onChange={(e) => dataHandler("amount", e.target.value)}
                    />
                    <div className="AddTransaction-select">
                        <Select size="small"
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
                        label={LANG.TRANSACTIONS.type}
                        name="transaction_type"
                        value={transactionData.transaction_type}
                        onChange={(e) => dataHandler("transaction_type", e.target.value)}
                    />
                    <Input
                        type="text"
                        label={LANG.TRANSACTIONS.placement}
                        name="location"
                        value={transactionData.location}
                        onChange={(e) => dataHandler("location", e.target.value)}
                    />
                </div>
                <div className="AddTransaction-split">
                    <div className="AddTransaction-select">
                        <label>{LANG.TRANSACTIONS.payment_method}</label>
                        <Select size="small"
                            name="payment_method"
                            value={transactionData.payment_method}
                            onChange={(e) => dataHandler("payment_method", e.target.value)}
                        >
                            <MenuItem value="card">{LANG.TRANSACTIONS.card}</MenuItem>
                            <MenuItem value="currency">{LANG.TRANSACTIONS.currency}</MenuItem>
                        </Select>
                    </div>
                    <div className="AddTransaction-select">
                        <label>{LANG.GLOBAL.status}</label>
                        <Select size="small"
                            name="status"
                            value={transactionData.status}
                            onChange={(e) => dataHandler("status", e.target.value)}
                        >
                            <MenuItem value="pending">{LANG.TRANSACTIONS.pending}</MenuItem>
                            <MenuItem value="completed">{LANG.TRANSACTIONS.ended}</MenuItem>
                            <MenuItem value="failed">{LANG.TRANSACTIONS.failed}</MenuItem>
                        </Select>
                    </div>
                </div>
                <Input
                    addClass="w100"
                    type="number"
                    label={LANG.TRANSACTIONS.id}
                    name="reference_id"
                    value={transactionData.reference_id}
                    onChange={(e) => dataHandler("reference_id", e.target.value)}
                />
                <Textarea
                    addClass="w100"
                    label={LANG.GLOBAL.description}
                    name="description"
                    value={transactionData.description}
                    onChange={(e) => dataHandler("description", e.target.value)}
                />
            {alert.active && (
                <SmallNotification isSuccess={false} text={alert.message} close={alertHandler} />
            )}
            </form>
        </Modal>
    );
};

export default AddTransaction;
