<?
require_once '../config.php';
require_once '../send-mail.php';

function getUserById($userId) {
    // Доступ до глобальної змінної $conn
    global $conn;

    // Використовуйте підготовлений запит для захисту від SQL-ін'єкцій
    $stmt = $conn->prepare("SELECT * FROM users WHERE id = ?");
    $stmt->bind_param("i", $userId); // Прив'язка параметра як цілого числа

    if ($stmt->execute()) {
        // Отримання результату
        $result = $stmt->get_result();

        // Перевірка, чи знайдено користувача
        if ($result->num_rows > 0) {
            // Повернення даних користувача як асоціативний масив
            return $result->fetch_assoc();
        } else {
            // Повернення пустого масиву, якщо користувача не знайдено
            return [];
        }
    } else {
        // Обробка помилок
        return ['error' => $stmt->error];
    }
}

function getCaseById($caseId) {
    // Доступ до глобальної змінної $conn
    global $conn;

    // Використовуйте підготовлений запит для захисту від SQL-ін'єкцій
    $stmt = $conn->prepare("SELECT * FROM cases_new WHERE id = ?");
    $stmt->bind_param("i", $caseId); // Прив'язка параметра як цілого числа

    if ($stmt->execute()) {
        // Отримання результату
        $result = $stmt->get_result();

        // Перевірка, чи знайдено користувача
        if ($result->num_rows > 0) {
            // Повернення даних користувача як асоціативний масив
            return $result->fetch_assoc();
        } else {
            // Повернення пустого масиву, якщо користувача не знайдено
            return [];
        }
    } else {
        // Обробка помилок
        return ['error' => $stmt->error];
    }
}

function getUsersIds() {
    // Доступ до глобальної змінної $conn
    global $conn;

    // Використовуйте підготовлений запит для захисту від SQL-ін'єкцій
    $stmt = $conn->prepare("SELECT id FROM users");

    if ($stmt->execute()) {
        // Отримання результату
        $result = $stmt->get_result();

        // Перевірка, чи знайдено користувачів
        if ($result->num_rows > 0) {
            // Ініціалізація масиву для зберігання всіх id
            $userIds = [];
            
            // Перебір всіх рядків результату
            while ($row = $result->fetch_assoc()) {
                $userIds[] = $row['id'];
            }
            
            // Повернення масиву з усіма id
            return $userIds;
        } else {
            // Повернення пустого масиву, якщо користувачів не знайдено
            return [];
        }
    } else {
        // Обробка помилок
        return ['error' => $stmt->error];
    }
}
