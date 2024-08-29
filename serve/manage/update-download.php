<?php
require_once '../config.php';
require_once 'logger.php';
$logFile ='logs/log_install.log'; // Файл для зберігання логу

$data = json_decode(file_get_contents('php://input'));
if (isset($data->id, $data->token, $data->link, $data->newVersion)) {
    $userId = $data->id;
    $token = $data->token;
    $link = $data->link;
    $newVersion = $data->newVersion;
    
    $uploaddir = './updates/';
    $uploadfile = $uploaddir . basename($link);
    $obj = new StdClass();
    
    function unzip_file($file_path, $dest) {
        $zip = new ZipArchive;
        
        if (!is_dir($dest)) {
            return 'Немає папки для розпакування';
        }
        
        $is = $zip->open($file_path);
        if ($is === true) {
            $zip->extractTo($dest);
            $zip->close();
            return true;
        } else {
            return 'Помилка при розпакуванні архіву';
        }
    }

    // Перевіряємо наявність папки для оновлень
    if (!is_dir($uploaddir)) {
        mkdir($uploaddir, 0755, true);
    }
    
    // Копіюємо файл в папку updates
    if (copy($link, $uploadfile)) {
        logMessage("Файл успішно завантажено: $uploadfile", $logFile);

        $zipfile = $uploadfile; // шлях до завантаженого архіву
        $pathdir = '../../'; // шлях до папки, в яку буде розпаковано архів

        $done = unzip_file($zipfile, $pathdir);
        if ($done === true) {
            $obj->{'message'} = 'Розпаковано успішно';
            logMessage("Розпаковано успішно: $zipfile в $pathdir", $logFile);
			logMessage("Міграції успішно виконані", $logFile);
            // Виконання міграцій після успішного розпакування
            include_once 'migrate.php';  // Викликаємо скрипт міграцій
            $obj->{'message5'} = 'Міграції успішно виконані';
            logMessage("Міграції успішно виконані", $logFile);
			$sql = "UPDATE usermeta SET meta_value='$newVersion' WHERE user_id=1 AND meta_key='version'";
			if (mysqli_query($conn, $sql)) {
				$obj->{'message1'} = "Дані успішно записані до БД";
			} else {
				$obj->{'message2'} = "Помилка запису у БД";
			}
				
        } else {
            $obj->{'message3'} = 'Помилка: ' . $done;
            logMessage($obj->{'message3'}, $logFile);
        }
    } else {
        $obj->{'message'} = 'Помилка завантаження файлу';
        logMessage($obj->{'message'}, $logFile);
    }
} else {
    $obj->{'message'} = 'Недостатньо даних для виконання операції';
    logMessage($obj->{'message'}, $logFile);
}




echo json_encode($obj);
