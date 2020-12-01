<?php
    require_once 'connectDB.php'; //連線資料庫 
    /* 前端 to 後端:
            let cmd = {};
            cmd["act"] = "logIn";
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
    $sql="SELECT `UserID`,`Password`,`Permissions`,`Color`,`Nickname` FROM `User` WHERE `UserID`='".$input['account']."' AND `Password`='".$input['password']."'";
    $result=$conn->query($sql);
    if(!$result){
        die($conn->error);
    }

    if($result->num_rows <= 0){
        $rtn = array();
        $rtn["status"] = false;
        $rtn["errorCode"] = "找不到會員";
        $rtn["data"] = "";
    }
    else{
        $row=$result->fetch_row();
        $rtn = array();
        $rtn["status"] = true;
        $rtn["errorCode"] = "";
        $rtn["data"] =$row;
    }
    echo json_encode($rtn);
?>