<?php
require_once '../config.php';

// Декодування отриманих даних з фронтенду
$data = json_decode(file_get_contents('php://input'), true);

// SQL запит для вставки даних в таблицю
$sql = "INSERT INTO case_notes (case_id, user_id, text, color) 
        VALUES (?, ?, ?, ?)";

// Підготовка запиту
$stmt = $conn->prepare($sql);

// Прив'язка параметрів та виконання запиту для кожного запису даних
    $stmt->bind_param("iiss", $data['case_id'], $data['id'], $data['text'], $data['color']);
    $stmt->execute();

// Перевірка успішності запиту та виведення відповідного повідомлення
if ($stmt->affected_rows > 0) {
    echo json_encode(array("status" => true, "message" => "Дані додано"));
} else {
    echo json_encode(array("status" => false));
}
// Закриття з'єднання з базою даних
$stmt->close();
$conn->close();
?>
