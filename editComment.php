<?php
       require_once 'connectDB.php'; //連線資料庫 
/* 前端 to 後端:
            let cmd = {};
            cmd["act"] = "addComment";
			cmd["authorID"] = "AuthorID"
            cmd["detail"] = "Content"
            cmd["articleID"] ="ArticleID"
            cmd["timer"] = "Time"
            cmd["floors"] = "Floor"
            cmd["tagFloor"] = "TagFloor"
        */
		
        /* 後端 to 前端
            dataDB.status
            dataDB.errorCode
            若 status = true:
				dataDB.data[0]	// AuthorID
				dataDB.data[1]	// Content
				dataDB.data[2]	// ArticleID
                dataDB.data[3]	// Time
                dataDB.data[4]	// Floor
                dataDB.data[5]	// TagFloor
            否則
                dataDB.data = ""
         */
    $updateSql="UPDATE `Comment` SET `Content`='".$input['detail']."'','`Time`='".$input['timer']."'','".$input['userID']."'','`TagFloor`='".$input['tagFloor']."'";
    $result=$conn->query($updateSql);
    if(!$result){
        die($conn->error);
    }
    $sql="SELECT `AuthorID`,`Content`,`ArticleID`,`Time`,`Floor`,`TagFloor`,`Color` FROM `Comment`NATURAL JOIN`User` ON User.UserID =Comment.AuthorID  WHERE `AuthorID`='".$input['authorID'].' AND`Floor`='".$input['floors'].";
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
        $row=$result->fetch_row();
        $rtn = array();
        $rtn["status"] = true;
        $rtn["errorCode"] = "";
        $rtn["data"] = $row;
    }
    echo json_encode($rtn);
?>