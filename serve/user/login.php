<?php
require_once '../config.php';

$data = json_decode(file_get_contents('php://input'));

// Функція для логування
function logMessage($message) {
    $logFile = '../logs/app.log';
    $formattedMessage = date("Y-m-d H:i:s") . " - " . $message . PHP_EOL;
    file_put_contents($logFile, $formattedMessage, FILE_APPEND);
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
            $tempCode = rand(100000, 999999);
            $dateStart = date("Y-m-d H:i:s");

            $insertSQL = "INSERT INTO temp_codes (email, code, tries, date_start) VALUES (?, ?, 0, ?)";
            $insertStmt = $conn->prepare($insertSQL);

            if ($insertStmt) {
                logMessage("Prepared statement for inserting temp code.");
                $insertStmt->bind_param("sss", $user['email'], $tempCode, $dateStart);

                if ($insertStmt->execute()) {
                    logMessage("Inserted temp code for user: " . $user['email']);
                    $to = $user['email'];
                    $subject = "Your Temporary Access Code";
                    $message = "Your temporary access code is: $tempCode";
                    $headers = "From: no-reply@yourdomain.com\r\n";

                    if (mail($to, $subject, $message, $headers)) {
                        logMessage("Email with temp code sent to: " . $user['email']);
                        return json_encode(array(
                            'status' => true,
                            'message' => 'Temporary code sent to your email.'
                        ));
                    } else {
                        logMessage("Failed to send email to: " . $user['email']);
                        return json_encode(array(
                            'status' => false,
                            'message' => 'Failed to send the email.'
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
    $inputCode = trim($data->secretCode); // Очищення введеного коду від пробілів

    $selectSQL = "SELECT * FROM temp_codes WHERE email = ? ORDER BY id DESC LIMIT 1";
    $stmt = $conn->prepare($selectSQL);

    if ($stmt) {
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $storedCode = trim($row['code']); // Очищення збереженого коду від пробілів
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
                        $userSQL =  "SELECT users.id AS user_id, users.*, access.id AS access_id, access.* 
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
                                
                                // Повертаємо масив з даними користувача
                                return array(
                                    'status' => true,
                                    'message' => 'Code verified successfully.',
                                    'userData' => $userData  // Повертаємо дані користувача
                                );
                            } else {
                                logMessage("No user record found for email $email.");
                                return json_encode(array(
                                    'status' => false,
                                    'message' => 'No user record found for this email.'
                                ));
                            }
                            $userStmt->close();
                        } else {
                            logMessage("Failed to prepare statement for user data retrieval.");
                            return json_encode(array(
                                'status' => false,
                                'message' => 'Failed to prepare the database query for user data.'
                            ));
                        }
                    } else {
                        logMessage("Failed to delete record for user $email.");
                        return json_encode(array(
                            'status' => false,
                            'message' => 'Failed to delete the record.'
                        ));
                    }
                    $deleteStmt->close();
                }
            } else {
                $tries++;
                $updateSQL = "UPDATE temp_codes SET tries = ? WHERE email = ?";
                $updateStmt = $conn->prepare($updateSQL);

                if ($updateStmt) {
                    $updateStmt->bind_param("is", $tries, $email);
                    if ($updateStmt->execute()) {
                        logMessage("Failed attempt $tries for user $email.");
                        return json_encode(array(
                            'status' => false,
                            'message' => 'Incorrect code. Try again.'
                        ));
                    } else {
                        logMessage("Failed to update attempts for user $email.");
                        return json_encode(array(
                            'status' => false,
                            'message' => 'Failed to update the record.'
                        ));
                    }
                    $updateStmt->close();
                }
            }
        } else {
            logMessage("No record found for user $email.");
            return json_encode(array(
                'status' => false,
                'message' => 'No record found for this email.'
            ));
        }
        $stmt->close();
    } else {
        logMessage("Failed to prepare statement for secret code verification.");
        return json_encode(array(
            'status' => false,
            'message' => 'Failed to prepare the database query.'
        ));
    }

    $conn->close();
}


// Основний обробник запиту
if ($data->type === 'login') {
    $response = handleLogin($conn, $data);
    echo $response;
} elseif ($data->type === 'secretCode') {
    $result = handleSecretCode($conn, $data);
    
    // Якщо код перевірено успішно, виконується авторизація
    if ($result['status'] === true) {
        // Основна логіка авторизації
        $userData = $result['userData'];
        
        // Створюємо токен та інші дані, як в старому коді
        $token = uniqid(md5($userData['user_id']), true);
        $time = time();
        $timeEnd = $time + 86400;
        $id = $userData['user_id'];

        $obj = new StdClass();
        $obj->{'userName'} = $userData['userName'];
        $obj->{'active'} = $userData['active'];
        $obj->{'email'} = $userData['email'];
        $obj->{'user_id'} = $userData['user_id'];
        $obj->{'access_id'} = $userData['access_id'];
        $obj->{'token'} = $token;

        $accessRow = array();
        foreach ($userData as $key => $value) {
            if (strpos($key, 'a_') === 0) {
                $accessRow[$key] = $value;
            }
        }
        $obj->{'access'} = $accessRow;

        $tokenSql = "INSERT INTO tokens (token, linetime, endtime, userid) VALUES (?, ?, ?, ?)";
        $tokenStmt = $conn->prepare($tokenSql);

        if ($tokenStmt) {
            $tokenStmt->bind_param("siii", $token, $time, $timeEnd, $id);
            $tokenStmt->execute();
            $tokenStmt->close();
        } else {
            logMessage("Failed to prepare statement for inserting token.");
        }

        $ip = $_SERVER['REMOTE_ADDR'];
        setcookie("buldog", md5($ip), time() + 3600 * 24);
        setcookie("userName", $userData['userName'], time() + 3600 * 24);
        setcookie("email", $userData['email'], time() + 3600 * 24);
        setcookie("id", $userData['users_id'], time() + 3600 * 24);
        setcookie("pekines", $token, time() + 3600 * 24);

        echo json_encode(array(
            'status' => true,
            'message' => 'Authorization successful.',
            'userData' => $obj
        ));
    } else {
        echo $result;  // Повертаємо помилку перевірки коду
    }
}
?>
