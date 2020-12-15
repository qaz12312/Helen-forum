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
		dataDB.errorCode = ""
		dataDB.data = "Successfully remove top article in board."
	否則
		dataDB.errorCode = "Failed to remove top article in board,Database exception." 
		dataDB.data = "" 
	*/
	function doRemoveTopArticle($input){ //移除置頂文章
    	global $conn;
		$sql="UPDATE `Board` SET `TopArticleID`= NULL WHERE `BoardName`=?";
		$arr = array($input['boardName']);
        $result = query($conn,$sql,$arr,"UPDATE");
		$rtn = successCode("Successfully remove top article in board.");
		echo json_encode($rtn);
	}
?>