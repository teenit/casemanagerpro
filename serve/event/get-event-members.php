<?php
require_once '../config.php';

$data = json_decode(file_get_contents('php://input'));

$mike = false;
if(!checkRight($data->id, 'getEventMembers', $token, true)) exit;
$mas = [];
$eventID = $data->eventID;
$key = $data->key;
$msql = "SELECT * FROM eventsmeta WHERE event_id='$eventID' AND meta_key='$key'";
$event = mysqli_query($conn, $msql);

while ($res = mysqli_fetch_array($event)) {
    $mas[] = json_decode($res['meta_value']);
}


echo json_encode($mas);