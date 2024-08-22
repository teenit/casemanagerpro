<?php
require_once '../config.php';

// Декодування отриманих даних з фронтенду
$data = json_decode(file_get_contents('php://input'), true);
$user_id = $data['id'];
$page = isset($data['page']) ? (int)$data['page'] : 1; // Номер сторінки, за замовчуванням 1
$limit = isset($data['limit']) ? (int)$data['limit'] : 10; // Кількість сповіщень на сторінку, за замовчуванням 10

// Обчислення зсуву (offset) для пагінації
$offset = ($page - 1) * $limit;

// Підготовка SQL-запиту з пагінацією, починаючи з останнього
$sql = "SELECT * FROM `notification` WHERE user_id = ? AND date_read IS NULL ORDER BY date_created DESC LIMIT ? OFFSET ?";

// Підготовка запиту
$stmt = $conn->prepare($sql);

// Прив'язка параметрів
$stmt->bind_param("iii", $user_id, $limit, $offset);

// Виконання запиту
$stmt->execute();

// Отримання результату
$result = $stmt->get_result();

// Обробка результату
$notifications = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $notifications[] = [
            'notification_id' => $row['id'],
            'date_created' => $row['date_created'],
            'date_read' => $row['date_read'],
            'meta_key' => $row['meta_key'],
            'meta_value' => json_decode($row['meta_value'], JSON_UNESCAPED_UNICODE),
            'user_id' => $row['user_id']
        ];
    }
}

// Виведення результату у форматі JSON
echo json_encode($notifications);
