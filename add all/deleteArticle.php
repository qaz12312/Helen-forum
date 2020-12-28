<?php
    /* 
    前端 to 後端:
    let cmd = {};
    cmd["act"] = "deleteArticle";
	cmd["account"] = "00757003"; //cmd["token"]
    cmd["articleID"] = ArticleID;
		
    後端 to 前端:
    dataDB = JSON.parse(data);
    dataDB.status
    若 status = true:
        dataDB.info = "Successfully deleted this article."   
        dataDB.data = ""
    否則
        dataDB.errorCode = "The query failed,This article does not exist." / "Failed to delete,Database exception."
        dataDB.data = ""
    */
    function doDeleteArticle($input){
        global $conn;
        // $token =$input['token'];
        // if(!isset($_SESSION[$token])){
		// 	errorCode("token doesn't exist.");
        // }else{
		// 	$userInfo = $_SESSION[$token];
            $sql="SELECT `ArticleID` FROM `Article` NATURAL JOIN `Users`  WHERE `ArticleID`=? AND `AuthorID`=?";  
            // $arr = array($input['articleID'], $userInfo['account']);
            $arr = array($input['articleID'], $input['account']);
            $result = query($conn,$sql,$arr,"SELECT");
            $resultCount = count($result);
            if($resultCount <= 0){
                errorCode("The query failed,This article does not exist.");
            }
            else{
                $sql="DELETE FROM `Article` WHERE `ArticleID` =? AND  `AuthorID` =?";
            // $arr = array($input['articleID'], $userInfo['account']);
                $arr = array($input['articleID'], $input['account']);
                query($conn,$sql,$arr,"DELETE");
                
                $sql="SELECT `ArticleID` FROM `Article` WHERE `ArticleID` =?";
                $arr = array($input['articleID']);
                $result = query($conn,$sql,$arr,"SELECT");
                $resultCount = count($result);
                
                if($resultCount > 0){
                    errorCode("Failed to delete,Database exception.");
                }
                else{
				//writeRecord($userInfo["account"],$userInfo["log"],"delete articleID:".$input['articleID']);
                    $rtn = successCode("Successfully deleted this article.");
                }
            }
            echo json_encode($rtn);
        // }
    }
?>