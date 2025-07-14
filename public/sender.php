<?php
/*
Инструкция
В head-е подключить скрипт для каждой формы

<script type="text/javascript" src="/sender.php?id=testForm&popup_id=successPopup"></script>

В src указываем путь к скрипту
Через GET-запрос передаем либо id, либо уникальный класс тега <form>
?id= 				имеет приоритет над классом
?class=				должен быть уникальным
а также можно передать id блока, который будет показан при успешном сабмите
&popup_id=			должен быть уникальным


При удачном сабмите также происходит event "form_submitted". На него можно вешать свою логику. 
При не успешном сабмите также происходит event "form_error". На него можно вешать свою логику.

Для корректного определения полей lead_source_1 и lead_source_2 в kommo crm и roistat.com,
редактировать массивы SOURCE_CODES и SOURCE_2_CODES соответственно.
*/

// Configuration
const ALLOW_SEND_TO_EMAIL = true;
const ALLOW_WRITE_TO_FILE = false;
const ALLOW_SEND_TO_CRM = false;
const ALLOW_SEND_TO_KOMMO_CRM = false;
const ALLOW_SEND_TO_ROISTAT = false;

const USE_CAPTCHA = "period"; // use always or period or never
const PERIOD_TIME_CAPTCHA = 6000; // In seconds
const SEND_FORM_IN_PERIOD_CAPTCHA = 10; // How times tries in PERIOD_TIME_CAPTCHA
const SAVE_TRIES_IN_FILE = __DIR__ . '/captcha_counter.txt';

const CRM_API_URL = '';
const CRM_LOGIN = '';
const CRM_PASS = '';
const CRM_LEAD_ORDER_ID = 6;
const CRM_FUNNEL_ID = 74;
const CRM_GROUP_ID = 198;

const CRM_KOMMO_TOKEN = "";
const CRM_KOMMO_API_URL = "";

// Больше не использовать, а редактировать массивы SOURCE_CODES, SOURCE_2_CODES ниже
// const CRM_KOMMO_LEAD_SOURCE = 45264; 

const CLOUD_ROISTAT_API_URL = '';
const CLOUD_ROISTAT_TOKEN = '';

// Больше не использовать, а редактировать массивы SOURCE_CODES, SOURCE_2_CODES ниже
// const CLOUD_ROISTAT_LEAD_SOURCE = 125620;

const EMAIL = 'contact@case-m.pro';
const FROM = 'Case Manager <contact@case-m.pro>';
const SUBJECT = 'Email from website Case-m';

const FILE_PATH = ".leads.csv";

const FIELDS = array(
	'first_name' => [
		'label' => 'Имя',
	],
	'phone_number' => [
		'label' => 'Номер телефона',
	],
	'email' => [
		'label' => 'E-mail',
	],
	'telegram' => [
		'label' => 'Telegram',
	],
	'source_page' => [
		'label' => 'Страницв',
	],
	'lng_2' => [
		'label' => 'Язык',
	],
	'lead_source' => [
		'label' => 'Lead source',
	],
	'responsible_id' => [
		'label' => 'Responsible id',
	],
	'last_comment' => [
		'label' => 'Комментарий',
	],
	'utm_source' => [
		'label' => 'utm_source',
	],
	'utm_medium' => [
		'label' => 'utm_medium',
	],
	'utm_campaign' => [
		'label' => 'utm_campaign',
	],
	'utm_content' => [
		'label' => 'utm_content',
	],
	'fbclid' => [
		'label' => 'fbclid',
	],
	'gclid' => [
		'label' => 'gclid',
	],
);

// Lead Source (1) codes
const SOURCE_CODES = [
	
];

// Lead Source (2) codes
// !!! Для сайта bithide.io/blog заменить значение на 151421 !!!
const SOURCE_2_CODES = [
	
];

