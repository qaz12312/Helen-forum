<?php
	/* 
	前端 to 後端:
	let cmd = {};
	cmd["act"] = "editArticle";
	cmd["articleID"] = ArticleID;
	cmd["account"] = "00757003"; //cmd["token"]
	cmd["blockName"] ="美食"; // 使用者想改版
	cmd["title"] = "Title";
	cmd["content"] = "Content";
	cmd["picture"] = "Image";
	cmd["hashTag"] ="HashTag";

	後端 to 前端:
	dataDB = JSON.parse(data);
	dataDB.status
	若 status = true:
		dataDB.info = "Successfully edited this article."
		dataDB.data = 
	否則
		dataDB.errorCode = "Update without permission."/"Failed to Update Article,Database exception."
		dataDB.data = 
	*/
    function doEditArticle($input){ 
		global $conn;    
		// $token =$input['token'];
        // if(!isset($_SESSION[$token])){
		// 	errorCode("token doesn't exist.");
        // }else{
		// 	$userInfo = $_SESSION[$token];
            // $user = $userInfo['account'];
            $user = $input['account'];
			$sql="SELECT EXISTS(SELECT 1 FROM `Article` JOIN `Users` ON Users.UserID=Article.AuthorID WHERE `ArticleID`=? AND `AuthorID`=? LIMIT 1)";  
			$result = query($conn,$sql,array($input['articleID'], $user),"SELECT");
			$resultCount = count($result);
			if($resultCount <= 0){
				errorCode("Update without permission.");
			}
			else{
				$hashTag = json_encode($input['hashTag']);
				$sql="UPDATE `Article` SET `Title`=?,`Content`=?,`Image`=?,`HashTag`=?,`BlockName`=?,`Times`=NOW() WHERE `ArticleID` = ? AND `AuthorID`=?";
				$arr = array($input['title'], $input['content'], $input['picture'], $hashTag, $input['blockName'], $input['articleID'], $user);
				query($conn,$sql,$arr,"UPDATE");

				$sql="SELECT `ArticleID`,`Title`,`Content`,`Image`,`HashTag`,`Times`,`Color`,`BlockName` FROM `Article` JOIN`Users` ON Users.UserID=Article.AuthorID WHERE `Title`=? AND `Content`=? AND `Image`=? AND `HashTag`=?";
				$arr = array($input['title'], $input['content'], $input['picture'], $hashTag);
				$result = query($conn,$sql,$arr,"SELECT");
				$resultCount = count($result);
				if($resultCount <= 0){
					errorCode("Failed to Update Article, Database exception.");
				}
				else{
                    // writeRecord($user,$userInfo["log"],"edit for articleID:".$input['articleID']);
					$rtn = successCode("Successfully edited this article.", $result);
				}
			}
			echo json_encode($rtn);
		// }
	}
?>
