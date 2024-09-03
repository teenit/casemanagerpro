<?php
require_once '../../config.php';
require_once '../../functions.php';

// Отримання даних з POST-запиту у форматі JSON
$data = json_decode(file_get_contents('php://input'));

// Перевірка наявності токену
if (empty($data->token)) {
    exit(json_encode(['status' => false, 'list' => [], 'message' => 'Token is missing.']));
}

// Валідація токену (якщо потрібна)
// if (!validateToken($data->token)) {
//     exit(json_encode(['status' => false, 'list' => [], 'message' => 'Invalid token.']));
// }

// Отримання параметрів пагінації з POST-запиту
$page = isset($data->page) ? (int)$data->page : 1;
$limit = isset($data->limit) ? (int)$data->limit : 100;
$offset = ($page - 1) * $limit;

// Запит до таблиці users для отримання прав доступу
$sql_access = "
SELECT 
    access.*
FROM 
    users 
JOIN 
    access 
ON 
    users.access = access.id 
WHERE 
    users.id = ?";

// Підготовка та виконання запиту
$stmt_access = $conn->prepare($sql_access);
$stmt_access->bind_param('i', $data->id);
$stmt_access->execute();
$access_rights = $stmt_access->get_result()->fetch_assoc();
$stmt_access->close();

// Перевірка прав доступу
if ($access_rights['a_blocked'] == 1) {
    exit(json_encode(['status' => false, 'list' => [], 'message' => 'Access is blocked.']));
}

if ($access_rights['a_page_cases'] == 0 && 
    (is_null($access_rights['a_super']) || $access_rights['a_super'] == 0) && 
    (is_null($access_rights['a_administrator']) || $access_rights['a_administrator'] == 0)
) {
    exit(json_encode(['status' => false, 'list' => [], 'message' => 'Access denied due to insufficient permissions.']));
}

// Формування умов доступу
$case_conditions = [];
if (($access_rights['a_super'] == 1 || $access_rights['a_administrator'] == 1) && $access_rights['a_blocked'] != 1) {
    // Повний доступ до всіх кейсів
    $case_conditions[] = "1=1"; 
} elseif ($access_rights['a_page_cases'] == 1) {
    if ($access_rights['a_cases_get'] == 1) {
        // Доступ тільки до своїх кейсів
        $case_conditions[] = "(cn.user_id = {$data->id} OR cn.responsible_id = {$data->id})";
    } elseif ($access_rights['a_cases_get'] == 2) {
        // Доступ до призначених кейсів
        $ids = json_decode($access_rights['a_cases_look_id'], true);
        $category_ids = json_decode($access_rights['a_cases_category_look_id'], true);
        $ids_condition = !empty($ids) ? "cn.id IN (" . implode(',', $ids) . ")" : "0=1";
        $categories_condition = !empty($category_ids) ? "JSON_CONTAINS(cd.categories, JSON_ARRAY(" . implode(',', $category_ids) . "), '$')" : "0=1";
        $case_conditions[] = "($ids_condition OR $categories_condition) OR (cn.user_id = {$data->id} OR cn.responsible_id = {$data->id})";
    } elseif ($access_rights['a_cases_get'] == 7) {
        // Повний доступ до всіх кейсів
        $case_conditions[] = "1=1"; 
    } elseif ($access_rights['a_cases_get'] == 0) {
        // Доступ заборонено
        exit(json_encode(['status' => false, 'list' => [], 'message' => 'Access denied.']));
    } elseif ($access_rights['a_cases_get'] == 3) {
        // Ваші додаткові правила для a_cases_get == 3
        // Наприклад: $case_conditions[] = "custom condition";
    }
}

// Формування умови WHERE
$where_clause = !empty($case_conditions) ? implode(' OR ', $case_conditions) : "1=1";
$sortField = $data->sort->field ?? 'active';
$sortOrder = $data->sort->order ?? 'DESC';

// Створення основного SQL-запиту з урахуванням умов доступу, пагінації та сортування
$sql = "
SELECT 
    cn.id, 
    cn.name, 
    cn.first_name, 
    cn.middle_name, 
    cn.last_name, 
    cn.user_id, 
    cn.responsible_id, 
    cn.phone1, 
    cn.phone2, 
    cn.happy_bd, 
    cn.email, 
    cn.active,
    cd.id AS data_id,
    cd.categories,
    cd.contract_date,
    cd.contract_number,
    cn.sex,
    cd.address_live,
    cm.meta_value AS case_profile_img
FROM 
    cases_new cn 
JOIN 
    cases_data cd 
ON 
    cn.id = cd.case_id
LEFT JOIN
    casemeta cm
ON
    cn.id = cm.case_id AND cm.meta_key = 'case_profile_img'
WHERE 
    $where_clause
ORDER BY 
    $sortField $sortOrder
LIMIT ? OFFSET ?";

// Підготовка та виконання запиту
$stmt_cases = $conn->prepare($sql);

if (!$stmt_cases) {
    exit(json_encode(['status' => false, 'list' => [], 'message' => 'Failed to prepare SQL query.']));
}

// Встановлення параметрів пагінації
$stmt_cases->bind_param('ii', $limit, $offset);
$stmt_cases->execute();
$result = $stmt_cases->get_result();

// Масив для зберігання результатів
$mas = [];

// Ітерація через результати запиту та створення об'єктів для збереження даних
while ($res = $result->fetch_assoc()) {
    $obj = new stdClass();
    $obj->{'id'} = $res['id'];
    $obj->{'first_name'} = $res['first_name'];
    $obj->{'middle_name'} = $res['middle_name'];
    $obj->{'last_name'} = $res['last_name'];
    $obj->{'name'} = $res['middle_name'] . ' ' . $res['first_name'] . ' ' .  $res['last_name'];
    $obj->{'phone1'} = decryptData($res['phone1'], $key);
    $obj->{'phone2'} = decryptData($res['phone2'], $key);
    $obj->{'email'} = decryptData($res['email'], $key);
    $obj->{'data_id'} = $res['data_id'];
    $obj->{'contractDate'} = $res['contract_date'];
    $obj->{'contract_number'} = $res['contract_number'];
    $obj->{'addressLive'} = $res['address_live'];
    $obj->{'happyBD'} = $res['happy_bd'];
    $obj->{'user_id'} = $res['user_id'];
    $obj->{'sex'} = $res['sex'];
    $obj->{'active'} = $res['active'];
    $obj->{'responsible_id'} = $res['responsible_id'];
    $obj->{'categories'} = json_decode($res['categories']);
    $obj->{'profileImg'} = json_decode($res['case_profile_img']);

    // Додавання об'єкта до масиву
    $mas[] = $obj;
}

// Закриття підключення до бази даних
mysqli_close($conn);

// Перевірка, чи були знайдені кейси
$status = !empty($mas);

// Вивід результату у форматі JSON
echo json_encode(['status' => $status, 'list' => $mas, 'message' => $status ? 'Cases retrieved successfully.' : 'No cases found or access denied.']);
