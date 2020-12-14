<?php
/*
前端 to 後端:
let cmd = {};
cmd["act"] = "changePassword";
cmd["account"] = "0123456";
cmd["password"] = "789789789";

後端 to 前端
dataDB.status
dataDB.errorCode
若 status = true:
dataDB.data="success to change the password"
否則
dataDB.data = "fail to find the password"

use PHPMailer\PHPMailer\PHPMailer;

//require_once 'index.php'; //連線資料庫
require_once("test.php");
require_once 'phpmailer/Exception.php';
require_once 'phpmailer/PHPMailer.php';
require_once 'phpmailer/SMTP.php';

$mail = new PHPMailer(true);

$alert = '';

if(isset($input['submit'])){
//   $email = $_POST['email'];
$email = $input['account'];
 
  try{
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'softwareengineeringhelen@gmail.com'; // Gmail address which you want to use as SMTP server
    $mail->Password = 'soft123soft'; // Gmail address Password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = '587';
    $mail->setFrom('softwareengineeringhelen@gmail.com'); // Gmail address which you used as SMTP server
    $mail->addAddress($email."@mail.ntou.edu.tw"); // Email address where you want to receive emails (you can use any of your gmail address including the gmail address which you used as SMTP server)
	
	//email內容
    $mail->isHTML(true);
    $mail->Subject = "=?UTF-8?B?".base64_encode('Helen海大討論區')."?=";
    $mail->Body = "<div style='border-style:double;border-color:#0000C6;width:700px;'><h3>&nbsp;To whom it may concern,<br><br>&nbsp;&nbsp;&nbsp;&nbsp;you had registered in Helen Account.</h3></div>";
	$mail->send();
	//global $conn;
	//例外
    $alert = '<div class="alert-success">
                 <span>Message Sent! Thank you for contacting us.</span>
                </div>';
  } catch (Exception $e){
    $alert = '<div class="alert-error">
                <span>'.$e->getMessage().'</span>
              </div>';
  }
}
?>
                           
