<?php
require_once '../config.php';

// Декодування отриманих даних з фронтенду
$data = json_decode(file_get_contents('php://input'), true);
$user_id = $data['id'];

// Підготовка SQL-запиту
$sql = "SELECT * FROM `notification` WHERE id = ? AND date_read IS NULL";

// Підготовка запиту
$stmt = $conn->prepare($sql);

// Прив'язка параметра
$stmt->bind_param("i", $user_id);

// Виконання запиту
$stmt->execute();

// Отримання результату
$result = $stmt->get_result();

// Обробка результату (якщо потрібно)
$notifications = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $notifications[] = $row;
    }
}

// Виведення результату у форматі JSON
echo json_encode($notifications);
