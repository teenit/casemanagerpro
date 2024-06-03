<?php
require_once '../config.php';

// Декодування отриманих даних з фронтенду
$data = json_decode(file_get_contents('php://input'), true);

// SQL запит для оновлення даних в таблиці
$sql = "UPDATE groups 
        SET name = ?, description = ?, color = ?, categories = ?
        WHERE id = ?";

// Підготовка запиту
$stmt = $conn->prepare($sql);

// Прив'язка параметрів та виконання запиту
$stmt->bind_param("ssssi", $data['name'], $data['description'], $data['color'], $data['categories'], $data['group_id']);
$stmt->execute();

// Перевірка успішності запиту та виведення відповідного повідомлення
if ($stmt->affected_rows > 0) {
    echo json_encode(array("status" => true, "message" => "Дані оновлено"));
} else {
    echo json_encode(array("status" => false, "message" => "Немає запису для оновлення"));
}

// Закриття з'єднання з базою даних
$stmt->close();
$conn->close();
?>
