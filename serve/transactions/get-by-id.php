<?php
require_once '../config.php';  // Підключаємо файл конфігурації

// Отримуємо дані з запиту
$data = json_decode(file_get_contents('php://input'), true);
$transaction_id = $data['transaction_id'] ?? null;

$response = array("status" => false, "message" => "Unknown error");

// Перевіряємо, чи передано ID транзакції
if ($transaction_id) {
    $sql = "SELECT * FROM transactions WHERE id = ?";

    // Готуємо запит
    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param('i', $transaction_id);

        if ($stmt->execute()) {
            $result = $stmt->get_result();

            if ($result->num_rows > 0) {
                $transaction = $result->fetch_assoc();

                $response["status"] = true;
                $response["message"] = "Транзакція успішно знайдена.";
                $response["transaction"] = $transaction;
            } else {
                $response["message"] = "Транзакцію не знайдено.";
            }
        } else {
            $response["message"] = "Помилка виконання запиту: " . $stmt->error;
        }

        $stmt->close();
    } else {
        $response["message"] = "Помилка підготовки запиту: " . $conn->error;
    }
} else {
    $response["message"] = "Не передано ID транзакції.";
}

echo json_encode($response);

$conn->close();
