<?php
require_once '../config.php';  // Підключаємо файл конфігурації

$response = array("status" => false, "message" => "Unknown error");

// SQL-запит для отримання загальної кількості транзакцій
$sql = "SELECT COUNT(*) as total FROM transactions";

if ($result = $conn->query($sql)) {
    $total_transactions = $result->fetch_assoc()['total'];

    $response["status"] = true;
    $response["message"] = "Загальна кількість транзакцій успішно отримана.";
    $response["total"] = $total_transactions;
} else {
    $response["message"] = "Помилка виконання запиту: " . $conn->error;
}

echo json_encode($response);

$conn->close();
