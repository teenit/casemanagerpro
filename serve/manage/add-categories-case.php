<?php
require_once '../config.php';
$data = json_decode(file_get_contents('php://input'));
if(!checkRight($data->id, 'addCategoriesCase', $token,true)) exit;
$mas = [];
$count = 0;
$mas[] = $data->category;
$mas = json_encode($mas, JSON_UNESCAPED_UNICODE);
    $prf = 'case_categories';
    $msql = "SELECT meta_value FROM usermeta WHERE user_id=1 AND meta_key='$prf'";
    $result = $conn->query($msql);
    $row = $result->fetch_assoc();
    if($row == null){
        $sql = "INSERT INTO usermeta (user_id, meta_key, meta_value) VALUES (1, 'case_categories', '$mas')";
    }else{
        $row = json_decode($row["meta_value"]);
        $row[] = $data->category;
        $row = json_encode($row, JSON_UNESCAPED_UNICODE);
        $sql = "UPDATE usermeta SET meta_value = '$row' WHERE user_id = 1 AND meta_key='case_categories'";
        $count = 1;
    }

    if (mysqli_query($conn, $sql)) {
        if($count == 0){
            echo json_encode($mas);
        }else{
            echo $row;
        }
    } else {
        $obj = new StdClass();
        $obj->{'message'} = "Помилка завантаження фото, спробуйте пізніше";
        $obj->{'marker'} = "red";
        $obj->{'url'} = $link;
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
  }
  mysqli_close($conn);
  exit;
