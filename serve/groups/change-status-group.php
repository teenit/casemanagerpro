<?php
require_once '../config.php';
// Отримання даних з фронту
$data = json_decode(file_get_contents('php://input'), true);

// SQL запит для оновлення даних в таблиці
$sql = "UPDATE groups 
        SET status= ?
        WHERE id = ?";

// Підготовка запиту
$stmt = $conn->prepare($sql);

// Перевірка наявності запиту
if ($stmt === false) {
    die("Prepare failed: " . $conn->error);
}

// Прив'язка параметрів та виконання запиту
$stmt->bind_param("ii", $data['status'], $data['group_id']);

// Виконання запиту
if ($stmt->execute() === TRUE) {
    // Отримання ідентифікатора останнього вставленого запису
        echo json_encode(array("status" => true));
} else {
    echo json_encode(array("status" => false));
}

// Закриття з'єднання
$stmt->close();
$conn->close();

?>