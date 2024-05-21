<?php
require_once '../config.php';

$data = json_decode(file_get_contents('php://input'));
$id = $data->id;
$month = $data->month;
$year = $data->year;
$mas = [];
$monthplus = $month + 1;
$monthminus = $month - 1;

if ($monthplus > 11) {
    $monthplus = 0;
}
if ($monthminus < 0) {
    $monthminus = 11;
}
// Підготовлений запит з параметрами
$msql = "SELECT * FROM calendar WHERE (user_id=? OR user_id=0) AND (((month=? OR month=? OR month=?) AND year=?) OR ((month=? OR month=? OR month=?) AND every_year=1) OR ((month=? OR month=? OR month=?) AND meta_key='happyCase'))"; 

// Підготовка і виконання запиту з використанням параметрів bind
if ($stmt = mysqli_prepare($conn, $msql)) {
    mysqli_stmt_bind_param($stmt, "iiiiiiiiiii", $id, $month, $monthplus, $monthminus, $year, $month, $monthplus, $monthminus, $month, $monthplus, $monthminus);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    if ($result) {
        while ($res = mysqli_fetch_array($result)) {
            $user = new StdClass();
            $user->{"id"} = $res['id'];
            $user->{"value"} = json_decode($res['meta_value']);
            $user->{"date"} = $res['date'];
            $user->{'day'} = $res['day'];
            $user->{'month'} = $res['month'];
            $user->{'key'} = $res['meta_key'];
            $user->{'year'} = $res['year'];
            $mas[] = $user;
        }

        echo json_encode($mas);
    } else {
        // Обробка помилок, якщо запит не вдалося виконати
        echo json_encode(["error" => mysqli_error($conn)]);
    }

    // Закриття підготовленого запиту
    mysqli_stmt_close($stmt);
} else {
    echo json_encode(["error" => mysqli_error($conn)]);
}

mysqli_close($conn);
exit;
?>
