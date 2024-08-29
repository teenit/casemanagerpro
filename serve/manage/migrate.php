<?php
require_once '../config.php';
$logFile = __DIR__ . '/logs/log_migrations.log'; // Файл для зберігання логу

if ($conn->connect_error) {
    logMessage("Помилка підключення: " . $conn->connect_error, $logFile);
    die("Помилка підключення: " . $conn->connect_error);
}

// Перевіряємо наявність таблиці migration_history
$sql = "SHOW TABLES LIKE 'migration_history'";
$result = $conn->query($sql);

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

while ($row = $result->fetch_assoc()) {
    $executedMigrations[] = $row['migration'];
}

$migrationFiles = glob(__DIR__ . '/migrations/*.php');
sort($migrationFiles); // Сортуємо, щоб міграції виконувалися в правильному порядку

foreach ($migrationFiles as $migrationFile) {
    $migrationName = basename($migrationFile, '.php');

    if (!in_array($migrationName, $executedMigrations)) {
        require $migrationFile;
        logMessage("Виконання міграції: $migrationName", $logFile);
        migrate_up($conn);

        if ($conn->query("INSERT INTO migration_history (migration) VALUES ('$migrationName')")) {
            logMessage("Міграція $migrationName успішно виконана.", $logFile);
        } else {
            logMessage("Помилка запису міграції $migrationName в базу даних: " . $conn->error, $logFile);
        }
    } else {
        logMessage("Міграція $migrationName вже виконана. Пропускаємо.", $logFile);
    }
}

$conn->close();
logMessage("Всі міграції завершені.", $logFile);

function logMessage($message, $file) {
    $time = date('Y-m-d H:i:s');
    file_put_contents($file, "[$time] $message\n", FILE_APPEND);
}
