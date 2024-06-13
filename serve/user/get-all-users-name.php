<?php
require_once '../config.php';

// Получаем входные данные
$data = json_decode(file_get_contents('php://input'));

// SQL-запрос для получения всех пользователей
$sql = "SELECT * FROM `users`";

// Выполняем запрос
$result = mysqli_query($conn, $sql);

// Инициализируем массив для хранения данных пользователей
$usersArray = [];

// Обрабатываем результаты запроса
while ($row = mysqli_fetch_assoc($result)) {
    $usersArray[$row['id']] = [
        'id' => $row['id'],
        'userName' => $row['userName']
    ];
}

// Возвращаем данные в формате JSON
echo json_encode($usersArray);
?>
