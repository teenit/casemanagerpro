<?php
require_once '../config.php';  // Підключаємо файл конфігурації

// Отримуємо дані з запиту
$data = json_decode(file_get_contents('php://input'), true);

$transaction_id = $data['transaction_id'] ?? null;

$response = array("status" => false, "message" => "Unknown error");

// Перевірка, чи передано ID транзакції
if ($transaction_id) {
    $sql = "DELETE FROM transactions WHERE id = ?";

    // Готуємо запит
    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param('i', $transaction_id);

        if ($stmt->execute()) {
            if ($stmt->affected_rows > 0) {
                $response["status"] = true;
                $response["message"] = "Транзакція успішно видалена.";
                $response["transaction_id"] = $transaction_id;

                // Логування успішної операції
                $log_message = date('Y-m-d H:i:s') . " - Транзакція успішно видалена. ID: " . $transaction_id . "\n";
                file_put_contents('../logs/transaction_log.log', $log_message, FILE_APPEND);
            } else {
                $response["message"] = "Транзакцію не знайдено або вона вже видалена.";

                // Логування помилки
                $log_message = date('Y-m-d H:i:s') . " - Транзакцію не знайдено або вона вже видалена. ID: " . $transaction_id . "\n";
                file_put_contents('../logs/transaction_log.log', $log_message, FILE_APPEND);
            }
        } else {
            $response["message"] = "Помилка видалення транзакції: " . $stmt->error;

            // Логування помилки
            $log_message = date('Y-m-d H:i:s') . " - Помилка видалення транзакції: " . $stmt->error . "\n";
            file_put_contents('../logs/transaction_log.log', $log_message, FILE_APPEND);
        }

        $stmt->close();
    } else {
        $response["message"] = "Помилка підготовки запиту: " . $conn->error;

        // Логування помилки
        $log_message = date('Y-m-d H:i:s') . " - Помилка підготовки запиту: " . $conn->error . "\n";
        file_put_contents('../logs/transaction_log.log', $log_message, FILE_APPEND);
    }
} else {
    $response["message"] = "Не передано ID транзакції.";

    // Логування помилки
    $log_message = date('Y-m-d H:i:s') . " - Не передано ID транзакції.\n";
    file_put_contents('../logs/transaction_log.log', $log_message, FILE_APPEND);
}

echo json_encode($response);

$conn->close();
