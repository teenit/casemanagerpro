<?php
require_once '../config.php';
// Отримання даних з фронту
$data = json_decode(file_get_contents('php://input'), true);

$sql_delete = "DELETE FROM group_connect WHERE id = ?";

$stmt_delete = $conn->prepare($sql_delete);
$stmt_delete->bind_param("i", $data['connect_id']);

// Виконання запиту
if ($stmt_delete->execute() === TRUE) {
    echo json_encode(array("status" => true));
} else {
    echo json_encode(array("status" => false));
}

// Закриття з'єднання
$stmt_delete->close();
$conn->close();

?>
