<?php
require_once '../config.php';
$data = json_decode(file_get_contents('php://input'));
$token = $data->token;
$id = $data->id;
$level = file_get_contents('level.json');
echo $level;
