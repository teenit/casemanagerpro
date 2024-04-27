<?php
require_once '../config.php';

// Створюємо масив для зберігання даних відповіді
$response = array();

// Перевіряємо, чи отримане значення categoryKey
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Перевіряємо з'єднання
    if ($conn->connect_error) {
        $response['status'] = false;
        $response['message'] = "Помилка з'єднання: " . $conn->connect_error;
    } else {
        // Підготовлюємо SQL запит
        $sql = "SELECT id, name, description, color FROM categories";
        
        // Підготовлюємо вираз
        $stmt = $conn->prepare($sql);

        // Виконуємо запит
        $stmt->execute();

        // Отримуємо результати запиту
        $result = $stmt->get_result();

        // Перевіряємо, чи є результати
        if ($result->num_rows > 0) {
            // Перетворюємо результат в масив
            $rows = array();
            while ($row = $result->fetch_assoc()) {
                $rows[] = $row;
            }
            $response['status'] = true;
            $response['message'] = "Записи знайдено";
            $response['data'] = $rows;
        } else {
            $response['status'] = false;
            $response['message'] = "Записи не знайдено";
        }

        // Закриваємо вираз
        $stmt->close();
    }
} else {
    $response['status'] = false;
    $response['message'] = "Ключ категорії не наданий";
}

// Повертаємо відповідь у форматі JSON
echo json_encode($response);
?>
