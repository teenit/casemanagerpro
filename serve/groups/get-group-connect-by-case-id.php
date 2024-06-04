<?php
require_once '../config.php';

// Отримання даних з фронтенду
$data = json_decode(file_get_contents('php://input'), true);

// SQL-запит і передача параметрів через плейсхолдери
$sql = "SELECT * FROM groups 
  INNER JOIN group_connect ON groups.id = group_connect.group_id 
  WHERE group_connect.type = ? 
  AND group_connect.client_id = ?
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $data['type'], $data['client_id']);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
 // Створення масиву для збереження результатів
 $response = array();
 
 // Отримання результатів та їх збереженя у масив
 while ($row = $result->fetch_assoc()) {
   $response[] = $row;
 }
 
 // Виведеня результату у формат JSON
 echo json_encode($response);
} else {
 echo json_encode(array());
}

// Закриття з'єднання та запиту
$stmt -> close();
$conn -> close();