<?php
require_once '../config.php';  // Підключаємо файл конфігурації

// Отримуємо дані з запиту
$data = json_decode(file_get_contents('php://input'), true);

$transaction_id = $data['transaction_id'] ?? null;
$transaction_type = $data['transaction_type'] ?? null;
$amount = $data['amount'] ?? null;
$currency = $data['currency'] ?? null;
$status = $data['status'] ?? null;
$reference_id = $data['reference_id'] ?? null;
$description = $data['description'] ?? null;
$payment_method = $data['payment_method'] ?? null;
$location = $data['location'] ?? null;

$response = array("status" => false, "message" => "Unknown error");

// Перевірка, чи передано ID транзакції
if ($transaction_id) {
    $fields = [];
    $params = [];
    $types = '';

    if ($transaction_type) {
        $fields[] = 'transaction_type = ?';
        $params[] = $transaction_type;
        $types .= 's';
    }
    if ($amount) {
        $fields[] = 'amount = ?';
        $params[] = $amount;
        $types .= 'd';
    }
    if ($currency) {
        $fields[] = 'currency = ?';
        $params[] = $currency;
        $types .= 's';
    }
    if ($status) {
        $fields[] = 'status = ?';
        $params[] = $status;
        $types .= 's';
    }
    if ($reference_id) {
        $fields[] = 'reference_id = ?';
        $params[] = $reference_id;
        $types .= 's';
    }
    if ($description) {
        $fields[] = 'description = ?';
        $params[] = $description;
        $types .= 's';
    }
    if ($payment_method) {
        $fields[] = 'payment_method = ?';
        $params[] = $payment_method;
        $types .= 's';
    }
    if ($location) {
        $fields[] = 'location = ?';
        $params[] = $location;
        $types .= 's';
    }

    if (!empty($fields)) {
        $params[] = $transaction_id;
        $types .= 'i';

        $sql = "UPDATE transactions SET " . implode(', ', $fields) . " WHERE id = ?";

        if ($stmt = $conn->prepare($sql)) {
            $stmt->bind_param($types, ...$params);

            if ($stmt->execute()) {
                $response["status"] = true;
                $response["message"] = "Транзакція успішно оновлена.";
                $response["transaction_id"] = $transaction_id;

                // Логування успішної операції
                $log_message = date('Y-m-d H:i:s') . " - Транзакція успішно оновлена. ID: " . $transaction_id . "\n";
                file_put_contents('../logs/transaction_log.log', $log_message, FILE_APPEND);
            } else {
                $response["message"] = "Помилка оновлення транзакції: " . $stmt->error;

                // Логування помилки
                $log_message = date('Y-m-d H:i:s') . " - Помилка оновлення транзакції: " . $stmt->error . "\n";
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
        $response["message"] = "Немає даних для оновлення.";

        // Логування помилки
        $log_message = date('Y-m-d H:i:s') . " - Немає даних для оновлення. ID: " . $transaction_id . "\n";
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
