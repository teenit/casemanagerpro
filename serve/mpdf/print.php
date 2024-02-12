<?php
$pdfOptions = array(
    'mode'              => 'utf-8',
    'format'                => 'A4'
);
require_once __DIR__ . '/vendor/autoload.php';
require_once '../config.php';

$data = json_decode(file_get_contents('php://input'));
$stylesheet = file_get_contents('pdf.css');
$mpdf = new \Mpdf\Mpdf($pdfOptions);
$caseID = $data->caseID;
$addPlan = $data->plan;
$addNotes = $data->notes;
$addHelp = $data->help;
$addMedia = $data->media;
//$mark = 'mark';
$mark = '';
$comb = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
$shfl = str_shuffle($comb);
$pwd = substr($shfl,0,8);

$msql = "SELECT * FROM cases WHERE id=".$caseID;
$case = mysqli_query($conn, $msql);

$res = mysqli_fetch_assoc($case);
$contact = json_decode($res['contact']);
$photos = json_decode($res['photos']);
$plan = json_decode($res['plan']);
$help = json_decode($res['help']);
$notes = json_decode($res['notes']);
function get_file_extension($filename) {
   return end(explode(".", $filename));
   }
//$imgMark = '<img class="mark__img" src="'.'https://'.$_SERVER['HTTP_HOST'].'/serve/mpdf/logo-case.png">';
$helpHTML = '';
$notesHTML = '';

$categories = '| ';

for($i = 0; $i < count($contact->categories); $i++){
    $categories .= $contact->categories[$i]->text.' | ';
}
if($addMedia == true){
    $images .= "<div class='cont__photos'>
                 <div class='container__h1'>
                    <h1>Фотографії</h1>
                </div>";
    for($i = 0; $i < count($photos); $i++){
    if(get_file_extension($photos[$i]->url) === 'jpg' || get_file_extension($photos[$i]->url) === 'png' || get_file_extension($photos[$i]->url) === 'jpeg'){
        $images .= "<div class='imgs__div'><img class='imgs ".$mark."' src=".$photos[$i]->url."></div>";
    }
}
$images .= "</div>";
}

if($addPlan == true){
     $planHTML .= "<div class='cont__plan'>
                 <div class='container__h1'>
                    <h1>Індівідуальний план</h1>
                </div>";
for($i = 0; $i < count($plan); $i++){
    $iplus = $i + 1;
   
    $planHTML .= "<h3><span class='number__plan'>".$iplus.". </span> Назва плану: ". $plan[$i]->nameOfPlan. "<span> Дата створення: ".$plan[$i]->dateCreated. "</span>" . "</h3>";
    if($plan[$i]->donePlan->done == 'true'){
        if($plan[$i]->donePlan->good == 'true'){
           $planHTML .= "<p>Статус: <span class='color__green'>Успішно завершено</span> Дата завершення: ".$plan[$i]->donePlan->date."</p><p>Коментар: ".$plan[$i]->donePlan->commentar."</p>";
        }else{
            $planHTML .= "<p>Статус: <span class='color__red'>Невдало завершено</span> Дата завершення: ".$plan[$i]->donePlan->date."</p><p>Коментар: ".$plan[$i]->donePlan->ommentar."</p>";  
        }
    }else{
        $planHTML .= "<p>Статус: <span class='color__orange'>У процесі виконання</span></p>";
    }
    for($y = 0; $y < count($plan[$i]->plans); $y++){
        if($plan[$i]->plans[$y]->show == 'true'){
                $yplus = $y + 1;
        $div = "<div class='elem__plan'><p>".$yplus.") ".$plan[$i]->plans[$y]->start." - ".$plan[$i]->plans[$y]->end."</p><p> Деталі: ".$plan[$i]->plans[$y]->desc."</p><p>Статус: ";
        if($plan[$i]->plans[$y]->done == 'true'){
            $div .= "<span class='color__green'>ВИКОНАНО</span></p></div>";
        }else{
           $div .= "<span class='color__red'>НЕ ВИКОНАНО</span></p></div>"; 
        }
        $planHTML .= $div;    
        }

    }
    
}
$planHTML .= "</div>";
}
if($addHelp == true){
    $helpHTML .= "<div class='cont__plan'>
                 <div class='container__h1'>
                    <h1>Надано допомогу</h1>
                </div>";
                for($i = 0; $i < count($help); $i++){
    $helpHTML .= "<p>Дата: <b>".$help[$i]->dateHelp."</b>. Надавав допомогу: <b>".$help[$i]->whoHelp."</b>. Деталі наданої допомоги: <b>".$help[$i]->mess."</b></p>";
}
$helpHTML .= "</div>";
}

