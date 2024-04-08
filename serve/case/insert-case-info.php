<?php

require_once '../config.php';
// Перевірка з'єднання
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Отримання даних з фронту
$data = json_decode(file_get_contents('php://input'), true);

// Підготовка SQL-запиту для вставки даних
$sql = "INSERT INTO cases_data (case_id, address_registered, address_live, categories, channel, date_first_contact, contract_date, contract_number, comment, potreba, family_info, history) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

// Підготовка запиту
$stmt = $conn->prepare($sql);

// Перевірка наявності запиту
if ($stmt === false) {
    die("Prepare failed: " . $conn->error);
}

// Прив'язка параметрів та виконання запиту
$stmt->bind_param("isssssssssss", $data['case_id'], $data['address_registered'], $data['address_live'], json_encode($data['categories']), 
                                  $data['channel'], $data['date_first_contact'], $data['contract_date'], $data['contract_number'], 
                                  $data['comment'], $data['potreba'], $data['family_info'], $data['history']);

// Виконання запиту
if ($stmt->execute() === TRUE) {
    echo "Data inserted successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Закриття з'єднання
$stmt->close();
$conn->close();

?>