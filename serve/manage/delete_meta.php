<?php
require_once '../config.php';
$data = json_decode(file_get_contents('php://input'));

$meta_id = $data->idMeta;
$table_name = $data->tableName;

// Перевірка отриманих значень
if (!$meta_id || !$table_name) {
    echo json_encode(['status' => false, 'message' => 'Некоректні дані']);
    exit;
}

// Захист від SQL-ін'єкцій (тільки для назви таблиці)
$allowed_tables = ['eventsmeta', 'casemeta', 'usermeta']; // Дозволені таблиці
if (!in_array($table_name, $allowed_tables)) {
    echo json_encode(['status' => false, 'message' => 'Недозволена таблиця']);
    exit;
}

// SQL-запит на видалення запису
$sql = "DELETE FROM `$table_name` WHERE meta_id = ?";
$stmt = $conn->prepare($sql);

if ($stmt === false) {
    echo json_encode(['status' => false, 'message' => 'Помилка в запиті']);
    exit;
}

$stmt->bind_param("i", $meta_id);
$execution_result = $stmt->execute();

if ($execution_result) {
    if ($stmt->affected_rows > 0) {
        echo json_encode(['status' => true, 'message' => 'Запис успішно видалено']);
    } else {
        echo json_encode(['status' => false, 'message' => 'Запис не знайдено']);
    }
} else {
    echo json_encode(['status' => false, 'message' => 'Не вдалося виконати запит']);
}

$stmt->close();
?>
