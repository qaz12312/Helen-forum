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
		dataDB.info = ""
		dataDB.data = "Successfully remove top article in board."
	否則
		dataDB.errorCode = "Failed to remove top article in board,Database exception." 
		dataDB.data = "" 
	*/
	function doRemoveTopArticle($input){ //移除置頂文章
		global $conn;
		$sql="SELECT `TopArticleID` FROM `Board` WHERE `BoardName`=?";  
		$arr = array($input['boardName']);
		$result = query($conn,$sql,$arr,"SELECT");
		// $resultCount = count($result[0]);
		// print_r($resultCount);
		if($result[0][0] == NULL){
			errorCode("Has no top article.");
		}
		else {
			$sql="UPDATE `Board` SET `TopArticleID`= NULL WHERE `BoardName`=?";
			$arr = array($input['boardName']);
			query($conn,$sql,$arr,"UPDATE");
			$rtn = successCode("Successfully remove top article in board.");
		}
		echo json_encode($rtn);
	}
?>