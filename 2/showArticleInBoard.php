<?php
    /* 
    前端 to 後端:
    let cmd = {};
    cmd["act"] = "showArticleInBoard";
    cmd["boardName"] = "BoardName";

    後端 to 前端:
    dataDB = JSON.parse(data);
    dataDB.status
    若 status = true:
        dataDB.errorCode = ""
        dataDB.data[i] //有i筆文章
        (
        dataDB.data[i].title //第i筆文章的標題
        dataDB.data[i].articleID
        dataDB.data[i].like //第i筆文章的總愛心數
        dataDB.data[i].keep//第i筆文章的總收藏數
        ) 
    否則
        dataDB.errorCode = "Article not in this board."
        dataDB.data = ""
    */
    function doShowArticleInBoard($input){
        global $conn;
        $sql="SELECT `Title`,`ArticleID` ,`cntHeart`,`cntKeep` FROM `HomeHeart` NATURAL JOIN `HomeKeep` WHERE `BoardName`='".$input['boardName']."'";
        $arr = array();
        $result = query($conn,$sql,$arr,"SELECT");
        $resultCount = count($result);

        $sql="SELECT `Rule`,`TopArticleID` FROM `Board` WHERE `BoardName`='".$input['boardName']."'";
        $arr = array();
        $result2 = query($conn,$sql,$arr,"SELECT");
        $result2Count = count($result);
        
        if($resultCount <= 0 ){
            errorCode("Article not in this board.");
        }
        else{
            $articleList = array();
            for($i=0;$i<$resultCount;$i++){
                $row=$result->fetch_row();
                $log=array("title"=>"$row[0]","articleID"=>"$row[1]","like"=>"$row[2]","keep"=>"$row[3]");
                $articleList[$i]=$log;
            }
            $row2=$result->fetch_row();
            $arr = array("articleList"=>$articleList,"topArticleID"=>$row2[1],"rule"=>$row2[0]);
            $rtn = successCode($arr);
         }
        echo json_encode($rtn);
    }
?>