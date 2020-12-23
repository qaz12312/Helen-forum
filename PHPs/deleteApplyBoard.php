<?php
	/* 
	前端 to 後端:
	let cmd = {};
	cmd["act"] = "deleteApplyBoard";
	cmd["account"] = "00757033";

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
        $sql="SELECT `Content` FROM `Issue` WHERE `UserID`=?";  
        $arr = array($input['account']);
        $result = query($conn,$sql,$arr,"SELECT");
        $resultCount = count($result);
        if($resultCount <= 0){
            errorCode("This user apply doesn't exit.");
        }
        else{
            $sql="DELETE FROM `Issue` WHERE `UserID`=?";
            $arr = array($input['account']);
            query($conn,$sql,$arr,"DELETE");
            $rtn = successCode("Successfully deleted all this user's apply.");
        }
        echo json_encode($rtn);
    }
?>
