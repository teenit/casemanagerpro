<?php
require_once '../config.php';

// Отримання даних з фронту
$data = json_decode(file_get_contents('php://input'), true);

// Перевірка чи отримано id групи з даних
if (isset($data['group_id'])) {
    $groupId = $data['group_id'];

    // SQL-запит для отримання даних з таблиць з перейменуванням полів id
    $query = "
        SELECT 
            g.*, 
            g.id as group_id,
            gc.*, 
            gc.id as group_connect_id,
            cn.*, 
            cn.id as case_id
        FROM groups g
        JOIN group_connect gc ON g.id = gc.group_id
        JOIN cases_new cn ON gc.client_id = cn.id
        WHERE g.id = ?
    ";

    // Підготовка та виконання запиту
    if ($stmt = $conn->prepare($query)) {
        $stmt->bind_param("i", $groupId); // Прив'язка параметру group_id
        $stmt->execute();
        
        // Отримання результатів запиту
        $result = $stmt->get_result();
        $response = [];

        while ($row = $result->fetch_assoc()) {
            $response[] = $row;
        }

        // Виведення результату у форматі JSON
        echo json_encode($response);
    } else {
        // Помилка підготовки запиту
        echo json_encode(['error' => 'Failed to prepare the SQL query.']);
    }
} else {
    // Помилка відсутності id групи
    echo json_encode(['error' => 'Group ID not provided.']);
}
?>
