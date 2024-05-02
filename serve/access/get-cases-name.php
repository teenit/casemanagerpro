<?php
require_once '../config.php';

$data = json_decode(file_get_contents('php://input'));
if(!$data->token) exit;
$msql = 'SELECT id, name FROM `cases_new`';
  
$access = mysqli_query($conn, $msql);
$mas = [];
 while ($res = mysqli_fetch_assoc($access)) {
    $obj = new stdClass();
    $obj->{'id'} = $res['id'];
    $obj->{'name'} = $res['name'];

   $mas[] = $obj;
}

mysqli_close($conn);

echo json_encode($mas);  