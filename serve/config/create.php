<?php
require_once '../config.php';

// Декодування отриманих даних з фронтенду
$data = json_decode(file_get_contents('php://input'), true);
$user_id = $data['user_id'];
$config_data = json_encode($data['data'], JSON_UNESCAPED_UNICODE); // Конвертуємо масив у JSON

// Оновлення всіх записів для користувача, встановлюючи is_active = 0
$update_sql = "UPDATE `config` SET is_active = 0";
$update_stmt = $conn->prepare($update_sql);
$update_stmt->execute();

// Підготовка SQL-запиту для вставки нового запису
$insert_sql = "INSERT INTO `config` (user_id, data) VALUES (?, ?)";

// Підготовка запиту
$insert_stmt = $conn->prepare($insert_sql);

// Прив'язка параметрів
$insert_stmt->bind_param("is", $user_id, $config_data);

// Виконання запиту
if ($insert_stmt->execute()) {
    // Якщо запит успішний
    echo json_encode(['success' => true, 'message' => 'Config created successfully.', 'config_id' => $insert_stmt->insert_id]);
} else {
    // Якщо сталася помилка
    echo json_encode(['success' => false, 'message' => 'Failed to create config.']);
}
