<?php
require_once '../config.php';

// Декодування отриманих даних з фронтенду
$data = json_decode(file_get_contents('php://input'), true);
$user_id = $data['id'];
$page = isset($data['page']) ? (int)$data['page'] : 1; // Номер сторінки, за замовчуванням 1
$limit = isset($data['limit']) ? (int)$data['limit'] : 10; // Кількість сповіщень на сторінку, за замовчуванням 10

// Обчислення зсуву (offset) для пагінації
$offset = ($page - 1) * $limit;

// Отримання поточної дати та завтрашньої дати у форматі YYYY-MM-DD
$today_date = new DateTime();
$today_month_day = $today_date->format('m-d');
$tomorrow_date = (clone $today_date)->modify('+1 day');
$tomorrow_month_day = $tomorrow_date->format('m-d');

// Підготовка SQL-запиту з пагінацією, починаючи з останнього
$sql = "SELECT * FROM `notification` WHERE user_id = ? ORDER BY date_created DESC LIMIT ? OFFSET ?";

// Підготовка запиту
$stmt = $conn->prepare($sql);

// Перевірка, чи запит був успішно підготовлений
if (!$stmt) {
    die("Помилка підготовки запиту: " . $conn->error);
}

// Прив'язка параметрів
$stmt->bind_param("iii", $user_id, $limit, $offset);

// Виконання запиту
$stmt->execute();

// Отримання результату
$result = $stmt->get_result();

// Обробка результату
$notifications = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $notifications[] = [
            'notification_id' => $row['id'],
            'date_created' => $row['date_created'],
            'date_read' => $row['date_read'],
            'meta_key' => $row['meta_key'],
            'meta_value' => json_decode($row['meta_value'], JSON_UNESCAPED_UNICODE),
            'user_id' => $row['user_id']
        ];
    }
}

// Додатковий запит до таблиці cases_new, виконується тільки якщо page дорівнює 1
$cases = [];
if ($page === 1) {
    $cases_sql = "SELECT * FROM `cases_new` 
                  WHERE (user_id = ? OR responsible_id = ?) 
                  AND DATE_FORMAT(happy_bd, '%m-%d') IN (?, ?)";
    $cases_stmt = $conn->prepare($cases_sql);

    // Перевірка, чи запит був успішно підготовлений
    if (!$cases_stmt) {
        die("Помилка підготовки запиту: " . $conn->error);
    }

    // Оновлення прив'язки параметрів
    $cases_stmt->bind_param("iiss", $user_id, $user_id, $today_month_day, $tomorrow_month_day);
    $cases_stmt->execute();
    $cases_result = $cases_stmt->get_result();

    if ($cases_result->num_rows > 0) {
        while ($row = $cases_result->fetch_assoc()) {
            $happy_bd_date = new DateTime($row['happy_bd']);
            $interval = $today_date->diff($happy_bd_date);
            $years = $interval->y; // Кількість років

            $cases[] = [
                'case_id' => $row['id'],
                'user_id' => $row['user_id'],
                'responsible_id' => $row['responsible_id'],
                'happy_day' => $row['happy_bd'],
                'case_name' => $row['name'],
                'meta_key' => 'birthday',
                'when' => $happy_bd_date->format('m-d') == $tomorrow_month_day ? 'ЗАВТРА' : 'СЬОГОДНІ',
                'years' => $years // Кількість років
            ];
        }
    }
}

// Об'єднання масивів тільки якщо page дорівнює 1
$combined = $page === 1 ? array_merge($cases, $notifications) : $notifications;

// Виведення результату у форматі JSON
echo json_encode($combined);
?>
