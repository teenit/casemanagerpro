<?php
require_once '../config.php';
require_once '../send-mail.php';
$data = json_decode(file_get_contents('php://input'));

if(!checkRight($data->id, $data->keyt, $data->token,true)) exit;

$id = $data->id;
$userId = (int) $data->userId;
$activate = $data->activate;
$text = $data->text;
    $sql = "UPDATE users SET active = '$activate' WHERE id=$userId";


   
    if (mysqli_query($conn, $sql)) {
        //echo "dood";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
  }




$msql = "SELECT * FROM `users` WHERE id='$userId'";

$users = mysqli_query($conn, $msql);

while ($res = mysqli_fetch_array($users)) {
    
    
    $mes = $res['userName'].' ваш обліковий запис у програмі Case Manager було <b>'.$text.'</b>';
    sendMail($res['email'], "Активація облікового запису", $mes);
    $a = $res['email'];
       // $obj->{'userName'} = $res['userName'];
        //$obj->{'active'} = $res['active'];
        //$obj->{'email'} = $res['email'];
        //$obj->{'id'} = $res['id'];
}

echo json_encode($users);

  exit;