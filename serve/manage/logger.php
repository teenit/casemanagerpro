<?php
function logMessage($message, $file) {
    $time = date('Y-m-d H:i:s');
    file_put_contents($file, "[$time] $message\n", FILE_APPEND);
    echo "[$time] $message\n"; // Додаємо відлагоджувальне повідомлення
}
