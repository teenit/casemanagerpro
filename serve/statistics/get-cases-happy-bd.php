<?php
require_once '../config.php'; // Подключение файла конфигурации

// SQL-запрос для получения данных
$sql = "SELECT happy_bd
        FROM cases_new
        WHERE happy_bd <> '0000-00-00'
        ORDER BY MONTH(happy_bd), DAY(happy_bd)";

$result = $conn->query($sql);

if (!$result) {
    die('Ошибка выполнения запроса: ' . $conn->error);
}

// Инициализация массива для группировки по месяцам
$groupedByMonths = array_fill(1, 12, ['dates' => [], 'count' => 0]);

// Группировка данных по месяцам
while ($row = $result->fetch_assoc()) {
    $date = $row['happy_bd'];
    $month = (int)date('m', strtotime($date));
    $groupedByMonths[$month]['dates'][] = $date;
    $groupedByMonths[$month]['count']++;
}

// Освобождение результата
$result->free();

// Закрытие соединения
$conn->close();

// Установка заголовка для JSON-ответа
header('Content-Type: application/json');

// Вывод данных в формате JSON
echo json_encode($groupedByMonths, JSON_PRETTY_PRINT);
?>
