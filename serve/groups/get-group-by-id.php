<?php
require_once '../config.php';
require_once '../functions.php';

// Отримання даних з фронтенду
$data = json_decode(file_get_contents('php://input'), true);

// Перевірка наявності id групи у вхідних даних
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
        LEFT JOIN group_connect gc ON g.id = gc.group_id
        LEFT JOIN cases_new cn ON gc.client_id = cn.id
        WHERE g.id = ?
    ";

    // Підготовка та виконання запиту
    if ($stmt = $conn->prepare($query)) {
        $stmt->bind_param("i", $groupId); // Прив'язка параметру group_id
        $stmt->execute();
        
        // Отримання результатів запиту
        $result = $stmt->get_result();
        
        $members = [];
        $response = [];
        $firstRow = true;

        while ($row = $result->fetch_assoc()) {
            // Заповнення інформації про учасників, якщо вони є
            if ($row['case_id']) {
                $members[] = [
                    'case_id' => $row['case_id'],
                    'name' => $row['middle_name'] ." ". $row['first_name'] ." ". $row['last_name'],
                    'why' => $row['why'],
                    'phone1' => decryptData($row['phone1'], $key),
                    'phone2' => decryptData($row['phone2'], $key)
                ];
            }

            // Заповнення інформації про групу (лише один раз)
            if ($firstRow) {
                $response = [
                    'groupName' => $row['groupName'],
                    'group_id' => $row['group_id'],
                    'groupDescription' => $row['description'],
                    'groupColor' => $row['color'],
                    'groupCategories' => json_decode($row['categories']),
                    'groupDateCreated' => $row['date_created'],
                    'is_favourite' => $row['is_favourite']
                ];
                $firstRow = false;
            }
        }

        // Формування остаточного результату
        $res = [
            'group' => $response,
            'members' => $members
        ];

        // Виведення результату у форматі JSON
        echo json_encode($res);
    } else {
        // Помилка підготовки запиту
        echo json_encode(['error' => 'Не вдалося підготувати SQL-запит.', 'status' => false]);
    }
} else {
    // Помилка відсутності id групи
    echo json_encode(['error' => 'Не надано ID групи.', 'status' => false]);
}
?>
