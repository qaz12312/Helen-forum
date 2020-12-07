<?php
    require_once 'test.php'; //連線資料庫 
/* 前端 to 後端:
            let cmd = {};
            cmd["act"] = "deleteComment";
			cmd["account"] = "AuthorID"
            cmd["articleID"] ="ArticleID"
            cmd["floors"] = "Floor"
        */
		
        /* 後端 to 前端
            dataDB.status
            dataDB.errorCode
            若 status = true:
				
            否則
                dataDB.data = ""
         */
    $sqlcheck="SELECT `ArticleID` FROM `Comments` NATURAL JOIN`Users`  WHERE `ArticleID`='".$input['articleID']."' AND `AuthorID`='".$input['account']."' AND`Floor`='".$input['floors']."'";  
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
            $rtn["errorCode"] = "留言刪除失敗";
            $rtn["data"] = "";
        }
        else{
            $rtn = array();
            $rtn["status"] = true;
            $rtn["errorCode"] = "";
        }
    }
    echo json_encode($rtn);
?>