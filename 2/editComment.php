<?php
    /* 
    前端 to 後端:
    let cmd = {};
    cmd["act"] = "editComment"
    cmd["account"] = "AuthorID"
    cmd["detail"] = "Content"
    cmd["articleID"] ="ArticleID"
    cmd["floors"] = "Floor"

    後端 to 前端:
    dataDB.status
    若 status = true:
    dataDB.status = true
    dataDB.errorCode = ""
    dataDB.data = 更新後的留言
    否則 status = false:
    dataDB.status = false
    dataDB.data = ""
    dataDB.errorCode = "Update without permission."/"Failed to found the update board."
    */
    function doEditComment($input){
        global $conn;
        $sql="SELECT `ArticleID` FROM `Comments` NATURAL JOIN`Users`  WHERE `ArticleID`='".$input['articleID']."' AND `AuthorID`='".$input['account']."' AND`Floor`='".$input['floors']."'";  
        $arr = array();
		$result = query($conn,$sql,$arr,"SELECT");
        $resultCount = count($result);
        
        if($resultCount <= 0){
            errorCode("Update without permission.");
        }
        else{    
            $sql="UPDATE `Comments` SET `Content`='".$input['detail']."' WHERE `ArticleID`='".$input['articleID']."' AND `AuthorID`='".$input['account']."' AND`Floor`='".$input['floors']."'";
            $arr = array();
            $result = query($conn,$sql,$arr,"UPDATE");

            $sql="SELECT `AuthorID`,`Content`,`ArticleID`,`Times`,`Floor`,`Color` FROM `Comments` JOIN`Users` ON Users.UserID =Comments.AuthorID  WHERE `ArticleID`='".$input['articleID']."' AND `AuthorID`='".$input['account']."' AND`Floor`='".$input['floors']."'";
            $arr = array();
            $result = query($conn,$sql,$arr,"SELECT");
            $resultCount = count($result);
            if($resultCount <= 0){
                errorCode("Failed to found the update comment.");
            }
            else{
                $rtn = successCode($result);
            }
        }
        echo json_encode($rtn);
    }
?>
