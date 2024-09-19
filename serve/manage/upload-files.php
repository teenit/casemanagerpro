<?php
require_once '../config.php';

// Перевірка, чи було надіслано файли
if ($_SERVER['REQUEST_METHOD'] === 'POST' && !empty($_FILES['files'])) {
    // Перевірка, чи надійшли значення case_id та key
    var_dump($_POST['case_id']);
    var_dump($_POST['key']);

    // Перевірка, чи надійшли файли
    var_dump($_FILES);

    // Директорія для зберігання завантажених файлів
    $uploadDir = '../uploads/case/';

    // Масив для зберігання посилань на файли
    $fileLinks = array();

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
            echo "Помилка завантаження файлу: $name\n";
            continue;
        }

        // Генеруємо унікальне ім'я для файлу
        $fileName = $uploadDir . uniqid() . '_' . $name;

        // Переміщуємо файл з тимчасового місця розташування в директорію для зберігання
        if (move_uploaded_file($tmpName, $fileName)) {
            echo "Файл успішно переміщено: $fileName\n";
        } else {
            echo "Помилка переміщення файлу: $fileName\n";
            echo "Останній код помилки: " . error_get_last()['message'];
            continue; // Перейти до наступного файлу
        }

        // Вставляємо запис в БД
        $caseId = intval($_POST['case_id']); // Захист від SQL-ін'єкцій
        $metaKey = $conn->real_escape_string($_POST['key']); // Захист від SQL-ін'єкцій
        $metaValue = $fileName;
        $stmt = $conn->prepare("INSERT INTO casemeta (case_id, meta_key, meta_value) VALUES (?, ?, ?)");
        $stmt->bind_param("iss", $caseId, $metaKey, $metaValue); // Використання підготовленого зв'язування параметрів

        // Виконання запиту до бази даних
        if (!$stmt->execute()) {
            // Відкат транзакції у випадку помилки
            $conn->rollback();
            echo "Помилка вставки запису в БД: " . $stmt->error;
            exit();
        }

        // Додаємо посилання на файл до масиву
        $fileLinks[] = $fileName;
    }

    // Закінчення транзакції
    $conn->commit();

    // Повертаємо посилання на файли у вигляді JSON
    $fileLinks = array_map(function($fileName) {
        return 'http://' . $_SERVER['HTTP_HOST'] . '/'.$fileName; // Додаємо базову URL
    }, $fileLinks);
    echo json_encode($fileLinks);
} else {
    echo "Помилка: Немає файлів для завантаження";
}

// Закриття з'єднання
$conn->close();
?>
