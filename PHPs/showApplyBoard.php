<?php
	/* 
	前端 to 後端:
	let cmd = {};
	cmd["act"] = "showApplyBoard";

    後端 to 前端:
    dataDB = JSON.parse(data);
	dataDB.status
	若 status = true:
		dataDB.info = ""
		dataDB.data[i] //有i筆通知
		(
			dataDB.data.time	// Time
			dataDB.data.content	// Content
		)
	否則
		dataDB.errorCode = "No notifications right now."
		dataDB.data = ""
	*/
    function doShowApplyBoard($input){
        global $conn;
        $sql="SELECT `UserID`,`Content`,`Times` FROM `Issue` order by `UserID` ASC ,`Times`DESC ";
        $result = query($conn,$sql,array(),"SELECT");
        $resultCount = count($result);
        if($resultCount <= 0){
            $rtn = successCode("Don't have any apply.");
        }
        else{
            $arr=array();
            for($i=0;$i<$resultCount;$i++){
                $row = $result[$i];
                $idx = strval($row[0]);
                if(!isset($arr[$idx])){
                    $arr[$idx] = [];
                }
                array_push($arr[$idx],array("content"=>$row[1],"times"=>$row[2]));
            }
            $rtn = successCode("Successfully show apply.",$arr);
        }
        echo json_encode($rtn);
    }
?>
