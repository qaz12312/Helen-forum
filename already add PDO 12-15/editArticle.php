<?php
	/* 
	前端 to 後端:
	let cmd = {};
	cmd["act"] = "editArticle";
	cmd["articleID"] = ArticleID;
	cmd["account"] = "AuthorID";
	cmd["newBlockName"] ="美食";(是否不需要?因為ArticleID不會重複)
	cmd["title"] = "Title";
	cmd["content"] = "Content";
	cmd["picture"] = "Image";
	cmd["hashTag"] ="HashTag";

	後端 to 前端
	dataDB.status
	若 status = true:
		dataDB.status = true
		dataDB.errorCode = ""
		dataDB.data = 更新後的文章
	否則 status = false:
		dataDB.status = false
		dataDB.errorCode = "Update without permission."/"Failed to Update Article,Database exception.";
		dataDB.data = ""
	*/
    function doEditArticle($input){ 
		global $conn;    
		$sql="SELECT `ArticleID` FROM `Article` NATURAL JOIN`Users`  WHERE `ArticleID`=? AND `AuthorID`=?";  
		$arr = array($input['articleID'], $input['account']);
		$result = query($conn,$sql,$arr,"SELECT");
		$resultCount = count($result);
		if($resultCount <= 0){
			errorCode("Update without permission.");
		}
		else{
			$sql="UPDATE `Article` SET `Title`=?,`Content`=?,`Image`=?,`HashTag`=?,`BlockName`=? WHERE `ArticleID` = ? AND `AuthorID`=?";
			$arr = array($input['title'], $input['content'], $input['picture'], $input['hashTag'], $input['newBlockName'], $input['articleID'], $input['account']);
			$result = query($conn,$sql,$arr,"UPDATE");

			$sql="SELECT `ArticleID`,`Title`,`Content`,`Image`,`HashTag`,`Times`,`Color`,`BlockName` FROM `Article` NATURAL JOIN`Users`  WHERE `Title`=? AND `Content`=? AND `Image`=? AND `HashTag`=?";
			$arr = array($input['title'], $input['content'], $input['picture'], $input['hashTag']);
			$result = query($conn,$sql,$arr,"SELECT");
			$resultCount = count($result);
			if($resultCount <= 0){
				errorCode("Failed to Update Article,Database exception.");
			}
			else{
				$rtn = successCode($result);
			}
		}
	}
    echo json_encode($rtn);
?>
