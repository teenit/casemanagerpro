<?php
require_once '../config.php';

$data = json_decode(file_get_contents('php://input'));
if(!$data->token) exit;
$msql = 'SELECT * FROM `access` WHERE id=?';
  
$stmt = $conn->prepare($msql);
$obj = new stdClass();
$obj->{'access'} = null;
if ($stmt) {
    // Прив'язка параметрів
    $stmt->bind_param("s", $data->access_id);
    
    // Виконання запиту
    $stmt->execute();

    // Отримання результатів
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        while($res = $result->fetch_assoc()) {
         $obj->{'access'} = $res;
        } 
    }
} 
echo json_encode($obj);