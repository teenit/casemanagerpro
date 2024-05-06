<?php
require_once '../config.php';

$data = json_decode(file_get_contents('php://input'));

// Рядок пошуку
$search = '%' . $data->val . '%';

// Підготовка запиту SQL
$sql = "SELECT id, name FROM cases_new WHERE id LIKE ? OR name LIKE ?";
$mas = array();

// Підготовка і виконання підготовленого запиту
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $search, $search);
$stmt->execute();
$result = $stmt->get_result();

// Виведення результатів
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        // Додавання результатів до масиву
        $mas[] = $row;
    }
    // Виведення успішної відповіді
    echo json_encode([
        "status" => true,
        "mas" => $mas
    ]);
} else {
    // Виведення неуспішної відповіді
    echo json_encode([
        "status" => false,
        "mas" => $mas
    ]);
}

// Закриття підключення до бази даних
$conn->close();
?>
