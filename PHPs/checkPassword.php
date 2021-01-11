<?php
/*
    前端 to 後端:
    let cmd = {};
    cmd["act"] = "checkPassword";
    cmd["account"] = "00757003";(base64加密後) //cmd["token"]
    cmd["password"] = "00757003";(base64加密後)
    後端 to 前端:
    dataDB = JSON.parse(data);
    dataDB.status
    若 status = true:
        dataDB.info = "Your password is correct"
        dataDB.data = ""
    否則
        dataDB.errorCode = "Your password is wrong,you need to try again."
        dataDB.data = "" 
	*/
    function doCheckPassword($input){ //密碼是否正確
        global $conn;
        $sql="SELECT EXISTS(SELECT 1 FROM `Users` WHERE `UserID`=? AND `Password`=? LIMIT 1)";
        $arr = array(base64_decode($input['account']),base64_decode($input['password']) );
        // $arr = array($input['account'],$input['password']);
        $result = query($conn,$sql,$arr,"SELECT");
        if(!$result[0][0]){
            errorCode("Your password is wrong,you need to try again.");
        }
        else{
            $rtn = successCode("Your password is correct");
            echo json_encode($rtn);
        }
    }
?>
