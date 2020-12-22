<?php  
//  doSendNotification()

    /* 
        前端 to 後端:
        let cmd = {};
        cmd["act"] = "editModerator";
        cmd["account"] = "UserID";
        cmd["oldBoardName"] = "BoardName";
        cmd["newBoardName"] = "BoardName";

        後端 to 前端:
        dataDB.status
        若 status = true:
            dataDB.status = true
            dataDB.info = ""
            dataDB.data="Successfully modified moderator." 
        否則 status = false:
            dataDB.status = false
            dataDB.errorCode= "Update without permission." /"Failed to found the update Moderator."/"Failed to appoint moderator."
    */
    function doEditModerator($input){
        global $conn;
        $check= true;
		if(isset($input['newBoardName'])){
            global $conn;
			$sql_check="SELECT `BoardName` FROM `Board` WHERE `BoardName`= ?";
			$arr = array($input['newBoardName']);
			$result = query($conn,$sql_check,$arr,"SELECT");
			$resultCount = count($result);
            if($resultCount <= 0){
				$check = false;
                errorCode("This boardname doesn't exist");
			}
			else{
				$sql="SELECT `UserID` FROM `Board` WHERE `BoardName` =? AND `UserID`='admin' ";  
				$arr = array($input['newBoardName']);
				$result = query($conn,$sql,$arr,"SELECT");
				$resultCount = count($result);
				if($resultCount <= 0){
					$check = false;
					errorCode("Update without permission.");
				}
				else{
					$sql="UPDATE `Board` SET `UserID`=? WHERE `BoardName` =?";
					$arr = array($input['account'], $input['newBoardName']);
					query($conn,$sql,$arr,"UPDATE");
					
					$sql ="SELECT `UserID`,`Color`,`BoardName` FROM `Board`NATURAL JOIN`Users`  WHERE `BoardName` =? AND`UserID`=?" ;
					$arr = array($input['newBoardName'], $input['account']);
					$result = query($conn,$sql,$arr,"SELECT");
					if($resultCount <= 0){
						$check = false;
						errorCode("Failed to appoint moderator,Database exception.");
					}
					$check=doSendNotification(array("recipient" => $input['account'], "content" => "Congratulation  - You are the moderator in 【".$input['newBoardName']."】 :)"),0);
				}
			}
		}
		if(isset($input['oldBoardName'])){
			global $conn;
			$sql="SELECT `UserID` FROM `Board` WHERE `BoardName` = ? AND `UserID`=? ";  
			$arr = array($input['oldBoardName'], $input['account']);
			$result = query($conn,$sql,$arr,"SELECT");
			$resultCount = count($result);
			if($resultCount <= 0){
				$check = false;
				errorCode("Update without permission.");
			}
			else{
				$sql="UPDATE `Board` SET `UserID`='admin' WHERE `BoardName` = ?";
				$arr = array($input['oldBoardName']);
				query($conn,$sql,$arr,"UPDATE");

				$sql ="SELECT `UserID`,`Color`,`BoardName` FROM `Board`NATURAL JOIN`Users`WHERE `BoardName`=? AND`UserID`='admin' " ;
				// $result=$conn->query($sql);
				$arr = array($input['oldBoardName']);
				$result = query($conn,$sql,$arr,"SELECT");
				$resultCount = count($result);
				if($resultCount <= 0){
					$check = false;
					errorCode("Failed to found the update Moderator.");
				}
				$check=doSendNotification(array("recipient" => $input['account'], "content" => "Oops - You are no longer the moderator in 【".$input['oldBoardName']."】."),0);
			}
		}
        if($check){
            $rtn = successCode("Successfully modified moderator.");
        }
        echo json_encode($rtn);
    }
?>
