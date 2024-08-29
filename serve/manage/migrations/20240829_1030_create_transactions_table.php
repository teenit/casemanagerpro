<?php
function migrate_up($conn) {
    $sql = "CREATE TABLE IF NOT EXISTS transactions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        transaction_type VARCHAR(50) NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        currency VARCHAR(10) NOT NULL,
        status VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        reference_id VARCHAR(255),
        description TEXT,
        payment_method VARCHAR(50),
        ip_address VARCHAR(45),
        location VARCHAR(255)
    )";

    if ($conn->query($sql) === TRUE) {
        echo "Таблиця 'transactions' успішно створена.\n";
    } else {
        echo "Помилка створення таблиці 'transactions': " . $conn->error . "\n";
    }
}

function migrate_down($conn) {
    $sql = "DROP TABLE IF EXISTS transactions";

    if ($conn->query($sql) === TRUE) {
        echo "Таблиця 'transactions' успішно видалена.\n";
    } else {
        echo "Помилка видалення таблиці 'transactions': " . $conn->error . "\n";
    }
}
