<?php
function migrate_up($conn) {
    $sql = "ALTER TABLE groups 
            ADD COLUMN is_favourite TINYINT(1) DEFAULT 0 NOT NULL";

    if ($conn->query($sql) === TRUE) {
        echo "Колонка 'is_favourite' успішно додана в таблицю 'groups'.\n";
    } else {
        echo "Помилка додавання колонки 'is_favourite': " . $conn->error . "\n";
    }
}

function migrate_down($conn) {
    $sql = "ALTER TABLE groups 
            DROP COLUMN is_favourite";

    if ($conn->query($sql) === TRUE) {
        echo "Колонка 'is_favourite' успішно видалена з таблиці 'groups'.\n";
    } else {
        echo "Помилка видалення колонки 'is_favourite': " . $conn->error . "\n";
    }
}
?>
