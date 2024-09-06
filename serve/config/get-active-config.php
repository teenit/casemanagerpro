<?php
require_once '../config.php';

// Підготовка SQL-запиту для отримання всіх активних конфігурацій
$sql = "SELECT config_key, config_value FROM config_meta WHERE is_active = 1";

// Перевірка, чи запит був успішно підготовлений
if (!$stmt = $conn->prepare($sql)) {
    echo json_encode(['status' => false, 'message' => 'Failed to prepare SQL statement: ' . $conn->error]);
    $conn->close();  // Закриваємо підключення, якщо є помилка
    exit;
}

// Виконання запиту
$stmt->execute();
$result = $stmt->get_result();

// Перевірка результатів
if ($result->num_rows > 0) {
    // Створюємо порожній об'єкт для конфігурацій
    $configs = [];
    
    // Перебираємо результати і будуємо об'єкт з ключами
    while ($row = $result->fetch_assoc()) {
        $configs[$row['config_key']] = $row['config_value'];
    }
    
    // Виводимо у форматі JSON
    echo json_encode(['status' => true, 'configs' => $configs]);
} else {
    // Виведення повідомлення, якщо немає активних конфігурацій
    echo json_encode(['status' => false, 'message' => 'No active configs found.']);
}

// Закриття запиту та підключення
$stmt->close();
$conn->close();
