<?php
function migrate_up($conn) {
    $sql = "CREATE TABLE IF NOT EXISTS fields_new (
        id INT AUTO_INCREMENT PRIMARY KEY,
        type VARCHAR(255) DEFAULT NULL,
        `group` VARCHAR(255) DEFAULT NULL,
        block_view VARCHAR(255) DEFAULT NULL,
        sorted TINYINT(1) DEFAULT 0,
        system TINYINT(1) DEFAULT 0,
        user_id INT NOT NULL,
        date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";

    if ($conn->query($sql) === TRUE) {
        echo "Таблиця 'fields_new' успішно створена.\n";
    } else {
        echo "Помилка створення таблиці 'fields_new': " . $conn->error . "\n";
    }
}

function migrate_down($conn) {
    $sql = "DROP TABLE IF EXISTS fields_new";

    if ($conn->query($sql) === TRUE) {
        echo "Таблиця 'fields_new' успішно видалена.\n";
    } else {
        echo "Помилка видалення таблиці 'fields_new': " . $conn->error . "\n";
    }
}
?>
