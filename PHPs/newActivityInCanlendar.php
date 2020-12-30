<?php 
	/* 
	前端 to 後端:
	let cmd = {};
	cmd["act"] = "newActivityInCanlendar";
	cmd["account"] = "00757033"; //cmd["token"]
    cmd["title"] = "聖誕節";
    cmd["startTime"] = "2020/12/25";
    cmd["endTime"] = "202012/25";
    cmd["text"] = "一起來吃聖誕大餐";

	後端 to 前端
	dataDB.status
	若 status = true:
		dataDB.info = ""
		dataDB.data = "Successfully Apply the Board.";
	否則
		dataDB.errorCode = "Failed to Apply the Board,Database exception.";
		dataDB.data = "";
	*/
    function doNewActivityInCanlendar($input){
        global $conn;
        // $token =$input['token'];
        // if(!isset($_SESSION[$token])){
		// 	errorCode("token doesn't exist.");
        // }else{
		// 	$userInfo = $_SESSION[$token];
        $sql="SELECT `IsValid` FROM `Calendar`WHERE `Title`=? AND `Start`=? AND `END`=?";
        $arr = array($input['title'],$input['startTime'],$input['endTime']);
        $result = query($conn,$sql,$arr,"SELECT");
        $resultCount = count($result);
        if($resultCount > 0){
            if($result[0][0])
                $rtn = successCode("Activity has been approved",array());
            else
                $rtn = successCode("Activity has not been approved yet.",array());  
        }
		else{
			$sql="INSERT INTO `Calendar`(`UserID`,`Title`,`Start`,`END`,`Text`) VALUES(?,?,?,?,?)";
        	$arr = array($input['account'],$input['title'],$input['startTime'],$input['endTime'],$input['text']);
            $result = query($conn,$sql,$arr,"SELECT");
            $rtn = successCode("Successfully new the Article."array();
		}	
        echo json_encode($rtn);
    }
?>
