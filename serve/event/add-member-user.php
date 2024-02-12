<?php
require_once '../config.php';
$data = json_decode(file_get_contents('php://input'));
if(!checkRight($data->id, 'addEventMember', $data->token,true)) exit;

$obj = new StdClass();
$obj->{'date'} = date("d-m-Y");
$obj->{'userName'} = $data->userName;
$obj->{'userIDCreated'} = $data->id;
$obj->{'eventID'} = $data->eventID;
$obj->{'status'} = "active";
$obj->{'deleted'} = 'false';
$obj->{'phone'} = $data->phone;
$obj->{'userID'} = $data->userID;
$obj->{'position'} = $data->position;
$obj->{'commentar'} = "";
$obj->{'photo'} = "";
$evetnID = $data->eventID;
$userID = $data->id;
$key = "eventMemberUser";
$obj = json_encode($obj, JSON_UNESCAPED_UNICODE);
$msql = "INSERT INTO eventsmeta (event_id,meta_key,meta_value,user_id) VALUES ('$evetnID','$key','$obj','$userID')";
if (mysqli_query($conn, $msql)) {
    echo "true";
} else {
      echo "Error: " . $msql . "<br>" . mysqli_error($conn);
}




mysqli_close($conn);