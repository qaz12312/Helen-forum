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
		dataDB.errorCode = ""
		dataDB.data = ""
	*/
    function doToAllNotification($input,$print=1){   // send Notification to everyone
        global $conn;
        $sql="SELECT `UserID` FROM `Users`";
        $result = query($conn,$sql,array(),"SELECT");
        $resultCount = count($result);
        if($resultCount <= 0){
            $rtn = successCode("Without any user.");
        }
        else{
            $content = "系統廣播:【".$input['content']."】";
            foreach($result as $userID){
                $sql="INSERT INTO `Issue`(`UserID`,`Content`,`Type`) VALUES(?,?,?)";
                $arr = array($userID[0], $content,2);
                query($conn,$sql,$arr,"INSERT");
            }
            $rtn = successCode("Successfully send notice to everyone.");
        }
        if($print){
            echo json_encode($rtn);
        }
        else
            return true;
    }
?>
