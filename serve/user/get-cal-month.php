<?php
require_once '../config.php';

$data = json_decode(file_get_contents('php://input'));
$id = $data->id;
$month = $data->month;
$year = $data->year;
$mas = [];
$monthplus = $month + 1;
$monthminus = $month - 1;
$msql = "SELECT * FROM calendar WHERE (user_id=$id OR user_id=0) AND (((month=$month OR month=$monthplus OR month=$monthplus) AND year=$year) OR (every_year=1) OR (meta_key='happyCase'))";

$result = mysqli_query($conn, $msql);

if ($result) {
    while ($res = mysqli_fetch_array($result)) {
        $user = new StdClass();
        $user->{"id"} = $res['id'];
        $user->{"value"} = json_decode($res['meta_value']);
        $user->{"date"} = $res['date'];
        $user->{'day'} = $res['day'];
        $user->{'month'} = $res['month'];
        $user->{'key'} = $res['meta_key'];
        $mas[] = $user;
    }

    echo json_encode($mas);
} else {
    // Обробка помилок, якщо запит не вдалося виконати
    echo json_encode(["error" => mysqli_error($conn)]);
}

mysqli_close($conn);
exit;
?>
