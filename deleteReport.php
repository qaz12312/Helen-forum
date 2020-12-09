<?php
    /* 
    前端 to 後端:
    let cmd = {};
    cmd["act"] = "deleteReport";
    cmd["isPass"] = true / false; (通過審核/審核不通過)
    cmd["articleID"] = "1";

    後端 to 前端:
	dataDB = JSON.parse(data);
	dataDB.status
	若 status = true:
		dataDB.errorCode = ""
		dataDB.data = "刪除檢舉成功"
	否則
		dataDB.errorCode = "刪除檢舉失敗"
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
                $rtn["errorCode"] = "can't find this article";
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
                    $rtn["errorCode"] = "delete report, DB error";
                    $rtn["data"] = "";
                }
                else{
                    $rtn = array();
                    $rtn["status"] = true;
                    $rtn["errorCode"] = "";
                    $rtn["data"] = "success delete report";
                }
            }
        }
        else {
			$sql="DELETE FROM `Report` WHERE `ArticleID`='".$input['articleID']."'";
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
				$rtn["errorCode"] = "cancel report fail";
				$rtn["data"] = "";
			}
			else{
				$rtn = array();
				$rtn["status"] = true;
				$rtn["errorCode"] = "";
				$rtn["data"] = "cancel report success";
			}
		}
        echo json_encode($rtn);
    }
?>