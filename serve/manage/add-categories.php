<?php
require_once '../config.php';

// Создаем массив для хранения данных ответа
$response = array();

// Проверяем, получены ли данные
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Получаем данные из тела запроса
    $data = json_decode(file_get_contents('php://input'));

    // Проверяем, что все необходимые поля присутствуют в данных
    if (isset($data->categoryName, $data->categoryDescription, $data->categoryColor, $data->id, $data->categoryKey)) {
        // Получаем значения из данных
        $categoryName = $data->categoryName;
        $categoryDescription = $data->categoryDescription;
        $categoryColor = $data->categoryColor;
        $userID = $data->id;
        $categoryKey = $data->categoryKey;

        // Проверяем соединение
        if ($conn->connect_error) {
            $response['status'] = false;
            $response['message'] = "Connection failed: " . $conn->connect_error;
        } else {
            // Подготавливаем SQL запрос с использованием подготовленных выражений для защиты от SQL инъекций
            $sql = "INSERT INTO categories (name, description, color, user_id, category_key) VALUES (?, ?, ?, ?, ?)";
            $stmt = $conn->prepare($sql);

            // Привязываем параметры к подготовленному выражению
            $stmt->bind_param("sssis", $categoryName, $categoryDescription, $categoryColor, $userID, $categoryKey);

            // Выполняем запрос
            if ($stmt->execute() === TRUE) {
                $response['status'] = true;
                $response['message'] = "New record created successfully";
            } else {
                $response['status'] = false;
                $response['message'] = "Error: " . $sql . "<br>" . $conn->error;
            }

            // Закрываем подготовленное выражение
            $stmt->close();
        }
        // Закрываем соединение
        $conn->close();
    } else {
        // Если не все необходимые поля присутствуют в данных
        $response['status'] = false;
        $response['message'] = "Missing required fields";
    }
} else {
    // Если запрос не является POST запросом
    $response['status'] = false;
    $response['message'] = "Invalid request method";
}

// Возвращаем ответ в формате JSON
echo json_encode($response);
?>
