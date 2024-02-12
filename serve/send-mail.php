<?php
require_once 'config.php';

function sendMail($mail, $subject,$message){
    $to  = "<".$mail.">"; 
$headers  = "Content-type: text/html; charset=utf-8 \r\n"; 
$headers .= "From: Case Manager <info@people-ua.org>\r\n"; 
$headers .= "Reply-To: info@people-ua.org\r\n"; 

mail($to, $subject, $message, $headers); 
}