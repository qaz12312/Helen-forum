<?php
    /* 
    前端 to 後端:
    let cmd = {};
    cmd["act"] = "deleteArticle";
	cmd["account"] = "00757007";
    cmd["articleID"] = ArticleID;
		
    後端 to 前端
    dataDB = JSON.parse(data);
    dataDB.status
    若 status = true:
        dataDB.status = true
        dataDB.info = ""    
        dataDB.data = "Successfully deleted this article."
    否則 status = false:
        dataDB.status = false
        dataDB.errorCode = "The query failed,This article does not exist." / "Failed to delete,Database exception."
        dataDB.data = ""
    */
    function doDeleteArticle($input){
        global $conn;
        $sql="SELECT `ArticleID` FROM `Article` NATURAL JOIN `Users`  WHERE `ArticleID`=? AND `AuthorID`=?";  
        $arr = array($input['articleID'], $input['account']);
		$result = query($conn,$sql,$arr,"SELECT");
        $resultCount = count($result);
        
        if($resultCount <= 0){
            errorCode("The query failed,This article does not exist.");
        }
        else{
            $sql="DELETE FROM `Article` WHERE `ArticleID` =? AND  `AuthorID` =?";
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
                $rtn = successCode("Successfully deleted this article.");
            }
        }
        echo json_encode($rtn);
    }
?>