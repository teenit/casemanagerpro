<?php
require_once '../config.php';

// Декодування отриманих даних з фронтенду
$data = json_decode(file_get_contents('php://input'), true);
$user_id = $data['user_id'];

// Підготовка SQL-запиту для отримання активної конфігурації
$sql = "SELECT * FROM `config` WHERE user_id = ? AND is_active = 1 LIMIT 1";

// Підготовка запиту
$stmt = $conn->prepare($sql);

// Прив'язка параметрів
$stmt->bind_param("i", $user_id);

// Виконання запиту
$stmt->execute();

// Отримання результату
$result = $stmt->get_result();
$config = $result->fetch_assoc();

// Перевірка, чи знайдено активну конфігурацію
if ($config) {
    // Якщо знайдено, повертаємо дані конфігурації
    echo json_encode([
        'success' => true,
        'config' => [
            'id' => $config['id'],
            'user_id' => $config['user_id'],
            'date_created' => $config['date_created'],
            'is_active' => $config['is_active'],
            'data' => json_decode($config['data'], JSON_UNESCAPED_UNICODE)
        ]
    ]);
} else {
    // Якщо не знайдено, повертаємо повідомлення про відсутність конфігурації
    echo json_encode(['success' => false, 'message' => 'No active config found.']);
}
