<?php
require_once '../config.php';

// Отримання даних з фронтенду
$data = json_decode(file_get_contents('php://input'), true);

$sql = "SELECT * FROM eventsmeta WHERE event_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $event_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $meta_obj = new stdClass();
    $meta_obj->{'files'} = [];
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
            case 'case_view_info':

                $case_meta_obj->{'viewInfo'} = json_decode($row_case_meta['meta_value']);
                break;
        }
    }