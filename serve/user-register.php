<?php
require_once 'config.php';
require_once 'send-mail.php';

$data = json_decode(file_get_contents('php://input'));

$obj = new StdClass();

$userName = $data->userName;
$userAddress = $data->userAddress ?? null;
$userPhone = $data->userPhone;
$userType = $data->userType;
$userAnotherData = $data->userAnotherData ?? null;
$userEmail = $data->userEmail;
$password = md5($data->pass); // Хешування пароля за допомогою md5
$userWork = $data->userWork;
$level = json_encode($data->level);
$date = date("Y-m-d H:i:s");
$active = "false";

// Перевірка з'єднання з базою даних
if (!$conn) {
    $obj->{'message'} = "Помилка з'єднання з базою даних, спробуйте ще раз, або повторіть пізніше";
    $obj->{'marker'} = "red";
    echo json_encode($obj);
    exit;
}

// Підготовка запиту для перевірки наявності користувача
$stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
$stmt->bind_param("s", $userEmail);
$stmt->execute();
$res = $stmt->get_result()->fetch_assoc();

if ($res == null) {
    // Підготовка запиту для вставки нового користувача
    $stmt = $conn->prepare("INSERT INTO users (userName, address, phone, type, work, datas, active, password, email, level) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssssssss", $userName, $userAddress, $userPhone, $userType, $userWork, $userAnotherData, $active, $password, $userEmail, $level);

    if ($stmt->execute()) {
        $obj->{'message'} = "Користувача успішно додано до системи. На вказаний email ".$userEmail." відправлено інструкції для завершення реєстрації";
        $obj->{'marker'} = "green";
        $mes = "Дякуємо за реєстрацію. Очікуйте листа про активацію облікового запису";
        sendMail($userEmail, "Реєстрація в програмі Case Manager Pro", $mes);
    } else {
        $obj->{'message'} = "Помилка з'єднання з базою даних, спробуйте ще раз, або повторіть пізніше";
        $obj->{'marker'} = "red";
    }
    $stmt->close();
} else {
    $obj->{'message'} = "Неможливо зареєструвати користувача, перевірте правильність даних";
    $obj->{'marker'} = "red";
}

$conn->close();
echo json_encode($obj);
