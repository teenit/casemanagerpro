<?php
require_once '../../config.php';
require_once '../../functions.php';

// Отримання даних з фронту
$data = json_decode(file_get_contents('php://input'), true);

// Перевірка отриманих даних
if (!isset($data['group']) || empty($data['group'])) {
    echo json_encode(array("status" => false, "message" => "Field 'group' is required"));
    exit;
}

// Підготовка SQL-запиту для отримання списку за групою
$sql = "SELECT * FROM fields_new WHERE `group` = ?";

// Підготовка запиту
$stmt = $conn->prepare($sql);

// Перевірка наявності запиту
if ($stmt === false) {
    echo json_encode(array("status" => false, "message" => "Prepare failed: " . $conn->error));
    exit;
}

// Прив'язка параметрів та виконання запиту
$group = $data['group'];
$stmt->bind_param("s", $group);

if ($stmt->execute()) {
    // Отримання результатів
    $result = $stmt->get_result();

    // Перевірка кількості результатів
    if ($result->num_rows > 0) {
        $fields = [];

        // Збирання результатів у масив
        while ($row = $result->fetch_assoc()) {
            $fields[] = $row;
        }

        // Повернення списку на фронт у форматі JSON
        echo json_encode(array("status" => true, "fields" => $fields));
    } else {
        // Повернення порожнього списку
        echo json_encode(array("status" => true, "fields" => [], "message" => "No records found"));
    }
} else {
    // Відправка помилки на фронт
    echo json_encode(array("status" => false, "message" => "Execute failed: " . $stmt->error));
}

// Закриття з'єднання
$stmt->close();
$conn->close();
?>
