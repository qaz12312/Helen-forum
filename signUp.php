<?php
    require_once 'connectDB.php'; //連線資料庫 
     /* 前端 to 後端:
        let cmd = {};
        cmd["act"] = "creatAccount";
        cmd["account"] = 00757003@email.ntou.edu.tw;
        cmd["password"] = zxsss123;
    */
    /* 後端 to 前端
        dataDB.status
        dataDB.errorCode
        若 status = true:
            dataDB.data[0] // UserID
            dataDB.data[1] // Password
            dataDB.data[2] // Permissions
            dataDB.data[3] // Color
            dataDB.data[4] // Nickname
        否則
            dataDB.data = ""
        */
    global $input,$conn;
    $sql="SELECT `UserID` FROM `User` WHERE `UserID`='".$input['account']."'";
    $result=$conn->query($sql);
    if(!$result){
        die($conn->error);
    }

    if($result->num_rows > 0){
        $rtn = array();
        $rtn["status"] = false;
        $rtn["errorCode"] = "帳號已註冊";
        $rtn["data"] = "";
    }
    else{
        $new="INSERT INTO  `User`(`UserID`,`Password`,`Permissions`,`Color`,`Nickname`) VALUES('".$input['account']."','".$input['password']."',1,'\#0d33ff','".$input['password']."')";
        $resultNEW=$conn->query($new);
        if(!$resultNEW){
            die($conn->error);
        }
        $sql="SELECT `UserID`,`Password`,`Permissions`,`Color`,`Nickname` FROM `User` WHERE `UserID`='".$input['account']."' AND `Password`='".$input['password']."'";
        $result=$conn->query($sql);
        if(!$result){
            die($conn->error);
        }
        if($result->num_rows <= 0){
            $rtn = array();
            $rtn["status"] = false;
            $rtn["errorCode"] = "註冊失敗，資料庫異常";
            $rtn["data"] = "";
        }
        else{
            $row=$result->fetch_row();
            $rtn = array();
            $rtn["status"] = true;
            $rtn["errorCode"] = "";
            $rtn["data"] = $row[0];
        }
    }
    echo json_encode($rtn);
?>