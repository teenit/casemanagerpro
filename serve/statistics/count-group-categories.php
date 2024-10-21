<?php
require_once '../config.php';

// Створюємо масив для зберігання даних відповіді
$response = array();
$groups = [];

// Перевіряємо, чи запит метод POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Перевіряємо з'єднання
    if ($conn->connect_error) {
        $response['status'] = false;
        $response['message'] = "Помилка з'єднання: " . $conn->connect_error;
    } else {
        // Запит з використанням JOIN між таблицями groups і group_connect, де з group_connect беремо тільки COUNT
        $sql = "
            SELECT g.*, COUNT(gc.group_id) AS group_count
            FROM groups g
            LEFT JOIN group_connect gc ON g.id = gc.group_id
            WHERE g.status = 1 AND g.is_favourite = 1
            GROUP BY g.id
        ";

        // Виконуємо запит
        if ($result = $conn->query($sql)) {
            // Перевіряємо, чи є результати
            if ($result->num_rows > 0) {
                // Перетворюємо результат в масив
                while ($row = $result->fetch_assoc()) {
                    $groups[] = [
                        "count" => $row['group_count'],
                        "name" => $row['name'],
                        "color" => $row['color']
                    ];
                }
                $response['status'] = true;
                $response['groups'] = $groups;
            } else {
                $response['status'] = false;
                $response['message'] = "Записи не знайдено";
            }
        } else {
            $response['status'] = false;
            $response['message'] = "Помилка виконання запиту: " . $conn->error;
        }
    }
} else {
    $response['status'] = false;
    $response['message'] = "Метод запиту не POST або ключ категорії не наданий";
}

// Повертаємо відповідь у форматі JSON
echo json_encode($response);
?>
