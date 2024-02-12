<?php
require_once '../config.php';
$data = json_decode(file_get_contents('php://input'));
if(!checkRight($data->id, 'deleteCategoriesContact', $token,true)) exit;
$mas = [];
$count = 0;
$obj = $data->category;
    $prf = 'contact_categories';
    $msql = "SELECT meta_value FROM usermeta WHERE user_id=1 AND meta_key='$prf'";
    $result = $conn->query($msql);
    $row = $result->fetch_assoc();

        $row = json_decode($row["meta_value"]);
        for($i = 0; $i < count($row); $i++){
            if($obj->value == $row[$i]->value){

            }else{
                $mas[] = $row[$i];
            }
        }
        $row = json_encode($mas, JSON_UNESCAPED_UNICODE);
        $sql = "UPDATE usermeta SET meta_value = '$row' WHERE user_id = 1 AND meta_key='contact_categories'";
        if (mysqli_query($conn, $sql)) {
            echo $row;
        }
   

  mysqli_close($conn);
  exit;
