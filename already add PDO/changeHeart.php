<?php
	/*
	前端 to 後端:
	let cmd = {};
	cmd["act"] = "heart";
	cmd["account"] = "00857210";
	cmd["articleId"] = 1;

	後端 to 前端:
	dataDB.status
	若 status = true:
		dataDB.status = true
		dataDB.errorCode = ""
		dataDB.data="Successfully added this heart. / Successfully deleted this heart."
	否則 
		dataDB.errorCode =  "【SQL query】failed: ..." / "【query execute】failed: ..."
		dataDB.data = ""
	*/
	function doAddDeleteHeart($input)
	{
		global $conn;
		$sql = "SELECT `UserID`,`ArticleID` FROM `FollowHeart` WHERE `UserID`= ? AND `ArticleID`= ? ";
		$rtn = array();
		try{
			$stmt =  $conn->prepare($sql);
		}catch(PDOException $e){
			$rtn["status"] = false;
			$rtn["errorCode"] = "【SQL SELECT-query】failed: ". $e->getMessage();
			$rtn["data"] = "";
			echo json_encode($rtn);
			die();
		}
		$error = $stmt->execute(array($input["account"],$input['articleId']));
		if(!$error){
			$rtn["status"] = false;
			$rtn["errorCode"] = "【query SELECT-execute】failed: ". $e->getMessage();
			$rtn["data"] = "";
			echo json_encode($rtn);
			die();
		}
		$result = $stmt->fetchAll();
		$resultCount = count($result);
		//HEART
		if ($resultCount <= 0) {	//新增HEART
			$sql = "INSERT INTO `FollowHeart`(`ArticleID`,`UserID`) VALUES(?,?)";
			try{
				$stmt =  $conn->prepare($sql);
			}catch(PDOException $e){
				$rtn["status"] = false;
				$rtn["errorCode"] = "【SQL INSERT-query】failed: ". $e->getMessage();
				$rtn["data"] = "";
				echo json_encode($rtn);
				die();
			}
			$error = $stmt->execute(array($input['articleId'],$input['account']));
			if(!$error){
				$rtn["status"] = false;
				$rtn["errorCode"] = "【query INSERT-execute】failed: ". $e->getMessage();
				$rtn["data"] = "";
				echo json_encode($rtn);
				die();
			}
			$rtn["status"] = true;
			$rtn["errorCode"] = "";
			$rtn["data"] = "Successfully added this heart.";
		} else {	//DELETE HEART
			$sql = "DELETE FROM `FollowHeart` WHERE `UserID`=? AND `ArticleID`=?";
			try{
				$stmt =  $conn->prepare($sql);
			}catch(PDOException $e){
				$rtn["status"] = false;
				$rtn["errorCode"] = "【SQL DELETE-query】failed: ". $e->getMessage();
				$rtn["data"] = "";
				echo json_encode($rtn);
				die();
			}
			$error = $stmt->execute(array($input['account'],$input['articleId']));
			if(!$error){
				$rtn["status"] = false;
				$rtn["errorCode"] = "【query DELETE-execute】failed: ". $e->getMessage();
				$rtn["data"] = "";
				echo json_encode($rtn);
				die();
			}
			$rtn["status"] = true;
			$rtn["errorCode"] = "";
			$rtn["data"] = "Successfully deleted this heart.";
		}
		echo json_encode($rtn);
	}
?>
