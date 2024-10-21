<?php
function migrate_up($conn) {
    // Створення таблиці case_fieldsmeta
    $sql1 = "CREATE TABLE IF NOT EXISTS case_fieldsmeta (
        id INT AUTO_INCREMENT PRIMARY KEY,
        case_id INT NOT NULL,
        field_id INT NOT NULL,
        value TEXT DEFAULT NULL,
        data TEXT DEFAULT NULL
    )";

    // Створення таблиці user_fieldsmeta
    $sql2 = "CREATE TABLE IF NOT EXISTS user_fieldsmeta (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        field_id INT NOT NULL,
        value TEXT DEFAULT NULL,
        data TEXT DEFAULT NULL
    )";

    if ($conn->query($sql1) === TRUE) {
        echo "Таблиця 'case_fieldsmeta' успішно створена.\n";
    } else {
        echo "Помилка створення таблиці 'case_fieldsmeta': " . $conn->error . "\n";
    }

    if ($conn->query($sql2) === TRUE) {
        echo "Таблиця 'user_fieldsmeta' успішно створена.\n";
    } else {
        echo "Помилка створення таблиці 'user_fieldsmeta': " . $conn->error . "\n";
    }
}

function migrate_down($conn) {
    // Видалення таблиці case_fieldsmeta
    $sql1 = "DROP TABLE IF EXISTS case_fieldsmeta";

    // Видалення таблиці user_fieldsmeta
    $sql2 = "DROP TABLE IF EXISTS user_fieldsmeta";

    if ($conn->query($sql1) === TRUE) {
        echo "Таблиця 'case_fieldsmeta' успішно видалена.\n";
    } else {
        echo "Помилка видалення таблиці 'case_fieldsmeta': " . $conn->error . "\n";
    }

    if ($conn->query($sql2) === TRUE) {
        echo "Таблиця 'user_fieldsmeta' успішно видалена.\n";
    } else {
        echo "Помилка видалення таблиці 'user_fieldsmeta': " . $conn->error . "\n";
    }
}
?>
