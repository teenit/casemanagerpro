<?php
require_once 'config.php';

$data = json_decode(file_get_contents('php://input'));




$obj = new StdClass();

$userName = $data->userName;
$userAddress = $data->userAddress;
$userPhone = $data->userPhone;
$userType = $data->userType;
$userAnotherData = $data->userAnotherData;
$userEmail = $data->userEmail;
$date = date("Y-m-d H:i:s");
$password = md5($data->pass);
$active = "false";
$userWork = $data->userWork;
$level = json_encode($data->level);


$sql = "SELECT * FROM users WHERE email='$userEmail'";
$emailSql = mysqli_query($conn, $sql);


$res = mysqli_fetch_assoc($emailSql);
if($res == null){
      $msql = "INSERT INTO users (userName, address, phone, type, work, datas, active, password,email, level) VALUES ('$userName','$userAddress','$userPhone','$userType','$userWork','$userAnotherData','$active','$password','$userEmail','$level')";
            if (mysqli_query($conn, $msql)) {
                  $obj->{'message'} = "Користувача, успішно додано до системи. на вказаний email ".$userEmail." відправлено інструкції для завершення реєстрації";
                  $obj->{'marker'} = "green";
            } else {
                  //echo "Error: " . $msql . "<br>" . mysqli_error($conn);
                  $obj->{'message'} = "Помилка з'єднання з базою даних, спробуйте ще раз, або повторіть пізніше";
                  $obj->{'marker'} = "red";
            }
      mysqli_close($conn);     
}else{
      $obj->{'message'} = "Неможливо зареєструвати користувача, перевірте правильність даних";
      $obj->{'marker'} = "red";
}


echo json_encode($obj);