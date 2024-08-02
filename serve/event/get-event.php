<?php
require_once '../config.php';

$data = json_decode(file_get_contents('php://input'));
$obj = new StdClass();
$mike = false;
if(!checkRight($data->id, 'getEvent', $token, true)) exit;
$link = $data->link;
$event_id = $data->event_id;
$msql = "SELECT * FROM events WHERE id='$event_id'";
$event = mysqli_query($conn, $msql);
$res = mysqli_fetch_assoc($event);
if($res['user_id'] == null){
    $obj->{'message'} = "404";
    echo json_encode($obj);
    exit;
}
if($res['user_id'] == $data->id || !checkRight($data->id, 'accessEvent', $token, true)){
    $mike = true;
}else{
    $sql = "SELECT * FROM eventsmeta WHERE event_id=".$res['id']."AND meta_key=member AND user_id=".$data->id;
    $like = mysqli_query($conn, $msql);
    $result = mysqli_fetch_assoc($like);
    if($result["meta_value"] == null){
        $obj->{'message'} = "Доступ до івенту заборонено";
    }else{
        $mike = true;
    }
}

if($mike == true){
    $obj->{'id'} = $res['id'];
    $obj->{'userID'} = $res['user_id'];
    $obj->{'value'} = json_decode($res['meta_value']);
    $obj->{'title'} = $res['title'];
    $obj->{'status'} = $res['status'];
    $obj->{'description'} = $res['description'];
    $obj->{'color'} = $res['color'];
}


echo json_encode($obj);
exit;