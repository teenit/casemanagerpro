<?php
require_once '../config.php';

$data = json_decode(file_get_contents('php://input'));
$token = $data->token;
$id = $data->id;
$obj = new StdClass();

$sql = "SELECT * FROM resources";

    // Виконання запиту
    $result = $conn->query($sql);
    
    if ($result->num_rows > 0) {
        // Створення масиву для збереження результатів
        $response = array();
        
        // Отримання результатів
        while ($row = $result->fetch_assoc()) {
            $response[] = json_decode($row['meta_value']);
                
        }
        
        // Відправка результатів у форматі JSON
        echo json_encode($response);
    } else {
        echo json_encode(array());
    }
    
    // Закриття з'єднання
    $conn->close();
    ?>
    