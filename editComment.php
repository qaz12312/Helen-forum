<?php
       //require_once 'test.php'; //連線資料庫 
/* 前端 to 後端:
            let cmd = {};
            cmd["act"] = "editComment"
			cmd["account"] = "AuthorID"
            cmd["detail"] = "Content"
            cmd["articleID"] ="ArticleID"
            cmd["floors"] = "Floor"
            cmd["tagFloor"] = "TagFloor"
        */
		
        /* 後端 to 前端
            若 status = true:
                dataDB.data = 更新後的留言
				dataDB.status = true:
            否則
                dataDB.data = ""
                dataDB.errorCode = 無權限更新/留言更新失敗
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
            $rtn["errorCode"] = "無權限更新";
            $rtn["data"] = "";
        }
        else{    
            $updateSql="UPDATE `Comments` SET `Content`='".$input['detail']."',`TagFloor`='".$input['tagFloor']."' WHERE `ArticleID`='".$input['articleID']."' AND `AuthorID`='".$input['account']."' AND`Floor`='".$input['floors']."'";
            $result=$conn->query($updateSql);
            if(!$result){
                die($conn->error);
            }
            $sql="SELECT `AuthorID`,`Content`,`ArticleID`,`Times`,`Floor`,`TagFloor`,`Color` FROM `Comments` JOIN`Users` ON Users.UserID =Comments.AuthorID  WHERE `ArticleID`='".$input['articleID']."' AND `AuthorID`='".$input['account']."' AND`Floor`='".$input['floors']."'";
            $result=$conn->query($sql);
            if(!$result){
                die($conn->error);
            }
            if($result->num_rows <= 0){
                $rtn = array();
                $rtn["status"] = false;
                $rtn["errorCode"] = "留言更新失敗";
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