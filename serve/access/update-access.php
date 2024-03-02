<?php
require_once '../config.php';

// Вхідні дані - масив об'єктів access
$data = json_decode(file_get_contents('php://input'));
$accessData = $data->access;
$accessId = $data->id_access;

// Підключення до бази даних
if ($conn->connect_error) {
    die("Помилка підключення до бази даних: " . $conn->connect_error);
}

if (isset($data->access) && isset($data->id_access)){
    // Підготовка SQL-запиту на оновлення
    $sql = "UPDATE access SET ";

    $setClauses = array();
    foreach ($accessData as $accessItem) {
        if (is_array($accessItem->value)) {
            // Якщо значення є масивом, перетворюємо його у формат JSON
            $value = json_encode($accessItem->value);
        } else {
            // Якщо значення не є масивом, використовуємо його без змін
            $value = $accessItem->value;
        }
        $key = $accessItem->key;
        
        // Формування кожного "SET" для оновлення
        $setClauses[] = "`$key` = '$value'";
    }

    // Додаємо кожен SET до SQL-запиту
    $sql .= implode(", ", $setClauses);

    // Додамо умову WHERE для конкретного ідентифікатора
    $sql .= " WHERE id = $accessId";

    // Виконання запиту
    if ($conn->query($sql) === TRUE) {
        echo "Записи оновлено успішно.";
    } else {
        // echo "Помилка оновлення записів: " . $conn->error;
        echo $sql;
    }

    // Закриваємо з'єднання з базою даних
    $conn->close();
}
?>
