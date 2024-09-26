<?php
require_once '../config.php';
require_once 'send-message.php';

$data = json_decode(file_get_contents('php://input'), true);
$botId = $data['bot_id'] ?? null;
$message = $data['message'] ?? '';
$userId = $data['id'] ?? 0;

$response = processTelegramMessage($conn, $botId, $message, null, $userId);

echo json_encode($response);