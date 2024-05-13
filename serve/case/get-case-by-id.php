<?php
require_once '../config.php';
require_once '../functions.php';
// Отримуємо case_id з JSON-запиту
$data = json_decode(file_get_contents('php://input'));
$case_id = $data->case_id;

try {
    // Перевірка з'єднання
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Отримання даних з таблиці cases_new
    $sql_cases_new = "SELECT * FROM cases_new WHERE id = ?";
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
    while ($row_case_meta = $result_case_meta->fetch_assoc()) {
        $case_meta_data[] = $row_case_meta;
        switch ($row_case_meta['meta_key']) {
            case 'case_files':
                $obj = new stdClass();
                $obj->{'link'} = json_decode($row_case_meta['meta_value']);
                $obj->{'meta_id'} = $row_case_meta['meta_id'];
                $case_meta_obj->{'files'}[] = json_decode($row_case_meta['meta_value']);
                break;
            case 'case_profile_img':
                $obj = new stdClass();
                $obj->{'link'} = json_decode($row_case_meta['meta_value']);
                $obj->{'meta_id'} = $row_case_meta['meta_id'];
                $case_meta_obj->{'profileImg'} = $obj;
                break;
        }
    }

    // Отримання даних з таблиці case_plans
    $sql_case_plans = "SELECT * FROM case_plans WHERE case_id = ?";
    $stmt_case_plans = $conn->prepare($sql_case_plans);
    $stmt_case_plans->bind_param("i", $case_id);
    $stmt_case_plans->execute();
    $result_case_plans = $stmt_case_plans->get_result();
    $case_plans_data = [];

    while ($row_case_plans = $result_case_plans->fetch_assoc()) {
        $case_plans_data[] = $row_case_plans;
    }

    // Отримання даних з таблиці case_plans
    $sql_case_notes = "SELECT * FROM case_notes WHERE case_id = ?";
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
    $sql_case_helps = "SELECT * FROM case_helps WHERE case_id = ?";
    $stmt_case_helps = $conn->prepare($sql_case_helps);
    $stmt_case_helps->bind_param("i", $case_id);
    $stmt_case_helps->execute();
    $result_case_helps = $stmt_case_helps->get_result();
    $case_helps_data = [];

    while ($row_case_helps = $result_case_helps->fetch_assoc()) {
        $case_helps_data[] = $row_case_helps;
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

    // Формування відповіді JSON
    $response = [
        'general' => $row_cases_new,
        'meta' => $case_meta_obj,
        'plans' => $case_plans_data,
        'helps' => $case_helps_data,
        'data' => $cases_data,
        'notes' => $case_notes_data,
    ];

    echo json_encode($response);
    
} catch (Exception $e) {
    echo "Помилка: " . $e->getMessage();
}
?>
