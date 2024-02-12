<?php
require_once '../config.php';

$data = json_decode(file_get_contents('php://input'));
if(!checkRight($data->id, 'editContact', $token,true)) exit;
$date = date("d-m-Y");
$info = json_encode($data->info, JSON_UNESCAPED_UNICODE);
$cat = json_encode($data->category, JSON_UNESCAPED_UNICODE);
$phones = json_encode($data->phones, JSON_UNESCAPED_UNICODE);
$contact_id = $data->contactID;
$msql = "UPDATE phonebook SET phones = '$phones', pib = '$data->pib', info = '$info', category = '$cat' WHERE id = '$contact_id'";

$obj = new StdClass();

if (mysqli_query($conn, $msql)) {
    $obj->{'text'} = "Контакт успішно відредаговано";
  } else {
    $obj->{'message'} = 'Помилка редагування контакту';
}
echo json_encode($obj, JSON_UNESCAPED_UNICODE);