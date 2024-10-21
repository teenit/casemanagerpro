<?php
require_once 'config.php';
require_once 'logger.php';
$logFile = 'logs/log_install.log'; // Файл для зберігання логу

// Функція для завантаження змінних з файлу .env
function load_env($path) {
    if (!file_exists($path)) {
        throw new Exception("Файл .env не знайдено за шляхом: $path");
    }

    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) {
            continue; // Ігноруємо коментарі
        }

        list($name, $value) = explode('=', $line, 2);
        $name = trim($name);
        $value = trim($value);

        if (!array_key_exists($name, $_ENV)) {
            $_ENV[$name] = $value;
        }
    }
}

// Завантажуємо змінні з .env
load_env(__DIR__ . '/../.env');

$data = json_decode(file_get_contents('php://input'));
$obj = new StdClass();

if (isset($data->id, $data->token, $data->version)) {
    $userId = (int)$data->id;
    $token = htmlspecialchars($data->token);
    $version = htmlspecialchars($data->version);

    // Формуємо посилання на архів відповідної версії
    $baseUrl = 'https://updates-domain.com/versions/';
    $link = $baseUrl . $version . '.zip';  // Динамічне посилання на архів

    $uploaddir = './updates/';
    $uploadfile = $uploaddir . basename($link);
    $pathdir = '../../'; // Шлях до папки, в яку буде розпаковано архів

    // Папка для збереження резервних копій
    $backupdir = './backups/';
    if (!is_dir($backupdir)) {
        mkdir($backupdir, 0755, true);
    }

    // Список критичних файлів і папок, які не можна видаляти
    $criticalFiles = [
        'config.php',
        '.env',
        'system',  // Виняткова папка
        'uploads',
        'mpdf',
        'logs'
    ];

    // Функція резервного копіювання бази даних
    function backup_database($dbHost, $dbUser, $dbPass, $dbName, $backupDir) {
        $backupFile = $backupDir . 'db_backup_' . date('Y-m-d_H-i-s') . '.sql';
        $command = "mysqldump --user={$dbUser} --password={$dbPass} --host={$dbHost} {$dbName} > {$backupFile}";
        
        // Виконання команди
        system($command, $output);

        // Перевірка чи створився файл
        return file_exists($backupFile) ? $backupFile : false;
    }

    // Функція резервного копіювання директорії
    function backup_directory($sourceDir, $backupDir) {
        $zip = new ZipArchive();
        $backupFile = $backupDir . 'backup_' . date('Y-m-d_H-i-s') . '.zip';
        if ($zip->open($backupFile, ZipArchive::CREATE) !== true) {
            return false;
        }

        $source = realpath($sourceDir);
        $files = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($source), RecursiveIteratorIterator::LEAVES_ONLY);

        foreach ($files as $file) {
            if (!$file->isDir()) {
                $filePath = $file->getRealPath();
                $relativePath = substr($filePath, strlen($source) + 1);
                $zip->addFile($filePath, $relativePath);
            }
        }

        return $zip->close();
    }

    // Функція очищення папки
    function clear_directory($dir, $exceptions) {
        $files = array_diff(scandir($dir), ['.', '..']);
        foreach ($files as $file) {
            $filePath = "$dir/$file";

            // Перевіряємо, чи є файл або папка в списку винятків
            if (in_array($file, $exceptions)) {
                continue; // Пропускаємо цей файл або папку
            }

            if (is_dir($filePath)) {
                // Якщо це директорія, рекурсивно очищуємо її і видаляємо
                clear_directory($filePath, $exceptions);
                rmdir($filePath);
            } else {
                // Якщо це файл, просто видаляємо його
                unlink($filePath);
            }
        }
    }

    // Резервне копіювання бази даних
    $dbBackup = backup_database($_ENV['DB_HOST'], $_ENV['DB_USER'], $_ENV['DB_PASSWORD'], $_ENV['DB_NAME'], $backupdir);
    if ($dbBackup) {
        logMessage("Резервне копіювання бази даних створено: {$dbBackup}", $logFile);
    } else {
        $obj->{'message'} = 'Помилка резервного копіювання бази даних';
        logMessage($obj->{'message'}, $logFile);
        echo json_encode($obj);
        exit();
    }

    // Резервне копіювання файлів
    if (backup_directory($pathdir, $backupdir)) {
        logMessage("Резервне копіювання файлів успішно створено: {$backupdir}", $logFile);
    } else {
        $obj->{'message'} = 'Помилка резервного копіювання файлів';
        logMessage($obj->{'message'}, $logFile);
        echo json_encode($obj);
        exit();
    }

    // Очищаємо директорію перед розпакуванням, окрім критичних файлів та папки system
    clear_directory($pathdir, $criticalFiles);

    // Перевіряємо наявність папки для оновлень
    if (!is_dir($uploaddir)) {
        mkdir($uploaddir, 0755, true);
    }

    // Функція розпакування файлів
    function unzip_file($file_path, $dest) {
        $zip = new ZipArchive;
        if (!is_dir($dest)) {
            return 'Немає папки для розпакування';
        }

        if ($zip->open($file_path) === true) {
            $zip->extractTo($dest);
            $zip->close();
            return true;
        } else {
            return 'Помилка при розпакуванні архіву';
        }
    }

    // Перевіряємо, чи архів уже завантажено
    if (!file_exists($uploadfile)) {
        // Копіюємо файл в папку updates, якщо його ще немає
        if (!copy($link, $uploadfile)) {
            $obj->{'message'} = 'Помилка завантаження файлу';
            logMessage($obj->{'message'}, $logFile);
            echo json_encode($obj);
            exit();
        }
        logMessage("Файл успішно завантажено: $uploadfile", $logFile);
    } else {
        logMessage("Файл уже існує: $uploadfile", $logFile);
    }

    $zipfile = $uploadfile; // шлях до архіву

    $done = unzip_file($zipfile, $pathdir);
    if ($done === true) {
        logMessage("Розпаковано успішно: $zipfile в $pathdir", $logFile);

        // Виконання міграцій після успішного розпакування
        include_once 'migrate.php';  // Викликаємо скрипт міграцій
        $obj->{'message'} = 'Розпаковано та міграції виконані успішно';
        logMessage("Міграції успішно виконані", $logFile);

        // Оновлення версії в БД
        $sql = "UPDATE usermeta SET meta_value='$version' WHERE user_id=1 AND meta_key='version'";
        if (mysqli_query($conn, $sql)) {
            $obj->{'message'} = "Дані успішно записані до БД";
            logMessage($obj->{'message'}, $logFile);
        } else {
            $obj->{'message'} = "Помилка запису у БД: " . mysqli_error($conn);
            logMessage($obj->{'message'}, $logFile);
        }

    } else {
        $obj->{'message'} = 'Помилка: ' . $done;
        logMessage($obj->{'message'}, $logFile);
    }

} else {
    $obj->{'message'} = 'Недостатньо даних для виконання операції';
    logMessage($obj->{'message'}, $logFile);
}

echo json_encode($obj);
