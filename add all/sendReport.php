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
		(需要回傳東西麼?還是就傳"成功送出檢舉"呢?)
		dataDB.data[0]	// ArticleID
		dataDB.data[1]	// Reason
		dataDB.data[2]	// times
	否則
		dataDB.errorCode = "Failed to send report,Database exception."
		dataDB.data = ""
    */
    function doSendReport($input){
        global $conn;
        // $token =$input['token'];
        // if(!isset($_SESSION[$token])){
		// 	errorCode("token doesn't exist.");
        // }else{
		// 	$userInfo = $_SESSION[$token];
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
            doSendNotification(array("recipient" => $input['account'], "content" => "Sorry - Your article has been report."));
            $rtn = successCode("Successfully send the report.",$result);
        }
        echo json_encode($rtn);
    }
?>

