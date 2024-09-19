<?php
require_once '../config.php';
require_once '../functions.php';

$data = json_decode(file_get_contents('php://input'));
// Виклик функції для додавання події до календаря
if(addEventToCalendar($conn, $data)) {
    echo json_encode([
        'status' => true
    ]);
} else {
    echo json_encode([
        'status' => false
    ]);
}