<?php
/* 前端 to 後端:
            let cmd = {};
            cmd["act"] = "newComment";
            cmd["account"] = "00857210";
            cmd["detail"] = "Content";
            cmd["floors"] = 1;
            cmd["tagFloor"] = NULL;
            cmd["articleID"] = 1;
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
                dataDB.data[6]	// Color
            否則
                dataDB.data = ""
         */
	function doNewComment($input){ 
		global $conn;
		$new="INSERT INTO  `Comments`(`AuthorID`,`Content`,`ArticleID`,`Floor`,`TagFloor`) 
		VALUES('".$input['account']."','".$input['detail']."','".$input['articleID']."','".$input['floors']."','".$input['tagFloor']."')";
		$resultNew=$conn->query($new);
		if(!$resultNew){
			die($conn->error);
		}
		$sql="SELECT `AuthorID`,`Content`,`Times`,`Floor`,`TagFloor`,`Color` FROM `Comments` JOIN`Users` ON Users.UserID =Comments.AuthorID WHERE `ArticleID`='".$input['articleID']."' AND`Floor`='".$input['floors']."'";
		$result=$conn->query($sql);
		if(!$result){
			die($conn->error);
		}
		if($result->num_rows <= 0){
			$rtn = array();
			$rtn["status"] = false;
			$rtn["errorCode"] = "留言上傳失敗";
		$rtn["data"] = "";
		}
		else{
			$row=$result->fetch_row();
			$rtn = array();
			$rtn["status"] = true;
			$rtn["errorCode"] = "";
			$rtn["data"] = $row;
		}
	}
    echo json_encode($rtn);
?>