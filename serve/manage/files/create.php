<?php
require_once '../../config.php';
require_once '../../functions.php';

// Отримання даних з фронту
$data = json_decode(file_get_contents('php://input'), true);

// Перевірка отриманих даних
if (isset($data['title'], $data['description'], $data['client_id'], $data['id'], $data['type'])) {
    // Підготовка SQL-запиту для вставки даних
    $sql = "INSERT INTO files (title, description, client_id, user_id, type, tag) VALUES (?, ?, ?, ?, ?, ?)";

    // Підготовка запиту
    $stmt = $conn->prepare($sql);

    // Перевірка наявності запиту
    if ($stmt === false) {
        // Відправка помилки на фронт
        echo json_encode(array("status" => false, "message" => "Prepare failed: " . $conn->error));
        exit;
    }

    // Прив'язка параметрів та виконання запиту
    $stmt->bind_param("ssiiss", $data['title'], $data['description'], $data['client_id'], $data['id'], $data['type'], $data['tag']);

    // Виконання запиту
    if ($stmt->execute() === TRUE) {
        // Отримання ідентифікатора останнього вставленого запису
        $last_id = $stmt->insert_id;
        // Повернення ідентифікатора на фронт у форматі JSON
        echo json_encode(array("file_id" => $last_id, "status" => true));
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