function generateCaptcha($getCaptcha = "captcha") {

    $width = 220;
    $height = 60;
    $font_size = 20;
    $captcha_text = substr(str_shuffle('ABCDEFGHJKLMNPQRSTUVWXYZ23456789'), 0, 6);

    $_SESSION[$getCaptcha] = $captcha_text;

    $image = imagecreatetruecolor($width, $height);

    $bg_color = imagecolorallocate($image, rand(200, 255), rand(200, 255), rand(200, 255));
    imagefilledrectangle($image, 0, 0, $width, $height, $bg_color);

    $text_color = imagecolorallocate($image, rand(0, 150), rand(0, 150), rand(0, 150));

    for ($i = 0; $i < 20; $i++) {
        $line_color = imagecolorallocate($image, rand(100, 200), rand(100, 200), rand(100, 200));
        imageline($image, rand(0, $width), rand(0, $height), rand(0, $width), rand(0, $height), $line_color);
    }

    for ($i = 0; $i < 400; $i++) {
        $pixel_color = imagecolorallocate($image, rand(50, 200), rand(50, 200), rand(50, 200));
        imagesetpixel($image, rand(0, $width), rand(0, $height), $pixel_color);
    }


    $fonts = ['SpecialElite-Regular.ttf'];
    $x = 15;

    for ($i = 0; $i < strlen($captcha_text); $i++) {
        $angle = rand(-35, 35);
        $font_path = __DIR__ . '/' . $fonts[array_rand($fonts)];

        $y_offset = rand(40, 55);
        $x_offset = rand(-5, 5);

        imagettftext($image, $font_size, $angle, $x + $x_offset, $y_offset, $text_color, $font_path, $captcha_text[$i]);
        $x += rand(25, 35);
    }

    $distorted_image = imagecreatetruecolor($width, $height);
    imagefill($distorted_image, 0, 0, $bg_color);

    for ($x = 0; $x < $width; $x++) {
        for ($y = 0; $y < $height; $y++) {
            $newX = (int)($x + sin($y / 10) * 5);
            $newY = (int)($y + cos($x / 15) * 5);
            if ($newX >= 0 && $newX < $width && $newY >= 0 && $newY < $height) {
                imagesetpixel($distorted_image, $newX, $newY, imagecolorat($image, $x, $y));
            }
        }
    }

    header('Content-Type: image/png');
    imagepng($distorted_image);
    imagedestroy($image);
    imagedestroy($distorted_image);
    exit;
}


function updateCounterInFile($file) {
   
    $counter = 0;

    if (file_exists($file)) {
        $content = file_get_contents($file);

        if (is_numeric(trim($content))) {
            $counter = (int)trim($content);
        }
    }

    $counter++;
    file_put_contents($file, $counter);

    return $counter;
}

function checkCaptchaFile($file, $periodTimeCaptcha, $sendFormInPeriodCaptcha) {
    if (USE_CAPTCHA == 'never') {
        return false;
    }

    if (USE_CAPTCHA == 'always') {
        return true;
    }
  
    if (!file_exists($file)) {
        file_put_contents($file, 0);
        return false; 
    }

    $lastModified = filemtime($file); 
    $currentTime = time();

    if ($currentTime - $lastModified > $periodTimeCaptcha) {
        file_put_contents($file, 0); 
        return false; 
    }

    // Читаємо каунтер із файлу
    $counter = (int)file_get_contents($file);

    if ($counter >= $sendFormInPeriodCaptcha) {
        return true;
    }
}

$enabledCaptha = checkCaptchaFile(SAVE_TRIES_IN_FILE, PERIOD_TIME_CAPTCHA, SEND_FORM_IN_PERIOD_CAPTCHA); 


if (isset($_GET['get-captcha'])) {
    if ($enabledCaptha) {
        if (session_status() == PHP_SESSION_NONE)
            session_start();
        generateCaptcha($_GET['get-captcha']);
    }
}


$selfPath = $_SERVER["SCRIPT_NAME"];

