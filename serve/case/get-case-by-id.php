<?php
require_once '../config.php';
require_once '../functions.php';
// Отримуємо case_id з JSON-запиту
$data = json_decode(file_get_contents('php://input'));
$case_id = $data->case_id;

function getAndMergeData($conn, $group, $table, $clientIdField, $clientId) {
    // Запит до таблиці fields_new з фільтрацією за значенням group
    $sqlFields = "SELECT * FROM fields_new WHERE `group` = ?";
    $stmtFields = $conn->prepare($sqlFields);

    if ($stmtFields === false) {
        echo json_encode(array("status" => false, "message" => "Prepare failed: " . $conn->error));
        return;
    }

    // Прив'язка параметра $group
    $stmtFields->bind_param("s", $group);
    $stmtFields->execute();
    $resultFields = $stmtFields->get_result();

    // Збереження результату першого запиту
    $fieldsData = [];
    while ($row = $resultFields->fetch_assoc()) {
        $fieldsData[$row['id']] = $row;
    }

    // Закриття запиту
    $stmtFields->close();

    // Запит до іншої таблиці $table з фільтрацією за значенням $clientIdField і $clientId
    $sqlClient = "SELECT * FROM $table WHERE $clientIdField = ?";
    $stmtClient = $conn->prepare($sqlClient);

    if ($stmtClient === false) {
        echo json_encode(array("status" => false, "message" => "Prepare failed: " . $conn->error));
        return;
    }

    // Прив'язка параметра $clientId
    $stmtClient->bind_param("i", $clientId);
    $stmtClient->execute();
    $resultClient = $stmtClient->get_result();


    while ($row = $resultClient->fetch_assoc()) {
        if (isset($fieldsData[$row['field_id']])) {
            // Додаємо 'value' до відповідного поля у $fieldsData
            $fieldsData[$row['field_id']]['value'] = $row['value'];
        }
    }

    $fieldsMas = [
        "contacts"=>[],
        "works"=>[],
        "another"=>[]
    ];

    foreach ($fieldsData as $id => $field) {
        switch($field['block_view']) {
            case "contacts":
                $fieldsMas["contacts"][]=$field;
                break;
            case "works":
                $fieldsMas["works"][]=$field;
                break;
            default:
                $fieldsMas["another"][]=$field;
        };
    }
    // Закриття запиту
    $stmtClient->close();

    return $fieldsMas;
}

// Використання функції:
// $conn - це ваше підключення до бази даних
// $group - значення для поля group у таблиці fields_new
// $table - назва таблиці для другого запиту
// $clientIdField - поле, за яким фільтрується у другій таблиці
// $clientId - значення для фільтрації у другій таблиці

