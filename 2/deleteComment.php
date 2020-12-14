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
        $sql="SELECT `ArticleID` FROM `Comments` NATURAL JOIN `Users`  WHERE `ArticleID`='".$input['articleID']."' AND `AuthorID`='".$input['account']."' AND`Floor`='".$input['floors']."'";  
        $arr = array();
		$result = query($conn,$sql,$arr,"SELECT");
		$resultCount = count($result);
        
        if($resultCount <= 0){
            errorCode("Comment doesn't exit.");
        }
        else{    
            $sql="DELETE FROM `Comments` WHERE  `AuthorID`='".$input['account']."' AND`Floor`='".$input['floors']."'";
            $arr = array();
			query($conn,$sql,$arr,"DELETE");
            
            $sql="SELECT `AuthorID`,`Content`,`ArticleID`,`Times`,`Floor`,`TagFloor` FROM `Comments` WHERE `AuthorID`='".$input['account']."' AND`Floor`='".$input['floors']."'";
            $arr = array();
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
    }
?>