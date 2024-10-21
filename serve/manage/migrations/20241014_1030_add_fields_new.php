<?php
function migrate_up($conn) {
    $sql = "ALTER TABLE fields_new 
            ADD COLUMN name VARCHAR(255) DEFAULT NULL, 
            ADD COLUMN unique VARCHAR(255) DEFAULT NULL, 
            ADD COLUMN icon VARCHAR(255) DEFAULT NULL";

    if ($conn->query($sql) === TRUE) {
        echo "Колонки 'name' та 'icon' успішно додані до таблиці 'fields_new'.\n";
        // Логування у файл
        file_put_contents('../../logs/log_migrations.log', "Колонки 'name' та 'icon' додані: " . date('Y-m-d H:i:s') . "\n", FILE_APPEND);
    } else {
        echo "Помилка додавання колонок 'name' та 'icon': " . $conn->error . "\n";
    }
}

function migrate_down($conn) {
    $sql = "ALTER TABLE fields_new 
            DROP COLUMN name, 
            DROP COLUMN unique, 
            DROP COLUMN icon";

    if ($conn->query($sql) === TRUE) {
        echo "Колонки 'name' та 'icon' успішно видалені з таблиці 'fields_new'.\n";
        // Логування у файл
        file_put_contents('../../logs/log_migrations.log', "Колонки 'name' та 'icon' видалені: " . date('Y-m-d H:i:s') . "\n", FILE_APPEND);
    } else {
        echo "Помилка видалення колонок 'name' та 'icon': " . $conn->error . "\n";
    }
}
?>
