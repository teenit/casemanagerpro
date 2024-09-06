<?php
require_once '../config.php';
require_once '../send-mail.php';

$data = json_decode(file_get_contents('php://input'));

// Функція для логування
function logMessage($message) {
    $logFile = '../logs/app.log';
    $formattedMessage = date("Y-m-d H:i:s") . " - " . $message . PHP_EOL;
    file_put_contents($logFile, $formattedMessage, FILE_APPEND);
}

// Функція для перевірки 2ФА
function isTwoFAEnabled($conn) {
    $query = "SELECT config_value FROM config_meta WHERE config_key = 'system_twofa'";
    $result = $conn->query($query);
    if ($result && $row = $result->fetch_assoc()) {
        return $row['config_value'] == '1';
    }
    return true; // За замовчуванням 2ФА включено
}

// Функція для обробки логіна та генерації тимчасового коду
function handleLogin($conn, $data) {
    $pass = md5($data->password);
    $msql = "SELECT users.*, users.id AS users_id, access.*, access.id AS access_id
             FROM users 
             JOIN access ON users.access = access.id 
             WHERE users.email=? 
             AND users.active='true' 
             AND users.password=?";

    $stmt = $conn->prepare($msql);

    if ($stmt) {
        logMessage("Prepared statement for login query.");
        $stmt->bind_param("ss", $data->login, $pass);
        $stmt->execute();
        logMessage("Executed login query for user: " . $data->login);

        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();
            $isTwoFAEnabled = isTwoFAEnabled($conn);

            if ($isTwoFAEnabled) {
                $tempCode = rand(100000, 999999);
                $dateStart = date("Y-m-d H:i:s");

                $insertSQL = "INSERT INTO temp_codes (email, code, tries, date_start) VALUES (?, ?, 0, ?)";
                $insertStmt = $conn->prepare($insertSQL);

                if ($insertStmt) {
                    logMessage("Prepared statement for inserting temp code.");
                    $insertStmt->bind_param("sss", $user['email'], $tempCode, $dateStart);

                    if ($insertStmt->execute()) {
                        logMessage("Inserted temporary code for user: " . $user['email']);
                        $to = $user['email'];
                        $subject = "Temporary Authorization Code";

                        // Отримання доменного імені динамічно
                        $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https://" : "http://";
                        $domain = $protocol . $_SERVER['HTTP_HOST'];
                        $logoUrl = $domain . "/logo192.png";
                        
                        // Повідомлення у форматі HTML з логотипом
                        $message = "
                        <html>
                        <head>
                            <title>Temporary Authorization Code</title>
                        </head>
                        <body>
                            <p>Dear user,</p>
                            <p>Your verification code is: <strong>$tempCode</strong></p>
                            <p>This code is valid for 10 minutes. Please do not share it with others.</p>
                            <br>
                            <p>Best regards,<br>Case Manager PRO Team</p>
                            <div style='text-align: center;'>
                                <img src='$logoUrl' alt='Logo' style='width: 150px;'>
                            </div>
                        </body>
                        </html>
                        ";
                    
                        // Заголовки для відправки HTML-листа
                        $headers = "MIME-Version: 1.0\r\n";
                        $headers .= "Content-Type: text/html; charset=utf-8\r\n";
                        $headers .= "From: secure@Case-M.pro\r\n";
                        $headers .= "Reply-To: support@case-m.pro\r\n";
                        $headers .= "X-Mailer: PHP/" . phpversion();
                    
                        // Відправка листа
                        if (sendMail($to, $subject, $message)) {
                            logMessage("Temporary code email sent to: " . $user['email']);
                            return json_encode(array(
                                'status' => true,
                                'message' => 'Temporary code sent to your email.'
                            ));
                        } else {
                            logMessage("Failed to send email to: " . $user['email']);
                            return json_encode(array(
                                'status' => false,
                                'message' => 'Failed to send email.'
                            ));
                        }                
                    } else {
                        logMessage("Failed to insert temp code for user: " . $user['email']);
                        return json_encode(array(
                            'status' => false,
                            'message' => 'Failed to insert the temporary code into the database.'
                        ));
                    }
                    $insertStmt->close();
                } else {
                    logMessage("Failed to prepare statement for inserting temp code.");
                }
            } else {
                // Для випадків, коли 2ФА вимкнено, авторизуємо користувача без перевірки коду
                $token = uniqid(md5($user['id']), true);
                $time = time();
                $timeEnd = $time + 86400;

                $tokenSql = "INSERT INTO tokens (token, linetime, endtime, userid) VALUES (?, ?, ?, ?)";
                $tokenStmt = $conn->prepare($tokenSql);

                if ($tokenStmt) {
                    $tokenStmt->bind_param("siii", $token, $time, $timeEnd, $user['id']);
                    $tokenStmt->execute();
                    $tokenStmt->close();

                    setcookie("userName", $user['userName'], time() + 3600 * 24);
                    setcookie("email", $user['email'], time() + 3600 * 24);
                    setcookie("id", $user['users_id'], time() + 3600 * 24);
                    setcookie("pekines", $token, time() + 3600 * 24);

                    return json_encode(array(
                        'status' => true,
                        'message' => 'Authorization successful.',
                        'userData' => array(
                            'userName' => $user['userName'],
                            'active' => $user['active'],
                            'email' => $user['email'],
                            'user_id' => $user['users_id'],
                            'access_id' => $user['access_id'],
                            'token' => $token
                        )
                    ));
                } else {
                    logMessage("Failed to prepare statement for inserting token.");
                    return json_encode(array(
                        'status' => false,
                        'message' => 'Failed to prepare token insertion query.'
                    ));
                }
            }
        } else {
            logMessage("Invalid login attempt for user: " . $data->login);
            return json_encode(array(
                'status' => false,
                'message' => 'Invalid login or password.'
            ));
        }
        $stmt->close();
    } else {
        logMessage("Failed to prepare statement for login query.");
        return json_encode(array(
            'status' => false,
            'message' => 'Failed to prepare the database query.'
        ));
    }

    $conn->close();
}

