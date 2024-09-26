<?php
require_once '../config.php';  // Підключаємо файл конфігурації для підключення до бази даних

// Отримуємо дані з запиту
$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['id'], $data['bot_name'], $data['bot_token'], $data['type'], $data['chat_id'], $data['is_active'])) {
    $userId = $data['id'];
    $botName = $data['bot_name'];
    $botToken = $data['bot_token'];
    $type = $data['type'];
    $chatId = $data['chat_id'];
    $isActive = $data['is_active'];

    // Функція для створення нового Telegram бота
    function createTelegramBot($conn, $userId, $botName, $botToken, $type, $chatId, $isActive) {
        $sql = "INSERT INTO telegram_bots (user_id, bot_name, bot_token, type, chat_id, is_active) VALUES (?, ?, ?, ?, ?, ?)";
        
        if ($stmt = $conn->prepare($sql)) {
            $stmt->bind_param("isssii", $userId, $botName, $botToken, $type, $chatId, $isActive);
            
            if ($stmt->execute()) {
                return ['status' => true, 'message' => 'Telegram бот успішно створений.'];
            } else {
                return ['status' => false, 'message' => 'Помилка при створенні Telegram бота: ' . $stmt->error];
            }

            $stmt->close();
        } else {
            return ['status' => false, 'message' => 'Помилка підготовки запиту: ' . $conn->error];
        }
    }

    // Виклик функції та відповідь
    $response = createTelegramBot($conn, $userId, $botName, $botToken, $type, $chatId, $isActive);
} else {
    $response = ['status' => false, 'message' => 'Неправильні дані.'];
}

// Відповідь у форматі JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
