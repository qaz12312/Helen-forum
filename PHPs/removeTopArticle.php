<?php
	/* 
	前端 to 後端:
	let cmd = {};
	cmd["act"] = "removeTopArticle";
	cmd["boardName"] = "旅遊";
	
	後端 to 前端:
	dataDB = JSON.parse(data);
	dataDB.status
	若 status = true:
		dataDB.info = "Successfully remove top article in board.";
		dataDB.data = "";
	否則
		dataDB.errorCode = "Failed to remove top article in board,Database exception." 
		dataDB.data = "" 
	*/
	function doRemoveTopArticle($input){ //移除置頂文章
		global $conn;
		$sql="SELECT EXISTS(SELECT 1 FROM `Board` WHERE `BoardName`=? LIMIT 1)";  
		$result = query($conn,$sql,array($input['boardName']),"SELECT");
		if(!$result[0][0]){
			errorCode("Has no top article.");
		}
		else {
			$sql="UPDATE `Board` SET `TopArticleID`= NULL WHERE `BoardName`=?";
			query($conn,$sql,array($input['boardName']),"UPDATE");
			$rtn = successCode("Successfully remove top article in board.");
		}
		echo json_encode($rtn);
	}
?>