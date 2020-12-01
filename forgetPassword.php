//
<!-- 前端 to 後端:
let cmd = {};
cmd["act"] = "forgetpassword";
cmd["account"] = 00757003@email.ntou.edu.tw;
-->
<!-- 後端 to 前端
dataDB.status
dataDB.errorCode
若 status = true:
dataDB.data = "系統已向您的郵箱傳送了一封郵件<br/>請登入到您的郵箱及時重置您的密碼！"
否則
dataDB.data = "尚未註冊" -->
//
<!-- 前端 to 後端:
let cmd = {};
cmd["act"] = "input email token";
cmd["account"] = 00757003@email.ntou.edu.tw;
cmd["token"] = 一組驗證碼;
-->
<!-- 後端 to 前端
dataDB.status
dataDB.errorCode
若 status = true:
dataDB.data = ""
否則
dataDB.data = "" -->
<?php
	require_once("connectDB.php");//連線資料庫 
	$email = stripslashes(trim($_POST['account'])); 
	$sql = "select `UserID`, `Password` from `User` where `UserID`='$email'"; 
	$query = mysql_query($sql); 
	$num = mysql_num_rows($query); 
	if($num==0){	//該郵箱尚未註冊！ 
		$rtn = array();
		$rtn["status"] = false;
		$rtn["errorCode"] ="尚未註冊";
		$rtn["data"] = ""; 
		echo json_encode($rtn);
		exit; 
	}else{ //有註冊
		$row = mysql_fetch_array($query); 
		$getpasstime = time(); 
		$uid = $row['id']; 
		$token = base64_encode($uid.$row['UserID'].$row['Password']);//組合驗證碼
		$url = "reset.php?email=".$email."&token=".$token;//構造URL 
		$time = date('Y-m-d H:i'); 
		$result = sendmail($time, $email, $url); 
		if($result==1){//郵件傳送成功  
			$rtn = array();
			$rtn["status"] = true;
			$rtn["errorCode"] ="";
			$rtn["data"] = "系統已向您的郵箱傳送了一封郵件<br/>請登入到您的郵箱及時重置您的密碼！"; 
			echo json_encode($rtn);
			/*$msg = '系統已向您的郵箱傳送了一封郵件<br/>請登入到您的郵箱及時重置您的密碼！'; 
			更新資料傳送時間 
			mysql_query("update `User` set `getpasstime`='$getpasstime' where id='$uid '"); */
		}else{ $msg = $result; } 
		//update password
	$sql = "UPDATE `User` SET `Password` = '$token' WHERE `UserID`='$email'";
	$result = $conn->query($sql);
	if(!$result){
	die($conn->error);
	}
//傳送郵件 
	function sendmail($time,$email,$url){ 
		require_once("smtp.class.php");
		$smtpserver = ""; //SMTP伺服器，如smtp.163.com 
		$smtpserverport = 25; //SMTP伺服器埠 
		$smtpusermail = ""; //SMTP伺服器的使用者郵箱 
		$smtpuser = ""; //SMTP伺服器的使用者帳號 
		$smtppass = ""; //SMTP伺服器的使用者密碼 
		$smtp = new Smtp($smtpserver, $smtpserverport, true, $smtpuser, $smtppass); //這裡面的一個true是表示使用身份驗證,否則不使用身份驗證. 
		$emailtype = "HTML"; //信件型別，文字:text；網頁：HTML 
		$smtpemailto = $email; 
		$smtpemailfrom = $smtpusermail; 
		$emailsubject = "Helen海大討論區系統 - 找回密碼"; 
		$emailbody = "HI!!".$email."：<br/>您在".$time."提交了忘記密碼請求。請使用以下驗證碼為新的登入密碼，登入後請至個人頁面修改密碼。。<br/><a href='".$url."'target='_blank'>".$url."</a>"; 
		$rs = $smtp->sendmail($smtpemailto, $smtpemailfrom, $emailsubject, $emailbody, $emailtype); 
		return $rs; 
}
?>