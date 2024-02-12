<?php
require_once '../config.php';

$data = json_decode(file_get_contents('php://input'));
$caseId = $data->caseID;

$sql = "SELECT * FROM casemeta WHERE meta_key='get_connect'";
$case = mysqli_query($conn, $sql);
$masFor = [];
$masFrom = [];
while($row = mysqli_fetch_assoc($case)) {
      if($row['case_id'] === $caseId){
            $masFor[] = json_decode($row['meta_value']);
      }else{
            $a = json_decode($row['meta_value']);
            if($a->caseIDWho === $caseId){
                  $masFrom[] = json_decode($row['meta_value']);
            }
      }
}    

$obj = new StdClass();
$obj->{'for'} = $masFor;
$obj->{'from'} = $masFrom;
echo json_encode($obj, JSON_UNESCAPED_UNICODE);
