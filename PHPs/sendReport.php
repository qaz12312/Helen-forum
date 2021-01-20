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
		dataDB.info = "Successfully send the report.";
		dataDB.data = "";
	否則
		dataDB.errorCode = "You have been reported this article before.";
		dataDB.data = "";
    */
    function doSendReport($input){
        global $conn;
        // $token =$input['token'];
        // if(!isset($_SESSION[$token])){
        //     errorCode("token doesn't exist.");
        // }
        // $userInfo = $_SESSION[$token];
        // $user = $userInfo['account'];

        $user = $input['account'];
        $sql = "SELECT EXISTS(SELECT 1 FROM `Report` WHERE `ArticleID`=? AND `UserID`=? LIMIT 1)";//檢舉是否已存在
        $arr = array($input['articleID'],$user);
        $result = query($conn,$sql,$arr,"SELECT");
        if($result[0][0]){
            errorCode("You have been reported this article before.");
        }else{
            $sql="INSERT INTO `Report`(`UserID`,`ArticleID`,`Reason`) VALUES(?,?,?)";
            $arr = array($user, $input['articleID'], $input['reason']);
            query($conn,$sql,$arr,"INSERT");
            // send issue
            $sql = "SELECT `Title`,`AuthorID`,`Times` FROM `Article` WHERE `ArticleID`=?";
            $articleInfo = query($conn,$sql,array($input['articleID']),"SELECT");
            
            $content = "Sorry - Your article-【".$articleInfo[0][0]."】which is published in".$articleInfo[0][2]." has been report.";

            $sql = "SELECT EXISTS(SELECT 1 FROM `Issue` WHERE `Content`=? AND `UserID`=? AND `Type`=? LIMIT 1)";
            $arr = array($content,$articleInfo[0][1],2);
            $result = query($conn,$sql,$arr,"SELECT");
            if(!$result[0][0]){//若issue不存在
                doSendNotification(array("recipient" => $articleInfo[0][1], "content" => $content),0);
            }
    		writeRecord($user,"Add report","articleID :".$input['articleID']."which reason is:".$input['reason']);
            $rtn = successCode("Successfully send the report.");
            echo json_encode($rtn);
        }
    }
?>
