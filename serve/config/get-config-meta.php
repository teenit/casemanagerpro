<?php
require_once '../config.php';

// Підготовка SQL-запиту для отримання всіх активних конфігурацій
$sql = "SELECT user_id, config_key, config_value FROM config_meta WHERE is_active = 1";
$stmt = $conn->prepare($sql);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Отримання всіх активних конфігурацій
    $configs = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode(['success' => true, 'configs' => $configs]);
} else {
    echo json_encode(['success' => false, 'message' => 'No active configs found.']);
}

$stmt->close();
$conn->close();
