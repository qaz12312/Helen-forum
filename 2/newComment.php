<?php
/* 
	前端 to 後端:
		let cmd = {};
		cmd["act"] = "newComment";
		cmd["account"] = "00857210";
		cmd["content"] = "Content";
		cmd["articleID"] = 1;	
	後端 to 前端
		dataDB.status
		若 status = true:
			dataDB.errorCode = ""
			dataDB.data[0]	// AuthorID
			dataDB.data[1]	// Content
			dataDB.data[2]	// ArticleID
			dataDB.data[3]	// Time
			dataDB.data[4]	// Floor
			dataDB.data[5]	// Color
		否則
			dataDB.errorCode = "Failed to upload comment,Database exception."
			dataDB.data = ""
*/
	function doNewComment($input){ 
		global $conn;
		$cnt="SELECT COUNT(`Floor`) FROM `Comments`  WHERE `ArticleID`='".$input['articleID']."'";
		$resultcnt=$conn->query($cnt);
		$rowcnt=$resultcnt->fetch_row();
		if(!isset($rowcnt)){
			$rowcnt0=1;
		}
		else{
			$rowcnt0=(int)$rowcnt[0]+1;
		}
		
		$sql="INSERT INTO  `Comments`(`AuthorID`,`Content`,`ArticleID`,`Floor`) 
		VALUES('".$input['account']."','".$input['content']."','".$input['articleID']."','".$rowcnt0."')";
		$arr = array();
		query($conn,$sql,$arr,"INSERT");
		
		$sql="SELECT `AuthorID`,`Content`,`ArticleID`,`Times`,`Floor`,`Color` FROM `Comments` JOIN`Users` ON Users.UserID =Comments.AuthorID WHERE `ArticleID`='".$input['articleID']."' AND`Floor`='".$rowcnt0."'";
		$arr = array();
		$result = query($conn,$sql,$arr,"SELECT");
		$resultCount = count($result);
		if($resultCount <= 0){
			errorCode("Failed to upload comment,Database exception.");
		}
		else{
			$rtn = successCode($result);
		}
		echo json_encode($rtn);
	}
    
?>
