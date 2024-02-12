<?php
require_once 'config.php';
$data = json_decode(file_get_contents('php://input'));

$id = $data->caseId;

$msql = "SELECT contact FROM cases WHERE id='$id'";
$case = mysqli_query($conn, $msql);

$res = mysqli_fetch_assoc($case);

$contact = json_decode($res['contact'], JSON_UNESCAPED_UNICODE);

$contact["imgUrl"] = $contact["tempImgUrl"];
$imgUrl = $contact["imgUrl"];
$contact = json_encode($contact, JSON_UNESCAPED_UNICODE);
$sql = "UPDATE cases SET contact = '$contact' WHERE id = '$id'";
$conn->query($sql);

echo $imgUrl;