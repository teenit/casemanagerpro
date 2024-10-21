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

// Підготовка SQL-запиту для видалення запису
$sql = "DELETE FROM fields_new WHERE id = ? AND system = 0";

// Підготовка запиту
$stmt = $conn->prepare($sql);

// Перевірка наявності запиту
if ($stmt === false) {
    // Відправка помилки на фронт
    echo json_encode(array("status" => false, "message" => "Prepare failed: " . $conn->error));
    exit;
}

// Прив'язка параметра та виконання запиту
$stmt->bind_param("i", $data['field_id']);

// Виконання запиту
if ($stmt->execute() === TRUE) {
    // Перевірка кількості видалених записів
    if ($stmt->affected_rows > 0) {
        echo json_encode(array("status" => true, "message" => "Record deleted successfully"));
    } else {
        echo json_encode(array("status" => false, "message" => "No record found with the given ID"));
    }
} else {
    // Відправка помилки на фронт
    echo json_encode(array("status" => false, "message" => "Execute failed: " . $stmt->error));
}

// Закриття з'єднання
$stmt->close();
$conn->close();
?>
