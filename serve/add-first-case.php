<?php
require_once 'config.php';
$data = json_decode(file_get_contents('php://input'));
if(!checkRight($data->userId, 'createCase', $data->token,true)) exit;
for($i = 0; $i < count($data->categories); $i++){
    if(!checkRight($data->userId, $data->categories[$i]->value, $data->token,true)) exit;
  //  echo $data->categories[$i]->value;

}
$data->status = "Перший контакт";
$data->imgUrl = "/img/default_img.png";
$data->tempImgUrl = "/img/default_img.png";
$category = json_encode($data->categories, JSON_UNESCAPED_UNICODE);
$data->createdDate = date("Y-m-d H:i:s");
$mas = [];
$obj = new StdClass();
$obj->{'date'} = date("d-m-Y");
$obj->{'message'} = "Створення кейсу";
$obj->{'userId'} = $data->userId;
$mas[] = $obj;

$gram = json_encode($data, JSON_UNESCAPED_UNICODE);

$activity = json_encode($mas, JSON_UNESCAPED_UNICODE);

file_put_contents('test.txt',$data);
file_put_contents('test.txt',$activity);
file_put_contents('test.txt',$category);

$msql = "INSERT INTO cases (contact,activity,categories) VALUES ('$gram','$activity','$category')";
if (mysqli_query($conn, $msql)) {
    $case_id = mysqli_insert_id($conn);
    $MESSAGE = "Створено новий кейс №".$case_id;
    $TYPE = 'createdCase';
    $LINK = '/case?'.$case_id;
    $USERID = 1;
        if(addNotification($USERID,$MESSAGE,$LINK,$TYPE)){
            echo $case_id;
        }
      
} else {
      echo "Error: " . $msql . "<br>" . mysqli_error($conn);
}


   $resContact->happybd = $data->happybd;
    /////////////
    
$objU = new StdClass();
$objU->{'dateCreated'} = date("d-m-Y H:i:s");
$objU->{'userID'} = $data->id;
$objU->{'link'} = "/case?".$case_id;
$objU->{'day'} = $data->day;
$objU->{'month'} = $data->month;
$objU->{'year'} = $data->year;
$objU->{'title'} = "День народження ".$data->surname." ".$data->firstName;
$objU->{'text'} = "У кейса № ".$case_id." День народження, не забудьте привітати";
$objU->{'color'} = "#eba422";
$objU->{'start'} = "00:00";
$objU->{'end'} = "23:59";

$key = "happyCase";
$objU = json_encode($objU, JSON_UNESCAPED_UNICODE);
$date = $data->happybd;
    /////////////
    
    $cal = "SELECT * FROM calendar WHERE case_id=".$data->caseId;
    $calAns = mysqli_query($conn, $cal);
    $resAans = mysqli_fetch_assoc($calAns);
    if($resAans == null){
        $calInsert = "INSERT INTO calendar (user_id,meta_key,meta_value,date,month,year,day,case_id) VALUES (0,'$key','$objU','$date','$data->month','$data->year','$data->day',$case_id)";
        mysqli_query($conn, $calInsert);
    }else{
        $calUpdate = "UPDATE calendar SET meta_value='$obj',date='$date',month='$data->month',year='$data->year',day='$data->day' WHERE case_id='$data->caseId'";
        mysqli_query($conn, $calUpdate);
    }

mysqli_close($conn);