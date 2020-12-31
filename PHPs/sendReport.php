<?php
	/* 
	前端 to 後端:
	let cmd = {};
	cmd["act"] = "sendReport";
	cmd["account"] = "00757007"; //cmd["token"]
	cmd["reason"] = "Reason";
	cmd["articleID"] = articleID;	
	
    後端 to 前端:
    dataDB = JSON.parse(data);
	dataDB.status
	若 status = true:
		dataDB.info = ""
		dataDB.data= ""
	否則
		dataDB.errorCode = "You have been reported this article before." / "Failed to send report,Database exception."
		dataDB.data = ""
    */
    function doSendReport($input){
        global $conn;
        // $token =$input['token'];
        // if(!isset($_SESSION[$token])){
		// 	errorCode("token doesn't exist.");
        // }else{
        // 	$userInfo = $_SESSION[$token];
        $sql = "SELECT EXISTS(SELECT 1 FROM `Report` WHERE `ArticleID`=? AND `UserID`=? LIMIT 1)";
        $arr = array($input['articleID'], $input['account']);
        $result = query($conn,$sql,$arr,"SELECT");
        if($result[0][0]==1){
            errorCode("You have been reported this article before.");
        }else{
            $sql="INSERT INTO `Report`(`UserID`,`ArticleID`,`Reason`) VALUES(?,?,?)";
            $arr = array($input['account'], $input['articleID'], $input['reason']);
            query($conn,$sql,$arr,"INSERT");
            
            $sql="SELECT `ArticleID`,`Reason`,`Times` FROM `Report` WHERE `ArticleID`=? AND `reason`=?";
            $arr = array($input['articleID'],$input['reason'] );
            $result = query($conn,$sql,$arr,"SELECT");
            $resultCount = count($result);
            if($resultCount <= 0){
                errorCode("Failed to send report,Database exception.");
            }
            else{
                doSendNotification(array("recipient" => $input['account'], "content" => "Sorry - Your article has been report."),0);
                $rtn = successCode("Successfully send the report.");
            }
            echo json_encode($rtn);
        }
    }
?>
