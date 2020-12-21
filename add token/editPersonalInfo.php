<?php
/*
    前端 to 後端:
    let cmd = {};
    cmd["act"] = "editPersonalInfo";
    cmd["option"] = "password" / "nickname" / "color";
    cmd["token"] = "c93b3e8ab496d786030fbf8a17c3da51";
    cmd["new"] = "987654321" / "beauty cook" / "\#028d5f";

    後端 to 前端:
    dataDB = JSON.parse(data);
    dataDB.status
    若 status = true:
        dataDB.errorCode = ""
        dataDB.data = "success to change the (password/nickname/color)"
    否則 status = false:
        dataDB.errorCode = "Cannot find the user.Failed to Update personal information in (password/nickname/color) .You need to login again." / 
        "Failed to Update personal information in (password/nickname/color) .You need to login again."/
        dataDB.data = "" 
	*/
    switch($input["option"]){
        case "password": // 修改密碼
            $optionAttr = "Password";
            break;
        case "nickname": // 修改暱稱
            $optionAttr = "Nickname";
            break;
        case "color": // 修改頭貼
            $optionAttr = "Color";
            break;
    }
    doChangeInfo($input,$optionAttr);
?>

<?php
    function doChangeInfo($input,$optionAttr){
        global $conn;
        // $token =$input['token'];
        // if(!isset($_SESSION[$token])){
        //     errorCode("You don't have permission to do this action.");
        // }else{
        //     $userInfo = $_SESSION[$token];
            $sql="SELECT `UserID` FROM `Users` WHERE `UserID`=?";
            $arr = array($input['account']);//$userInfo['account']
            $result = query($conn,$sql,$arr,"SELECT");
            $resultCount = count($result);
            if($resultCount <= 0){
                errorCode("Cannot find the user.Failed to Update personal information in ".$input["option"].".You need to login again.");
            }
            else{
                $sql="UPDATE `Users` SET `".$optionAttr."`=? WHERE `UserID` =?";
                $arr = array($input['new'], $input['account']);//$userInfo['account']
                $result = query($conn,$sql,$arr,"UPDATE");
                $rtn = successCode("Success to change the ".$input["option"]);
            }
        // }
        echo json_encode($rtn);
    }
?>