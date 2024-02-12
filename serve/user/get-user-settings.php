<?php
require_once '../config.php';
$data = json_decode(file_get_contents('php://input'));
$id = $data->id;
    $prf = 'level';
    $msql = "SELECT meta_value FROM usermeta WHERE user_id=$id AND meta_key='$prf'";

    $result = $conn->query($msql);
    $row = $result->fetch_assoc();
    
    if($row == null){
        echo json_encode(false);
    }else{
        echo $row["meta_value"];
    }
  mysqli_close($conn);
  exit;