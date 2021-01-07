<?php 
	/* 
	前端 to 後端:
	let cmd = {};
	cmd["act"] = "newApplyBoard";
	cmd["account"] = "00757033"; //cmd["token"]
	cmd["type"] = "board/moderator";
	cmd["content"] ="我想要成為美食版版主";

	後端 to 前端:
    dataDB = JSON.parse(data);
    dataDB.status
	若 status = true:
		dataDB.info = "Successfully Apply the Board.";
		dataDB.data = "";
	否則
		dataDB.errorCode = "Failed to Apply the Board,Database exception.";
		dataDB.data = "";
	*/
    function doNewApplyBoard($input){ // 申請版/版主
		global $conn;
		// $token =$input['token'];
        // if(!isset($_SESSION[$token])){
        //     errorCode("token doesn't exist.");
        // }
        // $userInfo = $_SESSION[$token];
        // $user = $userInfo['account'];

        $user = $input['account'];
		if($input['type'] == "board" || $input['type'] == "moderator") {
			$sql="SELECT EXISTS(SELECT 1 FROM `Issue` WHERE `UserID` = ? AND `Content` = ? AND `Type`=? LIMIT 1)";
			$arr = array($user, $input['content'],($input['type'] == "board" ? 1 : 0));
			$result = query($conn,$sql,$arr,"SELECT");
			if($result[0][0]){
				errorCode("You have already sent this message.");
			}
			else{
				$sql="INSERT INTO `Issue`(`UserID`,`Content`,`Type`) VALUES(?,?,?)";
				$arr = array($user, $input['content'],($input['type'] == "board" ? 1 : 0));
				query($conn,$sql,$arr,"INSERT");
				$rtn = successCode("Successfully Apply the Board.");
		  	}
		}
		else{
			errorCode("Failed to Apply.");
		}
        echo json_encode($rtn);
    }
?>
