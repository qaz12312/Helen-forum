<?php
    /* 
    前端 to 後端:
    let cmd = {};
    cmd["act"] = "deleteComment";
    cmd["account"] = "00757003"; //cmd["token"]
    cmd["articleID"] = ArticleID;
    cmd["floors"] = Floor;

    後端 to 前端:
    dataDB = JSON.parse(data);
    dataDB.status
    若 status = true:
        dataDB.info = "Successfully deleted this comment."
        dataDB.data= ""
    否則
        dataDB.errorCode = "Comment doesn't exit." / "Failed to delete,Database exception."
        dataDB.data = ""
    */
    function doDeleteComment($input){//刪除留言
        global $conn;
        // $token =$input['token'];
        // if(!isset($_SESSION[$token])){
		// 	errorCode("token doesn't exist.");
        // }else{
		// 	$userInfo = $_SESSION[$token];
            $sql="SELECT `ArticleID` FROM `Comments` NATURAL JOIN `Users`  WHERE `ArticleID`=? AND `AuthorID`=? AND`Floor`=?";  
            //$arr = array($input['articleID'], $userInfo['account'], $input['floors']);
            $arr = array($input['articleID'], $input['account'], $input['floors']);
            $result = query($conn,$sql,$arr,"SELECT");
            $resultCount = count($result);
            
            if($resultCount <= 0){
                errorCode("Comment doesn't exit.");
            }
            else{    
                $sql="DELETE FROM `Comments` WHERE  `AuthorID`=? AND`Floor`=?";
                // $arr = array($userInfo['account'], $input['floors']);
                $arr = array($input['account'], $input['floors']);
                query($conn,$sql,$arr,"DELETE");
                
                $sql="SELECT `AuthorID`,`Content`,`ArticleID`,`Times`,`Floor` FROM `Comments` WHERE `AuthorID`=? AND`Floor`=?";
                // $arr = array($userInfo['account'], $input['floors']);
                $arr = array($input['account'], $input['floors']);
                $result = query($conn,$sql,$arr,"SELECT");
                $resultCount = count($result);
                if($resultCount > 0){
                    errorCode("Failed to delete,Database exception.");
                }
                else{
                    $rtn = successCode("Successfully deleted this comment.");
                }
            }
            echo json_encode($rtn);
        // }
    }
?>