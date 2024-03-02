<?php
require_once '../config.php';

// Отримуємо дані, що передані через POST запит
$data = json_decode(file_get_contents('php://input'));

// Перевіряємо, чи вказано ключ для пошуку в базі даних
if(isset($data->meta_key)){
    // Отримуємо значення ключа для пошуку
    $prf = $data->meta_key;

    // Формуємо запит до бази даних з використанням параметризованих запитів
    $sql = "SELECT meta_id, meta_value FROM usermeta WHERE user_id = ? AND meta_key = ?";
    
    // Підготовлюємо запит до виконання
    $stmt = $conn->prepare($sql);
    
    // Передаємо значення параметрів запиту
    $stmt->bind_param("is", $user_id, $prf);
    
    // Задаємо значення параметрів
    $user_id = 1;
    
    // Виконуємо запит
    $stmt->execute();
    
    // Отримуємо результат запиту
    $result = $stmt->get_result();
    
    // Перевіряємо результат запиту
    if ($result) {
        $data = array();
        while ($row = $result->fetch_assoc()) {
            // Додавання id та значення meta_value до масиву $data
            $data[] = array(
                "id" => $row["meta_id"],
                "value" => json_decode($row["meta_value"])
            );
        }
        // Формування відповіді
        $response = array("mas" => $data);
    } else {
        // Якщо виникла помилка запиту до бази даних, повертаємо повідомлення про помилку
        $response = array("error" => "Помилка запиту до бази даних: " . $conn->error);
    }
} else {
    // Якщо не вказано ключ для пошуку в базі даних, повертаємо повідомлення про помилку
    $response = array("error" => "Не вказано ключ для пошуку в базі даних");
}

// Повертаємо результат у вигляді JSON
echo json_encode($response, JSON_UNESCAPED_UNICODE);

// Закриваємо з'єднання з базою даних
$stmt->close();
$conn->close();

// Завершуємо виконання скрипту
exit;
?>
