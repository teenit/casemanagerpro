<?php
require_once 'config.php';
$data = json_decode(file_get_contents('php://input'));
$images = $data->images;
for($i = 0; $i < count($images); $i++){
    $dir = 'temp/'.$images[$i]->folder;
    if(is_dir($dir)){
        copy($images[$i]->src,$dir.'/'.$images[$i]->photo);
    }else{
        mkdir($dir, 0777, true);
        copy($images[$i]->src,$dir.'/'.$images[$i]->photo);
    }
}
echo "gib";