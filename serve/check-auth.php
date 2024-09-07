<?php
require_once 'config.php';

$data = json_decode(file_get_contents('php://input'));
$token = $data->token;
$obj = new StdClass();

// Підготовлений запит для перевірки токена
$msql = "SELECT * FROM tokens WHERE token=?";
$stmt = $conn->prepare($msql);
if ($stmt) {
    $stmt->bind_param("s", $token);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $res = $result->fetch_assoc();
        $start = time();
        $end = $res["endtime"];
        
        if ($start > $end) {
            // Токен прострочено
            $obj->{'message'} = "Токен прострочено";
            $obj->{'status'} = false;
        } else {
            // Токен дійсний
            $user_id = $res['userid'];
            $sql = "SELECT access.* 
                    FROM users 
                    JOIN access ON users.access = access.id 
                    WHERE users.id=?";
            $stmt = $conn->prepare($sql);

            if ($stmt) {
                $stmt->bind_param("i", $user_id);
                $stmt->execute();
                $result = $stmt->get_result();

                if ($result->num_rows > 0) {
                    $obj->{'status'} = true;
                    $obj->{'data'} = $result->fetch_assoc();
                } else {
                    $obj->{'message'} = "Доступ до даних користувача не знайдено";
                    $obj->{'status'} = false;
                }
                $stmt->close();
            } else {
                $obj->{'message'} = "Помилка при підготовці запиту до бази даних";
                $obj->{'status'} = false;
            }
        }
    } else {
        $obj->{'message'} = "Токен не знайдено";
        $obj->{'status'} = false;
    }
    $stmt->close();
} else {
    $obj->{'message'} = "Помилка при підготовці запиту до бази даних";
    $obj->{'status'} = false;
}

echo json_encode($obj);
$conn->close();
?>
