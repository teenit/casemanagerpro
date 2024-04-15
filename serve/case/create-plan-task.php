<?php
require_once '../config.php';

// Декодування отриманих даних з фронтенду
$data = json_decode(file_get_contents('php://input'), true);

// SQL запит для вставки даних в таблицю
$sql = "INSERT INTO case_plans (case_id, start_time, end_time, value, status) 
        VALUES (?, ?, ?, ?, ?)";

// Підготовка запиту
$stmt = $conn->prepare($sql);

// Прив'язка параметрів та виконання запиту для кожного запису даних
    $stmt->bind_param("isssi", $data['case_id'], $data['start_time'], $data['end_time'], $data['value'], $data['status']);
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
