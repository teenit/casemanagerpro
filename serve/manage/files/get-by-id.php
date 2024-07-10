<?php
require_once '../../config.php';

$data = json_decode(file_get_contents('php://input'));

$response = array();

if (isset($data->file_id) && is_numeric($data->file_id)) {
    $stmt = $conn->prepare("SELECT * FROM files WHERE id = ?");
    $stmt->bind_param("i", $data->file_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $res = $result->fetch_assoc();
    $stmt->close();

    if ($res) {
        $response['status'] = true;
        $response['data'] = $res;
    } else {
        $response['status'] = false;
        $response['message'] = 'File not found';
    }
} else {
    $response['status'] = false;
    $response['message'] = 'Invalid file ID';
}

$conn->close();

// Відправляємо відповідь на фронтенд у форматі JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
