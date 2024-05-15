<?php
require_once '../config.php';
//require_once '../functions.php';

$data = json_decode(file_get_contents('php://input'));
// Виклик функції для додавання події до календаря
// if(addEventToCalendar($conn, $data)) {
//     echo "Event added successfully!";
// } else {
//     echo "Error adding event!";
// }

// Закриття підключення до бази даних
mysqli_close($conn);
$obj = new StdClass();
$obj->{'dateCreated'} = date("d-m-Y H:i:s");
$obj->{'userID'} = $data->id;
$obj->{'link'} = $data->link;
$obj->{'day'} = $data->day;
$obj->{'month'} = $data->month;
$obj->{'year'} = $data->year;
$obj->{'title'} = $data->title;
$obj->{'text'} = $data->text;
$obj->{'color'} = $data->color;
$obj->{'start'} = $data->start;
$obj->{'end'} = $data->end;

$key = $data->key;
$id = $data->id;
if($key !== 'myCalendar'){
    $id = 0;
}
$obj = json_encode($obj, JSON_UNESCAPED_UNICODE);
$date = date("d-m-Y");
$msql = "INSERT INTO calendar (user_id,meta_key,meta_value,date,month,year,day) VALUES ('$id','$key','$obj','$date','$data->month','$data->year',$data->day)";
if (mysqli_query($conn, $msql)) {
    echo "true";
} else {
      echo "Error: " . $msql . "<br>" . mysqli_error($conn);
}




mysqli_close($conn);