<?php
    /*
    前端 to 後端:
    let cmd = {};
    cmd["act"] = "sendMailPwd";
    cmd["account"] = "00757015";

    後端 to 前端:
    dataDB.status
    若 status = true:
        dataDB.info = ""    
        dataDB.data="success to verify"
    否則
        dataDB.errorCode = "fail to find the password"
        dataDB.data = ""
    */

    use PHPMailer\PHPMailer\PHPMailer;
    require_once 'phpmailer/Exception.php';
    require_once 'phpmailer/PHPMailer.php';
    require_once 'phpmailer/SMTP.php';

    $mail = new PHPMailer(true);
    $alert = '';
    $email = $input['account'];
    $url = "http://localhost/helen/HTMLs/index"; // 前端給網址

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
        $now = date ("Y-m-d H:i:s" , mktime(date('H')+7, date('i')+15, date('s'), date('m'), date('d'), date('Y'))) ;	//設定過期時間
        $token = md5($input["account"].$now);
        $_SESSION[$token]= array("account"=>$input["account"],"time"=>$now);

        $mail->isHTML(true);
        $mail->Subject = "=?UTF-8?B?".base64_encode('Helen海大討論區')."?=";
        $mail->Body = "<div style='border-style:double;border-color:#0000C6;width:700px;'><h3>&nbsp;To whom it may concern,<br><br>&nbsp;&nbsp;&nbsp;&nbsp;you had pressed the Helen - Forget Password Button.<br>Click the WEB LINK to verify your identity: <br><span style='background-color:#FFDC35'>&nbsp;&nbsp;&nbsp;&nbsp;WEB LINK:<a href=".$url."?token=".$token.">Click me to verify!!</a></span></h3></div>";
        $mail->send();
        //例外
        $alert = 'Message Sent! Thank you for contacting us.';
        $rtn = successCode($alert);
    } catch (Exception $e){
        errorCode("【sendMailPwd.php】failed: ". $e->getMessage());
    }
    echo json_encode($rtn);
?>