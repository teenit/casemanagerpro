<?php
require_once '../config.php';

function addRecord($name, $description, $conn) {
    $stmt = $conn->prepare("INSERT INTO access (name, description) VALUES (?, ?)");
    $stmt->bind_param("ss", $name, $description);

    if ($stmt->execute()) {
        return [
            'message' => "Запись успешно добавлена",
            'status' => true
        ];
    } else {
        return [
            'message' => "Ошибка: " . $conn->error,
            'status' => false
        ];
    }

    $stmt->close();
}

$data = json_decode(file_get_contents('php://input'));
if(!$data->token) exit;

// Получение данных из POST запроса и фильтрация
$name = $data->name;
$description = $data->description;

// Добавление записи
$response = addRecord($name, $description, $conn);

// Возвращение ответа в формате JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
