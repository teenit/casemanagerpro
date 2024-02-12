<?php
require_once '../config.php';

$data = json_decode(file_get_contents('php://input'));
if(!checkRight($data->id, 'cases', $data->token,true)) exit;
$msql = 'SELECT * FROM `cases`';
  
$cases = mysqli_query($conn, $msql);

$mas = [];


 while ($res = mysqli_fetch_array($cases)) {
    $mike = false;
    $id = $res['id'];
 
    $dec = json_decode($res['contact']);

    $dec->id = $id;
    if($dec->userId == $data->id){
        if(checkRight($data->id, 'yourCases', $data->token, false)){
            $mike = true;
        }
    }else{
        for($i=0;$i < count($dec->categories); $i++){
            $pole = "acs".$dec->categories[$i]->value;
            if(checkRight($data->id, $pole, $data->token,false)){
                $mike = true;
            }
        }
    }
    if($mike){
        if($dec->{'happybd'} !== ""){
               $obj = new StdClass(); 
        $obj->{'happybd'} = $dec->{'happybd'};
        $obj->{'surname'} = $dec->{'surname'};
        $obj->{'id'} = $dec->{'id'};
        $obj->{'firstName'} = $dec->{'firstName'};
        $obj->{'secondName'} = $dec->{'secondName'};
        $mas[] = $obj;       
        }
   
    }

}

mysqli_close($conn);

$test = (int) $data->num;
if($test === count($mas)){
   // echo json_encode('');
}else{
 // echo json_encode($mas);  
}
echo json_encode($mas);  