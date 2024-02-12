<?php
require_once 'config.php';

$data = json_decode(file_get_contents('php://input'));
$token = $data->token;
$obj = new StdClass();
$msql = "SELECT * FROM tokens WHERE token='$token'";
$tokenSql = mysqli_query($conn, $msql);

$res = mysqli_fetch_assoc($tokenSql);
if($res !== null){
    $start = time();
    $end = $res["endtime"];
        if($start > $end){
            $obj->{'message'} = "Помилка авторизації";
            echo json_encode($obj);
            exit;
        }else{
            $user_id = $res['userid'];
            $sql = "SELECT access.*
                        FROM users 
                        JOIN access ON users.access = access.id 
                        WHERE users.id=?";
            $stmt = $conn->prepare($sql);
            if ($stmt) {
                // Прив'язка параметрів
                $stmt->bind_param("s", $user_id);
                // Виконання запиту
                $stmt->execute();
                // Отримання результатів
                $result = $stmt->get_result();
                if ($result->num_rows > 0) {
                    while($res = $result->fetch_assoc()) {
                        echo json_encode($res);
                    }
                }
            }
        }
}else{
     $obj->{'message'} = "Помилка авторизації";
            echo json_encode($obj);
            exit;
}