<?php
require_once '../config.php';

$data = json_decode(file_get_contents('php://input'));
if(!checkRight($data->id, 'events', $data->token,true)) exit;
$msql = 'SELECT * FROM `events`';
  
$events = mysqli_query($conn, $msql);

$mas = [];


 while ($res = mysqli_fetch_array($events)) {
     $obj = new StdClass();
     $obj->{'id'} = $res["id"];
     $obj->{'userID'} = $res["user_id"];
     $obj->{'meta'} = json_decode($res['meta_value']);
     $obj->{'title'} = $res["title"];
     $obj->{'status'} = $res["status"];
     $obj->{'description'} = $res["description"];
     $obj->{'color'} = $res["color"];
     $obj->{'link'} = $res["link"];
   $mas[] = $obj;
}

mysqli_close($conn);

echo json_encode($mas);  