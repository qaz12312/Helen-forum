<?php
/*
前端 to 後端:
let cmd = {};
cmd["act"] = "sendMailRegister";
cmd["account"] = "0123456";
cmd["password"] = "789789789";

後端 to 前端
dataDB.status
dataDB.errorCode
若 status = true:
dataDB.data="success to change the password"
否則
dataDB.data = "fail to find the password"*/

use PHPMailer\PHPMailer\PHPMailer;

//require_once 'index.php'; //連線資料庫
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

  $sql="SELECT `UserID` FROM `Users` WHERE `UserID`='".$input['account']."'";
        $result=$conn->query($sql);
        if(!$result){
            die($conn->error);
        }
        if($resultCount > 0){
          errorCode("Account has been registered.");
        }
        else{
            $sql="INSERT INTO  `Users`(`UserID`,`Password`,`Color`,`Nickname`) VALUES('".$input['account']."','".$input['password']."','\#ffffff','".$input['account']."')";
            $resultNew=$conn->query($sql);
            if(!$resultNew){
                die($conn->error);
            }
            $sql="SELECT `UserID`,`Color`,`Nickname` FROM `Users` WHERE `UserID`='".$input['account']."' AND `Password`='".$input['password']."'";
            $result=$conn->query($sql);
            if(!$result){
                die($conn->error);
            }
            if($resultCount <= 0){
              errorCode("Failed to register,Database exception.");
            }
            else{
              

              $row=$result->fetch_row();
              $rtn = array();
              $rtn["status"] = true;
              $rtn["errorCode"] = "";
              $rtn["data"][0] =$row[0];
              $rtn["data"][1] =$row[1];
              $rtn["data"][2] =$row[2];
              $rtn["data"]['alert'] =  sendEmail(new PHPMailer(true),$input['account']);
            }
        }
} catch (Exception $e) {
  $alert = '<div class="alert-error">
                <span>' . $e->getMessage() . '</span>
              </div>';
  errorCode($alert);
}
echo json_encode($rtn);




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
  return '<div class="alert-success">
                  <span>Welcome to HELEN!!!</span>
                </div>';
}


?>



