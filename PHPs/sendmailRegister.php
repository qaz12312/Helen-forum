<?php
    /*
    前端 to 後端:
    let cmd = {};
    cmd["act"] = "sendMailRegister";
    cmd['option'] = "verify" / "create";
    cmd["account"] = "00757015";
    (if option = "create":)cmd["password"] = "123123";

    後端 to 前端:
    dataDB.status
    若 status = true:
        dataDB.info = ""
        dataDB.data = "success to change the password"
    否則
        dataDB.errorCode = "fail to find the password"
        dataDB.data = ""
    */
    use PHPMailer\PHPMailer\PHPMailer;
    require_once 'phpmailer/Exception.php';
    require_once 'phpmailer/PHPMailer.php';
    require_once 'phpmailer/SMTP.php';

    switch($input['option']){
        case "verify": // 確認是否已有帳號
          haveAccount($input);
            break;
        case "create": // 新增帳號
          doCreateAccount($input);
            break;
    }

    function haveAccount($input){
        global $conn;
        try {
            $sql="SELECT `UserID` FROM `Users` WHERE `UserID`=?";
            $arr = array($input['account']);
            $result = query($conn,$sql,$arr,"SELECT");
            $resultCount = count($result);
            if($resultCount > 0){
                errorCode("Account has been registered.");
            }
            else{
                // 驗證碼
                $str = 0;
                for($i=0;$i<6;$i++)	$str = $str.rand(0,9);
                $mailbody = "<div style='border-style:double;border-color:#0000C6;width:700px;'><h3>&nbsp;To whom it may concern,<br><br>&nbsp;&nbsp;&nbsp;&nbsp;Your verification code: " .$str. "</h3></div>";
                $rtn = successCode("send token.",$str);
                sendEmail(new PHPMailer(true),$input['account'] , $mailbody);
            }
        } catch (Exception $e) {
            errorCode("【sendMailRegister.php】failed: ". $e->getMessage());
        }
        echo json_encode($rtn);
    }

    function doCreateAccount($input){
        global $conn;
        $sql="INSERT INTO  `Users`(`UserID`,`Password`,`Color`,`Nickname`) VALUES(?,?,?,?)";
        $arr = array($input['account'], $input['password'],"#ffffff",$input['account']);
        query($conn,$sql,$arr,"INSERT");

        $sql="SELECT `UserID`,`Color`,`Nickname` FROM `Users` WHERE `UserID`=? AND `Password`=?";
        $arr = array($input['account'], $input['password']);
        $result = query($conn,$sql,$arr,"SELECT");
        $resultCount = count($result);
        if($resultCount <= 0){
            errorCode("Failed to register,Database exception.");
        }
        else{
            $mailbody = "<div style='border-style:double;border-color:#0000C6;width:700px;'><h3>&nbsp;To whom it may concern,<br><br>&nbsp;&nbsp;&nbsp;&nbsp;you had registered in Helen Account.</h3></div>";
            $arr=array(0=>$result[0][0],1 =>$result[0][1],2=>$result[0][2],'alert'=>sendEmail(new PHPMailer(true),$input['account'], $mailbody));
            $rtn = successCode("Successfully sign up and send email to user.",$arr);
        }
        echo json_encode($rtn);
    }

    function sendEmail($mail,$email, $mailbody){
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'softwareengineeringhelen@gmail.com'; // Gmail address which you want to use as SMTP server
        $mail->Password = 'soft123soft'; // Gmail address Password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = '587';
        $mail->setFrom('softwareengineeringhelen@gmail.com'); // Gmail address which you used as SMTP server
        $mail->addAddress($email . "@mail.ntou.edu.tw"); // Email address where you want to receive emails (you can use any of your gmail address including the gmail address which you used as SMTP server)
        //email內容
        $mail->isHTML(true);
        $mail->Subject = "=?UTF-8?B?" . base64_encode('Helen海大討論區') . "?=";
        $mail->Body = $mailbody;
        $mail->send();
        //例外
        return 'Welcome to HELEN!!!';
    }
?>



