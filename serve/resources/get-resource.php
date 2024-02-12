<?php
require_once '../config.php';

$data = json_decode(file_get_contents('php://input'));
$token = $data->token;
$id = $data->id;
$obj = new StdClass();
if(!checkRight($id, 'getResources', $token, true)) exit;

        $metaKey = 'resource';
                $msql = "SELECT meta_value FROM usermeta WHERE user_id=1 AND meta_key='$metaKey'";
                $result = $conn->query($msql);
                $row = $result->fetch_assoc();
                if($row == null){
                     $obj = new StdClass();
                    $obj->{'message'} = "Немає доступних ресурсів";
                    $mas = [];
                    $mas[] = $obj;
                }else{
                    $mas = json_decode($row['meta_value']);
                }
                    echo json_encode($mas);
                