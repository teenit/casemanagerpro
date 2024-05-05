<?php
require_once '../config.php';

// Отримуємо дані з POST-запиту у вигляді JSON
$data = json_decode(file_get_contents('php://input'));

// Витягуємо дані з об'єкта $data
$id = $data->id;
$userId = $data->user_id;
$access_id = $data->access_id;

// Підготовлений SQL-запит
$sql = "UPDATE users SET access = ? WHERE id = ?";

// Підготовка запиту до виконання
if ($stmt = mysqli_prepare($conn, $sql)) {
    // Прив'язуємо параметри до підготовленого запиту
    mysqli_stmt_bind_param($stmt, "si", $access_id, $userId);

    // Виконуємо підготовлений запит
    if (mysqli_stmt_execute($stmt)) {
        echo json_encode([
            "message" => "Права успішно встановлено",
            "status" => true
        ]);
    } else {
        echo json_encode([
            "message" => "Права не було встановлено",
            "status" => false
        ]);
    }

    // Закриваємо підготовлений запит
    mysqli_stmt_close($stmt);
} else {
    // Виводимо повідомлення про помилку, якщо підготовлений запит не вдалося підготувати
    echo json_encode([
        "message" => "Помилка підготовки запиту",
        "status" => false
    ]);
}

// Закриваємо підключення до бази даних
mysqli_close($conn);
?>
