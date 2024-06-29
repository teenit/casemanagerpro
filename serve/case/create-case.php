<?php
require_once '../config.php';
require_once '../functions.php';
// Отримання даних з фронту
$data = json_decode(file_get_contents('php://input'), true);

// Зашифрування номерів телефонів і електронної адреси
$phone1_encrypted = encryptData($data['phone1'], $key);
$phone2_encrypted = encryptData($data['phone2'], $key);
$email_encrypted = encryptData($data['email'], $key);
$name = $data["last_name"]." ".$data["first_name"]." ".$data["middle_name"];

// Підготовка SQL-запиту для вставки даних
$sql = "INSERT INTO cases_new (name, first_name, middle_name, last_name, phone1, phone2, email, happy_bd, user_id, responsible_id, sex) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

// Підготовка запиту
$stmt = $conn->prepare($sql);

// Перевірка наявності запиту
if ($stmt === false) {
    die("Prepare failed: " . $conn->error);
}

// Прив'язка параметрів та виконання запиту
$stmt->bind_param("ssssssssiis", $name, $data['first_name'], $data['middle_name'], $data['last_name'], 
                            $phone1_encrypted, $phone2_encrypted, $email_encrypted, $data['happy_bd'], $data['id'], $data['id'], $data['sex']);

// Виконання запиту
if ($stmt->execute() === TRUE) {
    // Отримання ідентифікатора останнього вставленого запису
    $last_id = $stmt->insert_id;
    // Повернення ідентифікатора на фронт у форматі JSON
    $mysql = "INSERT INTO cases_data (case_id) VALUES (?)";
    $stmts = $conn->prepare($mysql);
    $stmts->bind_param("i",$last_id);
    if ($stmts->execute() === TRUE) {
        echo json_encode(array("id" => $last_id, "status" => true));
    }   
} else {
    echo json_encode(array("status" => false));
}

// Закриття з'єднання
$stmt->close();
$stmts->close();
$conn->close();

?>
