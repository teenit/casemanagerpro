<?php

require_once '../config.php';

// Перевірка з'єднання
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Отримання даних з фронта
$data = json_decode(file_get_contents('php://input'), true);

// Підготовка SQL-запиту для оновлення даних
$sql = "UPDATE users SET ";
$set_values = array();
$bind_types = "";
$bind_params = array();

// Перевірка наявності кожного поля та його оновлення, якщо воно присутнє
if (isset($data['address'])) {
    $sql .= "address = ?, ";
    $set_values[] = $data['address'];
    $bind_types .= "s";
}
if (isset($data['phone'])) {
    $sql .= "phone = ?, ";
    $set_values[] = $data['phone'];
    $bind_types .= "s";
}
if (isset($data['work'])) {
    $sql .= "work = ?, ";
    $set_values[] = $data['work'];
    $bind_types .= "s";
}
if (isset($data['datas'])) {
    $sql .= "datas = ?, ";
    $set_values[] = $data['datas'];
    $bind_types .= "s";
}
if (isset($data['userName'])) {
    $sql .= "userName = ?, ";
    $set_values[] = $data['userName'];
    $bind_types .= "s";
}

// Видалення останньої коми та пробілу з SQL-запиту
$sql = rtrim($sql, ", ");

// Додавання умови WHERE для визначення, який запис оновити
$sql .= " WHERE id = ?";

// Додавання типу даних для id у методі bind_param()
$bind_types .= "i";

// Додавання значення id до параметрів
$set_values[] = $data['user_id'];

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
    echo json_encode(array("status" => true, "message" => "Запис успішно оновлено"));
} else {
    echo json_encode(array("status" => false, "message" => "Не вдалося оновити запис: " . $stmt->error));
}

// Закриття з'єднання
$stmt->close();
$conn->close();

?>
