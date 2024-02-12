<?php
require_once '../config.php';

$data = json_decode(file_get_contents('php://input'));

$msql = 'SELECT * FROM `phonebook`';
  
$contacts = mysqli_query($conn, $msql);

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

echo json_encode($mas);  