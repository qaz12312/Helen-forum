<?php
    /* 
    前端 to 後端:
    let cmd = {};
    cmd["act"] = "editComment";
    cmd["account"] = 留言者account; //cmd["token"]
    cmd["detail"] = "Content";
    cmd["articleID"] = ArticleID;
    cmd["floors"] = "Floor";
    cmd['anonymous'] = 1/0;

    後端 to 前端:
    dataDB = JSON.parse(data);
    dataDB.status
    若 status = true:
        dataDB.info = "Successfully edited this comment."
        dataDB.data = ""
    否則 status = false:
        dataDB.data = ""
        dataDB.errorCode = "Update without permission."/"Failed to found the update board."
    */
    function doEditComment($input){
        global $conn;
        // $token =$input['token'];
        // if(!isset($_SESSION[$token])){
        //     errorCode("token doesn't exist.");
        // }
        // $userInfo = $_SESSION[$token];
        // $user = $userInfo['account'];

        $user = $input['account'];
        $sql="SELECT EXISTS(SELECT 1 FROM `Comments` NATURAL JOIN `Users` WHERE `ArticleID`=? AND `AuthorID`=? AND`Floor`=? LIMIT 1)"; //此留言是否存在 
        $arr = array($input['articleID'], $user, $input['floors']);
		$result = query($conn,$sql,$arr,"SELECT");
        if(!$result[0][0]){
            errorCode("Update without permission.");
        }
        else{    
            $sql="UPDATE `Comments` SET `Content`=?,`Anonymous`=? WHERE `ArticleID`=? AND `AuthorID`=? AND`Floor`=?";
            $arr = array($input['detail'],$input['anonymous'], $input['articleID'], $user, $input['floors']);
            query($conn,$sql,$arr,"UPDATE");
            $rtn = successCode("Successfully edited this comment.");
        }
        echo json_encode($rtn);
    }
?>
