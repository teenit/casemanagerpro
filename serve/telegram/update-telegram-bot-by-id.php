<?php
require_once '../config.php';  // Підключаємо файл конфігурації для підключення до бази даних

// Отримуємо дані з запиту
$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['bot_id'])) {
    $botId = $data['bot_id'];
    $updates = [];
    $params = [];

    // Формуємо частини запиту для полів, які потрібно оновити
    if (isset($data['bot_name'])) {
        $updates[] = "bot_name = ?";
        $params[] = $data['bot_name'];
    }
    if (isset($data['bot_token'])) {
        $updates[] = "bot_token = ?";
        $params[] = $data['bot_token'];
    }
    if (isset($data['type'])) {
        $updates[] = "type = ?";
        $params[] = $data['type'];
    }
    if (isset($data['is_active'])) {
        $updates[] = "is_active = ?";
        $params[] = $data['is_active'];
    }

    // Перевіряємо, чи є поля для оновлення
    if (count($updates) > 0) {
        $sql = "UPDATE telegram_bots SET " . implode(", ", $updates) . " WHERE id = ?";
        $params[] = $botId;

        if ($stmt = $conn->prepare($sql)) {
            // Прив'язка параметрів
            $stmt->bind_param(str_repeat('s', count($params) - 1) . 'i', ...$params);
            
            if ($stmt->execute()) {
                if ($stmt->affected_rows > 0) {
                    $response = ['status' => true, 'message' => 'Telegram бот успішно оновлений.'];
                } else {
                    $response = ['status' => false, 'message' => 'Запис не знайдено або нічого не змінено.'];
                }
            } else {
                $response = ['status' => false, 'message' => 'Помилка при оновленні Telegram бота: ' . $stmt->error];
            }

            $stmt->close();
        } else {
            $response = ['status' => false, 'message' => 'Помилка підготовки запиту: ' . $conn->error];
        }
    } else {
        $response = ['status' => false, 'message' => 'Не передано жодних полів для оновлення.'];
    }
} else {
    $response = ['status' => false, 'message' => 'Неправильні дані.'];
}

// Відповідь у форматі JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
