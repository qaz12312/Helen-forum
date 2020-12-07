<?php
    /* 
    前端 to 後端:
    let cmd = {};
    cmd["act"] = "deleteArticle";
	cmd["token"] = "c93b3e8ab496d786030fbf8a17c3da51";
    cmd["articleID"] ="ArticleID"
		
    後端 to 前端
    dataDB = JSON.parse(data);
    dataDB.status
    若 status = true:
        dataDB.errorCode = ""    
        dataDB.data = ""
    否則
        dataDB.errorCode = ""
        dataDB.data = ""
    */
    function doDeleteArticle($input){
        global $conn;
        $token =$input['token'];
        if(!isset($_SESSION[$token])){
           $rtn = array();
            $rtn["status"] = false;
            $rtn["errorCode"] = "You don't have permission to do this action.";
            $rtn["data"] = "";
        }else{
            $userInfo = $_SESSION[$token];
            $sqlcheck="SELECT `ArticleID` FROM `Article` NATURAL JOIN `Users`  WHERE `ArticleID`='".$input['articleID']."' AND `AuthorID`='".$userInfo['account']."'";  
            $result=$conn->query($sqlcheck);
            if(!$result){
                die($conn->error);
            } 
            if($result->num_rows <= 0){
                $rtn = array();
                $rtn["status"] = false;
                $rtn["errorCode"] = "無權限刪除";
                $rtn["data"] = "";
            }
            else{
                $del="DELETE FROM `Article` WHERE `ArticleID` = '".$input['articleID']."' AND  `AuthorID` = '".$input['account']."'";
                $result=$conn->query($del);
                if(!$result){
                    die($conn->error);
                }
                $sql="SELECT `ArticleID` FROM `Article` WHERE `ArticleID` = '".$input['articleID']."' ";
                $result=$conn->query($sql);
                if(!$result){
                    die($conn->error);
                }
                if($result->num_rows > 0){
                $rtn = array();
                $rtn["status"] = false;
                $rtn["errorCode"] = "刪除失敗，資料庫異常";
                $rtn["data"] = "";
                }
                else{
                    $rtn = array();
                    $rtn["status"] = true;
                    $rtn["errorCode"] = "";
                }
            }
            echo json_encode($rtn);
        }
    }
?>