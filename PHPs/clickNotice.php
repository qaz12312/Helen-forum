<?php
    /* 
    前端 to 後端:
    let cmd = {};
	cmd["act"] = "clickNotice";
    cmd["account"] = "00757003"; //cmd["token"]
    cmd["detail"] = "Content";
        
    後端 to 前端:
    dataDB = JSON.parse(data);
    dataDB.status
    若 status = true:
        dataDB.info = "Successfully deleted this notification.";
        dataDB.data = ""
    否則
        dataDB.errorCode = "Without notice."
        dataDB.data = ""
    */
    function doClickNotice($input){ //user點通知->刪除此則通知
        global $conn;
        // $token =$input['token'];
        // if(!isset($_SESSION[$token])){
		// 	errorCode("token doesn't exist.");
        // }
        // $userInfo = $_SESSION[$token];
        // $user = $userInfo['account'];

        $user = $input['account'];
        $sql="SELECT EXISTS(SELECT 1 FROM `Issue` Where `UserID`=? AND `Content`= ? AND `Type` = ? LIMIT 1)";  
        $arr = array($user, $input['detail'],2);
        $result = query($conn,$sql,$arr,"SELECT");
        if(!$result[0][0]){
            errorCode("Without notice.");
        }
        $sql ="DELETE FROM  `Issue` Where `UserID`=? AND `Content`=? AND `Type` = ?";
        $arr = array($user, $input['detail'],2);
        query($conn,$sql,$arr,"DELETE");
        $rtn = successCode("Successfully deleted this notification.");
        echo json_encode($rtn);
    }
?>
