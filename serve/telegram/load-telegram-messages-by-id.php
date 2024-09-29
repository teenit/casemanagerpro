<?php
require_once '../config.php';  // Підключення до бази даних

function getTelegramMessagesList($conn, $botId, $page, $perPage, $orderBy, $orderDirection) {
    // Перевіряємо чи передано bot_id
    if (!$botId) {
        return ['status' => false, 'message' => 'Не вказано bot_id'];
    }

    // Обмежуємо значення поля orderDirection, щоб запобігти SQL-ін'єкції
    $orderDirection = strtoupper($orderDirection) === 'DESC' ? 'DESC' : 'ASC';

    // Дозволені поля для сортування (щоб уникнути SQL-ін'єкції)
    $allowedFields = ['message_text', 'message_files', 'sent_at'];
    if (!in_array($orderBy, $allowedFields)) {
        return ['status' => false, 'message' => 'Некоректне поле для сортування'];
    }

    // Обчислюємо зсув для пагінації
    $offset = ($page - 1) * $perPage;

    // SQL запит для отримання повідомлень з фільтром за bot_id та сортуванням
    $sql = "SELECT * FROM telegram_messages WHERE bot_id = ? ORDER BY $orderBy $orderDirection LIMIT ?, ?";

    // Підготовка та виконання запиту
    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("iii", $botId, $offset, $perPage);
        $stmt->execute();
        $result = $stmt->get_result();
        // Автоматичне отримання базового URL
        $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
        $host = $_SERVER['HTTP_HOST'];
        $baseUrl = $protocol . $host . '/serve';
        // Перевірка наявності результатів
        if ($result->num_rows > 0) {
            $messages = [];
            while ($row = $result->fetch_assoc()) {
                $files = json_decode($row['message_files'], true) ?? [];

                // Обробляємо кожне посилання на файл
                foreach ($files as &$file) {
                    // Перевіряємо, чи не є посилання вже абсолютним
                    if (strpos($file, 'http') !== 0) {
                        // Додаємо базовий URL до шляху файлу
                        $file = $baseUrl . str_replace('..', '', $file);
                    }
                }
            
                $messages[] = [
                    "sent_at" => $row['sent_at'],
                    "files" => $files,
                    "message" => $row['message_text'],
                    "message_id" => $row['id']
                ];
            }

            // Повертаємо результати з пагінацією
            return ['status' => true, 'data' => $messages];
        } else {
            return ['status' => false, 'message' => 'Повідомлень немає'];
        }

        $stmt->close();
    } else {
        return ['status' => false, 'message' => 'Помилка запиту до бази даних'];
    }
}

// Отримуємо дані з POST запиту
$data = json_decode(file_get_contents('php://input'), true);
$botId = $data['bot_id'] ?? null;
$page = $data['page'] ?? 1;
$perPage = $data['per_page'] ?? 10;
$orderBy = $data['order_by'] ?? 'sent_at';  // Поле для сортування (за замовчуванням 'created_at')
$orderDirection = $data['order_direction'] ?? 'DESC';  // Напрям сортування (за замовчуванням 'DESC')

// Виклик функції для отримання повідомлень
$response = getTelegramMessagesList($conn, $botId, $page, $perPage, $orderBy, $orderDirection);

// Відповідь у форматі JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
