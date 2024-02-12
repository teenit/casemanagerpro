<?php
require_once '../config.php';
require_once '../send-mail.php';
$data = json_decode(file_get_contents('php://input'));
if(!checkRight($data->id, 'statisticSize', $data->token,true)) exit;
$dirname = $_SERVER['DOCUMENT_ROOT']; // указываем полный путь до папки или файла 
    $size = dir_size($dirname); //заносим в переменную размер папки или файла
    $formSize = format_size($size); //форматируем вывод
    // функция для просмотра всех подпапок и всех вложенных файлов
    function dir_size($dirname) {
        $totalsize=0;
        if ($dirstream = @opendir($dirname)) {
        while (false !== ($filename = readdir($dirstream))) {
            if ($filename!="." && $filename!="..")
            {
                if (is_file($dirname."/".$filename))
                $totalsize+=filesize($dirname."/".$filename);
      
                if (is_dir($dirname."/".$filename))
                $totalsize+=dir_size($dirname."/".$filename);
                }
            }
        }
        closedir($dirstream);
        return $totalsize;
    }
    // функция форматирует вывод размера
    function format_size($size){
         $metrics[0] = 'B';
         $metrics[1] = 'KB';
         $metrics[2] = 'MB';
         $metrics[3] = 'GB';
         $metrics[4] = 'TB';
         $metric = 0;
         /*while(floor($size/1024) > 0){
             ++$metric;
             $size /= 1024;
         }    */
         $size = floor($size / 1024 / 1024);
         //$ret =  round($size,3)." ".(isset($metrics[$metric])?$metrics[$metric]:'??');
        $ret = round($size,3);
        return $ret;
    }
    $obj = new StdClass();
    $obj->{'maxSize'} = 2000;
    $obj->{'size'} = $formSize;
    echo json_encode($obj);