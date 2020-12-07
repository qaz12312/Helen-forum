<?php
	/* 
	前端 to 後端:
	let cmd = {};
	cmd["act"] = "removeTopArticle";
	cmd["account"] = "admin";
	cmd["boardName"] = "美食";
	
	後端 to 前端:
	dataDB = JSON.parse(data);
	dataDB.status
	若 status = true:
		dataDB.errorCode = ""
		dataDB.data = "Top article remove success"
	否則
		dataDB.errorCode = ""
		dataDB.data = "" 
	*/
	function doRemoveTopArticle($input){ //移除置頂文章
    	global $conn;
		$sql="UPDATE `Board` SET `TopArticleID`= NULL WHERE `BoardName`='".$input['boardName']."'";
		$result=$conn->query($sql);
		if(!$result){
			die($conn->error);
		}
		else{
			$row=$result->fetch_row();
			$rtn = array();
			$rtn["status"] = true;
			$rtn["errorCode"] = "";
			$rtn["data"] = "Top article remove success";
		}
		echo json_encode($rtn);
	}
?>