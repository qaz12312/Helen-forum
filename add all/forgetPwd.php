<?php
    /*
    前端 to 後端:
    let cmd = {};
    cmd["act"] = "forgetPwd";
    cmd["option"] = "verify" / "change";
    cmd["token"] = "email裡的";
    cmd["pwd"] = password;("change"才要)

    後端 to 前端
    dataDB.status
    若 status = true:
        dataDB.info = "success to verify"
        dataDB.data = ""
    否則
        dataDB.errorCode = "fail to verify" / "fail to verify.You need to go to forgetPassword Page again."
        dataDB.data = ""
    */
    switch($input['option']){
        case "verify": // 確認token是否未過期
            verifyPwd($input);
            break;
        case "change": // 修改密碼
            changePwd($input);
            break;
    }
function verifyPwd($input){
    if(isset($_SESSION[$input['token']])){
        $arr = $_SESSION[$input['token']];
        $last = $arr['time'];   //過期時間
        $now = date ("Y-m-d H:i:s" , mktime(date('H')+7, date('i'), date('s'), date('m'), date('d'), date('Y')));   //現在時間
        if((strtotime($last) - strtotime($now)) < 900){ //沒過期
            $rtn = successCode("success to verify");
            echo json_encode($rtn);
        }else{
            errorCode("fail to verify");
        }
    }else{
        errorCode("fail to verify");
    }
}
function changePwd($input){
    global $conn;
    if(isset($_SESSION[$input['token']])){
            $arr = $_SESSION[$input['token']];
            $account = $arr['account'];
            unset($_SESSION[$input['token']]);
            $result = query($conn,"SELECT `UserID` FROM `Users` WHERE `UserID`=?",array($account),"SELECT");
            $resultCount = count($result);
            if($resultCount <= 0){
                errorCode("fail to verify.You need to go to forgetPassword Page again.");
            }
            else{
                $sql="UPDATE `Users` SET `Password`=? WHERE `UserID` =?";
                $arr = array($input['pwd'], $account);
                query($conn,$sql,$arr,"UPDATE");
                $rtn = successCode("Success to change the password.");
                echo json_encode($rtn);
            }
    }else{
        errorCode("fail to verify");
    }
}
?>
