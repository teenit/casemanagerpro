<?php
require_once '../config.php';

// Отримання даних з фронтенду
$data = json_decode(file_get_contents('php://input'), true);

// SQL-запит
$sql = "
SELECT g.id, g.name, g.description, g.color, g.date_created, g.categories, COALESCE(COUNT(gc.group_id), 0) AS connect_count
FROM groups g
LEFT JOIN group_connect gc ON g.id = gc.group_id
WHERE g.status = 1
GROUP BY g.id, g.name, g.description, g.color, g.date_created, g.categories
";

// Виконання запиту
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Створення масиву для збереження результатів
    $response = array();
    
    // Отримання результатів
    while ($row = $result->fetch_assoc()) {
        $response[] = $row;
    }
    
    // Відправка результатів у форматі JSON
    echo json_encode($response);
} else {
    echo json_encode(array());
}

// Закриття з'єднання
$conn->close();
?>
