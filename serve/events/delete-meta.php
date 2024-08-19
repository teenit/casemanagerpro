<?php
require_once '../config.php';

// Отримання даних з фронтенду
$data = json_decode(file_get_contents('php://input'), true); 

// Перевірка наявності event_id для видалення
if (!isset($data['meta_id'])) {
    echo json_encode(array("status" => false, "message" => "Event ID is required"));
    exit;
}

$meta_id = $data['meta'];

// Підготовка SQL-запиту для видалення рядка
$sql = "DELETE FROM eventsmeta WHERE id = ?";

// Підготовка запиту
$stmt = $conn->prepare($sql);

if ($stmt === false) {
    echo json_encode(array("status" => false, "message" => "Prepare failed: " . $conn->error));
    exit;
}

// Прив'язка параметра і виконання запиту
$stmt->bind_param("i", $meta_id);

if ($stmt->execute() === TRUE) {
    echo json_encode(array("status" => true, "message" => "Row deleted successfully"));
} else {
    echo json_encode(array("status" => false, "message" => "Execute failed: " . $stmt->error));
}

// Закриття з'єднання
$stmt->close();
$conn->close();
?>
