<?php
require_once '../config.php';

$data = json_decode(file_get_contents('php://input'));

$id = $data->caseId;
$msql = "SELECT * FROM cases WHERE id=".$data->caseId;
  
$case = mysqli_query($conn, $msql);

$res = mysqli_fetch_assoc($case);
$resPlan = $res["plan"];

if($resPlan === null){
    $resPlan = [];
}else{
    $resPlan = json_decode($resPlan);
}

$resPlan[] = $data->plan;
$resPlan = json_encode($resPlan, JSON_UNESCAPED_UNICODE);
$sql = "UPDATE cases SET plan = '$resPlan' WHERE id = '$id'";

mysqli_query($conn, $sql);
