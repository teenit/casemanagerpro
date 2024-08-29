<?php
require_once '../config.php';
require_once 'logger.php';
$logFile = __DIR__ . '/logs/log_migrations.log'; // Файл для зберігання логу

logMessage("Початок скрипту міграцій", $logFile);

if ($conn->connect_error) {
    logMessage("Помилка підключення: " . $conn->connect_error, $logFile);
    die("Помилка підключення: " . $conn->connect_error);
}

logMessage("Підключення до бази даних встановлено", $logFile);

// Перевіряємо наявність таблиці migration_history
$sql = "SHOW TABLES LIKE 'migration_history'";
$result = $conn->query($sql);

if ($result === false) {
    logMessage("Помилка виконання запиту SHOW TABLES: " . $conn->error, $logFile);
    die("Помилка виконання запиту SHOW TABLES: " . $conn->error);
}

if ($result->num_rows === 0) {
    logMessage("Таблиця migration_history не існує. Створюємо таблицю.", $logFile);
    $createTableSql = "CREATE TABLE migration_history (
        id INT AUTO_INCREMENT PRIMARY KEY,
        migration VARCHAR(255) NOT NULL,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";
    
    if ($conn->query($createTableSql) === TRUE) {
        logMessage("Таблиця migration_history успішно створена.", $logFile);
    } else {
        logMessage("Помилка створення таблиці migration_history: " . $conn->error, $logFile);
        die("Помилка створення таблиці migration_history: " . $conn->error);
    }
}

$executedMigrations = [];
$result = $conn->query("SELECT migration FROM migration_history");

if ($result === false) {
    logMessage("Помилка виконання запиту SELECT: " . $conn->error, $logFile);
    die("Помилка виконання запиту SELECT: " . $conn->error);
}

while ($row = $result->fetch_assoc()) {
    $executedMigrations[] = $row['migration'];
}

logMessage("Знайдено виконані міграції: " . implode(', ', $executedMigrations), $logFile);

$migrationFiles = glob(__DIR__ . '/migrations/*.php');
if (!$migrationFiles) {
    logMessage("Не знайдено файлів міграцій у папці /migrations", $logFile);
    die("Не знайдено файлів міграцій у папці /migrations");
}

sort($migrationFiles); // Сортуємо, щоб міграції виконувалися в правильному порядку

foreach ($migrationFiles as $migrationFile) {
    $migrationName = basename($migrationFile, '.php');

    if (!in_array($migrationName, $executedMigrations)) {
        logMessage("Виконання міграції: $migrationName", $logFile);
        require $migrationFile;

        if (function_exists('migrate_up')) {
            $result = migrate_up($conn);

            if ($result === false) {
                logMessage("Міграція $migrationName завершилась з помилкою.", $logFile);
            } else {
                if ($conn->query("INSERT INTO migration_history (migration) VALUES ('$migrationName')")) {
                    logMessage("Міграція $migrationName успішно виконана.", $logFile);
                } else {
                    logMessage("Помилка запису міграції $migrationName в базу даних: " . $conn->error, $logFile);
                }
            }
        } else {
            logMessage("Функція migrate_up не знайдена у файлі $migrationFile.", $logFile);
        }
    } else {
        logMessage("Міграція $migrationName вже виконана. Пропускаємо.", $logFile);
    }
}

logMessage("Всі міграції завершені.", $logFile);
echo "Скрипт завершено успішно.";
