<?php
    /* 
    前端 to 後端:
    let cmd = {};
    cmd["act"] = "removeKeepArticle";
    cmd["account"] = "00857210"; //cmd["token"]
    cmd["articleID"] = 1;
    cmd["dirName"] ="旅遊景點";
		
    後端 to 前端:
	dataDB = JSON.parse(data);
	dataDB.status
	若 status = true:
		dataDB.info = "Successfully remove article in keepDir."
		dataDB.data = ""
	否則
		dataDB.errorCode = "Keep article not exist in /dirName/."
		dataDB.data = "" 
     */
    function doRemoveKeepArticle($input){ // 將文章從收藏資料夾移除
        global $conn;
        // $token =$input['token'];
        // if(!isset($_SESSION[$token])){
        //     errorCode("token doesn't exist.");
        // }
        // $userInfo = $_SESSION[$token];
        // $user = $userInfo['account'];

        $user = $input['account'];
        $sql="SELECT EXISTS(SELECT 1 FROM `FollowKeep` WHERE `ArticleID`=? AND`UserID`=? AND`DirName`=? LIMIT 1)";
        $arr = array($input['articleID'], $user, $input['dirName']);
        $result = query($conn,$sql,$arr,"SELECT");
        if(!$result[0][0]){
            errorCode("Keep article not exist in ".$input['dirName'].".");
        }
        $sql="DELETE FROM `FollowKeep` WHERE `DirName`=? AND`UserID`=? AND`ArticleID`=?";
        $arr = array($input['dirName'], $user, $input['articleID']);
        query($conn,$sql,$arr,"DELETE");   
        //writeRecord($user,$userInfo["log"],"remove articleID:".$input['articleID']."from dir-".$input['dirName'].".");
        writeRecord($user,"Remove Keep Article","remove articleID:".$input['articleID']."from dir-".$input['dirName'].".");
        $rtn = successCode("Successfully remove article in keepDir.");
        echo json_encode($rtn);
    }
?>
