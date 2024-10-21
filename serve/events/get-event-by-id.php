<?php
require_once '../config.php';
require_once '../functions.php';

// Отримання даних з фронтенду
$data = json_decode(file_get_contents('php://input'), true);

// Отримуємо event_id з фронта
$event_id = $data['event_id'];

// Перевіряємо, що event_id є
if (!isset($event_id)) {
    echo json_encode(array("status" => false, "message" => "Event ID is required"));
    exit;
}

try {
    // Перевірка статусу у таблиці events_new
    $checkStatusSql = "SELECT status FROM events_new WHERE id = ?";
    $stmt = $conn->prepare($checkStatusSql);
    if (!$stmt) {
        throw new Exception("Preparation failed: " . $conn->error);
    }

    $stmt->bind_param("i", $event_id);
    $stmt->execute();
    $stmt->bind_result($status);
    $stmt->fetch();
    $stmt->close();

    // Якщо статус дорівнює 0, припиняємо виконання скрипта
    if ($status === 0) {
        echo json_encode(array("status" => false, "message" => "Operation not allowed, event is inactive"));
        exit;
    }

    // Запит з JOIN до таблиць
    $sql = "
        SELECT 
            em.meta_key, 
            em.meta_value,
            em.id AS meta_id,
            u.userName, 
            u.phone AS user_phone, 
            u.type,
            u.id AS user_id,
            c.name AS case_name, 
            c.phone1 AS case_phone, 
            c.id AS case_id, 
            cm.meta_value AS categories
        FROM 
            eventsmeta em
        LEFT JOIN 
            users u ON em.meta_key = 'event_user_manager' AND u.id = em.meta_value
        LEFT JOIN 
            cases_new c ON em.meta_key = 'event_case_member' AND c.id = em.meta_value
        LEFT JOIN 
            casemeta cm ON em.meta_key = 'event_case_member' AND cm.case_id = em.meta_value AND cm.meta_key = 'categories'
        WHERE 
            em.event_id = ?";

    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        throw new Exception("Preparation failed: " . $conn->error);
    }

    $stmt->bind_param("i", $event_id);
    $stmt->execute();
    $result = $stmt->get_result();

    $results = [
        'event_user_manager' => array(),
        'event_case_member' => array(),
        'data' => array(),
    ];

    while ($row = $result->fetch_assoc()) {
        switch ($row['meta_key']) {
            case 'event_user_manager':
                if ($row['userName']) {
                    $results['event_user_manager'][] = [
                        'name' => $row['userName'],
                        'phone' => $row['user_phone'],
                        'type' => $row['type'],
                        'meta_id' => $row['meta_id'],
                        'user_id' => $row['user_id'],
                    ];
                }
                break;

            case 'event_case_member':
                if ($row['case_name']) {
                    $results['event_case_member'][] = [
                        'name' => $row['case_name'],
                        'phone' => decryptData($row['case_phone'], $key), // виправлено на $row['case_phone']
                        'categories' => $row['categories'],
                        'meta_id' => $row['meta_id'],
                        'case_id' => $row['case_id'],
                    ];
                }
                break;

            case 'event_user_manager_new':
                $value = json_decode($row['meta_value']);
                $results['event_user_manager_new'][] = [
                    'name' => $value->name,
                    'phone' => $value->phone,
                    'role' => $value->role,
                    'meta_id' => $row['meta_id']
                ];
                break;
            case 'event_case_manager_new':
                $value = json_decode($row['meta_value']);
                $results['event_case_member_new'][] = [
                    'name' => $value->name,
                    'phone' => $value->phone,
                    'role' => $value->role,
                    'meta_id' => $row['meta_id']
                ];
                break;
            case 'event_files':
                $value = json_decode($row['meta_value']);
                $results['event_files'][] = [
                    'link' => "https://".$_SERVER['SERVER_NAME']."/serve/uploads/event/".$value->link,
                    'name' => $value->name,
                    'description' => $value->description,
                    'size' => $value->size,
                    'title' => $value->title,
                    'type' => $value->type,
                    'meta_id' => $row['meta_id'],
                    
                ];
                break;
            case 'event_plan':
                $value = json_decode($row['meta_value']);
                $results['event_plans'][] = [
                    'title' => $value->title,
                    'description' => $value->description,
                    'endDate' => $value->endDate,
                    'endTime' => $value->endTime,
                    'startDate' => $value->startDate,
                    'startTime' => $value->startTime,
                    'plan_id' => $row['meta_id']
                ];
                break;
            case 'event_feedback':
                $value = json_decode($row['meta_value'], true); // Декодуємо як асоціативний масив
                if (isset($value['plan_id'])) {
                    $plan_id = $value['plan_id'];
                    unset($value['plan_id']); // Видаляємо plan_id з масиву
                    $results['event_feedbacks'][$plan_id][] = [
                        'value' => $value['value'],
                        'feedback_id' => $row['meta_id'],
                        'plan_id' => $plan_id
                    ];
                }
                break;
            default:
                $results['data'][] = [
                    'data' => json_decode($row['meta_value']),
                    'meta_id' => $row['meta_id']
                ];
                break;
        }
    }

    // Закриваємо з'єднання
    $stmt->close();
    $conn->close();

    // Повертаємо результати у форматі JSON
    echo json_encode($results);

} catch (Exception $e) {
    // Обробка винятків та помилок
    echo json_encode(array("status" => false, "message" => $e->getMessage()));
    if (isset($stmt)) {
        $stmt->close();
    }
    $conn->close();
}
?>
