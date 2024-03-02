<?php
require_once '../config.php';

// Создаем массив для хранения данных ответа
$response = array();

// Проверяем, получено ли значение categoryKey
if($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'));
    // Получаем значение categoryKey из POST параметра
    $categoryKey = $data->categoryKey;

    // Проверяем соединение
    if ($conn->connect_error) {
        $response['status'] = false;
        $response['message'] = "Connection failed: " . $conn->connect_error;
    } else {
        // Подготавливаем SQL запрос
        $sql = "SELECT id, name, description, color FROM categories WHERE category_key = ?";
        
        // Подготавливаем выражение
        $stmt = $conn->prepare($sql);

        // Привязываем параметры
        $stmt->bind_param("s", $categoryKey);

        // Выполняем запрос
        $stmt->execute();

        // Получаем результаты запроса
        $result = $stmt->get_result();

        // Проверяем, есть ли результаты
        if ($result->num_rows > 0) {
            // Преобразуем результат в массив
            $rows = array();
            while ($row = $result->fetch_assoc()) {
                $rows[] = $row;
            }
            $response['status'] = true;
            $response['message'] = "Records found";
            $response['data'] = $rows;
        } else {
            $response['status'] = false;
            $response['message'] = "No records found";
        }

        // Закрываем выражение
        $stmt->close();
    }
} else {
    $response['status'] = false;
    $response['message'] = "No categoryKey provided";
}

// Возвращаем ответ в формате JSON
echo json_encode($response);
?>
