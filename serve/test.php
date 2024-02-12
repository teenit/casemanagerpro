<?php
require_once 'config.php';
phpinfo();
/*
$data = json_decode(file_get_contents('php://input'));
$userId = $data->id;
$token = $data->token;

$msql = "SELECT meta_value FROM usermeta WHERE user_id=1 AND meta_key='version'";

$obj = new StdClass();

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
$mas = [];
$msql = "SELECT * FROM oc_product_description";
$result = mysqli_query($conn, $msql);
while ($res = mysqli_fetch_array($result)) {
        $dec = new StdClass();
        $dec->{'product_id'} = $res['product_id'];
        $dec->{'language_id'} = $res['language_id'];
        $dec->{'name'} = $res['name'];
        


   
        $dec = json_encode($dec, JSON_UNESCAPED_UNICODE);
        $mas[] = $dec;     
    

}

echo json_encode($mas);*/