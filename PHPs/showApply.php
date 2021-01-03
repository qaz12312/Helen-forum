<?php
	/* 
	前端 to 後端:
	let cmd = {};
	cmd["act"] = "showApplyBoard";
	cmd["type"] = "board/moderator";

    後端 to 前端:
    dataDB = JSON.parse(data);
	dataDB.status
	若 status = true:
		dataDB.info = "Don't have any apply." / "Successfully show apply.";
		dataDB.data[i] 
		(
            dataDB.data[i].account //
			dataDB.data[i].time	// Time
			dataDB.data[i].content	// Content
		)
	否則
		dataDB.errorCode = "Failed to show who is applying.";
		dataDB.data = "";
	*/
    function doShowApplyBoard($input){
        global $conn;
		if($input['type'] == "board" || $input['type'] == "moderator") {
			$sql="SELECT `UserID`,`Content`,`Times` FROM `Issue` WHERE `Type`= ? order by `UserID` ASC ,`Times`DESC ";
			$a=array($input['type'] == "board" ? 1 : 0 );
		  	$result = query($conn,$sql,$a,"SELECT");
          	$resultCount = count($result);
          	if($resultCount <= 0){
            	$rtn = successCode("Don't have any apply.",array());
          	}
          	else{
            	$arr=array();
				for($i=0;$i<$resultCount;$i++){
					$row = $result[$i];
					$arr[$i]=array("account"=>$row[0],"content"=>$row[1],"times"=>$row[2]);
				}
            	$rtn = successCode("Successfully show apply.",$arr);
          	}
        }
		else 
		  	errorCode("Failed to show who is applying.");

        echo json_encode($rtn);
    }
?>
