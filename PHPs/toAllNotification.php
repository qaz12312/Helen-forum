<?php
	/* 
	前端 to 後端:
	let cmd = {};
	cmd["act"] = "toAllNotification";
	cmd["content"] = "Content";

    後端 to 前端:
    dataDB = JSON.parse(data);
	dataDB.status
	若 status = true:
		dataDB.info = "Without any user." / "Successfully send notice to everyone.";
		dataDB.data = "";
	否則
		dataDB.errorCode = "Failed to send Notification to everyone,Database exception."
		dataDB.data = ""
	*/
    function doToAllNotification($input){   // send Notification to everyone
        global $conn;
        $sql="SELECT `UserID` FROM `Users`";
        $result = query($conn,$sql,array(),"SELECT");
        $resultCount = count($result);
        if($resultCount <= 0){
            $rtn = successCode("Without any user.");
        }
        else{
            foreach($result as $userID){
                $sql="INSERT INTO `Issue`(`UserID`,`Content`) VALUES(?,?)";
                $arr = array($userID[0], $input['content']);
                query($conn,$sql,$arr,"INSERT");
        
                $sql="SELECT EXISTS(SELECT 1 FROM `Issue` WHERE `UserID`=? AND`Content`=? AND `Type` = ? LIMIT 1)";
                $arr = array($userID[0], $input['content'],2);
                $result = query($conn,$sql,$arr,"SELECT");
                if(!$result[0][0]){
                    errorCode("Failed to send Notification to everyone,Database exception.");
                }
            }
            $rtn = successCode("Successfully send notice to everyone.");
        }
        echo json_encode($rtn);
    }
?>
