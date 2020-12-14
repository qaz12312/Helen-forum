<?php
    /* 
    前端 to 後端:
    let cmd = {};
	cmd["act"] = "clickNotice";
    cmd["account"] = "00757033";
    cmd["detail"] = "Content";
        
    後端 to 前端
    dataDB = JSON.parse(data);
    dataDB.status
    若 status = true:
        dataDB.status = true
        dataDB.errorCode = ""
        dataDB.data = "Successfully deleted this notification. "
    否則 status = false:
        dataDB.status = false
        dataDB.errorCode = "Without notice."
        dataDB.data = ""
    */
    function doClickNotice($input){ //user點通知->刪除此則通知
        global $conn;
        $sql="SELECT `Times` FROM `Notice` Where `UserID`='".$input['account']."'AND `Content`='".$input['detail']."'";  
        $arr = array();
		$result = query($conn,$sql,$arr,"SELECT");
		$resultCount = count($result);
        if($resultCount <= 0){
            errorCode("Without notice.");
        }
        else{
            $sql ="DELETE FROM  `Notice` Where `UserID`='".$input['account']."'AND`Content`='".$input['detail']."'" ;
            $arr = array();
			query($conn,$sql,$arr,"DELETE");
			$rtn = successCode("Successfully deleted this notification.");
        }
        echo json_encode($rtn);
    }
?>