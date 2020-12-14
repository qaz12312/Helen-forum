<?php
    /*
    前端 to 後端:
    let cmd = {};
    cmd["act"] = "sendmailPwd";
    cmd["account"] = "00757007";

    後端 to 前端:
    dataDB.status
    若 status = true:
        dataDB.errorCode = ""    
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
        
        /*//產生驗證碼
        $str = 0;
        for($i=0;$i<2;$i++)	$str = $str.rand(0,100);
        $encodeletter = base64_encode($str);	//加密
        $encodeletter = $encodeletter.rand(0,10);*/
        
        //email內容
        $now = date ("Y-m-d H:i:s" , mktime(date('H')+7, date('i')+15, date('s'), date('m'), date('d'), date('Y'))) ;	//設定過期時間
        $token = md5($input["account"].$input["now"]);
        $_SESSION[$token]= array("account"=>$input["account"],"time"=>$now);

        $mail->isHTML(true);
        $mail->Subject = "=?UTF-8?B?".base64_encode('Helen海大討論區')."?=";
        //$mail->Body = "<h3>Name : $name <br>Email: $email <br>Message : $message</h3>";
        //!!!!!url要再改(前端還沒給)!!!!!
        $mail->Body = "<div style='border-style:double;border-color:#0000C6;width:700px;'><h3>&nbsp;To whom it may concern,<br><br>&nbsp;&nbsp;&nbsp;&nbsp;you had pressed the Helen - Forget Password Button.<br>Click the WEB LINK to verify your identity: <br><span style='background-color:#FFDC35'>&nbsp;&nbsp;&nbsp;&nbsp;WEB LINK:<a href="url?token=$token">Click me to verify!!</a></span></h3></div>";
        $mail->send();
        /*if($mail->send()){
            //email(url?token=$token);
            //update password
        //global $conn;
    /* $sql="SELECT `UserID` FROM `Users` WHERE `UserID`='".$email."'";
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
                $rtn = successCode("success to verify");
            }
        echo json_encode($rtn);
        }*/
        //例外
        $alert = 'Message Sent! Thank you for contacting us.';
        $rtn = successCode($alert);
    } catch (Exception $e){
        errorCode("【sendmailPwd.php】failed: ". $e->getMessage());
    }
    echo json_encode($rtn);
?>