try {
    // Перевірка з'єднання
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Отримання даних з таблиці cases_new
    $sql_cases_new = "
    SELECT *
    FROM cases_new
    WHERE cases_new.id = ?";
    $stmt_cases_new = $conn->prepare($sql_cases_new);
    $stmt_cases_new->bind_param("i", $case_id);
    $stmt_cases_new->execute();
    $result_cases_new = $stmt_cases_new->get_result();
    $row_cases_new = $result_cases_new->fetch_assoc();

    // Отримання даних з таблиці casemeta
    $sql_case_meta = "SELECT * FROM casemeta WHERE case_id = ?";
    $stmt_case_meta = $conn->prepare($sql_case_meta);
    $stmt_case_meta->bind_param("i", $case_id);
    $stmt_case_meta->execute();
    $result_case_meta = $stmt_case_meta->get_result();
    $case_meta_data = [];
    $case_meta_obj = new stdClass();
    $case_meta_obj->{'files'} = [];
    $case_meta_obj->{'history_files'} = [];
    while ($row_case_meta = $result_case_meta->fetch_assoc()) {
        $case_meta_data[] = $row_case_meta;
        switch ($row_case_meta['meta_key']) {
            case 'case_files':
                $obj = new stdClass();
                $obj->{'link'} = json_decode($row_case_meta['meta_value']);
                $obj->{'meta_id'} = $row_case_meta['meta_id'];
                $case_meta_obj->{'files'}[] = json_decode($row_case_meta['meta_value']);
                break;
            case 'history_case_files':
                $obj = new stdClass();
                $obj->{'link'} = json_decode($row_case_meta['meta_value']);
                $obj->{'meta_id'} = $row_case_meta['meta_id'];
                $case_meta_obj->{'history_files'}[] = json_decode($row_case_meta['meta_value']);
                break;
            case 'case_profile_img':
                $obj = new stdClass();
                $obj->{'link'} = json_decode($row_case_meta['meta_value']);
                $obj->{'meta_id'} = $row_case_meta['meta_id'];
                $case_meta_obj->{'profileImg'} = $obj;
                break;
            case 'case_view_info':

                $case_meta_obj->{'viewInfo'} = json_decode($row_case_meta['meta_value']);
                break;
        }
    }

    // Отримання даних з таблиці case_plans
    $sql_case_plans = "SELECT * FROM case_plans WHERE case_id = ? ORDER BY id DESC";
    $stmt_case_plans = $conn->prepare($sql_case_plans);
    $stmt_case_plans->bind_param("i", $case_id);
    $stmt_case_plans->execute();
    $result_case_plans = $stmt_case_plans->get_result();
    $case_plans_data = [];

    while ($row_case_plans = $result_case_plans->fetch_assoc()) {
        $case_plans_data[] = $row_case_plans;
    }

    // Отримання даних з таблиці case_plans
    $sql_case_notes = "SELECT * FROM case_notes WHERE case_id = ? ORDER BY id DESC";
    $stmt_case_notes = $conn->prepare($sql_case_notes);
    $stmt_case_notes->bind_param("i", $case_id);
    $stmt_case_notes->execute();
    $result_case_notes = $stmt_case_notes->get_result();
    $case_notes_data = [];

    while ($row_case_notes = $result_case_notes->fetch_assoc()) {
        $case_notes_data[] = [
            "note_id"=>$row_case_notes["id"],
            "text"=>$row_case_notes["text"],
            "color"=>$row_case_notes["color"],
            "user_id"=>$row_case_notes["user_id"],
            "date_created"=>$row_case_notes["date_created"]
        ];
    }

    // Отримання даних з таблиці case_plans
    $sql_case_helps = "SELECT * FROM case_helps WHERE case_id = ? ORDER BY id DESC";
    $stmt_case_helps = $conn->prepare($sql_case_helps);
    $stmt_case_helps->bind_param("i", $case_id);
    $stmt_case_helps->execute();
    $result_case_helps = $stmt_case_helps->get_result();
    $case_helps_data = [];

    while ($row_case_helps = $result_case_helps->fetch_assoc()) {
        $case_helps_data[] = $row_case_helps;
    }

    // Отримання даних з таблиці case_plans
    $sql_user_meta = "SELECT * FROM usermeta WHERE user_id = ?";
    $stmt_user_meta = $conn->prepare($sql_user_meta);
    $stmt_user_meta->bind_param("i", $data->id);
    $stmt_user_meta->execute();
    $result_user_meta = $stmt_user_meta->get_result();
    $user_meta = [];

    while ($row_user_meta = $result_user_meta->fetch_assoc()) {
        if ($row_user_meta['meta_key'] == 'case_view_info') {
            $user_meta = [
                "case_view_info" => [
                    'meta_id' => $row_user_meta['meta_id'],
                    'key' => $row_user_meta['meta_key'],
                    'value' => json_decode($row_user_meta['meta_value'])
                ]
            ];
        }

    }

     // Отримання даних з таблиці case_plans
     $sql_files = "SELECT title, description, id, date_created, type, value, tag FROM files WHERE client_id = ? ORDER BY id DESC";
     $stmt_files = $conn->prepare($sql_files);
     $stmt_files->bind_param("i", $data->case_id);
     $stmt_files->execute();
     $result_files = $stmt_files->get_result();
     $files = [];
     $fields = [];
     while ($row_files = $result_files->fetch_assoc()) {

             switch ($row_files['type']) {
                case 'file':
                    $files[] = [
                        'title' => $row_files['title'],
                        'description' => $row_files['description'],
                        'id' => $row_files['id'],
                        'date_created' => $row_files['date_created'],
                        'tag' => $row_files['tag']
                     ];
                    break;
                case 'field':
                    $fields[] = [
                        'title' => $row_files['title'],
                        'description' => $row_files['description'],
                        'id' => $row_files['id'],
                        'date_created' => $row_files['date_created'],
                        'value' => $row_files['value'],
                     ];
                    break;
            }
     }

    // Отримання даних з таблиці cases_data
    $sql_cases_data = "SELECT * FROM cases_data WHERE case_id = ?";
    $stmt_cases_data = $conn->prepare($sql_cases_data);
    $stmt_cases_data->bind_param("i", $case_id);
    $stmt_cases_data->execute();
    $result_cases_data = $stmt_cases_data->get_result();
    $cases_data = new stdClass();
    $cases_data->{'address_registered'} = null;
    $cases_data->{'address_live'} = null;
    $cases_data->{'categories'} = null;
    $cases_data->{'channel'} = null;
    $cases_data->{'date_first_contact'} = null;
    $cases_data->{'contract_date'} = null;
    $cases_data->{'contract_number'} = null;
    $cases_data->{'comment'} = null;
    $cases_data->{'potreba'} = null;
    $cases_data->{'family_info'} = null;
    $cases_data->{'history'} = null;

    while ($row_cases_data = $result_cases_data->fetch_assoc()) {
        $cases_data->{'address_registered'} = $row_cases_data['address_registered'];
        $cases_data->{'address_live'} = $row_cases_data['address_live'];
        $cases_data->{'categories'} = json_decode($row_cases_data['categories']);
        $cases_data->{'channel'} = $row_cases_data['channel'];
        $cases_data->{'date_first_contact'} = $row_cases_data['date_first_contact'];
        $cases_data->{'contract_date'} = $row_cases_data['contract_date'];
        $cases_data->{'contract_number'} = $row_cases_data['contract_number'];
        $cases_data->{'comment'} = $row_cases_data['comment'];
        $cases_data->{'potreba'} = $row_cases_data['potreba'];
        $cases_data->{'family_info'} = $row_cases_data['family_info'];
        $cases_data->{'history'} = $row_cases_data['history'];
    }

     // Розшифрування даних
     $decrypted_phone1 = decryptData($row_cases_new['phone1'], $key);
     $decrypted_phone2 = decryptData($row_cases_new['phone2'], $key);
     $decrypted_email = decryptData($row_cases_new['email'], $key);
 
     // Заміна зашифрованих даних на розшифровані в масиві $row_cases_new
     $row_cases_new['phone1'] = $decrypted_phone1;
     $row_cases_new['phone2'] = $decrypted_phone2;
     $row_cases_new['email'] = $decrypted_email;


    $fieldsMeta = getAndMergeData($conn, "cases", "case_fieldsmeta", "case_id", $case_id);

    // Формування відповіді JSON
    $response = [
        'general' => $row_cases_new,
        'meta' => $case_meta_obj,
        'plans' => $case_plans_data,
        'helps' => $case_helps_data,
        'data' => $cases_data,
        'notes' => $case_notes_data,
        'userMeta' => $user_meta,
        'files' => $files,
        'fields' => $fields,
        'fieldsMeta'=>$fieldsMeta
    ];

    echo json_encode($response);
    
} catch (Exception $e) {
    echo "Помилка: " . $e->getMessage();
}
?>
