<?php
require_once '../config.php';

// Выполняем SQL-запрос для получения общего количества записей из таблицы cases_new
$sql_count = "SELECT COUNT(*) as count FROM cases_new";
$result_count = $conn->query($sql_count);

// Проверяем результат запроса
if ($result_count === false) {
    die('Ошибка запроса: ' . $conn->error);
}

// Извлекаем количество записей
$row_count = $result_count->fetch_assoc();
$count = $row_count['count'];

// Выполняем SQL-запрос для получения всех значений из колонки categories таблицы cases_data
$sql_categories = "SELECT categories FROM cases_data";
$result_categories = $conn->query($sql_categories);

// Проверяем результат запроса
if ($result_categories === false) {
    die('Ошибка запроса: ' . $conn->error);
}

// Инициализируем массив для подсчета категорий
$category_counts = [];

// Обрабатываем каждую строку результата
while ($row_categories = $result_categories->fetch_assoc()) {
    $categories = json_decode($row_categories['categories'], true);
    if (is_array($categories)) {
        foreach ($categories as $category) {
            if (isset($category_counts[$category])) {
                $category_counts[$category]++;
            } else {
                $category_counts[$category] = 1;
            }
        }
    }
}

// Устанавливаем заголовки для JSON-ответа
header('Content-Type: application/json');

// Отправляем данные в виде JSON
echo json_encode(['count' => $count, 'category_counts' => $category_counts]);
?>
