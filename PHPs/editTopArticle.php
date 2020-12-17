<?php
    /* 
	前端 to 後端:
	let cmd = {};
	cmd["act"] = "editTopArticle";
	cmd["articleID"] = 1;
	cmd["boardName"] = "美食";
	cmd["account"] = "admin";
	
    後端 to 前端:
	dataDB.status
	若 status = true:
		dataDB.status = true
		dataDB.info = ""
		dataDB.data[0]	// TopArticleID
		dataDB.data[1]  // title
	否則 status = false:
		dataDB.status = false
		dataDB.errorCode ="Update without permission." / "Failed to set Top article."
		dataDB.data = ""
    */
    function doEditTopArticle($input){
		global $conn;
		$sql="SELECT `BoardName` FROM `Board` WHERE `BoardName`=? AND `UserID`=? ";  
		$arr = array($input['boardName'], $input['account']);
		$result = query($conn,$sql,$arr,"SELECT");
		$resultCount = count($result);
		if($resultCount <= 0){
			errorCode("Update without permission.");
		}
		else{
			$sql="UPDATE `Board` SET `TopArticleID`=? WHERE `BoardName`=?";
			$arr = array($input['articleID'], $input['boardName']);
			query($conn,$sql,$arr,"UPDATE");

			$sql="SELECT `TopArticleID` FROM `Board` WHERE `TopArticleID`=? AND `BoardName`=?";
			$arr = array($input['articleID'], $input['boardName']);
			$result = query($conn,$sql,$arr,"SELECT");
			$resultCount = count($result);
			if($resultCount <= 0){
				errorCode("Failed to set Top article.");
			}
			else{
				$rtn = successCode("Successfully edited this topArticle.",$result);
			}
		}
		echo json_encode($rtn);
	}
?>

