<?php
require_once '../config.php';

$data = json_decode(file_get_contents('php://input'));
if(!checkRight($data->id, 'createContact', $token,true)) exit;
$date = date("d-m-Y");
$info = json_encode($data->info, JSON_UNESCAPED_UNICODE);
$cat = json_encode($data->category, JSON_UNESCAPED_UNICODE);
$phones = json_encode($data->phones, JSON_UNESCAPED_UNICODE);
$msql = "INSERT INTO phonebook (phones,pib,info,category,user_id,date) VALUES ('$phones','$data->pib', '$info', '$cat', '$data->id', '$date')";
if (mysqli_query($conn, $msql)) {
      $sql = 'SELECT * FROM `phonebook`';
  
$contacts = mysqli_query($conn, $sql);

$mas = [];

 while ($res = mysqli_fetch_array($contacts)) {
      $obj = new StdClass();
      $obj->{'info'} = json_decode($res['info']);
      $obj->{'category'} = json_decode($res['category']);
      $obj->{'date'} = $res['date'];
            $obj->{'phones'} = json_decode($res['phones']);
      $obj->{'pib'} = $res['pib'];
      $obj->{'id'} = $res['id'];
      $obj->{'date'} = $res['date'];
      $mas[] = $obj;
}

mysqli_close($conn);
echo json_encode($mas, JSON_UNESCAPED_UNICODE); 
} else {
      echo "Error: " . $msql . "<br>" . mysqli_error($conn);
}
mysqli_close($conn);