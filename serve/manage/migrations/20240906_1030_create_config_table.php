<?php
function migrate_up($conn) {
    // Створюємо таблицю config_meta
    $sql = "CREATE TABLE IF NOT EXISTS config_meta (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        config_key VARCHAR(255) NOT NULL,
        config_value TEXT NOT NULL,
        is_active TINYINT(1) DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE (config_key)
    )";

    if ($conn->query($sql) === TRUE) {
        echo "Таблиця 'config_meta' успішно створена.\n";
    } else {
        echo "Помилка створення таблиці 'config_meta': " . $conn->error . "\n";
    }
}

function migrate_down($conn) {
    // Видаляємо таблицю config_meta
    $sql = "DROP TABLE IF EXISTS config_meta";

    if ($conn->query($sql) === TRUE) {
        echo "Таблиця 'config_meta' успішно видалена.\n";
    } else {
        echo "Помилка видалення таблиці 'config_meta': " . $conn->error . "\n";
    }
}
