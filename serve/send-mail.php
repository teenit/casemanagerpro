<?php
require_once 'config.php';

function sendMail($mail, $subject,$message){
    $to  = "<".$mail.">"; 
$headers  = "Content-type: text/html; charset=utf-8 \r\n"; 
$headers .= "From: Case Manager <info@case-m.pro>\r\n"; 
$headers .= "Reply-To: info@case-m.pro\r\n"; 

return mail($to, $subject, $message, $headers); 
}