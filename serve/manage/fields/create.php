<?php
require_once '../../config.php';
require_once '../../functions.php';

// Отримання даних з фронту
$data = json_decode(file_get_contents('php://input'), true);

// Встановлюємо значення за замовченням, якщо поля не передані
$sorted = isset($data['sorted']) ? (int)$data['sorted'] : 0;
$system = isset($data['system']) ? (int)$data['system'] : 0;

// Перевірка наявності та непорожності кожного параметра
if (!isset($data['type']) || empty($data['type'])) {
    echo json_encode(array("status" => false, "message" => "Field 'type' is required"));
    exit;
}

if (!isset($data['group']) || empty($data['group'])) {
    echo json_encode(array("status" => false, "message" => "Field 'group' is required"));
    exit;
}

if (!isset($data['block_view']) || empty($data['block_view'])) {
    echo json_encode(array("status" => false, "message" => "Field 'block_view' is required"));
    exit;
}

if (!isset($data['id'])) {
    echo json_encode(array("status" => false, "message" => "Field 'id' is required"));
    exit;
}

if (!isset($data['unique']) || empty($data['unique'])) {
    echo json_encode(array("status" => false, "message" => "Field 'unique' is required"));
    exit;
}

if (!isset($data['name']) || empty($data['name'])) {
    echo json_encode(array("status" => false, "message" => "Field 'name' is required"));
    exit;
}

// Підготовка SQL-запиту для вставки даних
$sql = "INSERT INTO fields_new (type, `group`, block_view, sorted, system, user_id, `unique`, name) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

// Підготовка запиту
$stmt = $conn->prepare($sql);

// Перевірка наявності запиту
if ($stmt === false) {
    echo json_encode(array("status" => false, "message" => "Prepare failed: " . $conn->error));
    exit;
}

// Прив'язка параметрів та виконання запиту
$stmt->bind_param("sssiiiss", $data['type'], $data['group'], $data['block_view'], $sorted, $system, $data['id'], $data['unique'], $data['name']);

// Виконання запиту
if ($stmt->execute() === TRUE) {
    // Отримання ідентифікатора останнього вставленого запису
    $last_id = $stmt->insert_id;
    echo json_encode(array("field_id" => $last_id, "status" => true));
} else {
    echo json_encode(array("status" => false, "message" => "Execute failed: " . $stmt->error));
}

// Закриття з'єднання
$stmt->close();
$conn->close();
?>
