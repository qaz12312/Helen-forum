<?php
	/* 
	前端 to 後端:
	let cmd = {};
	cmd["act"] = "deleteReport";
	cmd["isPass"] = true / false; (通過審核/審核不通過)
    cmd["articleID"] = "1";
    cmd["account"] = "檢舉者";

	後端 to 前端:
	dataDB = JSON.parse(data);
	dataDB.status
    若 status = true:
        dataDB.status = true
		dataDB.errorCode = ""
		dataDB.data = "Successfully canceled this report."
    否則 status = false:
        dataDB.status = false
		dataDB.errorCode = "This report doesn't exit." / "Failed to delete,Database exception." / "Failed to cancel report." / "Successfully deleted this report."
		dataDB.data = "" 
	*/
    function doDeleteReport($input){ //審核被檢舉文章
        global $conn;
        if($input['isPass']){//刪除文章
            $sql="SELECT `ArticleID` FROM `Article` WHERE `ArticleID`='".$input['articleID']."'";  
            $result=$conn->query($sql);
            if(!$result){
                die($conn->error);
            } 
            if($result->num_rows <= 0){
                $rtn = array();
                $rtn["status"] = false;
                $rtn["errorCode"] = "This report doesn't exit.";
                $rtn["data"] = "";
            }
            else{
                $del="DELETE FROM `Article` WHERE `ArticleID` = '".$input['articleID']."'";
                $result=$conn->query($del);
                if(!$result){
                    die($conn->error);
                }
                $sql="SELECT `ArticleID` FROM `Article` WHERE `ArticleID` = '".$input['articleID']."'";
                $result=$conn->query($sql);
                if(!$result){
                    die($conn->error);
                }
                if($result->num_rows > 0){
                    $rtn = array();
                    $rtn["status"] = false;
                    $rtn["errorCode"] = "Failed to delete,Database exception.";
                    $rtn["data"] = "";
                }
                else{
                    $rtn = array();
                    $rtn["status"] = true;
                    $rtn["errorCode"] = "";
                    $rtn["data"] = "Successfully deleted this report.";
                }
            }
        }
        else {
			$sql="DELETE FROM `Report` WHERE `ArticleID`='".$input['articleID']."' AND `UserID`='".$input['account']."'";
			$result=$conn->query($sql);
			if(!$result){
				die($conn->error);
			}
			$success="SELECT `ArticleID` FROM `Report` WHERE `ArticleID` = '".$input['articleID']."'";
			$result=$conn->query($success);
			if(!$result){
				die($conn->error);
			}
			if($result->num_rows > 0){
				$rtn = array();
				$rtn["status"] = false;
				$rtn["errorCode"] = "Failed to cancel report.";
				$rtn["data"] = "";
			}
			else{
				$rtn = array();
				$rtn["status"] = true;
				$rtn["errorCode"] = "";
				$rtn["data"] = "Successfully canceled this report.";
			}
		}
        echo json_encode($rtn);
    }
?>
