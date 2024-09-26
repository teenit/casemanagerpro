<?php
function migrate_up($conn) {
    $sql = "CREATE TABLE IF NOT EXISTS telegram_messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        bot_id INT NOT NULL,
        user_id INT NOT NULL,
        message_text TTEXT NULL DEFAULT NULL,
        message_files TEXT NULL DEFAULT NULL,
        sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR(50) DEFAULT 'sent',
        FOREIGN KEY (bot_id) REFERENCES telegram_bots(id) ON DELETE CASCADE
    )";

    if ($conn->query($sql) === TRUE) {
        echo "Таблиця 'telegram_messages' успішно створена.\n";
    } else {
        echo "Помилка створення таблиці 'telegram_messages': " . $conn->error . "\n";
    }
}

function migrate_down($conn) {
    $sql = "DROP TABLE IF EXISTS telegram_messages";

    if ($conn->query($sql) === TRUE) {
        echo "Таблиця 'telegram_messages' успішно видалена.\n";
    } else {
        echo "Помилка видалення таблиці 'telegram_messages': " . $conn->error . "\n";
    }
}
?>
