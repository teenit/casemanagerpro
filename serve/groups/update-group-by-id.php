<?php
require_once '../config.php';

// Декодування отриманих даних з фронтенду
$data = json_decode(file_get_contents('php://input'), true);

if ($data === null) {
    echo json_encode(array("status" => false, "message" => "Невірний формат JSON"));
    exit;
}

$fields = [];
$params = [];
$types = '';
$group_id = $data['group_id'];

// Перевіряємо, які поля передані, і динамічно будуємо запит
if (isset($data['name'])) {
    $fields[] = "name = ?";
    $params[] = $data['name'];
    $types .= 's'; // string
}

if (isset($data['description'])) {
    $fields[] = "description = ?";
    $params[] = $data['description'];
    $types .= 's'; // string
}

if (isset($data['color'])) {
    $fields[] = "color = ?";
    $params[] = $data['color'];
    $types .= 's'; // string
}

if (isset($data['categories'])) {
    $fields[] = "categories = ?";
    $params[] = json_encode($data['categories']);
    $types .= 's'; // string (для JSON)
}

if (isset($data['is_favourite'])) {
    $fields[] = "is_favourite = ?";
    $params[] = $data['is_favourite'];
    $types .= 'i'; // integer
}

// Перевіряємо, чи є дані для оновлення
if (count($fields) > 0) {
    // Створюємо SQL-запит з динамічно зібраними полями
    $sql = "UPDATE groups SET " . implode(", ", $fields) . " WHERE id = ?";
    $params[] = $group_id;
    $types .= 'i'; // integer для group_id

    // Підготовка запиту
    if ($stmt = $conn->prepare($sql)) {
        // Динамічне прив'язування параметрів
        $stmt->bind_param($types, ...$params);

        // Виконуємо запит
        $stmt->execute();

        // Перевірка успішності запиту
        if ($stmt->affected_rows > 0) {
            echo json_encode(array("status" => true, "message" => "Дані оновлено"));
        } else {
            echo json_encode(array("status" => false, "message" => "Немає запису для оновлення або дані не змінено"));
        }

        // Закриття запиту
        $stmt->close();
    } else {
        echo json_encode(array("status" => false, "message" => "Помилка підготовки запиту: " . $conn->error));
    }
} else {
    echo json_encode(array("status" => false, "message" => "Немає полів для оновлення"));
}

// Закриття з'єднання з базою даних
$conn->close();
?>
