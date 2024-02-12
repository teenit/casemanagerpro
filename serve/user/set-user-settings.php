<?php
require_once '../config.php';
$data = json_decode(file_get_contents('php://input'));
$id = $data->id;
$userId = $data->userId;
$obj = new StdClass();
if(!checkRight($data->id, 'specificationUsers', $data->token,true)) exit;
$settings = $data->settings;

$settings = json_encode($settings);

    $sql = "UPDATE users SET level = '$settings' WHERE id=$userId";
   // $sql = "UPDATE cases SET plan = '$resPlan' WHERE id = '$id'";
   
    if (mysqli_query($conn, $sql)) {
        $obj->{'message'} = "Права успішно встановлено";
        echo json_encode($obj);
    } else {
        $obj->{'message'} = "Error: " . $sql . "<br>" . mysqli_error($conn);
        echo json_encode($obj);
  }
    mysqli_close($conn);

  exit;
