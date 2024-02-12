<?php
require_once '../config.php';
require_once '../send-mail.php';
$data = json_decode(file_get_contents('php://input'));
if(!checkRight($data->id, 'statisticAmountCases', $data->token,true)) exit;
$msql = "SELECT * FROM cases";
    $prf = 'case_categories';
    $sql = "SELECT meta_value FROM usermeta WHERE user_id=1 AND meta_key='$prf'";
$obj = new StdClass();  
    $result = $conn->query($msql);
    $row = $result->fetch_assoc();
$masCategories = [];
    if($row !== null) $masCategories = json_decode($row["meta_value"]);
$cases = mysqli_query($conn, $msql);
$count = 0;
$obj->{'mas'} = [];

while ($res = mysqli_fetch_array($cases)) {
    $id = $res['id'];
    $dec = json_decode($res['contact']);
    for($i=0; $i < count($dec->categories); $i++){
        $obj->{'mas'}[] = $dec->categories[$i];
    }
    $count++;
}
$obj->{'count'} = $count;
echo json_encode($obj);