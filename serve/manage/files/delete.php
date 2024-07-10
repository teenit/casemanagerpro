<?php
require_once '../../config.php';
require_once '../../functions.php';

// Отримання даних з фронту
$data = json_decode(file_get_contents('php://input'), true);

// Перевірка отриманих даних
if (isset($data['file_id']) && is_numeric($data['file_id'])) {
    // Підготовка SQL-запиту для видалення даних
    $sql = "DELETE FROM files WHERE id = ?";

    // Підготовка запиту
    $stmt = $conn->prepare($sql);

    // Перевірка наявності запиту
    if ($stmt === false) {
        // Відправка помилки на фронт
        echo json_encode(array("status" => false, "message" => "Prepare failed: " . $conn->error));
        exit;
    }

    // Прив'язка параметра та виконання запиту
    $stmt->bind_param("i", $data['file_id']);

    // Виконання запиту
    if ($stmt->execute() === TRUE) {
        echo json_encode(array("status" => true, "message" => "File deleted successfully"));
    } else {
        // Відправка помилки на фронт
        echo json_encode(array("status" => false, "message" => "Execute failed: " . $stmt->error));
    }

    // Закриття з'єднання
    $stmt->close();
} else {
    // Відправка помилки на фронт, якщо дані неповні
    echo json_encode(array("status" => false, "message" => "Invalid input data"));
}

$conn->close();
?>
