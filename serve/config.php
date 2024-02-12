<?php header("Access-Control-Allow-Origin: *");
 $conn = mysqli_connect("teen.mysql.tools","teen_casemanagertest","%Xc7fUa!74","teen_casemanagertest");


if (mysqli_connect_errno()) {
  $objC->{'message'} = "Помилка з'єднання з базою даних";
  echo json_encode($objC);
  exit;
}

mysqli_set_charset($conn, "utf8mb4");

function addNotification($USERID,$MESSAGE,$LINK,$TYPE){
        $mesToNote = new StdClass();
        $mesToNote->{'message'} = $MESSAGE;
        $mesToNote->{'type'} = $TYPE;
        $mesToNote->{'link'} = $LINK;
        $mesToNote = json_encode($mesToNote, JSON_UNESCAPED_UNICODE);
        $mesDate = date("d-m-Y");
        $mesStatus = 'true';
        $msqli = "INSERT INTO notification (user_id,meta_key,meta_value,date,status) VALUES ('$USERID','$TYPE','$mesToNote','$mesDate', '$mesStatus')";
        if(mysqli_query($GLOBALS['conn'], $msqli)){
            return true;
        }else{
            return false;
        }
}

function checkRight($userIDC, $checkC, $tokenC,$mess){
  $objC = new StdClass();
  $msql = "SELECT * FROM tokens WHERE token='$tokenC'";
  $tokenSql = mysqli_query($GLOBALS['conn'], $msql);
  $res = mysqli_fetch_assoc($tokenSql);
  if($res !== null){
    $start = time();
    $end = $res["endtime"];
        if($start > $end){
            $objC->{'message'} = "Помилка авторизації";
            if($mess) echo json_encode($objC);
            $total = false;
            return $total;
        }
  }
  $sql = "SELECT level FROM users WHERE id=".$userIDC;

  $level = mysqli_query($GLOBALS['conn'], $sql);
  $res =  mysqli_fetch_assoc($level);
  $res = json_decode($res['level']);
  if(property_exists($res, "root")){
      if($res->root == true){
      $total = true;
      return $total;
      }
  }
  if(property_exists($res, $checkC)){
    if($res->$checkC == true){
      $total = true;
      return $total;
    }else{
      $objC->{'message'} = "У вас немає прав доступу";
      if($mess) echo json_encode($objC, JSON_UNESCAPED_UNICODE);
      $total = false;
        return $total;
    }
  }else{
    $objC->{'message'} = "У вас немає прав доступу";
     if($mess) echo json_encode($objC, JSON_UNESCAPED_UNICODE);
    $total = false;
    return $total;
  }
}