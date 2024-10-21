<?php
require_once '../../config.php';
require_once '../../functions.php';

// Отримання даних з фронту
$data = json_decode(file_get_contents('php://input'), true);

// Параметри пагінації (якщо передані)
$page = isset($data['page']) ? (int)$data['page'] : 1;
$limit = isset($data['limit']) ? (int)$data['limit'] : 10;
$offset = ($page - 1) * $limit;

// Підготовка SQL-запиту для отримання списку
$sql = "SELECT * FROM fields_new WHERE 1=1";

// Масив для зберігання параметрів фільтрації
$params = [];
$types = "";

// Додавання фільтрації по кожному полю, якщо передано
if (isset($data['type'])) {
    $sql .= " AND type = ?";
    $params[] = $data['type'];
    $types .= "s";
}

if (isset($data['group'])) {
    $sql .= " AND `group` = ?";
    $params[] = $data['group'];
    $types .= "s";
}

if (isset($data['block_view'])) {
    $sql .= " AND block_view = ?";
    $params[] = $data['block_view'];
    $types .= "s";
}

if (isset($data['sorted'])) {
    $sql .= " AND sorted = ?";
    $params[] = $data['sorted'];
    $types .= "i";
}

if (isset($data['system'])) {
    $sql .= " AND system = ?";
    $params[] = $data['system'];
    $types .= "i";
}

// Додавання сортування
$field = isset($data['field']) ? $data['field'] : 'id';  // Поле для сортування, за замовчуванням id
$order = isset($data['order']) && strtolower($data['order']) == 'desc' ? 'DESC' : 'ASC';  // Напрямок сортування, за замовчуванням ASC

// Очищення назви поля для захисту від SQL-ін'єкцій
$allowed_fields = ['id', 'type', 'group', 'block_view', 'sorted', 'system', 'date_created'];  // Список дозволених полів
if (!in_array($field, $allowed_fields)) {
    $field = 'id';  // Якщо поле не в списку дозволених, використовувати id за замовчуванням
}

$sql .= " ORDER BY $field $order";

// Додавання пагінації
$sql .= " LIMIT ? OFFSET ?";
$params[] = $limit;
$params[] = $offset;
$types .= "ii";

// Підготовка запиту
$stmt = $conn->prepare($sql);

// Перевірка наявності запиту
if ($stmt === false) {
    echo json_encode(array("status" => false, "message" => "Prepare failed: " . $conn->error));
    exit;
}

// Прив'язка параметрів
if ($types) {
    $stmt->bind_param($types, ...$params);
}

// Виконання запиту
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
