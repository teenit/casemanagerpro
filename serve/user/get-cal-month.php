<?php
require_once '../config.php';

$data = json_decode(file_get_contents('php://input'));
$id = $data->id;
$month = $data->month;
$year = $data->year;
$mas = [];
$monthplus = $month + 1;
$monthminus = $month - 1;

if ($monthplus > 12) {
    $monthplus = 0;
}
if ($monthminus < 0) {
    $monthminus = 12;
}
$testCal = new StdClass();

// SQL-запит
$sql = "SELECT *
        FROM cases_new
        WHERE 
            MONTH(happy_bd) = $monthplus OR
            MONTH(happy_bd) = $monthminus OR
            MONTH(happy_bd) = $month";

$result = $conn->query($sql);
$masHappy = [];
// Перевірка та виведення результатів
if ($result->num_rows > 0) {
    // Виведення даних кожного рядка
    while ($row = $result->fetch_assoc()) {
        $case = new StdClass();
        $caseValue = new StdClass();
    
        $caseValue->{'userID'} = $row['user_id'];
        $caseValue->{'link'} = 'case/' . $row['id'];
    
        // Перетворення поля 'happy_bd' на об'єкт DateTime, якщо це необхідно
        $happyBd = new DateTime($row['happy_bd']);
    
        $caseValue->{'day'} = $happyBd->format('d');
        $caseValue->{'month'} = $happyBd->format('m');
        $caseValue->{'year'} = $happyBd->format('Y');
        $caseValue->{'title'} = "День народження " . $row['name'];
        $caseValue->{'text'} = "Сьогодні у " . $row['name'] . " день народження, не забудьте привітати";
        $caseValue->{'color'} = "#eba422";
        $caseValue->{'start'} = "00:00";
        $caseValue->{'end'} = "23:59";
    
        $case->{"id"} = $row['id'];
        $case->{"value"} = $caseValue;
        $case->{"date"} = $row['happy_bd']; // або $happyBd->format('Y-m-d'), якщо потрібно форматування
        $case->{'day'} = $happyBd->format('d');
        $case->{'month'} = $happyBd->format('m');
        $case->{'year'} = $happyBd->format('Y');
        $case->{'key'} = "happyCase";
    
        $mas[] = $case;
    }
    
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
    } else {
        // Обробка помилок, якщо запит не вдалося виконати
        echo json_encode(["error" => mysqli_error($conn)]);
    }

    // Закриття підготовленого запиту
    mysqli_stmt_close($stmt);
} else {
    echo json_encode(["error" => mysqli_error($conn)]);
}
//$testCal->{'happy'} = $masHappy;
echo json_encode($mas);

mysqli_close($conn);
exit;
?>
