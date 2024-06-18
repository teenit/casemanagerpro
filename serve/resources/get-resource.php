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
            $resource = json_decode($row['meta_value']);
            $resource->{'resource_id'} = $row['id'];
            $resource->{'user_id'} = $row['user_id'];

            $response[] = $resource;
                
        }
        
        // Відправка результатів у форматі JSON
        echo json_encode($response);
    } else {
        echo json_encode(array());
    }
    
    // Закриття з'єднання
    $conn->close();
    ?>
    