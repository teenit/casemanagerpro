<?php
require_once 'config.php';
$mas = [];
$id = $_POST["id"];
$userId = $_POST['userId'];
$token = $_POST['token'];
if(!checkRight($userId, 'loadCaseFiles', $token, true)) exit;
$url = 'http' . ((isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off') ? 's' : '') . '://';
foreach ($_FILES["images"]["error"] as $key => $error) {
    if ($error == UPLOAD_ERR_OK) {
        $time = time();
        $tmp_name = $_FILES["images"]["tmp_name"][$key];
        // basename() может спасти от атак на файловую систему;
        // может понадобиться дополнительная проверка/очистка имени файла
        $name = basename($_FILES["images"]["name"][$key]);
        move_uploaded_file($tmp_name, "uploads/".$time.$name);
        $obj = new StdClass();
        $obj->{'url'} = $url.$_SERVER['SERVER_NAME']."/serve/uploads/".$time.$name;
        $obj->{'title'} = $_POST["title"];
        $mas[] = $obj;
    }
}

$msql = "SELECT * FROM cases WHERE id='$id'";
$case = mysqli_query($conn, $msql);

$res = mysqli_fetch_assoc($case);

if(is_array(json_decode($res['photos']))){
    $newMas = array_merge(json_decode($res['photos']), $mas);
}else{
    $newMas = $mas;
}
$newMas = json_encode($newMas, JSON_UNESCAPED_UNICODE);
$sql = "UPDATE cases SET photos = '$newMas' WHERE id = '$id'";
$conn->query($sql);

echo $res['photos'];