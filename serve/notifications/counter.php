<?php
require_once '../config.php';

// Декодування отриманих даних з фронтенду
$data = json_decode(file_get_contents('php://input'), true);
$user_id = $data['id'];

// Підготовка SQL-запиту для підрахунку непрочитаних сповіщень
$sql = "SELECT COUNT(*) as unread_count FROM `notification` WHERE user_id = ? AND date_read IS NULL";

// Підготовка запиту
$stmt = $conn->prepare($sql);

// Прив'язка параметра
$stmt->bind_param("i", $user_id);

// Виконання запиту
$stmt->execute();

// Отримання результату
$result = $stmt->get_result();
$row = $result->fetch_assoc();

// Виведення кількості непрочитаних сповіщень у форматі JSON
echo json_encode(['unread_count' => $row['unread_count']]);
