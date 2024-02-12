<?php
require_once '../config.php';
$data = json_decode(file_get_contents('php://input'));
if(!checkRight($data->id, 'addEventPlan', $data->token,true)) exit;

$obj = new StdClass();
$obj->{'date'} = date("d-m-Y");
$obj->{'userName'} = $data->userName;
$obj->{'userIDCreated'} = $data->id;
$obj->{'eventID'} = $data->eventID;
$obj->{'status'} = "active";
$obj->{'deleted'} = 'false';
$obj->{'title'} = $data->title;
$obj->{'dateStart'} = $data->dateStart;
$obj->{'dateEnd'} = $data->dateEnd;
$obj->{'timeStart'} = $data->timeStart;
$obj->{'timeEnd'} = $data->timeEnd;
$obj->{'description'} = $data->description;
$obj->{'feedBack'} = $data->feedBack;;
$evetnID = $data->eventID;
$userID = $data->id;
$key = "eventPlan";
$obj = json_encode($obj, JSON_UNESCAPED_UNICODE);
$msql = "INSERT INTO eventsmeta (event_id,meta_key,meta_value,user_id) VALUES ('$evetnID','$key','$obj','$userID')";
if (mysqli_query($conn, $msql)) {
    echo "true";
} else {
      echo "Error: " . $msql . "<br>" . mysqli_error($conn);
}




mysqli_close($conn);