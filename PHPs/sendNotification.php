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
        dataDB.info = ""
        dataDB.data[0]	// UserID
        dataDB.data[1]	// Times
        dataDB.data[2]	// Content
    否則
        dataDB.errorCode = "Failed to send notification,Database exception."
        dataDB.data = ""
    */
    function doSendNotification($input,$print=1){
        global $conn;
        $sql="INSERT INTO `Notice`(`UserID`,`Content`) VALUES(?,?)";
        $arr = array($input['recipient'], $input['content']);
        query($conn,$sql,$arr,"INSERT");
        
        $sql="SELECT `UserID`,`Times`,`Content` FROM `Notice` WHERE `UserID`=? AND`Content`=?";
        $arr = array($input['recipient'], $input['content']);
        $result = query($conn,$sql,$arr,"SELECT");
        $resultCount = count($result);
        if($resultCount <= 0){
            errorCode("Failed to send notification,Database exception.");
        }
        else{
			if($print)
				$rtn = successCode("Successfully send the notice.");
        }
        echo json_encode($rtn);
    }
?>
