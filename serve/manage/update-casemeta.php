<?php

require_once '../config.php';

// Отримання даних з фронту
$data = json_decode(file_get_contents('php://input'));

// Перевірка наявності даних
if (!isset($data->case_id) || !isset($data->key) || !isset($data->value)) {
    die("Error: Missing required data");
}

// Перетворення значення у строку, якщо воно не є строкою або числом
if (!is_string($data->value) && !is_numeric($data->value)) {
    $data->value = strval($data->value);
}

// Підготовка SQL-запиту для пошуку запису
$sql_select = "SELECT * FROM casemeta WHERE case_id = ? AND meta_key = ?";
$stmt_select = $conn->prepare($sql_select);

// Перевірка наявності запиту
if ($stmt_select === false) {
    die("Prepare failed: " . $conn->error);
}

// Прив'язка параметрів та виконання запиту
$stmt_select->bind_param("is", $data->case_id, $data->key);
$stmt_select->execute();
$result = $stmt_select->get_result();

// Перевірка, чи існує запис з таким case_id і meta_key
if ($result->num_rows > 0) {
    // Оновлення запису
    $sql_update = "UPDATE casemeta SET meta_value = ? WHERE case_id = ? AND meta_key = ?";
    $stmt_update = $conn->prepare($sql_update);

    // Перевірка наявності запиту
    if ($stmt_update === false) {
        die("Prepare failed: " . $conn->error);
    }

    // Прив'язка параметрів та виконання запиту оновлення
    $stmt_update->bind_param("sis", $data->value, $data->case_id, $data->key);
    $stmt_update->execute();

    // Повернення результату оновлення
    if ($stmt_update->affected_rows > 0) {
        echo json_encode(array("status" => true, "message" => "Дані оновлено"));
    } else {
        echo json_encode(array("status" => false));
    }

    // Закриття запиту оновлення
    $stmt_update->close();
} else {
    // Вставка нового запису
    $sql_insert = "INSERT INTO casemeta (case_id, meta_key, meta_value) VALUES (?, ?, ?)";
    $stmt_insert = $conn->prepare($sql_insert);

    // Перевірка наявності запиту
    if ($stmt_insert === false) {
        die("Prepare failed: " . $conn->error);
    }

    // Прив'язка параметрів та виконання запиту вставки
    $stmt_insert->bind_param("iss", $data->case_id, $data->key, $data->value);
    $stmt_insert->execute();

    // Повернення результату вставки
    if ($stmt_insert->affected_rows > 0) {
        echo json_encode(array("status" => true, "message" => "Дані додано"));
    } else {
        echo json_encode(array("status" => false));
    }

    // Закриття запиту вставки
    $stmt_insert->close();
}

// Закриття запиту вибірки
$stmt_select->close();
$conn->close();

?>
