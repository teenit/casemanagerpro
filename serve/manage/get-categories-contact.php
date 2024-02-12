<?php
require_once '../config.php';
$data = json_decode(file_get_contents('php://input'));
$obju = new StdClass();
if(!checkRight($data->id, 'createContact', $data->token,false)){
    $obju->{"message"} = "Ви немаєте права на додавання і редагування категорії";
}

    $prf = 'contact_categories';
    $msql = "SELECT meta_value FROM usermeta WHERE user_id=1 AND meta_key='$prf'";

    $result = $conn->query($msql);
    $row = $result->fetch_assoc();
    if($row == null){
        $obju->{'mas'} = false;
        echo json_encode($obju);
    }else{
        $obju->{'mas'} = json_decode($row["meta_value"]);
        echo json_encode($obju);
    }
  mysqli_close($conn);
  exit;