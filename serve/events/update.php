<?php
require_once '../config.php';

// Отримання даних з фронтенду
$data = json_decode(file_get_contents('php://input'), true);

// Перевірка наявності event_id для оновлення
if (!isset($data['event_id'])) {
    echo json_encode(array("status" => false, "message" => "Event ID is required"));
    exit;
}

$event_id = $data['event_id'];  // ID події для оновлення
$fields = [];
$params = [];
$types = '';

// Перевірка та додавання полів для оновлення
if (isset($data['title'])) {
    $fields[] = 'title = ?';
    $params[] = $data['title'];
    $types .= 's';
}

if (isset($data['description'])) {
    $fields[] = 'description = ?';
    $params[] = $data['description'];
    $types .= 's';
}

if (isset($data['type'])) {
    $fields[] = 'type = ?';
    $params[] = $data['type'];
    $types .= 's';
}

if (isset($data['id'])) {
    $fields[] = 'user_id = ?';
    $params[] = $data['id'];
    $types .= 'i';
}

if (isset($data['data'])) {
    $fields[] = 'data = ?';
    $params[] = $data['data'];
    $types .= 's';
}

if (isset($data['category'])) {
    $fields[] = 'category = ?';
    $params[] = $data['category'];
    $types .= 's';
}

if (isset($data['color'])) {
    $fields[] = 'color = ?';
    $params[] = $data['color'];
    $types .= 's';
}

// Додамо event_id до параметрів
$params[] = $event_id;
$types .= 'i';

// Формуємо SQL-запит на основі динамічних полів
if (!empty($fields)) {
    $sql = "UPDATE events_new SET " . implode(', ', $fields) . " WHERE event_id = ?";

    // Підготовка запиту
    $stmt = $conn->prepare($sql);

    if ($stmt === false) {
        echo json_encode(array("status" => false, "message" => "Prepare failed: " . $conn->error));
        exit;
    }

    // Прив'язка параметрів
    $stmt->bind_param($types, ...$params);

    // Виконання запиту
    if ($stmt->execute() === TRUE) {
        echo json_encode(array("status" => true, "message" => "Event updated successfully"));
    } else {
        echo json_encode(array("status" => false, "message" => "Execute failed: " . $stmt->error));
    }

    // Закриття з'єднання
    $stmt->close();
} else {
    echo json_encode(array("status" => false, "message" => "No fields to update"));
}

$conn->close();
?>
