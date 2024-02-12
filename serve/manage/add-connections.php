<?php
require_once '../config.php';

$data = json_decode(file_get_contents('php://input'));
$conId = $data->caseID;
if(!checkRight($data->id, 'addConnectionCase', $token,true)) exit;
$sql = "SELECT contact FROM cases WHERE id ='$conId'";
$case = mysqli_query($conn, $sql);
$res = mysqli_fetch_assoc($case);
if($res === null) {
      $obj = new StdClass();
      $obj->{'message'} = "Кейса за номером ".$conId." не знайдено";
      echo json_encode($obj);
      exit;
}

$caseUserId = json_decode($res["contact"]);
$caseUserId = $caseUserId->{'userId'};
$caseId = $data->caseID;
$userId = $data->id;
$obj = new StdClass();
$obj->{'date'} = date("d-m-Y");
$obj->{'caseIDWho'} = $data->caseIDWho;
$obj->{'caseID'} = $data->caseID;
$obj->{'userID'} = $data->id;
$obj->{'userName'} = $data->userName;
$obj->{'commentar'} = $data->commentar;
$obj->{'caseNameWho'} = $data->caseNameWho;
$obj->{'caseName'} = $data->caseName;
    $mes = "Користувачем ".$data->userName." було створено зв’язок від кейса ".$data->caseNameWho." №".$data->caseIDWho." до кейса ".$data->caseName." №".$data->caseID.". Причина - ".$data->commentar;
    $link = $data->caseIDWho;
    $type = "get_connect";

$jsonObj = json_encode($obj, JSON_UNESCAPED_UNICODE);
$meta_key = "get_connect";
        
        
$msql = "INSERT INTO casemeta (case_id,meta_key,meta_value) VALUES ('$caseId','$meta_key','$jsonObj')";
if (mysqli_query($conn, $msql)) {
        addNotification($caseUserId,$mes,$link,$type);
        addNotification($userId,$mes,$link,$type);
        echo $link;
} else {
      echo "Error: " . $msql . "<br>" . mysqli_error($conn);
}
