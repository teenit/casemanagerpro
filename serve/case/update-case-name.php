<?php
require_once '../config.php';
require_once '../service/users.php';

// Декодування отриманих даних з фронтенду
$data = json_decode(file_get_contents('php://input'), true);
$case = getCaseById($data['case_id']);
// SQL запит для оновлення даних в таблиці
$sql = "UPDATE cases_new 
        SET name = ?, first_name = ?, last_name = ?, middle_name = ?
        WHERE id = ?";
$name = $data["last_name"]." ".$data["first_name"]." ".$data["middle_name"];

$trimName = trim($name);
// Підготовка запиту
$stmt = $conn->prepare($sql);

// Прив'язка параметрів та виконання запиту
$stmt->bind_param("ssssi", $trimName,  $data['first_name'], $data['last_name'], $data['middle_name'], $data['case_id']);
$stmt->execute();

// Перевірка успішності запиту та виведення відповідного повідомлення
if ($stmt->affected_rows > 0) {
    $user = getUserById($data['id']);
  
    $sendUserIds = [];
    if($case['user_id'] == $case['responsible_id']) {
        $sendUserIds = [$case['user_id'] ];
    } else {
        $sendUserIds = [$case['user_id'], $case['responsible_id'] ];
    }
    $nKey = 'change_case_name';
    $nValue = [
        'case_id' => $data['case_id'],
        'older_name' => $case['name'],
        'new_name' => $name,
        'user_id_changer' => $data['id'],
        'user_name_changer' => $user['userName'],
    ];
    $encodedValue = json_encode($nValue, JSON_UNESCAPED_UNICODE);

    _addNotification($sendUserIds, $nKey, $encodedValue);


    echo json_encode(array("status" => true, "message" => "Дані оновлено"));
} else {
    echo json_encode(array("status" => false, "message" => "Немає запису для оновлення"));
}

// Закриття з'єднання з базою даних
$stmt->close();
$conn->close();
?>
