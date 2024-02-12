<?php
require_once '../config.php';
$obj = new StdClass();
$obj->{'message'} = "У вас немає прав доступу до цього кейсу";
$data = json_decode(file_get_contents('php://input'));
$userId = $data->userId;
$token = $data->token;
$id = $data->id;
$userNewId = $data->switchId;
/*$userId = 2;
$id = 1;
$userNewId = 3;*/
if(!checkRight($userId, 'switchCase', $token, true)) exit;

$msql = "SELECT * FROM cases WHERE id=".$data->id;
$case = mysqli_query($conn, $msql);

$res = mysqli_fetch_assoc($case);
$contact = json_decode($res['contact']);
$contact->userId = $userNewId;
$contact = json_encode($contact, JSON_UNESCAPED_UNICODE);
$sqlTo = "SELECT * FROM users WHERE id='$userNewId'";
$sqlWho = "SELECT * FROM users WHERE id='$userId'";
$sql = "UPDATE cases SET contact = '$contact' WHERE id=".$id;



$resTo = mysqli_fetch_assoc(mysqli_query($conn, $sqlTo));
$resWho = mysqli_fetch_assoc(mysqli_query($conn, $sqlWho));

$mesAdmin = "Кейс № ".$id." передано користувачу ".$resTo['userName']. "від користувача ".$resWho['userName'];
$mesWho = "Вам передано кейс № ".$id." від користувача ".$resWho['userName'];
$mesTo = "Ви успішно передали кейс № ".$id." користувачу ".$resTo['userName'];
$LINK = "/case?".$id;
$TYPE = "switchCase";

if(mysqli_query($conn, $sql)){
    addNotification(1,$mesAdmin,$LINK,$TYPE);
    addNotification($userNewId,$mesWho,$LINK,$TYPE);
    addNotification($userId,$mesTo,$LINK,$TYPE);
    echo json_encode(true);
}else{
     echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}