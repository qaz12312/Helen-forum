<?php
    /* 
	前端 to 後端:
	let cmd = {};
	cmd["act"] = "editTopArticle";
	cmd["articleID"] = 1;
	cmd["boardName"] = "美食";
	cmd["account"] = "admin"; //cmd["token"]
	
    後端 to 前端:
	dataDB = JSON.parse(data);
    dataDB.status
	若 status = true:
		dataDB.info = ""
		dataDB.data[0]	// TopArticleID
		dataDB.data[1]  // title
	否則 status = false:
		dataDB.errorCode ="Update without permission." / "Failed to set Top article."
		dataDB.data = ""
    */
    function doEditTopArticle($input){
		global $conn;
		// $token =$input['token'];
		// if(!isset($_SESSION[$token])){
		// 	errorCode("token doesn't exist.");
		// }
		// $userInfo = $_SESSION[$token];
		// $user = $userInfo['account'];

		$user = $input['account'];
		$sql="SELECT EXISTS(SELECT 1 FROM `Board` WHERE `BoardName`=? AND `UserID`=? LIMIT 1)";  
		$arr = array($input['boardName'],$user);
		$result = query($conn,$sql,$arr,"SELECT");
		if(!$result[0][0]){
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

