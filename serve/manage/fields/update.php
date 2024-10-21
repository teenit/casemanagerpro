<?php
require_once '../../config.php';
require_once '../../functions.php';

// Отримання даних з фронту
$data = json_decode(file_get_contents('php://input'), true);

// Перевірка наявності поля id
if (!isset($data['field_id'])) {
    echo json_encode(array("status" => false, "message" => "ID is required"));
    exit;
}

// Початкове формування SQL-запиту
$sql = "UPDATE fields_new SET ";
$fields = [];
$params = [];
$types = "";

// Додавання полів до запиту тільки якщо вони існують
if (isset($data['type'])) {
    $fields[] = "type = ?";
    $params[] = $data['type'];
    $types .= "s";
}

if (isset($data['name'])) {
    $fields[] = "name = ?";
    $params[] = $data['name'];
    $types .= "s";
}

if (isset($data['unique'])) {
    $fields[] = "`unique` = ?";
    $params[] = $data['unique'];
    $types .= "s";
}

if (isset($data['group'])) {
    $fields[] = "`group` = ?";
    $params[] = $data['group'];
    $types .= "s";
}

if (isset($data['block_view'])) {
    $fields[] = "block_view = ?";
    $params[] = $data['block_view'];
    $types .= "s";
}

if (isset($data['icon'])) {
    $fields[] = "icon = ?";
    $params[] = $data['icon'];
    $types .= "s";
}

if (isset($data['sorted'])) {
    $fields[] = "sorted = ?";
    $params[] = $data['sorted'];
    $types .= "i";
}

if (isset($data['system'])) {
    $fields[] = "system = ?";
    $params[] = $data['system'];
    $types .= "i";
}

// Якщо немає полів для оновлення, виходимо з помилкою
if (count($fields) === 0) {
    echo json_encode(array("status" => false, "message" => "No fields to update"));
    exit;
}

// Додаємо поле id в параметри та типи
$params[] = $data['field_id'];
$types .= "i";

// Об'єднуємо SQL запит
$sql .= implode(", ", $fields) . " WHERE id = ?";

// Підготовка запиту
$stmt = $conn->prepare($sql);

// Перевірка наявності запиту
if ($stmt === false) {
    echo json_encode(array("status" => false, "message" => "Prepare failed: " . $conn->error));
    exit;
}

// Прив'язка параметрів динамічно
$stmt->bind_param($types, ...$params);

// Виконання запиту
if ($stmt->execute() === TRUE) {
    echo json_encode(array("status" => true, "message" => "Record updated successfully"));
} else {
    echo json_encode(array("status" => false, "message" => "Execute failed: " . $stmt->error));
}

// Закриття з'єднання
$stmt->close();
$conn->close();
?>
