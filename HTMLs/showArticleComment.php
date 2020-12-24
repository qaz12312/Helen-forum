<?php
    /* 
    前端 to 後端:
    let cmd = {};
    cmd["act"] = "showArticleComment";
    cmd["articleID"] = "ArticleID";

    後端 to 前端
    dataDB = JSON.parse(data);
    dataDB.status
    若 status = true:
        dataDB.errorCode = ""
        dataDB.data[i] //有i筆文章
        (
        dataDB.data[i].title //第i筆文章的標題
        dataDB.data[i].blockName //第i筆文章的所屬看板
        dataDB.data[i].articleID
        dataDB.data[i].like //第i筆文章的總愛心數
        dataDB.data[i].keep//第i筆文章的總收藏數
        ) 
    否則
        dataDB.errorCode = "Article doesn't exit."
        dataDB.data = ""
    */
    function doShowArticleComment($input){
        global $conn;
        $sql="SELECT `Title`,`Content`,`BoardName`,`ArticleID` ,`cntHeart` ,`cntKeep` FROM `HomeHeart` NATURAL JOIN `HomeKeep` WHERE `ArticleID`='".$input['articleID']."'";
        $result=$conn->query($sql);
        if(!$result){
            die($conn->error);
        }
        if($result->num_rows <= 0){
            $rtn = array();
            $rtn["status"] = false;
            $rtn["errorCode"] = "Article doesn't exit.";
            $rtn["data"] = "";
        }
        else{
            $arr=array();
            for($i=0;$i<$result->num_rows;$i++){
                $row=$result->fetch_row();
                $log=array("title"=>"$row[0]","content"=>"$row[1]","blockName"=>"$row[2]","articleID"=>"$row[3]","like"=>"$row[4]","keep"=>"$row[5]");
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
