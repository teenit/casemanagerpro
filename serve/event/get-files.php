<?php
require_once '../config.php';

$data = json_decode(file_get_contents('php://input'));

$mike = false;
$mas = [];
$eventID = $data->eventID;
$key = $data->key;
$msql = "SELECT * FROM eventsmeta WHERE event_id='$eventID' AND meta_key='$key'";
$event = mysqli_query($conn, $msql);

while ($res = mysqli_fetch_array($event)) {
    $obj = new StdClass();
    $obj->{'id'} = $res['id'];
    $obj->{'fileInfo'} = json_decode($res['meta_value'], JSON_UNESCAPED_UNICODE);
    $mas[] = $obj;
   // echo json_encode($obj, JSON_UNESCAPED_UNICODE);
}


echo json_encode($mas);