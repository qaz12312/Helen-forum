<?php
/*
    前端 to 後端:
    let cmd = {};
    cmd["act"] = "checkPassword";
    cmd["account"] = "00757007";
    cmd["password"] = "00757007";

    後端 to 前端:
    dataDB = JSON.parse(data);
    dataDB.status
    若 status = true:
        dataDB.status = true
        dataDB.info = ""
        dataDB.data = "success to change the (password/nickname/color)"
    否則 status = false:
        dataDB.status = false
        dataDB.errorCode = "Cannot find the user.Failed to Update personal information in (password/nickname/color) .You need to login again." / 
        "Failed to Update personal information in (password/nickname/color) .You need to login again."/
        dataDB.data = "" 
	*/
    function doCheckPassword($input){
        global $conn;
        $sql="SELECT `UserID` FROM `Users` WHERE `UserID`=? AND `Password`=?";
        $arr = array($input['account'],$input['password']);
        $result = query($conn,$sql,$arr,"SELECT");
        $resultCount = count($result);
        if($resultCount <= 0){
            errorCode("Your password is wrong,you need to try again.");
        }
        else{
            $rtn = successCode("Your password is correct");
        }
        echo json_encode($rtn);
    }
?>