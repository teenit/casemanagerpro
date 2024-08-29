import React, { useState } from "react";
import { apiResponse } from "../../Functions/get_apiObj";

const AddTransaction = ({ onTransactionAdded }) => {
    const [transactionType, setTransactionType] = useState("");
    const [amount, setAmount] = useState("");
    const [currency, setCurrency] = useState("UAH");
    const [status, setStatus] = useState("pending");
    const [referenceId, setReferenceId] = useState("");
    const [description, setDescription] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [location, setLocation] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await apiResponse(
                { 
                    transaction_type: transactionType, 
                    amount, 
                    currency, 
                    status, 
                    reference_id: referenceId, 
                    description, 
                    payment_method: paymentMethod, 
                    location 
                },
                "transactions/create.php"
            );
            if (res.status) {
                onTransactionAdded(); // Call the callback function to refresh the list
                setTransactionType("");
                setAmount("");
                setCurrency("UAH");
                setStatus("pending");
                setReferenceId("");
                setDescription("");
                setPaymentMethod("");
                setLocation("");
            } else {
                setError(res.message);
            }
        } catch (err) {
            setError("Помилка при додаванні транзакції.");
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Додати транзакцію</h2>
            {error && <p>Помилка: {error}</p>}
            <div>
                <label>Тип транзакції:</label>
                <input
                    type="text"
                    value={transactionType}
                    onChange={(e) => setTransactionType(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Сума:</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Валюта:</label>
                <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                    <option value="UAH">UAH</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                </select>
            </div>
            <div>
                <label>Статус:</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="pending">Очікується</option>
                    <option value="completed">Завершено</option>
                    <option value="failed">Не вдалося</option>
                </select>
            </div>
            <div>
                <label>ID посилання:</label>
                <input
                    type="text"
                    value={referenceId}
                    onChange={(e) => setReferenceId(e.target.value)}
                />
            </div>
            <div>
                <label>Опис:</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div>
                <label>Метод оплати:</label>
                <input
                    type="text"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                />
            </div>
            <div>
                <label>Розташування:</label>
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
            </div>
            <button type="submit" disabled={loading}>
                {loading ? "Додавання..." : "Додати транзакцію"}
            </button>
        </form>
    );
};

export default AddTransaction;
