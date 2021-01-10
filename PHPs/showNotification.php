<?php
	/* 
	前端 to 後端:
	let cmd = {};
	cmd["act"] = "showNotice";
	cmd["account"] = "00757007";

    後端 to 前端:
    dataDB = JSON.parse(data);
	dataDB.status
	若 status = true:
		dataDB.info = "No notifications right now." / "Successfully show person's notices."
		dataDB.data[i] //有i筆通知
		(
			dataDB.data.time	// Time
			dataDB.data.content	// Content
		)
	否則
		dataDB.errorCode = "";
		dataDB.data = "";
	*/
    function doShowNotification($input){
        global $conn;
        $sql="SELECT `Times`,`Content` FROM `Issue` WHERE `UserID`=? AND `Type`=2 order by `Times`DESC ";
        $arr = array($input['account']);
        $result = query($conn,$sql,$arr,"SELECT");
        $resultCount = count($result);
        if($resultCount <= 0){
            $rtn = successCode("No notifications right now.",array());
        }
        else{
            $arr=array();
            for($i=0;$i<$resultCount;$i++){
                $row = $result[$i];
                $arr[$i]=array("time"=>$row[0],"content"=>$row[1]);
            }
            $rtn = successCode("Successfully show person's notices.",$arr);
        }
        echo json_encode($rtn);
    }
?>
