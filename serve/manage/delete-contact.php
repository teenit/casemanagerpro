<?php
require_once '../config.php';
$data = json_decode(file_get_contents('php://input'));
if(!checkRight($data->id, 'deleteContact', $token,true)) exit;
$contact_id = $data->contactID;
$msql = "DELETE FROM phonebook WHERE id = $contact_id";
$contacts = mysqli_query($conn, $msql);
$obj = new StdClass();
if(mysqli_affected_rows($conn)>0) {
    $obj->{'text'} = "Контакт успішно видалено";
  } else {
    $obj->{'message'} = 'Помилка видалення контакту';
}
echo json_encode($obj, JSON_UNESCAPED_UNICODE);