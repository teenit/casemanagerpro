<?php

require_once '../config.php';

// Перевірка з'єднання
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Отримання даних з фронту
$data = json_decode(file_get_contents('php://input'), true);

// Підготовка SQL-запиту для оновлення даних
$sql = "UPDATE cases_data SET ";
$set_values = array();
$bind_types = "";
$bind_params = array();

// Перевірка наявності кожного поля та його оновлення, якщо воно присутнє
if (isset($data['address_registered'])) {
    $sql .= "address_registered = ?, ";
    $set_values[] = $data['address_registered'];
    $bind_types .= "s";
}
if (isset($data['address_live'])) {
    $sql .= "address_live = ?, ";
    $set_values[] = $data['address_live'];
    $bind_types .= "s";
}
if (isset($data['categories'])) {
    $sql .= "categories = ?, ";
    $set_values[] = json_encode($data['categories']);
    $bind_types .= "s";
}
if (isset($data['channel'])) {
    $sql .= "channel = ?, ";
    $set_values[] = $data['channel'];
    $bind_types .= "s";
}
if (isset($data['date_first_contact'])) {
    $sql .= "date_first_contact = ?, ";
    $set_values[] = $data['date_first_contact'];
    $bind_types .= "s";
}
if (isset($data['contract_date'])) {
    $sql .= "contract_date = ?, ";
    $set_values[] = $data['contract_date'];
    $bind_types .= "s";
}
if (isset($data['contract_number'])) {
    $sql .= "contract_number = ?, ";
    $set_values[] = $data['contract_number'];
    $bind_types .= "s";
}
if (isset($data['comment'])) {
    $sql .= "comment = ?, ";
    $set_values[] = $data['comment'];
    $bind_types .= "s";
}
if (isset($data['potreba'])) {
    $sql .= "potreba = ?, ";
    $set_values[] = $data['potreba'];
    $bind_types .= "s";
}
if (isset($data['family_info'])) {
    $sql .= "family_info = ?, ";
    $set_values[] = $data['family_info'];
    $bind_types .= "s";
}
if (isset($data['history'])) {
    $sql .= "history = ?, ";
    $set_values[] = $data['history'];
    $bind_types .= "s";
}

// Видалення останньої коми та пробілу з SQL-запиту
$sql = rtrim($sql, ", ");

// Додавання умови WHERE для визначення, який запис оновити
$sql .= " WHERE case_id = ?";

// Додавання типу даних для case_id у методі bind_param()
$bind_types .= "i";

// Додавання значення case_id до параметрів
$set_values[] = $data['case_id'];

// З'єднання всіх значень у відповідному порядку для параметрів методу bind_param()
$bind_params[] = &$bind_types;
foreach ($set_values as $key => $value) {
    $bind_params[] = &$set_values[$key];
}

// Підготовка запиту
$stmt = $conn->prepare($sql);

// Перевірка наявності запиту
if ($stmt === false) {
    die("Prepare failed: " . $conn->error);
}

// Прив'язка параметрів та виконання запиту
call_user_func_array(array($stmt, "bind_param"), $bind_params);

// Виконання запиту
if ($stmt->execute() === TRUE) {
    echo json_encode(array("status" => true));
} else {
    echo json_encode(array("status" => false));
}

// Закриття з'єднання
$stmt->close();
$conn->close();

?>
