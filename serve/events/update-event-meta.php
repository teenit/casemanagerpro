<?php
require_once '../config.php';

// Отримання даних з фронту
$data = json_decode(file_get_contents('php://input'), true);

// Перевірка отриманих даних
if (isset($data['meta_id'], $data['id'], $data['meta_value'])) {
    $meta_id = $data['meta_id'];
    $user_id = $data['id'];
    $meta_value = $data['meta_value'];

    // Підготовка SQL-запиту для оновлення даних
    $sql = "UPDATE eventsmeta SET user_id = ?, meta_value = ? WHERE meta_id = ?";

    // Підготовка запиту
    $stmt = $conn->prepare($sql);

    // Перевірка наявності запиту
    if ($stmt === false) {
        // Відправка помилки на фронт
        echo json_encode(array("status" => false, "message" => "Prepare failed: " . $conn->error));
        exit;
    }

    // Прив'язка параметрів та виконання запиту
    $stmt->bind_param("isi", $user_id, $meta_value, $meta_id);

    // Виконання запиту
    if ($stmt->execute() === TRUE) {
        // Відправка успішного результату на фронт
        echo json_encode(array("status" => true));
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
