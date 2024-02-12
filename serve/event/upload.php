<?php
require_once '../config.php';
$mas = [];
$id = $_POST["id"];
$userId = $_POST['userId'];
$token = $_POST['token'];
$title = $_POST['title'];
$description = $_POST['description'];

$userName = $_POST['userName'];
$eventID = $_POST['eventID'];
$keyF = $_POST['keyF'];
$linkF = $_POST['link'];


function getExtension($filename) {
    return end(explode(".", $filename));
}
function getFilesize($filesize)
{
    if ($filesize > 1024) {
        $filesize = ($filesize / 1024);
        if ($filesize > 1024) {
            $filesize = ($filesize / 1024);
            if ($filesize > 1024) {
                $filesize = ($filesize / 1024);
                $filesize = round($filesize, 1);
                return $filesize . " GB";
            } else {
                $filesize = round($filesize, 1);
                return $filesize . " MB";
            }
        } else {
            $filesize = round($filesize, 1);
            return $filesize . " KB";
        }
    } else {
        $filesize = round($filesize, 1);
        return $filesize . " bytes";
    }
}
$obj = new StdClass();
if(!checkRight($userId, 'loadEventDocs', $token, true)) exit;

$url = 'http' . ((isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off') ? 's' : '') . '://';

$time = time();
        $tmp_name = $_FILES["fileResource"]["tmp_name"];
        // basename() может спасти от атак на файловую систему;
        // может понадобиться дополнительная проверка/очистка имени файла
        $name = basename($_FILES["fileResource"]["name"]);
        $check = strtolower(getExtension($name));
        if($check == 'doc' || $check == 'docx' || $check == 'xls' || $check == 'xlsx' || $check == 'jpeg' || $check == 'jpg' || $check == 'png' || $check == 'mp3' || $check == 'mp4' || $check == 'mov' || $check == 'ppt' || $check == 'pptx' || $check == 'pdf'){
        }else{
            $obj->{'message'} = "Заборонено завантаження файла формату ".$check;
            echo json_encode($obj, JSON_UNESCAPED_UNICODE);
            exit;
        }
        $obj->{'size'} = getFilesize(filesize($tmp_name));
        move_uploaded_file($tmp_name, "uploads/".$linkF.$time.'.'.getExtension($name));
        ///////////////////////////
            if($check == 'jpg'){
                
          
            $filename= $tmp_name;
            list($w, $h, $type, $attr) = getimagesize($filename);
            $src_im = imagecreatefromjpeg($filename);
            
            $src_x = '0';   // начальная позиция x
            $src_y = '0';   // начальная позиция y
            $src_w = '100'; // ширина
            $src_h = '100'; // высота
            $dst_x = '0';   // координата результирующего изображения x
            $dst_y = '0';   // координата результирующего изображения y
            
            $dst_im = imagecreatetruecolor($src_w, $src_h);
            $white = imagecolorallocate($dst_im, 255, 255, 255);
            imagefill($dst_im, 0, 0, $white);
            
            imagecopy($dst_im, $src_im, $dst_x, $dst_y, $src_x, $src_y, $src_w, $src_h);
            
            header("Content-type: image/png");
            imagepng($dst_im);
            imagedestroy($dst_im);
            }
        
        
        
        
        
        
        //////////////////////////
        $link = "https://".$_SERVER['SERVER_NAME']."/serve/event/uploads/".$linkF.$time.'.'.getExtension($name);
        $obj->{'link'} = $link;
        $obj->{'title'} = $title;
        $obj->{'description'} = $description;
        $obj->{'format'} = getExtension($name);
        $obj->{'date'} = date("Y.m.d");
        $obj->{'time'} = date("H:m:s");
        $obj->{'deleted'} = false;
        
        $obj->{'userName'} = false;
        $obj->{'deleted'} = false;
        $obj->{'deleted'} = false;
        

        $msql = "SELECT * FROM users WHERE id='$userId'";
        
        $user = mysqli_query($conn, $msql);

        $user = mysqli_fetch_assoc($user);

        $obj->{'userName'} = $user['userName'];
        $obj->{'userID'} = $userId;
    
        $metaKey = $keyF;
                    $msql = "SELECT meta_value FROM eventsmeta WHERE user_id=1 AND meta_key='$metaKey' AND event_id='$eventID'";
                $result = $conn->query($msql);
                $row = $result->fetch_assoc();
                if($row == null){
                    $mas[] = $obj;
                    $resource = json_encode($mas, JSON_UNESCAPED_UNICODE);
                    $sql = "INSERT INTO eventsmeta (event_id, meta_key, meta_value, user_id) VALUES ('$eventID', '$metaKey', '$resource',1)";
                }else{
                    //$sql = "UPDATE usermeta SET meta_value = '$link' WHERE user_id = $id AND meta_key='$prf'";
                    $oldRes = json_decode($row['meta_value']);
                    
                    $oldRes[] = $obj;
                    $oldMas = json_encode($oldRes, JSON_UNESCAPED_UNICODE);
                    $sql = "UPDATE eventsmeta SET meta_value = '$oldMas' WHERE user_id =1 AND meta_key='$metaKey' AND event_id='$eventID'";
                }
            
                if (mysqli_query($conn, $sql)) {
                    echo json_encode($obj);
                } else {
                    $obj = new StdClass();
                    $obj->{'message'} = "Помилка завантаження, спробуйте пізніше";
                    $obj->{'marker'} = "red";
                    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
              }
              mysqli_close($conn);
     