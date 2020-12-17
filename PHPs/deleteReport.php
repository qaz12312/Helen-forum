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
        dataDB.status = true
		dataDB.info = "Successfully canceled this report." / "Successfully deleted this article which you report."
		dataDB.data = ""
    否則 status = false:
        dataDB.status = false
		dataDB.errorCode = "This article which you report doesn't exit."
		dataDB.data = "" 
	*/
    function doDeleteReport($input){ //審核被檢舉文章
        global $conn;
        if($input['isPass']){//刪除文章
            $sql="SELECT `ArticleID` FROM `Article` WHERE `ArticleID`=?";  
            $arr = array($input['articleID']);
            $result = query($conn,$sql,$arr,"SELECT");
            $resultCount = count($result);
            
            if($resultCount <= 0){
                errorCode("This article which you report doesn't exit.");
            }
            else{
                $sql="DELETE FROM `Article` WHERE `ArticleID` = ?";
                $arr = array($input['articleID']);
			    query($conn,$sql,$arr,"DELETE");
                $rtn = successCode("Successfully deleted this article which you report.");
            }
        }
        else {
			$sql="DELETE FROM `Report` WHERE `ArticleID`= ?";
            $arr = array($input['articleID']);
			query($conn,$sql,$arr,"DELETE");
            $rtn = successCode("Successfully canceled this report.");
		}
        echo json_encode($rtn);
    }
?>
