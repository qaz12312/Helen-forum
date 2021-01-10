<?php  
    /* 目前只適用於一個版只有一個版主
	前端 to 後端:
	let cmd = {};
	cmd["act"] = "editModerator";
	cmd["account"] = "UserID"; //cmd["token"]
	cmd["oldBoardName"] = "BoardName";
	cmd["newBoardName"] = "BoardName";

	後端 to 前端:
	dataDB = JSON.parse(data);
	dataDB.status
	若 status = true:
		dataDB.info = "Successfully modified moderator." 
		dataDB.data = ""
	否則
		dataDB.errorCode = "Update without permission." /"Failed to found the update Moderator."/"Failed to appoint moderator."
		dataDB.data = ""
    */
    function doEditModerator($input){ //任命/切換/刪除 版主
		global $conn;
		$check= true;
		// $token =$input['token'];
        // if(!isset($_SESSION[$token])){
        //     errorCode("token doesn't exist.");
        // }
        // $userInfo = $_SESSION[$token];
        // $user = $userInfo['account'];

        $user = $input['account'];
		if(isset($input['newBoardName'])){
            global $conn;
			$sql_check="SELECT EXISTS(SELECT 1 FROM `Board` WHERE `BoardName`= ? LIMIT 1)";//版是否存在
			$result = query($conn,$sql_check,array($input['newBoardName']),"SELECT");
            if(!$result[0][0]){
				$check = false;
                errorCode("This boardname doesn't exist");
			}
			else{
				$sql="SELECT EXISTS(SELECT 1 FROM `Board` WHERE `BoardName` =? AND `UserID`='admin' LIMIT 1)";  
				$result = query($conn,$sql,array($input['newBoardName']),"SELECT");
				if(!$result[0][0]){
					$check = false;
					errorCode("Update without permission.");
				}
				else{
					//任命:newboardname的版主從admin改成user //切換:(user要從oldboardname版主 改成newboardname版主)
					$sql="UPDATE `Board` SET `UserID`=? WHERE `BoardName` =?";
					query($conn,$sql,array($user, $input['newBoardName']),"UPDATE");
					
					$sql ="SELECT EXISTS(SELECT 1 FROM `Board` NATURAL JOIN `Users` WHERE `BoardName` =? AND `UserID`=? LIMIT 1)";
					$result = query($conn,$sql,array($input['newBoardName'], $user),"SELECT");
					if(!$result[0][0]){
						$check = false;
						errorCode("Failed to appoint moderator,Database exception.");
					}
					//writeRecord($user,$userInfo["log"],"Be a moderator in 【".$input['newBoardName']."】.");
					$check=doSendNotification(array("recipient" =>$user, "content" => "Congratulation  - You are the moderator in 【".$input['newBoardName']."】 :)"),0);
				}
			}
		}
		if(isset($input['oldBoardName'])){
			global $conn;
			$sql="SELECT EXISTS(SELECT 1 FROM `Board` WHERE `BoardName` = ? AND `UserID`=? LIMIT 1)";  
			$arr = array($input['oldBoardName'], $user);
			$result = query($conn,$sql,$arr,"SELECT");
			if(!$result[0][0]){
				$check = false;
				errorCode("Update without permission.");
			}
			else{
				//刪除:把oldboard的版主給admin//切換:(user要從oldboardname版主 改成newboardname版主)
				$sql="UPDATE `Board` SET `UserID`='admin' WHERE `BoardName` = ?";
				query($conn,$sql,array($input['oldBoardName']),"UPDATE");

				$sql ="SELECT EXISTS(SELECT 1 FROM `Board` NATURAL JOIN `Users` WHERE `BoardName`=? AND `UserID`='admin' LIMIT 1)";
				$result = query($conn,$sql,array($input['oldBoardName']),"SELECT");
				if(!$result[0][0]){
					$check = false;
					errorCode("Failed to found the update Moderator.");
				}
				//writeRecord($user,$userInfo["log"],"No longer the moderator in 【".$input['oldBoardName']."】.");
				$check=doSendNotification(array("recipient" =>$user, "content" => "Oops - You are no longer the moderator in 【".$input['oldBoardName']."】."),0);
			}
		}
        if($check){
            $rtn = successCode("Successfully modified moderator.");
        }
        echo json_encode($rtn);
    }
?>
