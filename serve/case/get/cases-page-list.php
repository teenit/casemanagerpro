<?php
require_once '../../config.php';
require_once '../../functions.php';

// Отримуємо дані з POST-запиту у вигляді JSON
$data = json_decode(file_get_contents('php://input'));

// Перевірка наявності токену
if (!$data->token) exit;

// Запит до бази даних для вибору потрібних даних з обох таблиць
$sql = '
SELECT 
    cn.id, 
    cn.name, 
    cn.phone1, 
    cn.phone2, 
    cn.happy_bd, 
    cn.email, 
    cd.id AS data_id,
    cd.categories,
    cd.contract_date,
    cd.contract_number,
    cd.address_live,
    cm.meta_value AS case_profile_img
FROM 
    cases_new cn 
JOIN 
    cases_data cd 
ON 
    cn.id = cd.case_id
LEFT JOIN
    casemeta cm
ON
    cn.id = cm.case_id AND cm.meta_key = "case_profile_img"

';

// Виконання запиту
$access = mysqli_query($conn, $sql);

// Масив для зберігання результатів
$mas = [];

// Ітерація через результати запиту та створення об'єктів для збереження даних
while ($res = mysqli_fetch_assoc($access)) {
    $obj = new stdClass();
    $obj->{'id'} = $res['id'];
    $obj->{'name'} = $res['name'];
    $obj->{'phone1'} = decryptData($res['phone1'], $key);
    $obj->{'phone2'} = decryptData($res['phone2'], $key);
    $obj->{'email'} = decryptData($res['email'], $key);
    $obj->{'data_id'} = $res['data_id'];
    $obj->{'contractDate'} = $res['contract_date'];
    $obj->{'contractNumber'} = $res['contract_number'];
    $obj->{'addressLive'} = $res['address_live'];
    $obj->{'happyBD'} = $res['happy_bd'];
    $obj->{'categories'} = json_decode($res['categories']);
    $obj->{'profileImg'} = json_decode($res['case_profile_img']);

   // Додавання об'єкта до масиву
   $mas[] = $obj;
}

// Закриття підключення до бази даних
mysqli_close($conn);

// Вивід результату у форматі JSON
echo json_encode($mas);
?>
