<?php
/* 前端 to 後端:
            let cmd = {};
            cmd["act"] = "editArticle";
			cmd["articleID"] = "ArticleID"
            cmd["authorID"] = "AuthorID"
            cmd["blockID"] ="美食版"
            cmd["title"] = "Title"
            cmd["content"] = "Content"
            cmd["picture"] = "Image"
            cmd["hashTag"] ="HashTag"
            cmd["timer"] ="Time"
        */
		
       /* 後端 to 前端
            dataDB.status
            dataDB.errorCode
            若 status = true:
				dataDB.data[0]	// ArticleID
				dataDB.data[1]	// AuthorID
				dataDB.data[2]	// Title
                dataDB.data[3]	// Content
                dataDB.data[4]	// Image
                dataDB.data[5]	// HashTag
                dataDB.data[6]	// Time
            否則
                dataDB.data = ""
         */
    $updateSql="UPDATE `Article` SET `Title`=".$input['title']."','`Content`=".$input['content']."','`Image`=".$input['picture']."','`HashTag`=".$input['hashTag']."','`Time`=".$input['timer']."";
    $result=$conn->query($updateSql);
        if(!$result){
            die($conn->error);
        }
    $sql="SELECT `ArticleID`,`Title`,`Content`,`Image`,`HashTag`,`Time` FROM `Article` WHERE `Title`=".$input['title']."','`Content`=".$input['content']."AND `Image`=".$input['picture']."AND `HashTag`=".$input['hashTag']."AND `Time`=".$input['timer']."";
    $result=$conn->query($sql);
    if(!$result){
        die($conn->error);
    }
    if($result->num_rows <= 0){
        $rtn = array();
        $rtn["status"] = false;
        $rtn["errorCode"] = "文章更新失敗";
        $rtn["data"] = "";
    }
    else{
        $row=$result->fetch_row();
        $rtn = array();
        $rtn["status"] = true;
        $rtn["errorCode"] = "";
        $rtn["data"] = $row[0];
        $rtn["articleID"] =$articleID;
    }
    echo json_encode($rtn);
?>