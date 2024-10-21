<?php
require_once '../config.php';
require_once '../functions.php';

// Отримання даних з фронту
$data = json_decode(file_get_contents('php://input'), true);

// Перевірка наявності обов'язкових полів
if (!isset($data['case_id']) || !isset($data['field_id']) || !isset($data['value'])) {
    echo json_encode(array("status" => false, "message" => "Fields 'case_id', 'field_id', and 'value' are required"));
    exit;
}

// Встановлюємо значення для value
$value = $data['value'];


    // Перевіряємо, чи існує запис із таким fieldsmeta_id
    $sql_check = "SELECT id FROM case_fieldsmeta WHERE case_id = ? AND field_id = ?";
    $stmt_check = $conn->prepare($sql_check);

    if ($stmt_check === false) {
        echo json_encode(array("status" => false, "message" => "Prepare failed: " . $conn->error));
        exit;
    }

    // Прив'язуємо параметри для перевірки
    $stmt_check->bind_param("ii", $data['case_id'], $data['field_id']);
    $stmt_check->execute();
    $stmt_check->store_result();

    if ($stmt_check->num_rows > 0) {
        // Якщо запис існує — оновлюємо його
        $sql_update = "UPDATE case_fieldsmeta SET value = ?";
        
        $params = [$value];
        $types = "s"; // Тип для 'value'

        // Якщо передано 'data', додаємо його в запит
        if (isset($data['data'])) {
            $sql_update .= ", data = ?";
            $params[] = $data['data'];
            $types .= "s";
        }

       
        $sql_update .= " WHERE case_id = ? AND field_id = ?";
        $params[] = $data['case_id'];
        $params[] = $data['field_id'];
        $types .= "ii";

        $stmt_update = $conn->prepare($sql_update);

        if ($stmt_update === false) {
            echo json_encode(array("status" => false, "message" => "Prepare failed: " . $conn->error));
            exit;
        }

        $stmt_update->bind_param($types, ...$params);

        if ($stmt_update->execute()) {
            echo json_encode(array("status" => true, "message" => "Record updated successfully"));
        } else {
            echo json_encode(array("status" => false, "message" => "Update failed: " . $stmt_update->error));
        }

        $stmt_update->close();
    } else {
        // Якщо запису немає — створюємо новий
        $sql_insert = "INSERT INTO case_fieldsmeta (case_id, field_id, value, data) VALUES (?, ?, ?, ?)";

        $stmt_insert = $conn->prepare($sql_insert);

        if ($stmt_insert === false) {
            echo json_encode(array("status" => false, "message" => "Prepare failed: " . $conn->error));
            exit;
        }

        // Прив'язуємо параметри для вставки
        $dataField = isset($data['data']) ? $data['data'] : null;
        $stmt_insert->bind_param("iiss", $data['case_id'], $data['field_id'], $value, $dataField);

        if ($stmt_insert->execute()) {
            echo json_encode(array("status" => true, "message" => "Record created successfully"));
        } else {
            echo json_encode(array("status" => false, "message" => "Insert failed: " . $stmt_insert->error));
        }

        $stmt_insert->close();
    }

    $stmt_check->close();

$conn->close();
?>
