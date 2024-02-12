<?php
require_once '../config.php';

$data = json_decode(file_get_contents('php://input'));

$id = $data->caseId;
$index = $data->index;

$msql = "SELECT * FROM cases WHERE id=".$data->caseId;
$case = mysqli_query($conn, $msql);

$res = mysqli_fetch_assoc($case);
$resPlan = json_decode($res["plan"]);

for($i = 0; $i < count($resPlan); $i++){
    if($resPlan[$i]->nameOfPlan == $data->nameOfPlan){
        $resPlan[$i]->plans[$index]->show = false;
    }
}

$resPlan = json_encode($resPlan, JSON_UNESCAPED_UNICODE);

$sql = "UPDATE cases SET plan = '$resPlan' WHERE id = '$id'";

mysqli_query($conn, $sql);
