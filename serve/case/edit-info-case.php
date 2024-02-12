<?php
require_once '../config.php';

$data = json_decode(file_get_contents('php://input'));

$id = $data->caseId;
$msql = "SELECT * FROM cases WHERE id=".$data->caseId;
//$msql = "SELECT * FROM cases WHERE id="."26";
  
$case = mysqli_query($conn, $msql);

$res = mysqli_fetch_assoc($case);
$resContact = json_decode($res["contact"]);

if(isset($data->dateDogovir) && $data->dateDogovir !== ""){
    $resContact->dateDogovir = $data->dateDogovir;
}
if(isset($data->numberDogovir) && $data->numberDogovir !== ""){
    $resContact->numberDogovir = $data->numberDogovir;
}
$resContact = json_encode($resContact, JSON_UNESCAPED_UNICODE);
$sql = "UPDATE cases SET contact = '$resContact' WHERE id = '$id'";

mysqli_query($conn, $sql);


echo $resContact;