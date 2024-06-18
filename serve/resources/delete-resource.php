<?php
require_once '../config.php';

$data = json_decode(file_get_contents('php://input'));
$token = $data->token;
$id = $data->id;

// SQL запит для вставки даних в таблицю
$sql = "DELETE FROM resources WHERE id=?";

// Підготовка запиту
$stmt = $conn->prepare($sql);

// Прив'язка параметрів та виконання запиту для кожного запису даних
    $stmt->bind_param("i", $data->resource_id);
    $stmt->execute();

// Перевірка успішності запиту та виведення відповідного повідомлення
if ($stmt->affected_rows > 0) {
    echo json_encode(array("status" => true, "message" => "Ресурс успішно видалено"));
} else {
    echo json_encode(array("status" => false));
}
// Закриття з'єднання з базою даних
$stmt->close();
$conn->close();
?>
