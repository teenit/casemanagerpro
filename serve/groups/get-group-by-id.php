<?php
require_once '../config.php';
require_once '../functions.php';
// Отримання даних з фронту
$data = json_decode(file_get_contents('php://input'), true);

// Перевірка чи отримано id групи з даних
if (isset($data['group_id'])) {
    $groupId = $data['group_id'];

    // SQL-запит для отримання даних з таблиць з перейменуванням полів id
    $query = "
        SELECT 
            g.*, 
            g.id as group_id,
            g.name as groupName,
            gc.*, 
            gc.id as group_connect_id,
            cn.*, 
            cn.id as case_id
        FROM groups g
        JOIN group_connect gc ON g.id = gc.group_id
        JOIN cases_new cn ON gc.client_id = cn.id
        WHERE g.id = ?
    ";

    // Підготовка та виконання запиту
    if ($stmt = $conn->prepare($query)) {
        $stmt->bind_param("i", $groupId); // Прив'язка параметру group_id
        $stmt->execute();
        
        // Отримання результатів запиту
        $result = $stmt->get_result();
        
        $members = [];
        while ($row = $result->fetch_assoc()) {
            $members[] = [
                'case_id' => $row['case_id'],
                'name' => $row['name'],
                'why' => $row['why'],
                'phone1' => decryptData($row['phone1'], $key),
                'phone2' => decryptData($row['phone2'], $key)
            ];
            $response = [
                'groupName' => $row['groupName'],
                'group_id' => $row['group_id'],
                'groupDescription' => $row['description'],
                'groupColor' => $row['color'],
                'groupCategories' => json_decode($row['categories']),
                'groupDateCreated' => $row['date_created']
            ];
        }
        $res = [
            'group' => $response,
            'members' => $members
        ];
     

        // Виведення результату у форматі JSON
        echo json_encode($res);
    } else {
        // Помилка підготовки запиту
        echo json_encode(['error' => 'Failed to prepare the SQL query.', 'status' => false]);
    }
} else {
    // Помилка відсутності id групи
    echo json_encode(['error' => 'Group ID not provided.', 'status' => false]);
}
?>
