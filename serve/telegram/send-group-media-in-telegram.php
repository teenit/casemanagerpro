<?php
require_once '../config.php';
require_once 'send-message.php';

$data = json_decode($_POST['meta'], true);
$botId = $data['bot_id'] ?? null;
$message = $data['message'] ?? ''; 
$files = $_FILES['files'] ?? [];

$userId = $data['id'] ?? 0;

$response = processTelegramMessage($conn, $botId, $message, $files, $userId);

echo json_encode($response);

?>
