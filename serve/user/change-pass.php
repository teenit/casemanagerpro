<?php
require_once '../config.php';
require_once '../send-mail.php';
$data = json_decode(file_get_contents('php://input'));
$newpass = $data->pass;
$olderPass = md5($data->olderPass);
$msql = 'SELECT * FROM `users` WHERE id='.$data->id;
//$msql = 'SELECT password FROM `users` WHERE id="2"';
$getPass = mysqli_query($conn, $msql);
$res = mysqli_fetch_array($getPass);

$obj = new StdClass();
    if($olderPass === $res['password']){
         $id = $res['user_id'];
         $email = $res['email'];
            $hash = md5($newpass);
            $rec = "UPDATE users SET password='$hash' WHERE id='$data->id'";
             if (mysqli_query($conn, $rec)) {
                $obj->{'message'} = "Новий пароль успішно встановлено";
                $obj->{'mail'} = $res['email'];
                $text = 'Зміна паролю';
                $mes = 'Вітаю, Ви успішно змінили пароль у програмі Case Manager. Якщо це були не Ви, зверніться до адміністратора та попросіть деактивувати Ваш акаунт';
                sendMail($email, "Встановлення нового паролю", $mes);
            } else {
                $obj->{'message'} = "Виникла помилка, спробуйте пізніше";
          }
    }else{
        $obj->{'message'} = "Помилка 007";
    }
echo json_encode($obj, JSON_UNESCAPED_UNICODE);
exit;