<?php
require_once '../config.php';
require_once '../service/users.php';

// Отримання даних з фронту
$data = json_decode(file_get_contents('php://input'), true);

// Перевірка отриманих даних
if (isset($data['title'], $data['id'])) {
    $user_id = $data['id'];
    $title = $data['title'];
    $datas = $data['data'] ?? null;
    $description = $data['description'] ?? null;
    $type = $data['type'] ?? null;
    $category = $data['category'] ?? null;
    $color = $data['color'] ?? "#445544";
    // Підготовка SQL-запиту для вставки даних
    $sql = "INSERT INTO events_new (title, description, type, user_id, data, category, color) VALUES (?, ?, ?, ?, ?, ?, ?)";

    // Підготовка запиту
    $stmt = $conn->prepare($sql);

    // Перевірка наявності запиту
    if ($stmt === false) {
        // Відправка помилки на фронт
        echo json_encode(array("status" => false, "message" => "Prepare failed: " . $conn->error));
        exit;
    }

    // Прив'язка параметрів та виконання запиту
    $stmt->bind_param("sssisss", $title, $description, $type, $user_id, $datas, $category, $color);

    // Виконання запиту
    if ($stmt->execute() === TRUE) {
        // Отримання ідентифікатора останнього вставленого запису
        $last_id = $stmt->insert_id;
        $user = getUserById($data['id']);
        $nUsers = getUsersIds();
        $nKey = 'created_new_event';
        $nValue = [
            'event_id' => $last_id,
            'name' => $title,
            'user_id_created' => $data['id'],
            'user_name_created' => $user['userName']
        ];
        $encodedValue = json_encode($nValue, JSON_UNESCAPED_UNICODE);

    _addNotification($nUsers, $nKey, $encodedValue);
        // Повернення ідентифікатора на фронт у форматі JSON
        echo json_encode(array("event_id" => $last_id, "status" => true));
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
