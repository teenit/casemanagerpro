<?php
// Ключ для шифрування. Важливо зберігати його в безпечному місці.
$key = $privatKey;

// Функція для шифрування даних
function encryptData($data, $key) {
    return base64_encode(openssl_encrypt($data, "AES-256-CBC", $key, 0, substr($key, 0, 16)));
}
// Функція для розшифрування даних
function decryptData($encryptedData, $key) {
    return openssl_decrypt(base64_decode($encryptedData), "AES-256-CBC", $key, 0, substr($key, 0, 16));
}