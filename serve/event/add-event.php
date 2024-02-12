<?php
require_once '../config.php';
$data = json_decode(file_get_contents('php://input'));
if(!checkRight($data->id, 'createEvent', $data->token,true)) exit;

$obj = new StdClass();
$obj->{'date'} = date("d-m-Y");
$obj->{'userName'} = $data->userName;
$userID = $data->id;
$meta_value = json_encode($obj, JSON_UNESCAPED_UNICODE);
$title = $data->title;
$link = $data->link;
$status = "true";
$description = $data->description;
$color = $data->color;

$msql = "INSERT INTO events (user_id,meta_value,title,status,description,color,link) VALUES ('$userID','$meta_value','$title','$status','$description','$color','$link')";
if (mysqli_query($conn, $msql)) {
    $evetnID = mysqli_insert_id($conn);
    $MESSAGE = "Створено нову подію №".$title;
    $TYPE = 'createdEvent';
    $LINK = $link;
    $USERID = 1;
        if(addNotification($USERID,$MESSAGE,$LINK,$TYPE)){
            echo $LINK;
        }
      
} else {
      echo "Error: " . $msql . "<br>" . mysqli_error($conn);
}




mysqli_close($conn);