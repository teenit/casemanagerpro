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

$obj = new StdClass();
$obj->{'userName'} = $data->userName;
$obj->{'userId'} = $data->id;
$obj->{'date'} = date("Y-m-d");
$obj->{'dateHelp'} = $data->date;
$obj->{'whoHelp'} = $data->whoHelp;
$obj->{'time'} = date('H:i:s');
$obj->{'mess'} = $data->mess;
$resHelp[] = $obj;
$resHelp = json_encode($resHelp, JSON_UNESCAPED_UNICODE);

$sql = "UPDATE cases SET help = '$resHelp' WHERE id = '$id'";

mysqli_query($conn, $sql);

echo $resHelp;