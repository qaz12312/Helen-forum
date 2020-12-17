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
			dataDB.info = ""
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
		$sql="SELECT max(`Floor`) FROM `Comments`  WHERE `ArticleID`=?";
		$arr = array($input['articleID']);
		$result = query($conn,$sql,$arr,"SELECT");
		// print_r($result[0]);

		if($result[0][0]<=0){
			$rowcnt0=1;
		}
		else{
			$rowcnt0=(int)$result[0][0]+1;
		}
		
		$sql="INSERT INTO  `Comments`(`AuthorID`,`Content`,`ArticleID`,`Floor`) VALUES(?,?,?,?)";
		$arr = array($input['account'],$input['content'], $input['articleID'], $rowcnt0);
		query($conn,$sql,$arr,"INSERT");
		
		$sql="SELECT `AuthorID`,`Content`,`ArticleID`,`Times`,`Floor`,`Color` FROM `Comments` JOIN`Users` ON Users.UserID =Comments.AuthorID WHERE `ArticleID`=? AND`Floor`=?";
		$arr = array($input['articleID'], $rowcnt0);
		$result = query($conn,$sql,$arr,"SELECT");
		$resultCount = count($result);
		if($resultCount <= 0){
			errorCode("Failed to upload comment,Database exception.");
		}
		else{
			$rtn = successCode("Successfully new this comment.",$result);
		}
		echo json_encode($rtn);
	}
    
?>
