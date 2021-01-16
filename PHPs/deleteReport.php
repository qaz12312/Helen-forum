<?php
	/* 
	前端 to 後端:
	let cmd = {};
	cmd["act"] = "deleteReport";
	cmd["isPass"] = 1 / 0; (通過審核/審核不通過)
    cmd["articleID"] = 1;

	後端 to 前端:
	dataDB = JSON.parse(data);
	dataDB.status
    若 status = true:
		dataDB.info = "Successfully canceled this report." / "Successfully deleted this article which you report."
		dataDB.data = ""
    否則
		dataDB.errorCode = "This article which you report doesn't exit."
		dataDB.data = "" 
	*/
    function doDeleteReport($input){ //審核被檢舉文章
        global $conn;
        if($input['isPass']){//刪除文章
            $sql="SELECT `AuthorID`,`Title`,`Times` FROM `Article` WHERE `ArticleID`=?"; //檢查是否存在被檢舉文章
            $arr = array($input['articleID']);
            $result = query($conn,$sql,$arr,"SELECT");
            $resultCount = count($result);
            if($resultCount <= 0){
                errorCode("This article which you report doesn't exit.");
            }
            else{
                $sql="DELETE FROM `Article` WHERE `ArticleID` = ?";//刪除此文章
                $arr = array($input['articleID']);
                query($conn,$sql,$arr,"DELETE");
                doSendNotification(array("recipient" => $result[0][0], "content" => "Your post 【".$result[0][1]."】which is published in ".$result[0][2]." has been reported and deleted."),0);
                writeRecord("admin","DELETE article","articleID : ".$input['articleID']);
                $rtn = successCode("Successfully deleted the article which is reported.");
            }
        }else{
		    $rtn = successCode("Successfully canceled this report.");
        }
        // 無論審核是否通過，刪除關於此文章的所有檢舉
        $sql="DELETE FROM `Report` WHERE `ArticleID`= ?";
        $arr = array($input['articleID']);
        query($conn,$sql,$arr,"DELETE");
        echo json_encode($rtn);
    }
?>
