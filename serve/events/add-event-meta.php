<?php
require_once '../config.php';

// Отримання даних з фронту
$data = json_decode(file_get_contents('php://input'), true);

// Перевірка отриманих даних
if (isset($data['event_id'], $data['id'], $data['meta_key'], $data['meta_value'])) {
    $user_id = $data['id'];
    $event_id = $data['event_id'];
    $meta_key = $data['meta_key'];
    $meta_value = $data['meta_value'];
    // Підготовка SQL-запиту для вставки даних
    $sql = "INSERT INTO eventsmeta (event_id, meta_key, meta_value, user_id) VALUES (?, ?, ?, ?)";

    // Підготовка запиту
    $stmt = $conn->prepare($sql);

    // Перевірка наявності запиту
    if ($stmt === false) {
        // Відправка помилки на фронт
        echo json_encode(array("status" => false, "message" => "Prepare failed: " . $conn->error));
        exit;
    }

    // Прив'язка параметрів та виконання запиту
    $stmt->bind_param("issi",$event_id, $meta_key, $meta_value, $user_id);

    // Виконання запиту
    if ($stmt->execute() === TRUE) {
        // Отримання ідентифікатора останнього вставленого запису
        $last_id = $stmt->insert_id;
        // Повернення ідентифікатора на фронт у форматі JSON
        echo json_encode(array( "status" => true));
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
