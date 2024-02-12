<?php
require_once '../config.php';
$data = json_decode(file_get_contents('php://input'));
$id = $data->id;
$mas = [];
    $msql = "SELECT * FROM notification WHERE user_id=$id AND status='true' ORDER BY id DESC";

   $result = mysqli_query($conn, $msql);
   
   while ($res = mysqli_fetch_array($result)) {

    $user = new StdClass();
    $user->{"id"} = $res['id'];
    $user->{"value"} = json_decode($res['meta_value']);
    $user->{"date"} = $res['date'];
    $user->{"status"} = $res['status'];
    $mas[] = $user;
 }
    echo json_encode($mas);
  mysqli_close($conn);
  exit;
