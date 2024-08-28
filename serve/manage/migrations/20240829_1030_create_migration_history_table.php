<?php
function migrate_up($conn) {
    // SQL-запит для створення таблиці migration_history
    $sql = "CREATE TABLE IF NOT EXISTS migration_history (
        id INT AUTO_INCREMENT PRIMARY KEY,
        migration VARCHAR(255) NOT NULL,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";

    if ($conn->query($sql) === TRUE) {
        echo "Таблиця migration_history успішно створена.\n";
    } else {
        echo "Помилка при створенні таблиці: " . $conn->error . "\n";
    }
}

function migrate_down($conn) {
    // SQL-запит для видалення таблиці migration_history
    $sql = "DROP TABLE IF EXISTS migration_history";

    if ($conn->query($sql) === TRUE) {
        echo "Таблиця migration_history успішно видалена.\n";
    } else {
        echo "Помилка при видаленні таблиці: " . $conn->error . "\n";
    }
}
