<?php
require_once '../config.php';

$data = json_decode(file_get_contents('php://input'));
//if(!checkRight($data->id, 'apiUpdateProgram', $token,true)) exit;
$userId = $data->id;
$token = $data->token;
$link = $data->link;
$newVersion = $data->newVersion;
$uploaddir = './updates/';
$uploadfile = $uploaddir.basename($link);
$obj = new StdClass();
function unzip_file( $file_path, $dest ){
	$zip = new ZipArchive;

	if( ! is_dir($dest) ) return 'Нет папки, куда распаковывать...';

	// открываем архив
	$is  = $zip -> open( $file_path );
	if( $is ) {

		 $zip->extractTo($dest);

		 $zip->close();

		 return true;
	}
	else
		return 'Произошла ошибка при распаковке архива';
}



// Копируем файл в files
if (copy($link, $uploadfile)){
     $obj->{'message'} = "Файл успішно завантажено";
     $zipfile = 'updates/'.$newVersion.'.zip'; // путь до файла архива
    $pathdir = '../../'; // путь к папке, в которую будет распакован архив
    $done = unzip_file( $zipfile, $pathdir );
    $obj->{'message4'} = 'Розпаковано';
    if( is_string($done) ){
    	$obj->{'message3'} = 'Помилка: '. $done;
    }
}

$sql = "UPDATE usermeta SET meta_value='$newVersion' WHERE user_id=1 AND meta_key='version'";
if (mysqli_query($conn, $sql)) {
    $obj->{'message1'} = "Дані успішно записані до БД";
} else {
    $obj->{'message2'} = "Помилка запису у БД";
}




echo json_encode($obj);