if($addNotes == true){
    $notesHTML .= "<div class='cont__plan'>
                 <div class='container__h1'>
                    <h1>Нотатки</h1>
                </div>";
  for($i = 0; $i < count($notes); $i++){
    $notesHTML .= "<p>Дата: <b>".$notes[$i]->date."</b>. Автор: <b>".$notes[$i]->userName."</b>. Нотатка: <b>".$notes[$i]->mess."</b></p>";
}  
$notesHTML .= "</div>";
}

$mpdf->setFooter("Сторінка {PAGENO} з {nb}");
$stylesheet = file_get_contents('style.css');
$html = "<div class='container $mark'>
        <div class='container__h1'>
            <h1>$contact->surname $contact->firstName $contact->secondName № $caseID</h1>
        </div>
        <div class='container__info'>
            <div class='cont__img__wrap'>
                <img class='cont__img' src='$contact->imgUrl' alt=''>
            </div>
            <div class='cont__info'>
                <p><span class='cont__info__title'> Дата створення: </span><span class='cont__info__znak'>$contact->createdDate</span></p>
                <p><span class='cont__info__title'>Договір: </span><span class='cont__info__znak'>№ $contact->numberDogovir від $contact->dateDogovir</span></p>
                <p><span class='cont__info__title'>Телефон: </span><span class='cont__info__znak'>$contact->phone1</span></p>
                <p><span class='cont__info__title'>Телефон: </span><span class='cont__info__znak'>$contact->phone2</span></p>
                <p><span class='cont__info__title'>Email: </span><span class='cont__info__znak'>$contact->email</span></p>
                <p><span class='cont__info__title'>Адреса по прописці: </span><span class='cont__info__znak'>$contact->addressPropiska</span></p>
                <p><span class='cont__info__title'>Фактична адреса: </span><span class='cont__info__znak'>$contact->addressLive</span></p>
                </div>
                </div>
                 <div class='container__h1'>
                    <h2>Додаткова інформація</h2>
                </div>
                <div class='to__info'>
                    <div class='to__info__left'>
                        <p><span class='cont__info__title'>Дата першого контакту: </span><span class='cont__info__znak'>$contact->firstContact</span></p>
                <p><span class='cont__info__title'>Категорія кейсу: </span><span class='cont__info__znak'>$categories</span></p>
                
            <p><span class='cont__info__title'>Канал комунікації: </span><span class='cont__info__znak'>$contact->chanelComunity</span></p>
            <p><span class='cont__info__title'>Сімейний стан: </span><span class='cont__info__znak'>$contact->familyStan</span></p>
                    </div>
                    <div class='to__info__right'>
                        <p><span class='cont__info__title'>Потреба: </span><span class='cont__info__znak'>$contact->potreba</span></p>
                        <p><span class='cont__info__title'>Коментар до кейсу: </span><span class='cont__info__znak'>$contact->commentar</span></p>
                    </div>
                </div>
            
                $planHTML
                $helpHTML
                $notesHTML
                $images
        </div>
   </div>";
   $mpdf->SetProtection(array(), $pwd, 'MyPassword');
   $mpdf->defaultheaderline=5;
$mpdf->WriteHTML($stylesheet,\Mpdf\HTMLParserMode::HEADER_CSS);
$mpdf->SetHeader('Document Title|Center Text|{PAGENO}');
$mpdf->SetHTMLHeader('<div class="header__logo" style="text-align: right;"><img src="logo.png"  width="80px"/></div>', 'O');
$mpdf->WriteHTML($html,\Mpdf\HTMLParserMode::HTML_BODY);

$time = time();
$fileName = 'pdffiles/'.$time.'.pdf';
$mpdf->Output($fileName, 'F'); 

$obj = new StdClass();
$obj->{'link'} = 'https://'.$_SERVER['HTTP_HOST'].'/serve/mpdf/'.$fileName;
$obj->{'active'} = true;
$obj->{'pass'} = $pwd;
echo json_encode($obj);
exit;