// Функція для обробки перевірки секретного коду
function handleSecretCode($conn, $data) {
    $email = $data->login;
    $inputCode = trim($data->secretCode);

    $selectSQL = "SELECT * FROM temp_codes WHERE email = ? ORDER BY id DESC LIMIT 1";
    $stmt = $conn->prepare($selectSQL);

    if ($stmt) {
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $storedCode = trim($row['code']);
            $tries = $row['tries'];

            logMessage("Code check for user $email: Stored code = $storedCode, Input code = $inputCode, Tries = $tries");

            if ($storedCode === $inputCode) {
                // Якщо код правильний, видаляємо запис і виконуємо запит до таблиці users
                $deleteSQL = "DELETE FROM temp_codes WHERE email = ?";
                $deleteStmt = $conn->prepare($deleteSQL);

                if ($deleteStmt) {
                    $deleteStmt->bind_param("s", $email);
                    if ($deleteStmt->execute()) {
                        logMessage("Secret code for user $email verified and record deleted.");

                        // Виконуємо запит до таблиці users для отримання даних користувача
                        $userSQL = "SELECT users.id AS user_id, users.*, access.id AS access_id, access.* 
                                    FROM users 
                                    JOIN access ON users.access = access.id 
                                    WHERE users.email = ?";                 
                        $userStmt = $conn->prepare($userSQL);

                        if ($userStmt) {
                            $userStmt->bind_param("s", $email);
                            $userStmt->execute();
                            $userResult = $userStmt->get_result();

                            if ($userResult->num_rows > 0) {
                                $userData = $userResult->fetch_assoc();
                                
                                // Генерація токена
                                $token = uniqid(md5($userData['id']), true);
                                $time = time();
                                $timeEnd = $time + 86400;

                                $tokenSQL = "INSERT INTO tokens (token, linetime, endtime, userid) VALUES (?, ?, ?, ?)";
                                $tokenStmt = $conn->prepare($tokenSQL);

                                if ($tokenStmt) {
                                    $tokenStmt->bind_param("siii", $token, $time, $timeEnd, $userData['id']);
                                    if ($tokenStmt->execute()) {
                                        logMessage("Token successfully generated and inserted for user ID: " . $userData['id']);
                                        
                                        // Встановлення cookies
                                        setcookie("token", $token, time() + 86400, "/");
                                        setcookie("userName", $userData['userName'], time() + 86400, "/");
                                        setcookie("email", $userData['email'], time() + 86400, "/");
                                        setcookie("id", $userData['id'], time() + 86400, "/");

                                        return json_encode(array(
                                            'status' => true,
                                            'message' => 'Authorization successful.',
                                            'userData' => array(
                                                'userName' => $userData['userName'],
                                                'email' => $userData['email'],
                                                'user_id' => $userData['id'],
                                                'access_id' => $userData['access_id'],
                                                'token' => $token
                                            )
                                        ));
                                    } else {
                                        logMessage("Failed to insert token for user ID: " . $userData['id']);
                                        return json_encode(array(
                                            'status' => false,
                                            'message' => 'Failed to generate token.'
                                        ));
                                    }
                                } else {
                                    logMessage("Failed to prepare statement for token insertion.");
                                    return json_encode(array(
                                        'status' => false,
                                        'message' => 'Failed to prepare token insertion query.'
                                    ));
                                }
                            } else {
                                logMessage("No user found with email: " . $email);
                                return json_encode(array(
                                    'status' => false,
                                    'message' => 'User not found.'
                                ));
                            }
                            $userStmt->close();
                        } else {
                            logMessage("Failed to prepare statement for user query.");
                            return json_encode(array(
                                'status' => false,
                                'message' => 'Failed to prepare user query.'
                            ));
                        }
                    } else {
                        logMessage("Failed to delete temp code record for user $email.");
                        return json_encode(array(
                            'status' => false,
                            'message' => 'Failed to delete temporary code record.'
                        ));
                    }
                    $deleteStmt->close();
                } else {
                    logMessage("Failed to prepare statement for deleting temp code record.");
                    return json_encode(array(
                        'status' => false,
                        'message' => 'Failed to prepare delete query.'
                    ));
                }
            } else {
                // Оновлюємо кількість спроб
                $updateSQL = "UPDATE temp_codes SET tries = tries + 1 WHERE email = ?";
                $updateStmt = $conn->prepare($updateSQL);

                if ($updateStmt) {
                    $updateStmt->bind_param("s", $email);
                    if ($updateStmt->execute()) {
                        logMessage("Updated attempts for user $email.");
                        return json_encode(array(
                            'status' => false,
                            'message' => 'Invalid verification code. Please try again.'
                        ));
                    } else {
                        logMessage("Failed to update attempts for user $email.");
                        return json_encode(array(
                            'status' => false,
                            'message' => 'Failed to update verification attempts.'
                        ));
                    }
                    $updateStmt->close();
                } else {
                    logMessage("Failed to prepare statement for updating attempts.");
                    return json_encode(array(
                        'status' => false,
                        'message' => 'Failed to prepare update attempts query.'
                    ));
                }
            }
        } else {
            logMessage("No temporary code found for email: " . $email);
            return json_encode(array(
                'status' => false,
                'message' => 'No temporary code found. Please request a new one.'
            ));
        }
        $stmt->close();
    } else {
        logMessage("Failed to prepare statement for code retrieval.");
        return json_encode(array(
            'status' => false,
            'message' => 'Failed to prepare code retrieval query.'
        ));
    }
}

// Обробка запиту
if (isset($data->type)) {
    switch ($data->type) {
        case 'login':
            echo handleLogin($conn, $data);
            break;
        case 'secretCode':
            echo handleSecretCode($conn, $data);
            break;
        default:
            echo json_encode(array(
                'status' => false,
                'message' => 'Invalid request type.'
            ));
    }
} else {
    echo json_encode(array(
        'status' => false,
        'message' => 'No request type provided.'
    ));
}

$conn->close();
?>
