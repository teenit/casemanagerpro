<?php
require_once '../config.php';
require_once '../send-mail.php';
$data = json_decode(file_get_contents('php://input'));
$hash = $data->hash;
$msql = "SELECT * FROM `usermeta` WHERE meta_key='recovery_pass' AND meta_value='$hash'";

$recovery_pass = mysqli_query($conn, $msql);
$obj = new StdClass();
while ($res = mysqli_fetch_array($recovery_pass)) {
    if($res['meta_value'] === $hash){
        $obj->{'active'} = true;
    }else{
        $obj->{'active'} = false;
    }
}
echo json_encode($obj, JSON_UNESCAPED_UNICODE);
exit;