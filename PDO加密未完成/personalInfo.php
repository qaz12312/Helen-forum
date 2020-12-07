<?php
/*
    前端 to 後端:
    let cmd = {};
    cmd["act"] = "modifyPersonalInfo";
    cmd["option"] = "password" / "nickname" / "color";
    cmd["token"] = "c93b3e8ab496d786030fbf8a17c3da51";
    cmd["new"] = "987654321" / "beauty cook" / "\#028d5f";

    後端 to 前端:
    dataDB = JSON.parse(data);
    dataDB.status
    若 status = true:
        dataDB.errorCode = ""
        dataDB.data = "success to change the (password/nickname/color)"
    否則
        dataDB.errorCode = "You don't have permission to do this action." / "找不到用戶，(密碼/暱稱/頭貼)更改失敗，需重新登入系統" / "資料庫異常，(密碼/暱稱/頭貼)更改失敗，需重新登入系統"
        dataDB.data = "" 
	*/
    switch($input["option"]){
        case "password": // 修改密碼
            $optionChinese = "密碼";
            $optionAttr = "Password";
            break;
        case "nickname": // 修改暱稱
            $optionChinese = "暱稱";
            $optionAttr = "Nickname";
            break;
        case "color": // 修改頭貼
            $optionChinese = "頭貼";
            $optionAttr = "Color";
            break;
    }
    doChangeInfo($input,$optionChinese,$optionAttr);
?>

<?php
    function doChangeInfo($input,$optionChinese,$optionAttr){
        global $conn;
        $token =$input['token'];
        if(!isset($_SESSION[$token])){
           $rtn = array();
            $rtn["status"] = false;
            $rtn["errorCode"] = "You don't have permission to do this action.";
            $rtn["data"] = "";
        }else{
            $userInfo = $_SESSION[$token];
            $sql="SELECT `UserID` FROM `Users` WHERE `UserID`='".$userInfo['account']."'";
            $result=$conn->query($sql);
            if(!$result){
                die($conn->error);
            }
            if($result->num_rows <= 0){
                $rtn = array();
                $rtn["status"] = false;
                $rtn["errorCode"] = "找不到用戶，".$optionChinese."更改失敗，需重新登入系統";
                $rtn["data"] = "";
            }
            else{
                $sql="UPDATE `Users` SET `".$optionAttr."`='".$input['new']."' WHERE `UserID` ='".$userInfo['account']."'";
                $result=$conn->query($sql);
                if(!$result){
                    $rtn = array();
                    $rtn["status"] = false;
                    $rtn["errorCode"] = "資料庫異常，".$optionChinese."更改失敗，需重新登入系統";
                    $rtn["data"] = "";
                    die($conn->error);
                }else{
                    $rtn = array();
                    $rtn["status"] = true;
                    $rtn["errorCode"] = "";
                    $rtn["data"] = "success to change the ".$input["option"];
                }
            }
        }
        echo json_encode($rtn);
    }
?>