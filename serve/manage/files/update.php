<?php
require_once '../../config.php';
require_once '../../functions.php';

// Отримання даних з фронту
$data = json_decode(file_get_contents('php://input'), true);

// Перевірка отриманих даних
if (isset($data['file_id']) && is_numeric($data['file_id'])) {
    $fields = [];
    $params = [];
    $types = '';

    if (isset($data['client_id'])) {
        $fields[] = "client_id = ?";
        $params[] = $data['client_id'];
        $types .= 'i';
    }
    if (isset($data['tag'])) {
        $fields[] = "tag = ?";
        $params[] = $data['tag'];
        $types .= 's';
    }
    if (isset($data['title'])) {
        $fields[] = "title = ?";
        $params[] = $data['title'];
        $types .= 's';
    }
    if (isset($data['description'])) {
        $fields[] = "description = ?";
        $params[] = $data['description'];
        $types .= 's';
    }
    if (isset($data['type'])) {
        $fields[] = "type = ?";
        $params[] = $data['type'];
        $types .= 's';
    }
    if (isset($data['status'])) {
        $fields[] = "status = ?";
        $params[] = $data['status'];
        $types .= 'i';
    }
    if (isset($data['value'])) {
        $fields[] = "value = ?";
        $params[] = json_encode($data['value']);
        $types .= 's';
    }
    // if (isset($data['id'])) {
    //     $fields[] = "user_id = ?";
    //     $params[] = $data['id'];
    //     $types .= 'i';
    // }
    if (isset($data['categories'])) {
        $fields[] = "categories = ?";
        $params[] = $data['categories'];
        $types .= 's';
    }

    // Завжди оновлюємо поле last_updated
    $fields[] = "last_updated = ?";
    $params[] = date('Y-m-d H:i:s');
    $types .= 's';

    // Додаємо file_id в кінці
    $params[] = $data['file_id'];
    $types .= 'i';

    // Формуємо SQL-запит
    $sql = "UPDATE files SET " . implode(", ", $fields) . " WHERE id = ?";

    // Підготовка запиту
    $stmt = $conn->prepare($sql);

    // Перевірка наявності запиту
    if ($stmt === false) {
        // Відправка помилки на фронт
        echo json_encode(array("status" => false, "message" => "Prepare failed: " . $conn->error));
        exit;
    }

    // Прив'язка параметрів та виконання запиту
    $stmt->bind_param($types, ...$params);

    // Виконання запиту
    if ($stmt->execute() === TRUE) {
        echo json_encode(array("status" => true, "message" => "File updated successfully"));
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
