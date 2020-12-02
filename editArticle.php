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
                dataDB.data[0]	// BoardID
				dataDB.data[1]	// BoardName
				dataDB.data[2]	// UserID
				dataDB.data[3]	// Rule
				dataDB.data[4]	// TopArticleID
            否則
                dataDB.data = ""
         */
        $sql="UPDATE `Article` SET `Title`=".$input['title']."','`Content`='".$input['content']."'";
        $result=$conn->query($sql);
            if(!$result){
                die($conn->error);
            }
            if($result->num_rows <= 0){
            $rtn = array();
            $rtn["status"] = false;
            $rtn["errorCode"] = "註冊失敗，資料庫異常";
            $rtn["data"] = "";
        }
        else{
            $row=$result->fetch_row();
            $rtn = array();
            $rtn["status"] = true;
            $rtn["errorCode"] = "";
            $rtn["data"] = $new[0];
        }
    }
?>