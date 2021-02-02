<?php
	/*
	前端 to 後端:
	let cmd = {};
	cmd["act"] = "heart";
	cmd["account"] = "00757003"; //cmd["token"]
	cmd["articleID"] = 1;
	後端 to 前端:
	dataDB = JSON.parse(data);
	dataDB.status
	若 status = true:
		dataDB.info = "Successfully added this heart. / Successfully deleted this heart."
		dataDB.data = ""
	否則 
		dataDB.errorCode =  "【SQL XXXX-query】failed: ..." / "【query XXXX-execute】failed: ..."
		dataDB.data = ""
	*/
	function doAddDeleteHeart($input)
	{
		global $conn;
		// $token = $input['token'];
        // if(!isset($_SESSION[$token])){
		// 	errorCode("token doesn't exist.");
        // }
        // $userInfo = $_SESSION[$token];
        // $user = $userInfo['account'];
        
        $user = $input['account'];
        $sql = "SELECT EXISTS(SELECT 1 FROM `FollowHeart` WHERE `UserID`=? AND `ArticleID`=? LIMIT 1)";
        $arr = array($user,$input['articleID']);
        $result = query($conn,$sql,$arr,"SELECT");
        if ($result[0][0] == 0) {//新增HEART
            $sql = "INSERT INTO `FollowHeart`(`ArticleID`,`UserID`) VALUES(?,?)";
            $arr = array($input['articleID'],$user);
            query($conn,$sql,$arr,"INSERT");
            // writeRecord($user,$userInfo["log"],"add heart for articleID:".$input['articleID']);
            writeRecord($user,"Add Heart","articleID:".$input['articleID']);
            $rtn = successCode("Successfully added this heart.");
        } else {//DELETE HEART
            $sql = "DELETE FROM `FollowHeart` WHERE `UserID`=? AND `ArticleID`=?";
            $arr = array($user,$input['articleID']);
            query($conn,$sql,$arr,"DELETE");
            //writeRecord($user,$userInfo["log"],"cancel heart for articleID:".$input['articleID']);
            writeRecord($user,"Delete Heart","articleID:".$input['articleID']);
            $rtn = successCode("Successfully deleted this heart.");
        }
        echo json_encode($rtn);
	}
?>
