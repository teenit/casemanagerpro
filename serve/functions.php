<?php
// Ключ для шифрування. Важливо зберігати його в безпечному місці.
$key = $privatKey;

// Функція для шифрування даних
function encryptData($data, $key) {
    return base64_encode(openssl_encrypt($data, "AES-256-CBC", $key, 0, substr($key, 0, 16)));
}
// Функція для розшифрування даних
function decryptData($encryptedData, $key) {
    return openssl_decrypt(base64_decode($encryptedData), "AES-256-CBC", $key, 0, substr($key, 0, 16));
}

function addEventToCalendar($conn, $data) {
    $dateCreated = date("d-m-Y H:i:s");
    $userID = $data->id;
    $link = $data->link;
    $day = $data->day;
    $month = $data->month;
    $year = $data->year;
    $title = $data->title;
    $text = $data->text;
    $color = $data->color;
    $start = $data->start;
    $end = $data->end;

    $key = $data->key;
    $id = $data->id;

    // Перевірка ключа
    if($key !== 'myCalendar'){
        $id = 0;
    }

    // Отримання поточної дати
    $date = date("d-m-Y");
    $case_id = $data->case_id ? $data->case_id : 0;
    $every_year = $data->every_year ? $data->every_year : 0;
    // Підготовка SQL запиту з використанням параметрів bind
    $msql = "INSERT INTO calendar (user_id, meta_key, meta_value, date, month, year, day, case_id, every_year) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $obj = json_encode(array(
        'dateCreated' => $dateCreated,
        'userID' => $userID,
        'link' => $link,
        'day' => $day,
        'month' => $month,
        'year' => $year,
        'title' => $title,
        'text' => $text,
        'color' => $color,
        'start' => $start,
        'end' => $end
    ), JSON_UNESCAPED_UNICODE);
    // Підготовка і виконання запиту з використанням параметрів bind
    if ($stmt = mysqli_prepare($GLOBALS['conn'], $msql)) {
  // Підготовка значення об'єкта в форматі JSON

        mysqli_stmt_bind_param($stmt, "issssssis", $id, $key, $obj, $date, $month, $year, $day, $case_id, $every_year);
        // Встановлення значень параметрів і виконання запиту
        if (mysqli_stmt_execute($stmt)) {
            return true;
        } else {
            return "Error: " . mysqli_stmt_error($stmt);
        }

        // Закриття підготовленого запиту
        mysqli_stmt_close($stmt);
    } else {
        return "Error: 000" . mysqli_error($conn);
    }
}

// Функція для логування
function logMessage($message) {
    // Визначення шляху до файлу журналу
    $logFile = 'logs/app.log';

    // Форматування повідомлення з міткою часу
    $formattedMessage = date("Y-m-d H:i:s") . " - " . $message . PHP_EOL;

    // Запис повідомлення у файл журналу
    file_put_contents($logFile, $formattedMessage, FILE_APPEND);
}

?>