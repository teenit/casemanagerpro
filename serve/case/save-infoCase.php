<?php
require_once '../config.php';

$data = json_decode(file_get_contents('php://input'));

$id = $data->caseId;
$msql = "SELECT * FROM cases WHERE id=".$data->caseId;
$case = mysqli_query($conn, $msql);

$res = mysqli_fetch_assoc($case);
$resContact = json_decode($res["contact"]);

if(isset($data->dateDogovir) && $data->dateDogovir !== ""){
    $resContact->dateDogovir = $data->dateDogovir;
}
if(isset($data->numberDogovir) && $data->numberDogovir !== ""){
    $resContact->numberDogovir = $data->numberDogovir;
}
///////////////////////////////////////////////////////////////

if(isset($data->surname) && $data->surname !== ""){
    $resContact->surname = $data->surname;
}

if(isset($data->firstName) && $data->firstName !== ""){
    $resContact->firstName = $data->firstName;
}

if(isset($data->secondName) && $data->secondName !== ""){
    $resContact->secondName = $data->secondName;
}

if(isset($data->phone1) && $data->phone1 !== ""){
    $resContact->phone1 = $data->phone1;
}

if(isset($data->phone2) && $data->phone2 !== ""){
    $resContact->phone2 = $data->phone2;
}

if(isset($data->email) && $data->email !== ""){
    $resContact->email = $data->email;
}

if(isset($data->addressPropiska) && $data->addressPropiska !== ""){
    $resContact->addressPropiska = $data->addressPropiska;
}

if(isset($data->addressLive) && $data->addressLive !== ""){
    $resContact->addressLive = $data->addressLive;
}

if(isset($data->chanelComunity) && $data->chanelComunity !== ""){
    $resContact->chanelComunity = $data->chanelComunity;
}

if(isset($data->firstContact) && $data->firstContact !== ""){
    $resContact->firstContact = $data->firstContact;
}

if(isset($data->familyStan) && $data->familyStan !== ""){
    $resContact->familyStan = $data->familyStan;
}

if(isset($data->potreba) && $data->potreba !== ""){
    $resContact->potreba = $data->potreba;
}

if(isset($data->commentar) && $data->commentar !== ""){
    $resContact->commentar = $data->commentar;
}

if(isset($data->dateDogovir) && $data->dateDogovir !== ""){
    $resContact->dateDogovir = $data->dateDogovir;
}

if(isset($data->numberDogovir) && $data->numberDogovir !== ""){
    $resContact->numberDogovir = $data->numberDogovir;
}

if(isset($data->categories) && $data->categories !== ""){
    $resContact->categories = $data->categories;
}

if(isset($data->happybd) && $data->happybd !== ""){
    $resContact->happybd = $data->happybd;
    /////////////
    
$obj = new StdClass();
$obj->{'dateCreated'} = date("d-m-Y H:i:s");
$obj->{'userID'} = $data->id;
$obj->{'link'} = "/case?".$data->caseId;
$obj->{'day'} = $data->day;
$obj->{'month'} = $data->month;
$obj->{'year'} = $data->year;
$obj->{'title'} = "День народження ".$data->surname." ".$data->firstName;
$obj->{'text'} = "У кейса № ".$data->caseId." День народження, не забудьте привітати";
$obj->{'color'} = "#eba422";
$obj->{'start'} = "00:00";
$obj->{'end'} = "23:59";

$key = "happyCase";
$obj = json_encode($obj, JSON_UNESCAPED_UNICODE);
$date = $data->happybd;
    /////////////
    
    $cal = "SELECT * FROM calendar WHERE case_id=".$data->caseId;
    $calAns = mysqli_query($conn, $cal);
    $resAans = mysqli_fetch_assoc($calAns);
    if($resAans == null){
        $calInsert = "INSERT INTO calendar (user_id,meta_key,meta_value,date,month,year,day,case_id) VALUES (0,'$key','$obj','$date','$data->month','$data->year','$data->day',$data->caseId)";
        mysqli_query($conn, $calInsert);
    }else{
        $calUpdate = "UPDATE calendar SET meta_value='$obj',date='$date',month='$data->month',year='$data->year',day='$data->day' WHERE case_id='$data->caseId'";
        mysqli_query($conn, $calUpdate);
    }
}

if(isset($data->familyHistory) && $data->familyHistory !== ""){
    $resContact->familyHistory = $data->familyHistory;
}


////////////////////////////////////////////////////////////////


$resContact = json_encode($resContact, JSON_UNESCAPED_UNICODE);
$sql = "UPDATE cases SET contact = '$resContact' WHERE id = '$id'";

mysqli_query($conn, $sql);


echo $resContact;