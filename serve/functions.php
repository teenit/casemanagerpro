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
    // Перевірка необхідних даних
    if (!isset($data->id, $data->key, $data->day, $data->month, $data->year, $data->title, $data->text)) {
        return "Error: Missing required data.";
    }

    // Отримання даних з об'єкта $data
    $dateCreated = date("d-m-Y H:i:s");
    $userID = $data->id;
    $link = isset($data->link) ? $data->link : null;
    $day = $data->day;
    $month = $data->month;
    $year = $data->year;
    $title = $data->title;
    $text = $data->text;
    $color = isset($data->color) ? $data->color : null;
    $start = isset($data->start) ? $data->start : null;
    $end = isset($data->end) ? $data->end : null;
    
    $key = $data->key;
    $id = $data->id;
    $calendar_id = isset($data->calendar_id) ? $data->calendar_id : null; // Отримуємо calendar_id

    // Перевірка ключа
    if ($key !== 'myCalendar') {
        $id = 0;
    }

    // Отримання поточної дати
    $date = date("d-m-Y");
    $case_id = isset($data->case_id) ? $data->case_id : 0;
    $every_year = isset($data->every_year) ? $data->every_year : 0;

    // Створення об'єкта для збереження в базі
    $meta_value = json_encode(array(
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

    if ($calendar_id) {
        // Якщо calendar_id передано, оновлюємо існуючий запис
        $sql = "UPDATE calendar 
                SET user_id = ?, meta_key = ?, meta_value = ?, date = ?, month = ?, year = ?, day = ?, case_id = ?, every_year = ? 
                WHERE id = ?";
        
        if ($stmt = mysqli_prepare($conn, $sql)) {
            mysqli_stmt_bind_param($stmt, "issssssiis", $id, $key, $meta_value, $date, $month, $year, $day, $case_id, $every_year, $calendar_id);

            // Виконання запиту
            if (mysqli_stmt_execute($stmt)) {
                mysqli_stmt_close($stmt);
                return true;
            } else {
                $error = "Error: " . mysqli_stmt_error($stmt);
                mysqli_stmt_close($stmt);
                return $error;
            }
        } else {
            return "Error: " . mysqli_error($conn);
        }
    } else {
        // Якщо calendar_id немає, додаємо новий запис
        $sql = "INSERT INTO calendar (user_id, meta_key, meta_value, date, month, year, day, case_id, every_year) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        
        if ($stmt = mysqli_prepare($conn, $sql)) {
            mysqli_stmt_bind_param($stmt, "issssssis", $id, $key, $meta_value, $date, $month, $year, $day, $case_id, $every_year);

            // Виконання запиту
            if (mysqli_stmt_execute($stmt)) {
                mysqli_stmt_close($stmt);
                return true;
            } else {
                $error = "Error: " . mysqli_stmt_error($stmt);
                mysqli_stmt_close($stmt);
                return $error;
            }
        } else {
            return "Error: " . mysqli_error($conn);
        }
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