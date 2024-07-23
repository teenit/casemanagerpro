<?php
require_once '../config.php';
$data = json_decode(file_get_contents('php://input'));
$token = $data->token;
$userId = $data->userId;
$id = $data->id;
$obj = new StdClass();
$all = false;
$userContact = false;
if($userId !== $id){
 
    if(!checkRight($id, 'lookUserAll', $data->token,false)){
    $obj->{'message'} = "Обмежений доступ";
    $obj->{'fail'} = "001";
    if(!checkRight($id, 'lookUserContact', $data->token,false)){
        $obj->{'message'} = "У вас немає доступу";
        $obj->{'fail'} = "002";
    }else{
        $userContact = true;
    }
}else{
    $all = true;
}
}else{
  
    $all = true;
}


$msql = "SELECT * FROM `users` WHERE id='$userId'";
$prf = 'profile_img';
$sql = "SELECT meta_value FROM usermeta WHERE user_id=$userId AND meta_key='$prf'";
$result = mysqli_query($conn, $sql);
$row =  mysqli_fetch_array($result);
 
if($row){
    $obj->{'profileUrl'} = $row['meta_value'];
}
$users = mysqli_query($conn, $msql);
$too = false;

while ($res = mysqli_fetch_array($users)) {
   
        if($all || $userContact){
            
            $obj->{'userName'} = $res['userName'];
           
            $obj->{'email'} = $res['email'];
           
//            $obj->{'address'} = $res['address'];

           $obj->{'phone'} = $res['phone'];
            //$obj->{'work'} = $res['work'];
           $obj->{'datas'} = $res['datas'];
   
        }
        if($all){
            $obj->{'active'} = $res['active'];
            $obj->{'id'} = $res['id'];
            $obj->{'date'} = $res['date'];
            $obj->{'level'} = $res['level'];
        }
       
}
 echo json_encode( $obj, JSON_UNESCAPED_UNICODE);
        exit;