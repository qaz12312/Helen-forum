<?php 
	/* 
	前端 to 後端:
	let cmd = {};
	cmd["act"] = "newDir";
	cmd["account"] = "UserID";
	cmd["dirName"] ="搞笑";
	cmd["articleID"] = articleID;(可能沒有)

	後端 to 前端
	dataDB.status
	若 status = true:
		dataDB.errorCode = ""
		dataDB.data = "新增收藏分類成功" / "新增收藏分類成功，新增文章至資料夾成功" ;
	否則
		dataDB.errorCode = "新增收藏分類成功，新增文章至資料夾失敗";
		dataDB.data = "";
	*/
    function doNewDir($input){
         global $conn;
        $new="INSERT INTO  `KeepDir`(`UserID`,`DirName`) VALUES('".$input['account']."','".$input['dirName']."')";
        $resultNew=$conn->query($new);
        if(!$resultNew){
            die($conn->error);
        }
	if(isset($input['articleID'])){
		$sql="SELECT `UserID`,`DirName` FROM `KeepDir` WHERE `UserID`='".$input['account']."' AND`DirName`='".$input['dirName']."'";
		$result=$conn->query($sql);
		if(!$result){
		    die($conn->error);
		}
		if($result->num_rows <= 0){
		    $rtn = array();
		    $rtn["status"] = false;
		    $rtn["errorCode"] = "新增收藏分類成功，新增文章至資料夾失敗";
		    $rtn["data"] = "";
		}
		else{
		    $rtn = array();
		    $rtn["status"] = true;
		    $rtn["errorCode"] = "";
		    $rtn["data"] = "新增收藏分類成功，新增文章至資料夾成功";
		}
	}else{
		$rtn = array();
		$rtn["status"] = true;
		$rtn["errorCode"] = "";
		$rtn["data"] = "新增收藏分類成功";
	}
        echo json_encode($rtn);
    }
?>
