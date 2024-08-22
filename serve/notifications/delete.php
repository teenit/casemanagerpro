<?php
require_once '../config.php';

// Декодування отриманих даних з фронтенду
$data = json_decode(file_get_contents('php://input'), true);
$notification_id = $data['notification_id'];
$user_id = $data['id'];

// Підготовка SQL-запиту для видалення сповіщення
$sql = "DELETE FROM `notification` WHERE id = ? AND user_id = ?";

// Підготовка запиту
$stmt = $conn->prepare($sql);

// Прив'язка параметрів
$stmt->bind_param("ii", $notification_id, $user_id);

// Виконання запиту
if ($stmt->execute()) {
    // Якщо запит успішний
    echo json_encode(['success' => true, 'message' => 'Notification deleted successfully.']);
} else {
    // Якщо сталася помилка
    echo json_encode(['success' => false, 'message' => 'Failed to delete notification.']);
}
