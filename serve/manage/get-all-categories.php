<?php
require_once '../config.php';

// Створюємо масив для зберігання даних відповіді
$response = array();
$case = [];
$case_helps = [];
$groups = [];
// Перевіряємо, чи отримане значення categoryKey
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Перевіряємо з'єднання
    if ($conn->connect_error) {
        $response['status'] = false;
        $response['message'] = "Помилка з'єднання: " . $conn->connect_error;
    } else {
        // Підготовлюємо SQL запит
        $sql = "SELECT id, name, description, color, category_key FROM categories";
        
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
                if ($row['category_key'] == 'case') {
                    $case[] = $row;
                }
                if ($row['category_key'] == 'case_helps') {
                    $case_helps[$row["id"]] = $row;
                }
                if ($row['category_key'] == 'groups') {
                    $groups[$row["id"]] = $row;
                }
                //$rows[$row["id"]] = $row;
            }
            $response['status'] = true;
            $response['message'] = "Записи знайдено";
            $response['data'] = $rows;
            $response['case'] = $case;
            $response['help'] = $case_helps;  
            $response['groups'] = $groups;  
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
