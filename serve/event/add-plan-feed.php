<?php
require_once '../config.php';
$data = json_decode(file_get_contents('php://input'));
if(!checkRight($data->id, 'addEventFeed', $data->token,true)) exit;
$sql = "SELECT * FROM eventsmeta WHERE id='$data->planID'";
$add = mysqli_query($conn, $sql);

$res = mysqli_fetch_assoc($add);
if($res['id'] == null){
    $obj->{'message'} = "404";
    echo json_encode($obj);
    exit;
}
$lak = json_decode($res['meta_value'], JSON_UNESCAPED_UNICODE);

$obj = new StdClass();
$obj->{'date'} = date("d-m-Y");
$obj->{'userIDCreated'} = $data->id;

$obj->{'status'} = "active";
$obj->{'title'} = $data->title;
$obj->{'deleted'} = 'false';

$obj->{'commentar'} = "";
$obj->{'photo'} = "";

$obj->{'value'} = $data->value;

$lak['feedBack'][] = $obj;
$lak = json_encode($lak, JSON_UNESCAPED_UNICODE);
$msql = "UPDATE eventsmeta SET meta_value = '$lak' WHERE id = '$data->planID'";
if (mysqli_query($conn, $msql)) {
    echo "true";
} else {
      echo "Error: " . $msql . "<br>" . mysqli_error($conn);
}




mysqli_close($conn);