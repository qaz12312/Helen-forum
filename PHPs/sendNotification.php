<?php
    /* 
    前端 to 後端:
    let cmd = {};
    cmd["act"] = "sendNotification";
    cmd["recipient"] = "收通知的account";
    cmd["content"] = "Content"

    後端 to 前端:
    dataDB = JSON.parse(data);
    dataDB.status
    若 status = true:
        dataDB.info = "Successfully send the notice.";
        dataDB.data = "";
    否則
        dataDB.errorCode = "Failed to send notification,Database exception."
        dataDB.data = ""
    */
    function doSendNotification($input,$print=1){
        global $conn;
        $sql="INSERT INTO `Issue`(`UserID`,`Content`,`Type`) VALUES(?,?,?)";
        $arr = array($input['recipient'], $input['content'],2);
        query($conn,$sql,$arr,"INSERT");
        
        $sql="SELECT EXISTS(SELECT 1 FROM `Issue` WHERE `UserID`=? AND`Content`=? AND `Type`= ? LIMIT 1)";
        $arr = array($input['recipient'], $input['content'],2);
        $result = query($conn,$sql,$arr,"SELECT");
        if(!$result[0][0]){
            errorCode("Failed to send notification,Database exception.");
        }
        else{
			if($print){
				$rtn = successCode("Successfully send the notice.");
				echo json_encode($rtn);
            }
            else
                return true;
        }
    }
?>
