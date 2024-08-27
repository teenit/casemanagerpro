<?php
require_once '../config.php';

// Декодування отриманих даних з фронтенду
$data = json_decode(file_get_contents('php://input'), true);
$user_id = $data['id'];
$notification_id = $data['notification_id'];

// Підготовка SQL-запиту для оновлення поля date_read
$sql = "UPDATE `notification` SET date_read = NOW() WHERE id = ? AND user_id = ?";

// Підготовка запиту
$stmt = $conn->prepare($sql);

// Прив'язка параметрів
$stmt->bind_param("ii", $notification_id, $user_id);

// Виконання запиту
if ($stmt->execute()) {
    // Перевірка, чи було оновлено рядки
    if ($stmt->affected_rows > 0) {
        echo json_encode(['status' => true, 'message' => 'Notification marked as read.']);
    } else {
        echo json_encode(['status' => false, 'message' => 'No notification found or already marked as read.']);
    }
} else {
    // Обробка помилок
    echo json_encode(['status' => false, 'message' => 'Error: ' . $stmt->error]);
}

// Закриття підготовленого запиту
$stmt->close();
