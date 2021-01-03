<?php
/*
    前端 to 後端:
    let cmd = {};
    cmd["act"] = "editPersonalInfo";
    cmd["option"] = "password" / "nickname" / "color";
    cmd["account"] = "00757007"; //cmd["token"]
    cmd["new"] = "987654321"(base64加密後) / "beauty cook" / "\#028d5f";

    後端 to 前端:
    dataDB = JSON.parse(data);
    dataDB.status
    若 status = true:
        dataDB.info = "success to change the (password/nickname/color)"
        dataDB.data = ""
    否則 
        dataDB.errorCode = "Cannot find the user.Failed to Update personal information in (password/nickname/color) .You need to login again." / 
        "Failed to Update personal information in (password/nickname/color) .You need to login again."/
        dataDB.data = "" 
	*/
    switch($input["option"]){
        case "password": // 修改密碼
            // $input['new'] = base64_decode($input['new']);
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
        //     errorCode("token doesn't exist.");
        // }
        // $userInfo = $_SESSION[$token];
        // $user = $userInfo['account'];

        $user = $input['account'];
        $sql="SELECT EXISTS(SELECT 1 FROM `Users` WHERE `UserID`=? LIMIT 1)";
        $result = query($conn,$sql,array($user),"SELECT");
        if(!$result[0][0]){
            errorCode("Cannot find the user.Failed to Update personal information in ".$input["option"].".You need to login again.");
        }
        else{
            $sql="UPDATE `Users` SET `".$optionAttr."`=? WHERE `UserID` =?";
            $arr = array($input['new'],$user);
            query($conn,$sql,$arr,"UPDATE");
            // writeRecord($user,$userInfo["log"],"change the ".$input["option"]);
            $rtn = successCode("Success to change the ".$input["option"]);
        }
        echo json_encode($rtn);
    }
?>