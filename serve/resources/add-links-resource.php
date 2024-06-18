<?php
require_once '../config.php';

$data = json_decode(file_get_contents('php://input'));
$token = $data->token;
$id = $data->id;

// SQL запит для вставки даних в таблицю
$sql = "INSERT INTO resources (user_id, meta_key, meta_value) 
        VALUES (?, ?, ?)";

// Підготовка запиту
$stmt = $conn->prepare($sql);

// Прив'язка параметрів та виконання запиту для кожного запису даних
    $stmt->bind_param("iss", $id, $data->type, json_encode($data->resource, JSON_UNESCAPED_UNICODE));
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