if (isset($_GET["class"]) || isset($_GET["id"])) {
	$formId = "";
	$captchaId = "";
	if (isset($_GET["class"])) {
		$formId = "." . $_GET["class"];
	}

	if (isset($_GET["id"])) {
		$formId = "#" . $_GET["id"];
	}

	if (isset($_GET['captcha_id'])) {
		$captchaId = $_GET['captcha_id'];
	}

	$popupId = isset($_GET["popup_id"]) ? "#" . $_GET["popup_id"] : null;

	if ($formId) {
		header('Content-Type: application/javascript');

		?>

	jQuery(document).ready(function ($) {
        $("<?php echo $formId;?>").attr("action", "<?php echo $selfPath;?>");
        <?php if ($enabledCaptha && !empty($captchaId)) { ?>
					$("#<?php echo $captchaId ?>").html(
						`<div class='captcha-container_inner'>	
							<div class='captcha_message_container'>
								<img id='<?php echo $captchaId ?>_message' src='<?php echo $selfPath; ?>?get-captcha=<?php echo $captchaId ?>' onclick="this.src='<?php echo $selfPath; ?>?get-captcha=<?php echo $captchaId ?>&valid=' + Math.random()" />
								<span onclick="document.getElementById('<?php echo $captchaId ?>_message').src='<?php echo $selfPath; ?>?get-captcha=<?php echo $captchaId ?>&valid=' + Math.random()">↻</span>
							</div>
							<input required name='captcha' class='form-item_input captcha' placeholder="Captcha" />
							<input required name='captcha_id' type='hidden' value='<?php echo $captchaId ?>' />
						</div>`
					);
        <?php } ?>
		$(document).on("focus","<?php echo $formId;?>",function(){
			if(!($("<?php echo $formId;?>").find(".arfield").length))
			{
				$.ajax({
					type: "POST",
					url: "<?php echo $selfPath;?>",
					data: {arfield: "field", form:"<?php echo $formId;?>", captchaId:"<?php echo $captchaId?>"},
					success: function(data) {
						$('<?php echo $formId;?>').append(data);
						$.ajax({
							type: "POST",
							url: "<?php echo $selfPath;?>",
							data: {arfield: "code", form:"<?php echo $formId;?>", captchaId:"<?php echo $captchaId?>"},
							success: function(data) {
								$('<?php echo $formId;?>').find(".arfield").val(data);
								$('<?php echo $formId;?> [type="submit"]').on("click", function(e) {
									e.preventDefault();
									if( $('<?php echo $formId;?>').valid() ) {
										var formData = {};
										formData['referrer_original'] = document.referrer;
										$.map($('<?php echo $formId;?>').serializeArray(), function(n, i) {
											formData[n['name']] = n['value'];
										});

										const params = new URLSearchParams(document.location.search);
										for (const [key, value] of params.entries()) {
											formData[key] = value;
										}
			
										$.post("<?php echo $selfPath;?>", formData, function(response) {
											response = JSON.parse(response);
											console.log("response", response)
											if (response.status) {
												$(document).trigger("form_submitted", [response]);
											} else {
												$(document).trigger("form_error", [response]);
                                                $("#<?php echo $captchaId ?>_message").attr("src", "<?php echo $selfPath; ?>?get-captcha=<?php echo $captchaId ?>&valid=" + Math.random());
											}
										});
									} else {
										$(document).trigger("form_error", [{}]);
                                        $("#<?php echo $captchaId ?>_message").attr("src", "<?php echo $selfPath; ?>?get-captcha=<?php echo $captchaId ?>&valid=" + Math.random());
									}
								});
							}
						});
					}
				});
			}
		});
	});

		<?php
	}

}


if (isset($_REQUEST['arfield'])) {

	if (session_status() == PHP_SESSION_NONE)
		session_start();

	switch ($_REQUEST['arfield']) {
		case 'field':
			$_SESSION[$_REQUEST["form"]] = md5(uniqid()) . '{||}' . date('His');
			echo "<input type='hidden' name='arfield' class='arfield'><input type='hidden' name='form_name' value='" . $_REQUEST["form"] . "'>";
			break;
		case 'code':
			echo $_SESSION[$_REQUEST["form"]];
			break;
	}

}


