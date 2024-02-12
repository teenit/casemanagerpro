<?php
require_once '../config.php';

$data = json_decode(file_get_contents('php://input'));

$id = $data->caseId;

$msql = "SELECT * FROM cases WHERE id=".$data->caseId;
$case = mysqli_query($conn, $msql);

$res = mysqli_fetch_assoc($case);

if($res["notes"] == null){
    $resNotes = [];
}else{
    $resNotes = json_decode($res["notes"]);
}

$obj = new StdClass();
$obj->{'userName'} = $data->userName;
$obj->{'userId'} = $data->id;
$obj->{'date'} = date("Y-m-d");
$obj->{'time'} = date('H:i:s');
$obj->{'mess'} = $data->mess;
$resNotes[] = $obj;
$resNotes = json_encode($resNotes, JSON_UNESCAPED_UNICODE);

$sql = "UPDATE cases SET notes = '$resNotes' WHERE id = '$id'";

mysqli_query($conn, $sql);

echo $resNotes;