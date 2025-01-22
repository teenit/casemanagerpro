<?php
require_once 'config.php';

$data = json_decode(file_get_contents('php://input'));
$token = $data->token;
$response = new stdClass();

// Перевірка, чи існує токен і чи він дійсний
$msql = "SELECT * FROM tokens WHERE token=?";
$stmt = $conn->prepare($msql);

if ($stmt) {
    $stmt->bind_param("s", $token);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $tokenData = $result->fetch_assoc();
        $currentTime = time();
        
        if ($currentTime > $tokenData['endtime']) {
            // Токен прострочено
            $response->message = "Токен прострочено";
            $response->status = false;
        } else {
            // Токен дійсний, отримання даних доступу користувача
            $user_id = $tokenData['userid'];
            $sql = "SELECT access.*, users.*, users.id AS user_id, usermeta.meta_value AS profile_img
                    FROM users 
                    JOIN access ON users.access = access.id 
                    LEFT JOIN usermeta ON usermeta.user_id = users.id AND usermeta.meta_key = 'user_profile_img'
                    WHERE users.id=?";
            $stmt = $conn->prepare($sql);

            if ($stmt) {
                $stmt->bind_param("i", $user_id);
                $stmt->execute();
                $result = $stmt->get_result();

                if ($result->num_rows > 0) {
                    $response->status = true;
                    $response->data = $result->fetch_assoc();
                    if ($response->data['profile_img']) {
                        $response->data['profile_img'] = json_decode($response->data['profile_img']);
                    }
                    unset($response->data['password']);
                } else {
                    $response->message = "Доступ до даних користувача не знайдено";
                    $response->status = false;
                }
                $stmt->close();
            } else {
                $response->message = "Помилка при підготовці запиту до бази даних";
                $response->status = false;
            }
        }
    } else {
        $response->message = "Токен не знайдено";
        $response->status = false;
    }
    $stmt->close();
} else {
    $response->message = "Помилка при підготовці запиту до бази даних";
    $response->status = false;
}

// Повернення JSON-відповіді
echo json_encode($response);
$conn->close();
?>
