<?php
/* 
前端 to 後端:
let cmd = {};
cmd["act"] = "showArticleInDir";
cmd["account"] = "userid";
cmd["dirName"] = "abc";

後端 to 前端
dataDB.state

若 state = true:
dataDB.errorCode = ""
dataDB.data[i] //有i筆文章在此收藏資料夾下
(
dataDB.data[i].articleID
dataDB.data[i].title //第i筆文章的標題
) 
否則
dataDB.errorCode = "沒有文章在【dirName】資料夾下"
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
            $rtn["statue"] = false;
            $rtn["errorCode"] = "沒有文章在【".$input['dirName']."】資料夾下";
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
            $rtn["statue"] = true;
            $rtn["errorCode"] = "";
            $rtn["data"] =$arr;
        }
        echo json_encode($rtn);
    }
?>
