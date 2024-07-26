<?php
require_once 'config.php';

// Перевірка, чи було надіслано файли
if ($_SERVER['REQUEST_METHOD'] === 'POST' && !empty($_FILES['files'])) {
    // Перевірка, чи надійшли значення user_id та key
    $metaData = json_decode($_POST['meta'], true);
    if (isset($metaData['user_id']) && isset($metaData['key'])) {
        $userId = intval($metaData['user_id']); // Захист від SQL-ін'єкцій
        $metaKey = $conn->real_escape_string($metaData['key']); // Захист від SQL-ін'єкцій
    } else {
        echo json_encode(["error" => "Немає значень user_id або key"]);
        exit();
    }

    // Перевірка, чи надійшли файли
    if (isset($_FILES['files']) && is_array($_FILES['files']['name'])) {
        // Директорія для зберігання завантажених файлів
        $uploadDir = 'uploads/user/';

        // Масив для зберігання посилань на файли
        $fileLinks = [];

        // Початок транзакції
        $conn->begin_transaction();

        // Перебираємо кожен завантажений файл
        foreach ($_FILES['files']['name'] as $index => $name) {
            // Отримання тимчасового імені та інших властивостей файлу
            $tmpName = $_FILES['files']['tmp_name'][$index];
            $type = $_FILES['files']['type'][$index];
            $error = $_FILES['files']['error'][$index];
            $size = $_FILES['files']['size'][$index];

            // Перевірка, чи є помилка при завантаженні файлу
            if ($error !== UPLOAD_ERR_OK) {
                echo json_encode(["error" => "Помилка завантаження файлу: $name"]);
                continue;
            }

            // Генеруємо унікальне ім'я для файлу
            $fileName = $uploadDir . uniqid() . '_' . $name;

            // Переміщуємо файл з тимчасового місця розташування в директорію для зберігання
            if (move_uploaded_file($tmpName, $fileName)) {
                // Створення об'єкта посилання на файл
                $link = new stdClass();
                $link->link = "https://" . $_SERVER['SERVER_NAME'] . "/serve/" . $fileName;
                $link->type = $type;
                $link->size = $size;
                $link->name = $name;

                // Перевірка наявності запису в БД
                $checkStmt = $conn->prepare("SELECT COUNT(*) FROM usermeta WHERE user_id = ? AND meta_key = 'user_profile_img'");
                $checkStmt->bind_param("i", $userId);
                $checkStmt->execute();
                $checkStmt->bind_result($count);
                $checkStmt->fetch();
                $checkStmt->close();

                if ($count > 0) {
                    // Оновлення запису в БД
                    $updateStmt = $conn->prepare("UPDATE usermeta SET meta_value = ? WHERE user_id = ? AND meta_key = ?");
                    $jsonLink = json_encode($link, JSON_UNESCAPED_UNICODE);
                    $updateStmt->bind_param("sis", $jsonLink, $userId, $metaKey);
                    if (!$updateStmt->execute()) {
                        // Відкат транзакції у випадку помилки
                        $conn->rollback();
                        echo json_encode(["error" => "Помилка оновлення запису в БД: " . $updateStmt->error]);
                        exit();
                    }
                    $updateStmt->close();
                } else {
                    // Вставка запису в БД
                    $insertStmt = $conn->prepare("INSERT INTO usermeta (user_id, meta_key, meta_value) VALUES (?, ?, ?)");
                    $jsonLink = json_encode($link, JSON_UNESCAPED_UNICODE);
                    $insertStmt->bind_param("iss", $userId, $metaKey, $jsonLink);
                    if (!$insertStmt->execute()) {
                        // Відкат транзакції у випадку помилки
                        $conn->rollback();
                        echo json_encode(["error" => "Помилка вставки запису в БД: " . $insertStmt->error]);
                        exit();
                    }
                    $insertStmt->close();
                }

                // Додаємо посилання на файл до масиву
                $fileLinks[] = $link;
            } else {
                echo json_encode(["error" => "Помилка переміщення файлу: $fileName. " . error_get_last()['message']]);
                continue; // Перейти до наступного файлу
            }
        }

        // Закінчення транзакції
        $conn->commit();

        // Повертаємо посилання на файли у вигляді JSON
        echo json_encode($fileLinks, JSON_UNESCAPED_UNICODE);
    } else {
        echo json_encode(["error" => "Немає файлів для завантаження"]);
    }
} else {
    echo json_encode(["error" => "Неправильний метод запиту або немає файлів для завантаження"]);
}

// Закриття з'єднання
$conn->close();
?>
