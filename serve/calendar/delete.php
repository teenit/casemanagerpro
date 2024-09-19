<?php
require_once '../config.php';

$data = json_decode(file_get_contents('php://input'));

// Перевіряємо, чи отримані необхідні дані
if (isset($data->id) && isset($data->calendar_id)) {
    $user_id = (int)$data->id;
    $calendar_id = (int)$data->calendar_id;

    // Створюємо SQL-запит для видалення запису
    $query = "DELETE FROM calendar WHERE user_id = ? AND id = ?";

    // Готуємо запит
    if ($stmt = $conn->prepare($query)) {
        // Прив'язуємо змінні
        $stmt->bind_param("ii", $user_id, $calendar_id);

        // Виконуємо запит
        if ($stmt->execute()) {
            echo json_encode(['status' => true, 'message' => 'Запис успішно видалено.']);
        } else {
            echo json_encode(['status' => false, 'message' => 'Помилка при виконанні запиту.']);
        }

        // Закриваємо підготовлений запит
        $stmt->close();
    } else {
        echo json_encode(['status' => true, 'message' => 'Помилка підготовки запиту.']);
    }
} else {
    echo json_encode(['status' => false, 'message' => 'Неправильні або неповні дані.']);
}

// Закриваємо з'єднання з базою даних
$conn->close();
?>
