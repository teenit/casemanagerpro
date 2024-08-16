<?php
require_once '../config.php';

// Получение данных с фронта
$data = json_decode(file_get_contents('php://input'), true);

// Проверка полученных данных
if (isset($data['event_id'], $data['title'], $data['id'])) {
    $event_id = $data['event_id'];  // ID события для обновления
    $user_id = $data['id'];         // ID пользователя
    $title = $data['title'];        // Название события
    $datas = $data['data'] ?? null;  // Дополнительные данные
    $description = $data['description'] ?? null;
    $type = $data['type'] ?? null;
    $category = $data['category'] ?? null;
    $color = $data['color'] ?? "#445544";

    // Подготовка SQL-запроса для обновления данных
    $sql = "UPDATE events_new 
            SET title = ?, description = ?, type = ?, user_id = ?, data = ?, category = ?, color = ? 
            WHERE event_id = ?";

    // Подготовка запроса
    $stmt = $conn->prepare($sql);

    // Проверка на наличие запроса
    if ($stmt === false) {
        // Отправка ошибки на фронт
        echo json_encode(array("status" => false, "message" => "Prepare failed: " . $conn->error));
        exit;
    }

    // Привязка параметров и выполнение запроса
    $stmt->bind_param("sssisssi", $title, $description, $type, $user_id, $datas, $category, $color, $event_id);

    // Выполнение запроса
    if ($stmt->execute() === TRUE) {
        // Возвращение успешного статуса на фронт в формате JSON
        echo json_encode(array("status" => true, "message" => "Event updated successfully"));
    } else {
        // Отправка ошибки на фронт
        echo json_encode(array("status" => false, "message" => "Execute failed: " . $stmt->error));
    }

    // Закрытие соединения
    $stmt->close();
} else {
    // Отправка ошибки на фронт, если данные неполные
    echo json_encode(array("status" => false, "message" => "Invalid input data"));
}

$conn->close();
?>
