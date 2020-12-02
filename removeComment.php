<?php
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
				
            否則
                dataDB.data = ""
         */
    $del="DELETE FROM `Comment` WHERE  `AuthorID`='".$input['authorID'].' AND`Floor`='".$input['floors'].";
    $result=$conn->query($del);
        if(!$result){
            die($conn->error);
        }
    $sql="SELECT `AuthorID`,`Content`,`ArticleID`,`Time`,`Floor`,`TagFloor` FROM `Comment` WHERE `AuthorID`='".$input['authorID'].' AND`Floor`='".$input['floors'].";
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
    echo json_encode($rtn);
?>