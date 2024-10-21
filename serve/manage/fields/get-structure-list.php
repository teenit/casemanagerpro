<?php
require_once '../../config.php';
require_once '../../functions.php';

// Отримання даних з фронту, якщо необхідно обробляти вхідні дані
$data = json_decode(file_get_contents('php://input'), true);

// Підготовка SQL-запиту для отримання списку всіх записів з таблиці fields_new
$sql = "SELECT * FROM fields_new";

// Підготовка запиту
$stmt = $conn->prepare($sql);

// Перевірка на успішну підготовку запиту
if ($stmt === false) {
    echo json_encode(array("status" => false, "message" => "Помилка підготовки запиту: " . $conn->error));
    exit;
}

$fieldsData = [
    "cases" => [
        "contacts" => [],
        "works" => [],
        "another" => []
    ],
    "users" => [
        "contacts" => [],
        "works" => [],
        "another" => []
    ]
    ];

// Виконання запиту
if ($stmt->execute()) {
    // Отримання результатів
    $result = $stmt->get_result();

    // Перевірка кількості записів у результатах
    if ($result->num_rows > 0) {
        // Збирання результатів у масив
        while ($row = $result->fetch_assoc()) {
            if ($row["group"] === "cases"){
                $fieldsData['cases'][$row['block_view']][] = $row;
            }
        }

        // Повернення списку результатів у форматі JSON
        echo json_encode(array("status" => true, "fields" => $fieldsData));
    } else {
        // Якщо записів не знайдено, повертається порожній масив
        echo json_encode(array("status" => true, "fields" => [], "message" => "Записів не знайдено"));
    }
} else {
    // Повернення помилки на фронт, якщо запит не виконався
    echo json_encode(array("status" => false, "message" => "Помилка виконання запиту: " . $stmt->error));
}

// Закриття запиту і з'єднання
$stmt->close();
$conn->close();
?>
