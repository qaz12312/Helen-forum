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
        //     errorCode("token doesn't exist.");
        // }
        // $userInfo = $_SESSION[$token];
        // $user = $userInfo['account'];

        $user = $input['account'];
        $sql="SELECT EXISTS(SELECT 1 FROM `Article` NATURAL JOIN `Users`  WHERE `ArticleID`=? AND `AuthorID`=? LIMIT 1)"; //文章是否存在
        $arr = array($input['articleID'], $user);
        $result = query($conn,$sql,$arr,"SELECT");
        if(!$result[0][0]){
            errorCode("The query failed,This article does not exist.");
        }
        else{
            $sql="DELETE FROM `Article` WHERE `ArticleID` =? AND  `AuthorID` =?";
            $arr = array($input['articleID'], $user);
            query($conn,$sql,$arr,"DELETE");
            
            $sql="SELECT EXISTS(SELECT 1 FROM `Article` WHERE `ArticleID` =? LIMIT 1)";
            $arr = array($input['articleID']);
            $result = query($conn,$sql,$arr,"SELECT");        
            if($result[0][0]){
                errorCode("Failed to delete,Database exception.");
            }
            else{
            //writeRecord($user,$userInfo["log"],"delete articleID:".$input['articleID']);
                writeRecord($user,"Delete Article","articleID:".$input['articleID']);
                $rtn = successCode("Successfully deleted this article.");
            }
        }
        echo json_encode($rtn);
    }
?>