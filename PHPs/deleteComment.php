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
        dataDB.data = ""
    否則
        dataDB.errorCode = "Comment doesn't exit."
        dataDB.data = ""
    */
    function doDeleteComment($input){//刪除留言
        global $conn;
        // $token =$input['token'];
        // if(!isset($_SESSION[$token])){
        //     errorCode("token doesn't exist.");
        // }
        // $userInfo = $_SESSION[$token];
        // $user = $userInfo['account'];

        $user = $input['account'];
        $sql="SELECT EXISTS(SELECT 1 FROM `Comments` NATURAL JOIN `Users`  WHERE `ArticleID`=? AND `AuthorID`=? AND`Floor`=? LIMIT 1)"; //留言是否存在
        $arr = array($input['articleID'], $user, $input['floors']);
        $result = query($conn,$sql,$arr,"SELECT");
        if(!$result[0][0]){
            errorCode("Comment doesn't exit.");
        }
        else{    
            $sql="DELETE FROM `Comments` WHERE  `AuthorID`=? AND`Floor`=?";
            $arr = array($user, $input['floors']);
            query($conn,$sql,$arr,"DELETE");
            writeRecord($user,"DELETE comment","articleID : ".$input['articleID']."in floor: ".$input['floors']);
            $rtn = successCode("Successfully deleted this comment.");
        }
        echo json_encode($rtn);
    }
?>