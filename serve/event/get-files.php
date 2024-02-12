<?php
require_once '../config.php';

$data = json_decode(file_get_contents('php://input'));

$mike = false;
if(!checkRight($data->id, 'getEventFile', $token, true)) exit;
$mas = [];
$eventID = $data->eventID;
$key = $data->key;
$msql = "SELECT * FROM eventsmeta WHERE event_id='$eventID' AND meta_key='$key'";
$event = mysqli_query($conn, $msql);

while ($res = mysqli_fetch_array($event)) {
    $obj->{'docs'} = json_decode($res['meta_value'], JSON_UNESCAPED_UNICODE);
    $obj->{'id'} = $res['id'];
    echo json_encode($obj, JSON_UNESCAPED_UNICODE);
    exit;
}


echo json_encode($mas);