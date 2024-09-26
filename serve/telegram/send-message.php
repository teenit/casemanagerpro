<?php
// Функція для логування повідомлень
function logMessageTelegram($message) {
    $logFile = '../logs/telegram_messages.log'; // Шлях до файлу з логами
    $logEntry = "[" . date('Y-m-d H:i:s') . "] " . $message . PHP_EOL;
    file_put_contents($logFile, $logEntry, FILE_APPEND);
}

function saveTelegramFiles($files) {
    // Шлях до папки для збереження
    $uploadDir = '../uploads/telegram/';
    
    // Перевіряємо наявність папки та створюємо її, якщо вона не існує
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true); // Рекурсивно створюємо папки з правами на запис
    }
    
    $savedFiles = [];
    
    // Проходимо по кожному файлу
    foreach ($files['tmp_name'] as $key => $tmpName) {
        if (is_uploaded_file($tmpName)) {
            $fileName = basename($files['name'][$key]);
            $filePath = $uploadDir . $fileName;
            
            // Переміщуємо файл з тимчасової папки до зазначеної
            if (move_uploaded_file($tmpName, $filePath)) {
                $savedFiles[] = $filePath; // Додаємо шлях до збереженого файлу в масив
            } else {
                return ['status' => false, 'message' => 'Помилка збереження файлу: ' . $fileName];
            }
        }
    }
    
    if (!empty($savedFiles)) {
        return ['status' => true, 'files' => $savedFiles];
    } else {
        return ['status' => false, 'message' => 'Не було завантажено файлів для збереження'];
    }
}


// Функція для відправки текстового повідомлення
function telegramSendMessage($conn, $botToken, $chatId, $message, $botId, $userId) {
    $url = "https://api.telegram.org/bot$botToken/sendMessage";
    
    $postData = [
        'chat_id' => $chatId,
        'text' => $message,
        'parse_mode' => 'HTML'
    ];

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($ch);
    $error = curl_error($ch);
    curl_close($ch);

    if ($error) {
        logMessageTelegram("Помилка відправки повідомлення: $error");
        return ['status' => false, 'message' => "Помилка відправки: $error"];
    }

    $responseData = json_decode($response, true);
    
    if ($responseData['ok']) {
        addTelegramMessage($conn, $botId, $userId, $message);
        logMessageTelegram("Повідомлення успішно відправлено");
        return ['status' => true, 'message' => 'Повідомлення успішно відправлено'];
    } else {
        logMessageTelegram("Помилка відправки повідомлення: " . $responseData['description']);
        return ['status' => false, 'message' => 'Помилка відправки: ' . $responseData['description']];
    }
}

// Функція для відправки медіа-групи
function sendMediaGroupToTelegram($conn, $botToken, $chatId, $message = '', $files = [], $botId, $userId) {
    $telegramApiUrl = "https://api.telegram.org/bot$botToken/sendMediaGroup";
    $media = [];
    $arrayQuery = [
        'chat_id' => $chatId,
    ];

    foreach ($files['tmp_name'] as $key => $tmpName) {
        if (is_uploaded_file($tmpName)) {
            $filePath = $tmpName;
            $fileName = basename($files['name'][$key]);
            $fileType = mime_content_type($filePath);

            $mediaType = strpos($fileType, 'image') !== false ? 'photo' : 
                         (strpos($fileType, 'video') !== false ? 'video' : null);

            if ($mediaType) {
                $media[] = [
                    'type' => $mediaType,
                    'media' => 'attach://' . $fileName,
                    'caption' => ($key == 0 && !empty($message)) ? $message : ''
                ];

                $arrayQuery[$fileName] = new CURLFile($filePath);
            }
        }
    }

    if (count($media) > 0) {
        
        $arrayQuery['media'] = json_encode($media);

        $ch = curl_init($telegramApiUrl);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $arrayQuery);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $response = curl_exec($ch);
        $error = curl_error($ch);
        curl_close($ch);

        if ($error) {
            logMessageTelegram("Помилка при відправці медіа-групи: " . $error);
            return ['status' => false, 'message' => 'Помилка відправки медіа-групи'];
        }

        $responseData = json_decode($response, true);
        if (!$responseData['ok']) {
            logMessageTelegram("Помилка при відправці медіа-групи: " . $responseData['description']);
            return ['status' => false, 'message' => 'Помилка відправки медіа-групи'];
        }

        logMessageTelegram("Медіа-група успішно відправлена.");
        $savedFiles = saveTelegramFiles($files);
        addTelegramMessage($conn, $botId, $userId, $message, $savedFiles['files']);

        return ['status' => true, 'message' => 'Медіа-група успішно відправлена'];
    }

    return ['status' => false, 'message' => 'Немає файлів для відправки'];
}

function addTelegramMessage($conn, $botId, $userId, $messageText, $messageFiles = []) {
    // Конвертуємо масив файлів в JSON, якщо він не порожній
    $messageFilesJson = !empty($messageFiles) ? json_encode($messageFiles) : null;

    // SQL-запит для вставки нового запису
    $sql = "INSERT INTO telegram_messages (bot_id, user_id, message_text, message_files) VALUES (?, ?, ?, ?)";

    if ($stmt = $conn->prepare($sql)) {
        // Прив'язуємо параметри до запиту
        $stmt->bind_param("iiss", $botId, $userId, $messageText, $messageFilesJson);

        // Виконуємо запит
        if ($stmt->execute()) {
            $stmt->close();
            return ['status' => true, 'message' => 'Повідомлення успішно додано до бази даних'];
        } else {
            $stmt->close();
            return ['status' => false, 'message' => 'Помилка додавання повідомлення: ' . $stmt->error];
        }
    } else {
        return ['status' => false, 'message' => 'Помилка підготовки запиту: ' . $conn->error];
    }
}


// Основна функція для обробки повідомлення
function processTelegramMessage($conn, $botId, $message='', $files = [], $userId) {
    if (!$botId) {
        return ['status' => false, 'message' => 'Не вказано bot_id'];
    }

    $sql = "SELECT bot_token, chat_id FROM telegram_bots WHERE id = ?";
    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("i", $botId);
        $stmt->execute();
        $stmt->bind_result($botToken, $chatId);
        $stmt->fetch();
        $stmt->close();

        if (!$botToken || !$chatId) {
            return ['status' => false, 'message' => 'Бот або chat_id не знайдені'];
        }

        if (empty($files)) {
            $response = telegramSendMessage($conn, $botToken, $chatId, $message, $botId, $userId);
        } else {
            $response = sendMediaGroupToTelegram($conn, $botToken, $chatId, $message, $files, $botId, $userId);
        }
        
        logMessageTelegram($response['message']);
        return $response;
    } else {
        return ['status' => false, 'message' => 'Помилка підключення до бази даних'];
    }
}
