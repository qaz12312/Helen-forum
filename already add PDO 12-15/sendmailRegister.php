<?php
    /*
    前端 to 後端:
    let cmd = {};
    cmd["act"] = "sendMailRegister";
    cmd["account"] = "0123456";
    cmd["password"] = "789789789";

    後端 to 前端
    dataDB.status
    若 status = true:
        dataDB.errorCode = ""
        dataDB.data="success to change the password"
    否則
        dataDB.errorCode = "fail to find the password"
        dataDB.data = ""
    */
    use PHPMailer\PHPMailer\PHPMailer;
    require_once 'phpmailer/Exception.php';
    require_once 'phpmailer/PHPMailer.php';
    require_once 'phpmailer/SMTP.php';
    // $mail = new PHPMailer(true);
    //if(isset($input['submit'])){
    //   $email = $_POST['email'];
    // $email = $input['account'];
    try {
        /*$mail->isSMTP();
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
        $mail->Body = "<div style='border-style:double;border-color:#0000C6;width:700px;'><h3>&nbsp;To whom it may concern,<br><br>&nbsp;&nbsp;&nbsp;&nbsp;you had registered in Helen Account.</h3></div>";
        $mail->send();
        //global $conn;
        //例外
        $alert = '<div class="alert-success">
        <span>Welcome to HELEN!!!</span>
        </div>';
        $rtn = successCode($alert);
        */
        $sql="SELECT `UserID` FROM `Users` WHERE `UserID`=?";
        $arr = array($input['account']);
        $result = query($conn,$sql,$arr,"SELECT");
        $resultCount = count($result);
        if($resultCount > 0){
            errorCode("Account has been registered.");
        }
        else{
            $sql="INSERT INTO  `Users`(`UserID`,`Password`,`Color`,`Nickname`) VALUES(?,?,?,?)";
            $arr = array($input['account'], $input['password'],"#ffffff",$input['account']);
            query($conn,$sql,$arr,"INSERT");

            $sql="SELECT `UserID`,`Color`,`Nickname` FROM `Users` WHERE `UserID`=? AND `Password`=?";
            $arr = array($input['account'], $input['password']);
            $result = query($conn,,$arr,"SELECT");
            $resultCount = count($result);
            if($resultCount <= 0){
                errorCode("Failed to register,Database exception.");
            }
            else{
                $arr=array(0=>$result[0],1 =>$result[1],2=>$result[2],3=>sendEmail(new PHPMailer(true),$input['account']))
                $rtn = successCode($arr);
            }
        }
    } catch (Exception $e) {
        errorCode("【sendmailRegister.php】failed: ". $e->getMessage());
    }
    echo json_encode($rtn);
?>
<?php
    function sendEmail($mail,$email){
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
        $mail->Body = "<div style='border-style:double;border-color:#0000C6;width:700px;'><h3>&nbsp;To whom it may concern,<br><br>&nbsp;&nbsp;&nbsp;&nbsp;you had registered in Helen Account.</h3></div>";
        $mail->send();
        //global $conn;
        //例外
        return "Welcome to HELEN!!!";
    }
?>