if (isset($_REQUEST['form_name'])) {
   
	if (session_status() == PHP_SESSION_NONE)
		session_start();	

	if ( 
		isset($_REQUEST['arfield']) &&
		isset($_SESSION[$_REQUEST["form_name"]]) &&
		$_REQUEST['arfield'] == $_SESSION[$_REQUEST["form_name"]]
	) { 

		$arfiedArray = explode('{||}', $_REQUEST['arfield']);

		if (isset($arfiedArray[1]) && $arfiedArray[1] !== '') {

			$succesNumber = (integer) date('His') - (integer) $arfiedArray[1];

			if ($succesNumber > 0 || true) {

				$formData = array_fill_keys(array_keys(FIELDS), null);
				$isValid = true;
				foreach (FIELDS as $fieldName => $fieldOptions) {
					if (!empty($_POST[$fieldName])) {
						$formData[$fieldName] = htmlspecialchars($_POST[$fieldName]);
					} else if (isset($fieldOptions['required']) && $fieldOptions['required'] == true) {
						$isValid = false;
					}
				}

				if (!$isValid || !array_filter($formData)) {
					echo json_encode([
						'status' => false,
						'error' => 'All or required fields are missing',
					]);
					return;
				}

				$messageBody = '
					<br /><br />' .
					implode('<br />', array_map(function ($name, $value) {
						return FIELDS[$name]['label'] . ': ' . $value;
					}, array_keys($formData), $formData)) . '<br />';

				set_error_handler(function ($severity, $message, $file, $line) {
					throw new Exception($message, 0);
				});

				function sendApiRequest($url, $data, $access_token)
				{
					$ch = curl_init();
					curl_setopt($ch, CURLOPT_URL, $url);
					curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
					curl_setopt($ch, CURLOPT_POST, 1);
					curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
					curl_setopt($ch, CURLOPT_HTTPHEADER, [
						"Authorization: Bearer $access_token",
						"Content-Type: application/json"
					]);
					$response = curl_exec($ch);
					if (curl_errno($ch)) {
						echo 'Error:' . curl_error($ch);
						return false;
					}
					curl_close($ch);
					return json_decode($response, true);
				}

                $errors = [];
                if (USE_CAPTCHA == 'period' || USE_CAPTCHA == 'always') {
                    $newCounter = updateCounterInFile(SAVE_TRIES_IN_FILE);
                }
                
                if ($enabledCaptha) {
                    if (!isset($_SESSION[$_POST['captcha_id']]) || $_POST['captcha'] !== $_SESSION[$_POST['captcha_id']]) {
                        echo json_encode(['success' => false, 'error' => 'Invalid captcha.']);
                        exit;
                    }
                    unset($_SESSION['captcha']);
                }

				// Lead sources
				$utmSource = isset($formData['utm_source']) ? $formData['utm_source'] : 'website';
				$location = $_SERVER['HTTP_HOST'];
				$leadSource1 = isset(SOURCE_2_CODES[$location]) ? SOURCE_2_CODES[$location] : SOURCE_2_CODES['default'];
				$roistatMarker = array_key_exists('roistat_marker', $_COOKIE) ? true : false;
				$referer = $_POST['referrer_original'] ?? null;
				$anotherReferer = true;

				if ($referer) {
					$refererHost = parse_url($referer, PHP_URL_HOST);
					if ($refererHost && $refererHost == $location) {
						$anotherReferer = false;
					}
				} else {
					$anotherReferer = false;
				}
				
				$leadSource2 = SOURCE_2_CODES['default'];
				
				if (isset(SOURCE_2_CODES[$location])) {
					$leadSource2 = SOURCE_2_CODES[$location];
				}
				// Adds
				if (($utmSource != 'website') &&
					isset(SOURCE_2_CODES[$utmSource])
				) {
					$leadSource2 = SOURCE_2_CODES[$utmSource];
				}
				// Search engine

				if ($roistatMarker && $anotherReferer) {
					$leadSource2 = SOURCE_2_CODES['seo'];
				}

				try {
					if (ALLOW_SEND_TO_EMAIL) {
						$statusMail = mail(EMAIL, SUBJECT, $messageBody, "From: " . FROM . " \r\n  \r\n" . "MIME-Version: 1.0\r\n" . "Content-type: text/html; charset=utf-8\r\n");
						$errors[] = ['$statusMail' => $statusMail];
					}

					if (ALLOW_WRITE_TO_FILE) {
						$f = fopen(FILE_PATH, "a+");

						fputcsv($f, array_merge($formData, array(
							date('d.m.y / H:i'),
							getenv('HTTP_REFERER')
						)), ';');

						fclose($f);
					}

					if (ALLOW_SEND_TO_CRM) {
						// Generate token
						// -----------------------------------------------
						$authUrl = CRM_API_URL . "/auth/generate_token";
						$authRequest = curl_init();

						$errors[] = [
							'$authUrl' => $authUrl
						];

						curl_setopt_array($authRequest, array(
							CURLOPT_URL => $authUrl,
							CURLOPT_RETURNTRANSFER => true,
							CURLOPT_ENCODING => "",
							CURLOPT_MAXREDIRS => 10,
							CURLOPT_TIMEOUT => 0,
							CURLOPT_FOLLOWLOCATION => true,
							CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
							CURLOPT_CUSTOMREQUEST => "POST",
							CURLOPT_POSTFIELDS => '{
											"login": "' . CRM_LOGIN . '",
											"password": "' . CRM_PASS . '"
									}',
							CURLOPT_HTTPHEADER => array(
								"Content-Type: application/json"
							),
						));

						$tokenResponse = curl_exec($authRequest);
						$tokenResponse = json_decode($tokenResponse, true);

						$token = $tokenResponse['token'];

						$errors[] = [
							'$token' => $token
						];

						curl_close($authRequest);

						// Create lead
						// -----------------------------------------------
						$createLeadUrl = CRM_API_URL . "/crm/create_lead?token=" . $token;
						$leadRequest = curl_init();

						$errors[] = [
							'$createLeadUrl' => $createLeadUrl
						];

						curl_setopt_array($leadRequest, array(
							CURLOPT_URL => $createLeadUrl,
							CURLOPT_RETURNTRANSFER => true,
							CURLOPT_ENCODING => "",
							CURLOPT_MAXREDIRS => 10,
							CURLOPT_TIMEOUT => 0,
							CURLOPT_FOLLOWLOCATION => true,
							CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
							CURLOPT_CUSTOMREQUEST => "POST",
							CURLOPT_POSTFIELDS => '{
											"first_name": "' . $formData["first_name"] . '",
											"phone": "' . $formData["phone_number"] . '",
											"email": "' . $formData["email"] . '",
											"source_page": "' . $formData["source_page"] . '",
											"lead_source": "' . $formData["lead_source"] . '",
											"responsible_id": "' . $formData["responsible_id"] . '",
											"lng_2": "' . $formData["lng_2"] . '",
											"last_comment": "' . $formData["last_comment"] . '",
											"telegram": "' . $formData["telegram"] . '",
											"lead_order_id": "' . CRM_LEAD_ORDER_ID . '",
											"funnel_id": "' . CRM_FUNNEL_ID . '",
											"group_id": "' . CRM_GROUP_ID . '"
									}',
							CURLOPT_HTTPHEADER => array(
								"Content-Type: application/json"
							),
						));

						curl_exec($leadRequest);
						curl_close($leadRequest);
					}

					if (ALLOW_SEND_TO_KOMMO_CRM) {
						// 1. Створення контакту
						$roistatVisitId = array_key_exists('roistat_visit', $_COOKIE) ? $_COOKIE['roistat_visit'] : 'nocookie';
						if (isset($formData['first_name'])) {							
							$contact_data = [
								[
									"name" => "New Lead "  . $formData['first_name'] . " from Website ". $formData['source_page'],
									"custom_fields_values" => [
										["field_id" => 383200, "values" => [["value" => $formData['email']]]],
										["field_id" => 383198, "values" => [["value" => $formData['phone_number']]]],
										["field_id" => 742942, "values" => [["value" => $formData['telegram']]]],
										["field_id" => 384952, "values" => [["value" => strtoupper($formData['lng_2']) == "UK" ? "UA" : strtoupper($formData['lng_2'])]]],
									]
								]
							];
						} else {
							$contact_data = [
								[
									"name" => "New Lead from Website only TG:". $formData['source_page'],
									"custom_fields_values" => [
										["field_id" => 742942, "values" => [["value" => $formData['telegram']]]],
									]
								]
							];
						}



						$contact_response = sendApiRequest(CRM_KOMMO_API_URL . "contacts", $contact_data, CRM_KOMMO_TOKEN);

						if (isset($contact_response['_embedded']['contacts'][0]['id'])) {
							$contact_id = $contact_response['_embedded']['contacts'][0]['id'];

							// 2. Створення ліда з UTM-даними
							$lead_data = [
								[
									"name" => "New Lead "  . $formData['first_name'] . " from Website ". $formData['source_page'],
									"pipeline_id" => 9515147,
									"status_id" => 73467519,
									"_embedded" => [
										"contacts" => [
											["id" => $contact_id]
										]
									],
									"custom_fields_values" => [
										["field_id" => 567374, "values" => [["catalog_id" => 24228, "catalog_element_id" => $leadSource1], [ "catalog_id" => 24232, "catalog_element_id" => $leadSource2] ]],
										["field_id" => 742084, "values" => [["value" => $formData['source_page']]]],
										["field_id" => 748438, "values" => [["value" => $formData['source_page']]]],
										["field_id" => 383206, "values" => [["value" => isset($formData['utm_content']) ? $formData['utm_content'] : '']]],
										["field_id" => 383208, "values" => [["value" => isset($formData['utm_medium']) ? $formData['utm_medium'] : '']]],
										["field_id" => 383210, "values" => [["value" => isset($formData['utm_campaign']) ? $formData['utm_campaign'] : '']]],
										["field_id" => 383212, "values" => [["value" => isset($formData['utm_source']) ? $formData['utm_source'] : '']]],
										["field_id" => 383214, "values" => [["value" => 'utm_term']]],
										["field_id" => 383216, "values" => [["value" => 'utm_referrer']]],
										["field_id" => 383218, "values" => [["value" => 'referrer']]],
										["field_id" => 383220, "values" => [["value" => 'gclientid']]],
										["field_id" => 383222, "values" => [["value" => isset($formData['gclid']) ? $formData['gclid'] : '']]],
										["field_id" => 383224, "values" => [["value" => isset($formData['fbclid']) ? $formData['fbclid'] : '']]],
										["field_id" => 753720, "values" => [["value" => $roistatVisitId]]],
									]
								]
							];

							$lead_response = sendApiRequest(CRM_KOMMO_API_URL . "leads", $lead_data, CRM_KOMMO_TOKEN);

							if (isset($lead_response['_embedded']['leads'][0]['id'])) {
								$lead_id = $lead_response['_embedded']['leads'][0]['id'];
								if (!empty($formData['last_comment'])) {
									$note_data = [
										[
											"entity_id" => $lead_id,
											"note_type" => "common",
											"params" => [
												"text" => $formData['last_comment']
											]
										]
									];

									$note_response = sendApiRequest(CRM_KOMMO_API_URL . "leads/notes", $note_data, CRM_KOMMO_TOKEN);

									if (!isset($note_response['_embedded']['notes'][0]['id'])) {
										echo json_encode(['status' => false, 'error' => 'Failed to create note.', 'response' => $note_response]);
										return;
									}
								}

							} else {
								echo json_encode(['status' => false, 'error' => 'Failed to create lead.', 'response' => $lead_response]);
								return;
							}
						} else {
							echo json_encode(['status' => false, 'error' => 'Failed to create contact.', 'response' => $contact_response]);
							return;

						}


					}

					// cloud.roistat.com
					// https://help-ru.roistat.com/quick-start/Zagruzka_zajavok_v_Roistat/
					if (ALLOW_SEND_TO_ROISTAT) {
						$title = $formData['first_name'] ?
							"New Lead " . $formData['first_name'] . " from Website ". $formData['source_page'] :
							"New Lead from Website only TG:". $formData['source_page'];

						$roistatData = array(
							'roistat' => isset($_COOKIE['roistat_visit']) ? $_COOKIE['roistat_visit'] : 'nocookie',
							'key'     => CLOUD_ROISTAT_TOKEN,
							'title'   => $title,
							'name'   => $formData["first_name"],
							'phone'   => $formData["phone_number"],
							'email'   => $formData["email"],
							'order_creation_method' => '', // Способ создания сделки (необязательный параметр). Укажите то значение, которое затем должно отображаться в аналитике в группировке "Способ создания заявки"
							'is_need_check_order_in_processing' => 1, // Настройка стандартной проверки заявок на дубли.'1', на дубли будут проверяться заявки за последние 12 часов только в статусах группы "В работе". '0', будут проверяться все заявки за последние 12 часов.
							'is_need_check_order_in_processing_append' => 1, // Если создана дублирующая заявка, в нее будет добавлен комментарий об этом
							'is_skip_sending' => 1, // Не отправлять заявку в CRM.

							'fields'  => array(
								'status_id' => 73467519,
								'pipeline_id' => 9515147,
								'24228'  => $leadSource1,
								'24232'  => $leadSource2,
								'742084' => '{orderPage}',
								'383206' => '{utmContent}',
								'383208' => '{utmMedium}',
								'383210' => '{utmCampaign}',
								'383212' => '{utmSource}',
								'383214' => '{utmTerm}',
								'383218' => '{referrer}',
								'383220' => '{googleClientId}',
								'383222' => '{gclid}',
								'383224' => '{facebookClientId}',
								'753722' => '{visit}',
								'754980' => '{sourceAliasLevel1}',
								'754982' => '{sourceAliasLevel2}',
							),
						);

						file_get_contents(CLOUD_ROISTAT_API_URL . http_build_query($roistatData));
					}

					unset($_SESSION[$_REQUEST["form_name"]]); // очищаем проверочный пароль

					echo json_encode(['masserror' => $errors, 'status' => true]);

				} catch (Exception $e) {
					echo json_encode(['masserror' => $errors, 'status' => false, 'error' => $e->getMessage()]);
					return;
				}

			} else {
				echo json_encode([
					'status' => false,
					'error' => 'Too little time has passed'
				]);
			}

		} else {
			echo json_encode([
				'status' => false,
				'error' => 'No time slot'
			]);
		}


	} else {

		echo json_encode([
			'status' => false,
			'error' => 'Password already expired'
		]);

	}
}
