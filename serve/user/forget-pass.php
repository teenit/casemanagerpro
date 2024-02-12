<?php
require_once '../config.php';
require_once '../send-mail.php';
$data = json_decode(file_get_contents('php://input'));
$email = $data->email;
$msql = "SELECT * FROM `users` WHERE email='$email'";

$users = mysqli_query($conn, $msql);
$obj = new StdClass();
while ($res = mysqli_fetch_array($users)) {
    $id = $res['id'];
    $hash = md5($email. time());
    $rec = "INSERT INTO usermeta (user_id, meta_key, meta_value) VALUES('$id','recovery_pass','$hash') ON DUPLICATE KEY UPDATE meta_key='recovery_pass',meta_value='$hash'";
     if (mysqli_query($conn, $rec)) {
        $url = 'http' . ((isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off') ? 's' : '') . '://';
        $link = $url.$_SERVER['SERVER_NAME']."/recovery?".$hash;
        $text = '<a href="'.$link.'">Відновити пароль</a>';
        $mes = $res['userName'].' вами запрошено відновлення паролю у програмі Case Manager натисніть  <b>'.$text.'</b> Якщо це були не Ви, проігноруйте дане повідомлення';
        sendMail($email, "Відновлення доступу до програми", $mes);
        $obj->{'message'} = "На вказану електронну адресу відправлено письмо з деталями відновлення паролю";
        echo json_encode($obj, JSON_UNESCAPED_UNICODE);
        exit;
    } else {
        $obj->{'message'} = "Виникла помилка, спробуйте пізніше";
        echo json_encode($obj, JSON_UNESCAPED_UNICODE);
        exit;
  }
}
$obj->{'message'} = "Виникла помилка, спробуйте пізніше";
echo json_encode($obj, JSON_UNESCAPED_UNICODE);
exit;