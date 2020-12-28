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
		dataDB.data[i] 
		(
            dataDB.data[i].account //
			dataDB.data[i].time	// Time
			dataDB.data[i].content	// Content
		)
	否則
		dataDB.errorCode = "No notifications right now."
		dataDB.data = ""
	*/
    function doShowApplyBoard($input){
        global $conn;
		if($input['type'] == "board" || $input['type'] == "moderator") {
		  if($input['type'] == "board")
		     $sql="SELECT `UserID`,`Content`,`Times` FROM `Issue` WHERE `Type`= 1 order by `UserID` ASC ,`Times`DESC ";
		  else
		     $sql="SELECT `UserID`,`Content`,`Times` FROM `Issue` WHERE `Type`= 0 order by `UserID` ASC ,`Times`DESC ";
			 
		  $result = query($conn,$sql,array(),"SELECT");
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
		else {
		  errorCode("Failed to show who is applying.")
		}
        echo json_encode($rtn);
    }
?>
