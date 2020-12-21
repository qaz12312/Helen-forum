<?php
	/* 
	前端 to 後端:
	let cmd = {};
	cmd["act"] = "showAllUser";
	
    後端 to 前端:
    dataDB = JSON.parse(data);
	dataDB.status
	若 status = true:
		dataDB.info = ""
		dataDB.data[i] //有i筆UserID
	否則
		dataDB.errorCode = "Without any user except moderator now."
		dataDB.data = ""
	*/
    function doShowAllUser($input){
        global $conn;
        $sql="SELECT `UserID` FROM `Users` where `UserID` NOT IN('admin') and `UserID` NOT IN(SELECT DISTINCT `UserID` FROM `Board`)";
        $result = query($conn,$sql,array(),"SELECT");
        $resultCount = count($result);
        if($resultCount <= 0){
            $rtn = successCode("Without any user except moderator now.");
        }
        else{
			$arr=array();
			for($i=0;$i<$resultCount;$i++){
                $row = $result[$i];
                $arr[$i]=array("userID"=>$row[0]]);
            }
            $rtn = successCode("Successfully show user list.",$result);
        }
        echo json_encode($rtn);
    }
?>
