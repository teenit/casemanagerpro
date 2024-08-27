<?php
require_once 'config.php';

$data = json_decode(file_get_contents('php://input'));
$pass = md5($data->password);

$msql = "SELECT users.*,users.id AS users_id, access.*,access.id AS access_id
         FROM users 
         JOIN access ON users.access = access.id 
         WHERE users.email=? 
         AND users.active='true' 
         AND users.password=?";



$stmt = $conn->prepare($msql);

if ($stmt) {
    // Прив'язка параметрів
    $stmt->bind_param("ss", $data->login, $pass);
    
    // Виконання запиту
    $stmt->execute();

    // Отримання результатів
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        // Масив для зберігання даних з таблиці users
        $usersData = array();
        // Масив для зберігання даних з таблиці access
        $accessData = array();
    
        // Обробка кожного рядка результату
        while($res = $result->fetch_assoc()) {
            $token = uniqid(md5($res['users_id']),true);
            $time = time();
            $timeEnd = $time + 86400;
            $id = $res['users_id'];
            $obj = new StdClass();
            $obj->{'userName'} = $res['userName'];
            $obj->{'active'} = $res['active'];
            $obj->{'email'} = $res['email'];
            $obj->{'user_id'} = $res['users_id'];
            $obj->{'access_id'} = $res['access_id'];
            $obj->{'token'} = $token;
            $accessRow = array();
            // Перегляд усіх ключів рядка
            foreach ($res as $key => $value) {
                // Перевірка, чи починається ключ з 'а_'
                if (strpos($key, 'a_') === 0) {
                    // Додавання даних до масиву $accessRow
                    $accessRow[$key] = $value;
                }
            }
            $obj->{'access'} = $accessRow;
            $tokenSql = "INSERT INTO tokens (token, linetime, endtime, userid) VALUES ('$token','$time','$timeEnd','$id')";
            mysqli_query($conn, $tokenSql);
            $too = true;
            $ip = $_SERVER['REMOTE_ADDR'];
            setcookie("buldog", md5($ip), time() + 3600 * 24);
            setcookie("userName", $res['userName'], time() + 3600 * 24);
            setcookie("email", $res['email'], time() + 3600 * 24);
            setcookie("id", $res['id'], time() + 3600 * 24);
            setcookie("pekines", $token, time() + 3600 * 24);
        }
    
      
    } 

}

if(!$too){

    $obj = new StdClass();
    $obj->{'userName'} = null;
    $obj->{'active'} = null;
    $obj->{'email'} = null;
    $obj->{'token'} = null;
    $obj->{'profilePhoto'} = null;
    $obj->{'message'} = "Не правильний логін чи пароль або у користувача недостатьно прав";
    echo json_encode($obj);
    exit;
}

$prf = 'profile_img';
$msql = "SELECT meta_value FROM usermeta WHERE user_id=$id AND meta_key='$prf'";
$result = $conn->query($msql);
$row = $result->fetch_assoc();
$obj->{'profilePhoto'} = $row["meta_value"];
echo json_encode($obj);