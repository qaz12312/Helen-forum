<?php
    /* 
    前端 to 後端:
    let cmd = {};
    cmd["act"] = "deleteComment";
    cmd["token"] = "c93b3e8ab496d786030fbf8a17c3da51";
    cmd["articleID"] = ArticleID;
    cmd["floors"] = Floor;

    後端 to 前端
    dataDB.status
    若 status = true:
        dataDB.status = true
        dataDB.errorCode = ""
        dataDB.data= "Successfully deleted this comment."
    否則 status = false:
        dataDB.status = false
        dataDB.errorCode = "Comment doesn't exit." / "Failed to delete,Database exception."
        dataDB.data = ""
    */
    function doDeleteComment($input){
        global $conn;
        // $token =$input['token'];
        // if(!isset($_SESSION[$token])){
        //    $rtn = array();
        //     $rtn["status"] = false;
        //     $rtn["errorCode"] = "You don't have permission to do this action.";
        //     $rtn["data"] = "";
        // }else{
        //     $userInfo = $_SESSION[$token];
            $sql="SELECT `ArticleID` FROM `Comments` NATURAL JOIN `Users`  WHERE `ArticleID`=? AND `AuthorID`=? AND`Floor`=?";  
            $arr = array($input['articleID'], $input['account'], $input['floors']);//$userInfo['account']
            $result = query($conn,$sql,$arr,"SELECT");
            $resultCount = count($result);
            
            if($resultCount <= 0){
                errorCode("Comment doesn't exit.");
            }
            else{    
                $sql="DELETE FROM `Comments` WHERE  `AuthorID`=? AND`Floor`=?";
                $arr = array($input['account'], $input['floors']);//$userInfo['account']
                query($conn,$sql,$arr,"DELETE");
                
                $sql="SELECT `AuthorID`,`Content`,`ArticleID`,`Times`,`Floor`,`TagFloor` FROM `Comments` WHERE `AuthorID`=? AND`Floor`=?";
                $arr = array($input['account'], $input['floors']);//$userInfo['account']
                $result = query($conn,$sql,$arr,"SELECT");
                $resultCount = count($result);

                if($resultCount > 0){
                    errorCode("Failed to delete,Database exception.");
                }
                else{
                    $rtn = successCode("Successfully deleted this comment.");
                }
            }
        // }
        echo json_encode($rtn);
    }
?>