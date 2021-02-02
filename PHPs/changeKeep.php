<?php
	/* 
	前端 to 後端:
	let cmd = {};
	cmd["act"] = "keep";
	cmd["account"] = "00757003"; //cmd["token"]
	cmd["articleID"] = 2;
	cmd["dirName"] = "旅遊景點";(如果是收藏文章才要)
	後端 to 前端:
	dataDB = JSON.parse(data);
	dataDB.status
	若 status = true:
		dataDB.info = "Successfully kept this article." / "Successfully deleted this article.";
		dataDB.data = ""
	否則
		dataDB.errorCode = "Keep without folder.";
		dataDB.data = "" 
	*/
	function doAddDeleteKeep($input)
	{
		global $conn;
		// $token =$input['token'];
        // if(!isset($_SESSION[$token])){
		// 	errorCode("token doesn't exist.");
        // }
        // $userInfo = $_SESSION[$token];
        // $user = $userInfo['account'];

        $user = $input['account'];
        $sql = "SELECT EXISTS(SELECT 1 FROM `FollowKeep` WHERE `UserID`=? AND `ArticleID`=? LIMIT 1)"; //文章是否存在
        $arr = array($user,$input['articleID']);
        $result = query($conn,$sql,$arr,"SELECT");
        if ($result[0][0] == 0) {	//收藏文章
            $sql ="SELECT EXISTS(SELECT 1 FROM `KeepDir` WHERE `UserID`=? AND`DirName`=? LIMIT 1)";//收藏資料夾是否存在
            $arr = array($user, $input['dirName']);
            $result = query($conn,$sql,$arr,"SELECT");
            if($result[0][0] == 0){
                errorCode("Keep without folder.");
            }
            else{
                $sql = "INSERT INTO `FollowKeep`(`ArticleID`,`UserID`,`DirName`) VALUES(?,?,?)";
                $arr = array($input['articleID'],$user,$input['dirName'] );
                query($conn,$sql,$arr,"INSERT");
            // writeRecord($user,$userInfo["log"],"add articleID:".$input['articleID']."in dirName=".$input['dirName']);
                writeRecord($user,"Add Keep","articleID:".$input['articleID']."in dirName=".$input['dirName']);
                $rtn = successCode("Successfully kept this keep the article.");
            }
        } 
        else {	//收回收藏
            $sql = "DELETE FROM `FollowKeep` WHERE `UserID`=? AND `ArticleID`=?";
            $arr = array($user, $input['articleID']);
            query($conn,$sql,$arr,"DELETE");
            // writeRecord($user,$userInfo["log"],"remove articleID:".$input['articleID']."from dirName=".$input['dirName']);
            writeRecord($user,"Delete Keep","articleID:".$input['articleID']."from dirName=".$input['dirName']);
            $rtn = successCode("Successfully deleted this article.");
        }
        echo json_encode($rtn);	
	}
?>
