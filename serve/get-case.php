<?php
require_once 'config.php';
$obj = new StdClass();
$obj->{'message'} = "У вас немає прав доступу до цього кейсу";
$data = json_decode(file_get_contents('php://input'));
$userId = $data->userId;
$token = $data->token;
//$userId = 2;
//$token = "c81e728d9d4c2f636f067f89cc14862c6393ae190e4c96.97763608";
if(!checkRight($userId, 'case', $token, true)) exit;

$msql = "SELECT * FROM cases WHERE id=".$data->id;
//$msql = "SELECT * FROM cases WHERE id="."19";
$sql = "SELECT level FROM users WHERE id=".$userId;
$level = mysqli_query($conn, $sql);
$resLevel = mysqli_fetch_assoc($level);
$resLevel = json_decode($resLevel['level']);
$case = mysqli_query($conn, $msql);

$res = mysqli_fetch_assoc($case);
//echo $res['contact'];
$contact = json_decode($res['contact']);

$mike = false;

if($contact->userId == $userId){
    
    if(!checkRight($userId, 'yourCases', $token, true)) exit;
    $mike = true;
}else{
    
     for($i=0;$i < count($contact->categories); $i++){
         
            $pole = "acs".$contact->categories[$i]->value;
            if(checkRight($userId, $pole, $token,false)){
                $mike = true;
                $contact->{'levelUser'} = $userLvl;
            }
        }
}
$res['level'] = $resLevel;
if ($mike) echo json_encode($res, JSON_UNESCAPED_UNICODE); 
else echo json_encode($obj, JSON_UNESCAPED_UNICODE);