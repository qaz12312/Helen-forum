<?php
	/* 
	前端 to 後端:
	let cmd = {};
	cmd["act"] = "editArticle";
	cmd["articleID"] = ArticleID;
	cmd["account"] = "AuthorID"; //cmd["token"]
	cmd["newBlockName"] ="美食"; // 使用者想改版
	cmd["title"] = "Title";
	cmd["content"] = "Content";
	cmd["picture"] = "Image";
	cmd["hashTag"] ="HashTag";

	後端 to 前端
	dataDB.status
	若 status = true:
		dataDB.status = true
		dataDB.info = "Successfully edited this article."
		dataDB.data = 
	否則 status = false:
		dataDB.status = false
		dataDB.errorCode = "Update without permission."/"Failed to Update Article,Database exception.";
		dataDB.data = "Update without permission. / Failed to Update Article, Database exception."
	*/
    function doEditArticle($input){ 
		global $conn;    
		// $token =$input['token'];
        // if(!isset($_SESSION[$token])){
		// 	errorCode("token doesn't exist.");
        // }else{
		// 	$userInfo = $_SESSION[$token];
		$sql="SELECT `ArticleID` FROM `Article` JOIN `Users` ON Users.UserID=Article.AuthorID WHERE `ArticleID`=? AND `AuthorID`=?";  
		$arr = array($input['articleID'], $input['account']);
		$result = query($conn,$sql,$arr,"SELECT");
		$resultCount = count($result);
		if($resultCount <= 0){
			errorCode("Update without permission.");
		}
		else{
			$sql="UPDATE `Article` SET `Title`=?,`Content`=?,`Image`=?,`HashTag`=?,`BlockName`=? WHERE `ArticleID` = ? AND `AuthorID`=?";
			$arr = array($input['title'], $input['content'], $input['picture'], $input['hashTag'], $input['newBlockName'], $input['articleID'], $input['account']);
			query($conn,$sql,$arr,"UPDATE");

			$sql="SELECT `ArticleID`,`Title`,`Content`,`Image`,`HashTag`,`Times`,`Color`,`BlockName` FROM `Article` JOIN`Users` ON Users.UserID=Article.AuthorID WHERE `Title`=? AND `Content`=? AND `Image`=? AND `HashTag`=?";
			$arr = array($input['title'], $input['content'], $input['picture'], $input['hashTag']);
			$result = query($conn,$sql,$arr,"SELECT");

			$resultCount = count($result);
			if($resultCount <= 0){
				errorCode("Failed to Update Article, Database exception.");
			}
			else{
				$rtn = successCode("Successfully edited this article.", $result);
			}
		}
		echo json_encode($rtn);
	}
?>
