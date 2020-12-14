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
        $sqlcheck="SELECT `ArticleID` FROM `Comments` NATURAL JOIN`Users`  WHERE `ArticleID`='".$input['articleID']."' AND `AuthorID`='".$input['account']."' AND`Floor`='".$input['floors']."'";  
        $result=$conn->query($sqlcheck);
        if(!$result){
            die($conn->error);
        } 
        if($result->num_rows <= 0){
            $rtn = array();
            $rtn["status"] = false;
            $rtn["errorCode"] = "Update without permission.";
            $rtn["data"] = "";
        }
        else{    
            $updateSql="UPDATE `Comments` SET `Content`='".$input['detail']."' WHERE `ArticleID`='".$input['articleID']."' AND `AuthorID`='".$input['account']."' AND`Floor`='".$input['floors']."'";
            $result=$conn->query($updateSql);
            if(!$result){
                die($conn->error);
            }
            $sql="SELECT `AuthorID`,`Content`,`ArticleID`,`Times`,`Floor`,`Color` FROM `Comments` JOIN`Users` ON Users.UserID =Comments.AuthorID  WHERE `ArticleID`='".$input['articleID']."' AND `AuthorID`='".$input['account']."' AND`Floor`='".$input['floors']."'";
            $result=$conn->query($sql);
            if(!$result){
                die($conn->error);
            }
            if($result->num_rows <= 0){
                $rtn = array();
                $rtn["status"] = false;
                $rtn["errorCode"] = "Failed to found the update comment.";
                $rtn["data"] = "";
            }
            else{
                $rtn = array();
                $row=$result->fetch_row();
                $rtn["status"] = true;
                $rtn["errorCode"] = "";
                $rtn["data"] = $row;
            }
        }
        echo json_encode($rtn);
    }
?>
