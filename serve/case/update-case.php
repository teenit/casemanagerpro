<?php

require_once '../config.php';

// Ключ для шифрування. Важливо зберігати його в безпечному місці.
$key = $privatKey;

// Функція для шифрування даних
function encryptData($data, $key) {
    return base64_encode(openssl_encrypt($data, "AES-256-CBC", $key, 0, substr($key, 0, 16)));
}

// Функція для розшифрування даних
function decryptData($encryptedData, $key) {
    return openssl_decrypt(base64_decode($encryptedData), "AES-256-CBC", $key, 0, substr($key, 0, 16));
}

// Отримання даних з фронту
$data = json_decode(file_get_contents('php://input'), true);

// Зашифрування номерів телефонів і електронної адреси
$phone1_encrypted = isset($data['phone1']) ? encryptData($data['phone1'], $key) : null;
$phone2_encrypted = isset($data['phone2']) ? encryptData($data['phone2'], $key) : null;
$email_encrypted = isset($data['email']) ? encryptData($data['email'], $key) : null;
$name = isset($data['last_name']) && isset($data['first_name']) && isset($data['middle_name']) ? $data["last_name"]." ".$data["first_name"]." ".$data["middle_name"] : null;
$responsible_id = isset($data['responsible_id']) ?  $data['responsible_id'] : null;
$responsible_id = isset($data['sex']) ?  $data['sex'] : null;
// Підготовка SQL-запиту для оновлення даних
$sql = "UPDATE cases_new SET";
$set_values = array();
$bind_params = array();

// Перевірка наявності кожного поля та його оновлення, якщо воно присутнє
if ($name !== null) {
    $sql .= " name = ?,";
    $set_values[] = $name;
}
if ($phone1_encrypted !== null) {
    $sql .= " phone1 = ?,";
    $set_values[] = $phone1_encrypted;
}
if ($phone2_encrypted !== null) {
    $sql .= " phone2 = ?,";
    $set_values[] = $phone2_encrypted;
}
if ($email_encrypted !== null) {
    $sql .= " email = ?,";
    $set_values[] = $email_encrypted;
}
if ($responsible_id !== null) {
    $sql .= " responsible_id = ?,";
    $set_values[] = $responsible_id;
}
if ($sex !== null) {
    $sql .= " sex = ?,";
    $set_values[] = $sex;
}
// Додавання умови WHERE для визначення, який запис оновити
$sql .= " happy_bd = ? WHERE id = ?";
$set_values[] = $data['happy_bd'];
$set_values[] = $data['case_id'];

// Підготовка запиту
$stmt = $conn->prepare($sql);

// Перевірка наявності запиту
if ($stmt === false) {
    die("Prepare failed: " . $conn->error);
}

// Прив'язка параметрів та виконання запиту
$bind_params[] = str_repeat("s", count($set_values)); // Генеруємо строку з типами даних для bind_param()
$bind_params = array_merge($bind_params, $set_values); // Об'єднуємо масиви
call_user_func_array(array($stmt, "bind_param"), $bind_params); // Викликаємо bind_param зі згенерованими параметрами

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
