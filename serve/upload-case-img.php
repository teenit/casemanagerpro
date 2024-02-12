<?php
require_once 'config.php';
$link = "";
$id = $_POST["id"];
$key = $_POST['key'];

        $time = time();
        $tmp_name = $_FILES["image"]["tmp_name"];
        // basename() может спасти от атак на файловую систему;
        // может понадобиться дополнительная проверка/очистка имени файла
        $name = basename($_FILES["image"]["name"]);
       // $name = $_FILES["image"]["name"];
        move_uploaded_file($tmp_name, "uploads/".$key."/".$time.$name);
        $link = "https://".$_SERVER['SERVER_NAME']."/serve/uploads/".$key."/".$time.$name;


if($key == "case"){
    $msql = "SELECT contact FROM cases WHERE id='$id'";
    $case = mysqli_query($conn, $msql);

    $res = mysqli_fetch_assoc($case);

    $contact = json_decode($res['contact'], JSON_UNESCAPED_UNICODE);

    $contact["tempImgUrl"] = $link;
    
    $contact = json_encode($contact, JSON_UNESCAPED_UNICODE);
    $sql = "UPDATE cases SET contact = '$contact' WHERE id = '$id'";
    $conn->query($sql);
    echo $link;
}

if($key == "user"){
    $prf = 'profile_img';
    $msql = "SELECT meta_value FROM usermeta WHERE user_id=$id AND meta_key='$prf'";
    $result = $conn->query($msql);
    $row = $result->fetch_assoc();
    if($row == null){
        $sql = "INSERT INTO usermeta (user_id, meta_key, meta_value) VALUES ($id, 'profile_img', '$link')";
    }else{
        $sql = "UPDATE usermeta SET meta_value = '$link' WHERE user_id = $id AND meta_key='$prf'";
    }

    if (mysqli_query($conn, $sql)) {
        echo $link;
    } else {
        $obj = new StdClass();
        $obj->{'message'} = "Помилка завантаження фото, спробуйте пізніше";
        $obj->{'marker'} = "red";
        $obj->{'url'} = $link;
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
  }
  mysqli_close($conn);
  exit;
}