<?php
// 前端 to 後端:
// let cmd = {};
// cmd["act"] = "changePassword";
// cmd["account"] = "0123456";
// cmd["password"] = "789789789";

// 後端 to 前端
// dataDB.status
// dataDB.errorCode
// 若 status = true:
// dataDB.data="success to change the password"
// 否則
// dataDB.data = "fail to find the password"
//header("Content-Type:text/html; charset=utf-8");
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
	//$mail->header("Content-Type:text/html; charset=utf-8");
    $mail->setFrom('softwareengineeringhelen@gmail.com'); // Gmail address which you used as SMTP server
    $mail->addAddress($email."@mail.ntou.edu.tw"); // Email address where you want to receive emails (you can use any of your gmail address including the gmail address which you used as SMTP server)
	
	//產生驗證碼
	$str = 0;
	for($i=0;$i<2;$i++)	$str = $str.rand(0,100);
	$encodeletter = base64_encode($str);	//加密
	$encodeletter = $encodeletter.rand(0,10);
	
	//email內容
    $mail->isHTML(true);
    $mail->Subject = "=?UTF-8?B?".base64_encode('Helen海大討論區')."?=";
    //$mail->Body = "<h3>Name : $name <br>Email: $email <br>Message : $message</h3>";
    $mail->Body = "<div style='border-style:double;border-color:#0000C6;width:700px;'><h3>&nbsp;To whom it may concern,<br><br>&nbsp;&nbsp;&nbsp;&nbsp;you had pressed the Helen - Forget Password Button.<br>&nbsp;&nbsp;&nbsp;&nbsp;There are three steps to relogin: <br>&nbsp;&nbsp;-------------------------------------------------------------------------------------------------<br><span style='background-color:#FFDC35'>&nbsp;&nbsp;&nbsp;&nbsp;STEP 1. Your new password:"."<span style='color:red'>$encodeletter</span></span><br>&nbsp;&nbsp;&nbsp;&nbsp;STEP 2. Please use the new password above to login your account.<br>&nbsp;&nbsp;&nbsp;&nbsp;STEP 3. Modify your own password after you login.</h3></div>";
	//$test = "=?UTF-8?B?".base64_encode('Helen海大討論區')."?=";
   //$mail->Body = $test;
	if($mail->send()){
		//update password
	//global $conn;
	$sql="SELECT `UserID` FROM `Users` WHERE `UserID`='".$email."'";
	$arr = array();
            $result = query($conn,$sql,$arr,"SELECT");
            $resultCount = count($result);
	if($resultCount <= 0){	//找不到用戶
		errorCode("fail to find the password");
	}
		else{	//更改用戶密碼
			$keepsql="UPDATE `Users` SET `Password` = '".$encodeletter."' WHERE `UserID` ='".$email."'";
			$keepresult = $conn->query($keepsql);
			if(!$keepresult){
			die($conn->error);
			}
			$rtn = successCode("success to change the password");
		}
	echo json_encode($rtn);
	}
	
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
                           