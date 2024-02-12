<?php
require_once '../config.php';
$data = json_decode(file_get_contents('php://input'));
$id = $data->id;
$month = $data->month;
$year = $data->year;
$mas = [];
    $msql = "SELECT * FROM calendar WHERE (user_id=$id OR user_id=0) AND month=$month OR (year=$year || user_id=0)";

   $result = mysqli_query($conn, $msql);
   
   while ($res = mysqli_fetch_array($result)) {

    $user = new StdClass();
    $user->{"id"} = $res['id'];
    $user->{"value"} = json_decode($res['meta_value']);
    $user->{"date"} = $res['date'];
    $user->{'day'} = $res['day'];
    $user->{'month'} = $res['month'];
    $user->{'key'} = $res['meta_key'];
    $mas[] = $user;
 }
    echo json_encode($mas);
  mysqli_close($conn);
  exit;
