<?php
/* 
	前端 to 後端:
	let cmd = {};
	cmd["act"] = "newComment";
	cmd["account"] = "00857210"; //cmd["token"]
	cmd["content"] = "Content";
	cmd["articleID"] = 1;	
	cmd['anonymous'] = 1/0
	
	後端 to 前端:
	dataDB = JSON.parse(data);
	dataDB.status
	若 status = true:
		dataDB.info = "Successfully new this comment."
		dataDB.data[0]	// AuthorID
		dataDB.data[1]	// Content
		dataDB.data[2]	// ArticleID
		dataDB.data[3]	// Time
		dataDB.data[4]	// Floor
		dataDB.data[5]	// Color
	否則
		dataDB.errorCode = ""
		dataDB.data = ""
*/
	function doNewComment($input){ 
		global $conn;
		// $token =$input['token'];
		// if(!isset($_SESSION[$token])){
		// 	errorCode("token doesn't exist.");
		// }
		// $userInfo = $_SESSION[$token];
		// $user = $userInfo['account'];

		$user = $input['account'];
		$sql="SELECT max(`Floor`) FROM `Comments`  WHERE `ArticleID`=?";
		$result = query($conn,$sql,array($input['articleID']),"SELECT");
		if($result[0][0]<=0){
			$rowcnt0=1;
		}
		else{
			$rowcnt0=(int)$result[0][0]+1;
		}
		$sql="INSERT INTO `Comments`(`AuthorID`,`Content`,`ArticleID`,`Floor`,`Anonymous`) VALUES(?,?,?,?,?)";
		$arr = array($user,$input['content'], $input['articleID'], $rowcnt0,$input['anonymous']);
		query($conn,$sql,$arr,"INSERT");
    	writeRecord($user,"New comment","in articleID :".$input['articleID']);
		$rtn = successCode("Successfully new this comment.",$result);
		echo json_encode($rtn);
	}
    
?>
