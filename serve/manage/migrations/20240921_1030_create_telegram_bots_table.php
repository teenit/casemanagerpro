<?php
function migrate_up($conn) {
    // Створюємо таблицю telegram_bots
    $sql = "CREATE TABLE IF NOT EXISTS telegram_bots (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        bot_name VARCHAR(255) NOT NULL,
        chat_id VARCHAR(255) NOT NULL,
        bot_token VARCHAR(255) NOT NULL,
        type VARCHAR(255) NOT NULL,
        is_active TINYINT(1) DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )";

    if ($conn->query($sql) === TRUE) {
        echo "Таблиця 'telegram_bots' успішно створена.\n";
    } else {
        echo "Помилка створення таблиці 'telegram_bots': " . $conn->error . "\n";
    }
}

function migrate_down($conn) {
    // Видаляємо таблицю telegram_bots
    $sql = "DROP TABLE IF EXISTS telegram_bots";

    if ($conn->query($sql) === TRUE) {
        echo "Таблиця 'telegram_bots' успішно видалена.\n";
    } else {
        echo "Помилка видалення таблиці 'telegram_bots': " . $conn->error . "\n";
    }
}
?>
