<?php
    /* 
    前端 to 後端:
    let cmd = {};
    cmd["act"] = "deleteReport";
    cmd["isPass"] = true / false; (通過審核/審核不通過)
    cmd["articleID"] = "aas987dslk0980983234";

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
                $rtn["errorCode"] = "查詢失敗，無此文章";
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
                    $rtn["errorCode"] = "刪除失敗，資料庫異常";
                    $rtn["data"] = "";
                }
                else{
                    $rtn = array();
                    $rtn["status"] = true;
                    $rtn["errorCode"] = "";
                    $rtn["data"] = "成功刪除此文章";
                }
            }
        }
        $sql="DELETE FROM `Report` WHERE `ArticleID`='"."$input['articleID']";
        $result=$conn->query($sql);
        if(!$result){
            die($conn->error);
        }
        if($result->num_rows <= 0){
            $rtn = array();
            $rtn["status"] = false;
            $rtn["errorCode"] = "刪除檢舉失敗";
            $rtn["data"] = "";
        }
        else{
            $row=$result->fetch_row();
            $rtn = array();
            $rtn["status"] = true;
            $rtn["errorCode"] = "刪除檢舉成功";
            $rtn["data"] =$row;
        }
        echo json_encode($rtn);
    }
?>