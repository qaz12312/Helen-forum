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
        dataDB.errorCode = ""    
        dataDB.data = "Successfully deleted this article."
    否則 status = false:
        dataDB.status = false
        dataDB.errorCode = "The query failed,This article does not exist." / "Failed to delete,Database exception."
        dataDB.data = ""
    */
    function doDeleteArticle($input){
        global $conn;
        $sql="SELECT `ArticleID` FROM `Article` NATURAL JOIN `Users`  WHERE `ArticleID`='".$input['articleID']."' AND `AuthorID`='".$input['account']."'";  
        $arr = array();
		$result = query($conn,$sql,$arr,"SELECT");
        $resultCount = count($result);
        
        if($resultCount <= 0){
            errorCode("The query failed,This article does not exist.");
        }
        else{
            $sql="DELETE FROM `Article` WHERE `ArticleID` = '".$input['articleID']."' AND  `AuthorID` = '".$input['account']."'";
            $arr = array();
			query($conn,$sql,$arr,"DELETE");
			
            $sql="SELECT `ArticleID` FROM `Article` WHERE `ArticleID` = '".$input['articleID']."'";
            $arr = array();
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