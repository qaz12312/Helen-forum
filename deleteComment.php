<?php
    /* 
    前端 to 後端:
    let cmd = {};
    cmd["act"] = "deleteComment";
    cmd["account"] = "00757007";
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
        $sqlcheck="SELECT `ArticleID` FROM `Comments` NATURAL JOIN `Users`  WHERE `ArticleID`='".$input['articleID']."' AND `AuthorID`='".$input['account']."' AND`Floor`='".$input['floors']."'";  
        $result=$conn->query($sqlcheck);
        if(!$result){
            die($conn->error);
        } 
        if($result->num_rows <= 0){
            $rtn = array();
            $rtn["status"] = false;
            $rtn["errorCode"] = "Comment doesn't exit.";
            $rtn["data"] = "";
        }
        else{    
            $del="DELETE FROM `Comments` WHERE  `AuthorID`='".$input['account']."' AND`Floor`='".$input['floors']."'";
            $result=$conn->query($del);
                if(!$result){
                    die($conn->error);
                }
            $sql="SELECT `AuthorID`,`Content`,`ArticleID`,`Times`,`Floor`,`TagFloor` FROM `Comments` WHERE `AuthorID`='".$input['account']."' AND`Floor`='".$input['floors']."'";
            $result=$conn->query($sql);
            if(!$result){
                die($conn->error);
            }
            if($result->num_rows > 0){
                $rtn = array();
                $rtn["status"] = false;
                $rtn["errorCode"] = "Failed to delete,Database exception.";
                $rtn["data"] = "";
            }
            else{
                $rtn = array();
                $rtn["status"] = true;
                $rtn["errorCode"] = "";
                $rtn["data"] = "Successfully deleted this comment.";
            }
        }
        echo json_encode($rtn);
    }
?>