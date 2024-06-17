<?php
require_once '../config.php';

$data = json_decode(file_get_contents('php://input'));
$userId = $data->id;
$token = $data->token;
$obj = new StdClass();
// if(!checkRight($userId, 'apiUpdateProgram', $token,false)){
//     $obj->{'message'} = "Немає прав доступу";
// };
$msql = "SELECT meta_value FROM usermeta WHERE user_id=1 AND meta_key='version'";



$result = $conn->query($msql);
$row = $result->fetch_assoc();
if($row == null){
    $sql = "INSERT INTO usermeta (user_id,meta_key,meta_value) VALUES (1,'version',0)";
    if (mysqli_query($conn, $sql)) {
        $obj->{'version'} = 0;
    } else {
        $obj->{'version'} = "Помилка 001";
    }
}else{
    $obj->{'version'} = $row['meta_value'];
}

echo json_encode($obj);