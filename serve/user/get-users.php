<?php
require_once '../config.php';
$data = json_decode(file_get_contents('php://input'));

$msql = "SELECT * FROM `users`";

$users = mysqli_query($conn, $msql);

$mas = [];



while ($res = mysqli_fetch_array($users)) {

    $user = new StdClass();
    $user->{"id"} = $res['id'];
    $user->{"userName"} = $res['userName'];
    $user->{"active"} = $res['active'];
    $user->{"access"} = $res['access'];
    $user->{"type"} = $res['type'];
    $user->{"phone"} = $res['phone'];
     $mas[] = $user;
 }
 

echo json_encode($mas);
