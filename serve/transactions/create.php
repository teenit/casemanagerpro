<?php
require_once '../config.php';  // підключаємо файл конфігурації

// Отримуємо дані з запиту
$data = json_decode(file_get_contents('php://input'), true);

$user_id = $data['id'] ?? null;
$transaction_type = $data['transaction_type'] ?? null;
$amount = $data['amount'] ?? null;
$currency = $data['currency'] ?? 'UAH';
$status = $data['status'] ?? 'pending';
$reference_id = $data['reference_id'] ?? null;
$description = $data['description'] ?? null;
$payment_method = $data['payment_method'] ?? null;
$ip_address = $_SERVER['REMOTE_ADDR'];  // IP-адреса клієнта
$location = $data['location'] ?? null;

$response = array("status" => false, "message" => "Unknown error");

// Перевіряємо, чи всі обов'язкові поля передані
if ($user_id && $transaction_type && $amount) {
    $sql = "INSERT INTO transactions (user_id, transaction_type, amount, currency, status, reference_id, description, payment_method, ip_address, location)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    // Готуємо запит
    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param('isdsssssss', $user_id, $transaction_type, $amount, $currency, $status, $reference_id, $description, $payment_method, $ip_address, $location);

        if ($stmt->execute()) {
            $response["status"] = true;
            $response["message"] = "Транзакція успішно додана.";
            $response["transaction_id"] = $stmt->insert_id;

            // Логування успішної операції
            $log_message = date('Y-m-d H:i:s') . " - Транзакція успішно додана. ID: " . $response["transaction_id"] . "\n";
            file_put_contents('../logs/transaction_log.log', $log_message, FILE_APPEND);
        } else {
            $response["message"] = "Помилка додавання транзакції: " . $stmt->error;

            // Логування помилки
            $log_message = date('Y-m-d H:i:s') . " - Помилка додавання транзакції: " . $stmt->error . "\n";
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
    $response["message"] = "Обов'язкові поля не заповнені.";

    // Логування помилки
    $log_message = date('Y-m-d H:i:s') . " - Обов'язкові поля не заповнені.\n";
    file_put_contents('../logs/transaction_log.log', $log_message, FILE_APPEND);
}

echo json_encode($response);

$conn->close();
