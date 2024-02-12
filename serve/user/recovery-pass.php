<?php
require_once '../config.php';
require_once '../send-mail.php';
$data = json_decode(file_get_contents('php://input'));
$newpass = $data->pass;
$hash = $data->hash;
$msql = "SELECT * FROM `usermeta` WHERE meta_key='recovery_pass' AND meta_value='$hash'";

$recovery_pass = mysqli_query($conn, $msql);
$obj = new StdClass();
while ($res = mysqli_fetch_array($recovery_pass)) {
    if($res['meta_value'] === $hash){
    $id = $res['user_id'];
    $hash = md5($newpass);
    $rec = "UPDATE users SET password='$hash' WHERE id='$id'";
     if (mysqli_query($conn, $rec)) {
        $obj->{'message'} = "Новий пароль успішно встановлено";
        $obj->{'good'} = true;
    } else {
        $obj->{'message'} = "Виникла помилка, спробуйте пізніше";
        $obj->{'good'} = false;
  }
    }
}
echo json_encode($obj, JSON_UNESCAPED_UNICODE);
exit;