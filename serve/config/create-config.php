<?php
require_once '../config.php';

// Декодування отриманих даних з фронтенду
$data = json_decode(file_get_contents('php://input'), true);
$config_key = $data['key'];
$config_value = $data['value'];
$user_id = intval($data['id']);

// SQL запит для вставки або оновлення
$sql = "INSERT INTO config_meta (user_id, config_key, config_value, is_active)
        VALUES (?, ?, ?, 1)
        ON DUPLICATE KEY UPDATE
        config_value = VALUES(config_value), 
        updated_at = CURRENT_TIMESTAMP";

// Підготовка та виконання запиту
$stmt = $conn->prepare($sql);
$stmt->bind_param('iss', $user_id, $config_key, $config_value);

if ($stmt->execute()) {
    echo json_encode(['status' => true, 'message' => 'Config created or updated successfully.', 'config_id' => $stmt->insert_id]);
} else {
    echo json_encode(['status' => false, 'message' => 'Failed to create or update config.']);
}

$conn->close();
