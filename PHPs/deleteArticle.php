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
        $sqlcheck="SELECT `ArticleID` FROM `Article` NATURAL JOIN `Users`  WHERE `ArticleID`='".$input['articleID']."' AND `AuthorID`='".$input['account']."'";  
        $result=$conn->query($sqlcheck);
        if(!$result){
            die($conn->error);
        } 
        if($result->num_rows <= 0){
            $rtn = array();
            $rtn["status"] = false;
            $rtn["errorCode"] = "The query failed,This article does not exist.";
            $rtn["data"] = "";
        }
        else{
            $del="DELETE FROM `Article` WHERE `ArticleID` = '".$input['articleID']."' AND  `AuthorID` = '".$input['account']."'";
            $result=$conn->query($del);
            if(!$result){
                die($conn->error);
            }
            $sql="SELECT `ArticleID` FROM `Article` WHERE `ArticleID` = '".$input['articleID']."'";
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
                $rtn["data"] = "Successfully deleted this article.";
            }
        }
        echo json_encode($rtn);
    }
?>