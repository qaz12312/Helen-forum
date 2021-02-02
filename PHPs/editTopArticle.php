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
		dataDB.info = "Successfully edited this topArticle."
		dataDB.data = ""
	否則
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
		$result = query($conn,$sql,array($input['boardName'],$user),"SELECT");
		if(!$result[0][0]){
			errorCode("Update without permission.");
		}
		else{
			$sql="UPDATE `Board` SET `TopArticleID`=? WHERE `BoardName`=?";
			$arr = array($input['articleID'], $input['boardName']);
			query($conn,$sql,$arr,"UPDATE");
            // writeRecord($user,$userInfo["log"],"changed the 【".$input['boardName']."】's topArticle which topArticleID is ".$input['articleID'].".");
            writeRecord($user,"Edit TopArticle","changed the 【".$input['boardName']."】's topArticle which topArticleID is ".$input['articleID'].".");
			$rtn = successCode("Successfully edited this topArticle.");
		}
		echo json_encode($rtn);
	}
?>

