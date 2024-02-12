<?php
require_once '../config.php';

$data = json_decode(file_get_contents('php://input'));
$val = $data->val;

$msql = "SELECT * FROM cases";
//$case = mysqli_query($conn, $msql);

$mas = [];
$res = mysqli_query($conn, $msql);
while($row = mysqli_fetch_assoc($res)) {
    $contact = json_decode($row['contact']);

if (strripos($contact->surname, $val) === false && strripos($contact->firstName, $val) === false && strripos($contact->secondName, $val) === false && strripos($contact->phone1, $val) === false && strripos($contact->phone2, $val) === false) {
 
}else{
    $obj = new StdClass();
    $obj->{'surname'} = $contact->surname;
    $obj->{'firstName'} = $contact->firstName;
    $obj->{'secondName'} = $contact->secondName;
    $obj->{'phone1'} = $contact->phone1;
    $obj->{'phone2'} = $contact->phone2;
    $obj->{'id'} = $row['id'];
    $mas[] = $obj;
}
}


echo json_encode($mas); 