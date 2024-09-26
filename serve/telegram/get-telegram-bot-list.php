<?php
require_once '../config.php';  // Підключаємо файл конфігурації для підключення до бази даних

function getTelegramBotsList($conn) {
    // SQL запит для отримання списку ботів
    $sql = "SELECT id, chat_id, bot_name, bot_token, type, is_active, created_at, updated_at FROM telegram_bots";

    // Виконання запиту
    $result = $conn->query($sql);

    // Перевірка, чи є результати
    if ($result->num_rows > 0) {
        $bots = [];

        // Отримання всіх записів
        while ($row = $result->fetch_assoc()) {
            $bots[] = $row;
        }

        // Повертаємо список ботів
        return ['status' => true, 'data' => $bots];
    } else {
        // Якщо записів немає, повертаємо пустий список
        return ['status' => false, 'message' => 'Список ботів порожній'];
    }
}

// Отримуємо список ботів
$response = getTelegramBotsList($conn);

// Відповідь у форматі JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
