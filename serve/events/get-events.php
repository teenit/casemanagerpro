<?php
require_once '../config.php';

// Отримання даних з фронтенду
$data = json_decode(file_get_contents('php://input'), true);

// SQL-запит
$sql = "SELECT * FROM events_new";

// Виконання запиту
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Створення масиву для збереження результатів
    $events = array();
    
    // Отримання результатів
    while ($row = $result->fetch_assoc()) {
        $events[] = [
            'event_id' => $row['id'],
            'title' => $row['title'],
            'description' => $row['description'],
            'status' => $row['status'],
            'date_created' => $row['date_created'],
            'category' => $row['category'],
            'color' => $row['color']
        ];
    }
    
    // Відправка результатів у форматі JSON
    echo json_encode($events);
} else {
    echo json_encode(array());
}

// Закриття з'єднання
$conn->close();
?>
