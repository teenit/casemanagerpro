<?php
require_once '../config.php';
// Отримання даних з фронту
$data = json_decode(file_get_contents('php://input'), true);

// Підготовка SQL-запиту для вставки даних
$sql = "INSERT INTO groups (user_id, name, description, color) 
        VALUES (?, ?, ?, ?)";

// Підготовка запиту
$stmt = $conn->prepare($sql);

// Перевірка наявності запиту
if ($stmt === false) {
    die("Prepare failed: " . $conn->error);
}

// Прив'язка параметрів та виконання запиту
$stmt->bind_param("isss", $data['id'], $data['name'], $data['description'], $data['color']);

// Виконання запиту
if ($stmt->execute() === TRUE) {
    // Отримання ідентифікатора останнього вставленого запису
    $last_id = $stmt->insert_id;
        echo json_encode(array("id" => $last_id, "status" => true));
} else {
    echo json_encode(array("status" => false));
}

// Закриття з'єднання
$stmt->close();
$conn->close();

?>
