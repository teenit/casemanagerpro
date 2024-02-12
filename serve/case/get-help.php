<?php
require_once '../config.php';

$data = json_decode(file_get_contents('php://input'));

$id = $data->caseId;

$msql = "SELECT * FROM cases WHERE id=".$data->caseId;
$case = mysqli_query($conn, $msql);

$res = mysqli_fetch_assoc($case);

if($res["help"] == null){
    $resHelp = [];
}else{
    $resHelp = json_decode($res["help"]);
}

$resHelp = json_encode($resHelp, JSON_UNESCAPED_UNICODE);

echo $resHelp;