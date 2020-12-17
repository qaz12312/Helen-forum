<?php
    /* 
    前端 to 後端:
    let cmd = {};
    cmd["act"] = "showArticleInDir";
    cmd["account"] = "userid";
    cmd["dirName"] = "abc";

    後端 to 前端
    dataDB = JSON.parse(data);
    dataDB.status
    若 status = true:
        dataDB.errorCode = ""
        dataDB.data[i] //有i筆文章在此收藏資料夾下
        (
        dataDB.data[i].title //第i筆文章的標題
        dataDB.data[i].articleID
        ) 
    否則
        dataDB.errorCode = "Article not in the dir which names ".$input['dirName']." in this user."
        dataDB.data = ""
    */
    function doShowArticleInDir($input){
        global $conn;
        $sql="SELECT `Title`,`ArticleID`  FROM `KeepDir` NATURAL JOIN `FollowKeep` NATURAL JOIN`Article` WHERE `UserID`='".$input['account']."'AND`DirName`='".$input['dirName']."'";
        $result=$conn->query($sql);
        if(!$result){
            die($conn->error);
        }
        if($result->num_rows <= 0){
            $rtn = array();
            $rtn["status"] = false;
            $rtn["errorCode"] = "Article not in the dir which names ".$input['dirName']." in this user.";
            $rtn["data"] = "";
        }
        else{
            $arr=array();
            for($i=0;$i<$result->num_rows;$i++){
                $row=$result->fetch_row();
                $log=array("title"=>"$row[0]","articleID"=>"$row[1]");
                $arr[$i]=$log;
            }
            $rtn = array();
            $rtn["status"] = true;
            $rtn["errorCode"] = "";
            $rtn["data"] =$arr;
        }
        echo json_encode($rtn);
    }
?>