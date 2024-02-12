<?php
require_once '../config.php';
$data = json_decode(file_get_contents('php://input'));
$id = $data->id;
$id_bell = $data->idBell;
$bellStatus = 'false';
    $msql = "SELECT * FROM notification WHERE user_id=$id AND status='true' ORDER BY id DESC";
    $msql = "UPDATE notification SET status='$bellStatus' WHERE id='$id_bell'";
    $result = mysqli_query($conn, $msql);
   
        if (mysqli_query($conn, $msql)) {
                echo json_encode(true);
            } else {
                echo json_encode(false);
          }
  mysqli_close($conn);
  exit;
