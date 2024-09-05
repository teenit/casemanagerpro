<?php
require_once '../config.php';  // Підключаємо файл конфігурації

// Отримуємо дані з запиту
$data = json_decode(file_get_contents('php://input'), true);
$page = $data['page'] ?? 1;
$limit = $data['limit'] ?? 10;
$field = $data['field'] ?? "id";
$order = $data['order'] ?? "DESC";

// Перевіряємо, чи page і limit є числами і більше нуля
$page = is_numeric($page) && $page > 0 ? intval($page) : 1;
$limit = is_numeric($limit) && $limit > 0 ? intval($limit) : 10;

// Перевіряємо, чи field і order є допустимими значеннями
$validFields = ['id', 'name', 'amount'];  // Список допустимих полів
$validOrders = ['ASC', 'DESC'];  // Допустимі напрямки сортування

$field = in_array($field, $validFields) ? $field : 'id';
$order = in_array($order, $validOrders) ? $order : 'DESC';

$offset = ($page - 1) * $limit;

$response = array("status" => false, "message" => "Unknown error");

// SQL-запит для отримання списку транзакцій
$sql = "SELECT * FROM transactions ORDER BY $field $order LIMIT ? OFFSET ?";

if ($stmt = $conn->prepare($sql)) {
    $stmt->bind_param('ii', $limit, $offset);

    if ($stmt->execute()) {
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $transactions = $result->fetch_all(MYSQLI_ASSOC);

            $response["status"] = true;
            $response["message"] = "Транзакції успішно отримані.";
            $response["transactions"] = $transactions;
        } else {
            $response["message"] = "Транзакції не знайдені.";
        }
    } else {
        $response["message"] = "Помилка виконання запиту: " . $stmt->error;
        // Optionally log the error
        error_log("SQL Error: " . $stmt->error);
    }

    $stmt->close();
} else {
    $response["message"] = "Помилка підготовки запиту: " . $conn->error;
    // Optionally log the error
    error_log("SQL Preparation Error: " . $conn->error);
}

echo json_encode($response);

$conn->close();
