<?php
require_once '../config.php';

$data = json_decode(file_get_contents('php://input'));

$id = $data->caseId;
$index = $data->index;
$a = $data->checked;
$desc = $data->desc;
$start = $data->start;
$end = $data->end;
$msql = "SELECT * FROM cases WHERE id=".$data->caseId;
$case = mysqli_query($conn, $msql);

$res = mysqli_fetch_assoc($case);
$resPlan = json_decode($res["plan"]);
$mas = [];

   for($i = 0; $i < count($resPlan); $i++){
    if($resPlan[$i]->nameOfPlan == $data->nameOfPlan){
        $resPlan[$i]->plans[$index]->show = true;
        $resPlan[$i]->plans[$index]->done = $a;
        $resPlan[$i]->plans[$index]->start = $start; 
        $resPlan[$i]->plans[$index]->end = $end; 
        $resPlan[$i]->plans[$index]->desc = $desc;
       // $ee = array_values($resPlan[$i]->plans);
        //$resPlan[$i]->plans = [];
        //$resPlan[$i]->plans = $ee;
    }
    $resPlan[$i]->plans = array_values($resPlan[$i]->plans);
}

$resPlan = json_encode($resPlan, JSON_UNESCAPED_UNICODE);

$sql = "UPDATE cases SET plan = '$resPlan' WHERE id = '$id'";

mysqli_query($conn, $sql);
echo $resPlan;