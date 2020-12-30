<?php
	/* 
	前端 to 後端:
	let cmd = {};
	cmd["act"] = "deleteApplyBoard";
	cmd["account"] = "00757033";
	cmd["type"] = "board/moderator";
    cmd["content"] = "00757033";
	後端 to 前端:
	dataDB = JSON.parse(data);
	dataDB.status
    若 status = true:
        dataDB.status = true
		dataDB.info = "Successfully deleted all this user's apply."
		dataDB.data = ""
    否則 status = false:
        dataDB.status = false
		dataDB.errorCode = "This user apply doesn't exit."
		dataDB.data = "" 
	*/
    function doDeleteApplyBoard($input){ //審核被檢舉文章
        global $conn;
		if ($input['type'] == "board" || $input['type'] == "moderator") {
		  if ($input['type'] == "board")
		    $sql="SELECT `Content` FROM `Issue` WHERE `UserID`=? AND`Content`=? AND `Type`=1";  
		  else
		    $sql="SELECT `Content` FROM `Issue` WHERE `UserID`=? AND`Content`=? AND `Type`=0"; 
			
		  $arr = array($input['account'],$input['content']);
          $result = query($conn,$sql,$arr,"SELECT");
          $resultCount = count($result);
          if($resultCount <= 0){
            errorCode("This user apply doesn't exit.");
          }
          else{
            $sql="DELETE FROM `Issue` WHERE `UserID`=? AND`Content`=? AND `Type`=1";
            $arr = array($input['account'],$input['content']);
						query($conn,$sql,$arr,"DELETE");
						doSendNotification(array("recipient" => $result[0][4], "content" => "Your apply can't be added.",""));
            $rtn = successCode("Successfully deleted all this user's apply.");
          }
		}
        else {
			errorCode("Failed to delete any apply.");
		}
        echo json_encode($rtn);
    }
?>
